import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, MapPin, Phone, Mail, Clock, Upload, CheckCircle, AlertCircle, X, Building2, Image, Tag, Star, ShoppingBag, Package, RefreshCw, Search } from 'lucide-react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { getDb } from '../utils/firebaseLazy';
import { ICON_MAP, formatPrice } from '../data/massageServices';
import { getAllOrdersForAdmin } from '../lib/orders';

// Cloudinary yapılandırması
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('branches'); // 'branches' | 'campaigns' | 'products' | 'orders'

  // Branches state
  const [branches, setBranches] = useState([]);
  const [fetchingBranches, setFetchingBranches] = useState(true);

  // Campaigns state
  const [campaigns, setCampaigns] = useState([]);
  const [fetchingCampaigns, setFetchingCampaigns] = useState(true);

  // Products state
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(true);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Common state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    // Branch fields
    name: '',
    city: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    hours: '',
    district: '',
    imageUrl: '',
    // Campaign fields
    branchName: '',
    branchImage: '',
    description: '',
    badge: '',
    order: 0,
    // Product fields
    productTitle: '',
    productDescription: '',
    productDuration: '',
    productPrice: '',
    productFeatures: '',
    productIcon: 'Droplets',
    productOrder: 0
  });

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'branches') {
      fetchBranches();
    } else if (activeTab === 'campaigns') {
      fetchCampaigns();
    } else if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchBranches = async () => {
    try {
      setFetchingBranches(true);
      const db = await getDb();
      const branchesRef = collection(db, 'branches');
      const q = query(branchesRef, where('active', '==', true));
      const querySnapshot = await getDocs(q);

      const branchesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      branchesData.sort((a, b) => {
        const cityCompare = (a.city || '').localeCompare(b.city || '', 'tr');
        if (cityCompare !== 0) return cityCompare;
        return (a.name || '').localeCompare(b.name || '', 'tr');
      });

      setBranches(branchesData);
    } catch (error) {
      setError('Şubeler yüklenirken hata oluştu');
    } finally {
      setFetchingBranches(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      setFetchingCampaigns(true);
      const db = await getDb();
      const campaignsRef = collection(db, 'campaigns');

      let querySnapshot;
      try {
        // Try with orderBy first
        const q = query(campaignsRef, where('active', '==', true), orderBy('order', 'asc'));
        querySnapshot = await getDocs(q);
      } catch (orderByError) {
        // If orderBy fails (no index), use simple query
        const q = query(campaignsRef, where('active', '==', true));
        querySnapshot = await getDocs(q);
      }

      const campaignsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort manually by order field
      campaignsData.sort((a, b) => (a.order || 0) - (b.order || 0));

      setCampaigns(campaignsData);
    } catch (error) {
      setError('Kampanyalar yüklenirken hata oluştu');
    } finally {
      setFetchingCampaigns(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setFetchingProducts(true);
      const db = await getDb();
      const productsRef = collection(db, 'products');
      let querySnapshot;
      try {
        const q = query(productsRef, where('active', '==', true), orderBy('order', 'asc'));
        querySnapshot = await getDocs(q);
      } catch (orderByError) {
        const q = query(productsRef, where('active', '==', true));
        querySnapshot = await getDocs(q);
      }
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      productsData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setProducts(productsData);
    } catch (error) {
      setError('Ürünler yüklenirken hata oluştu');
    } finally {
      setFetchingProducts(false);
    }
  };

  const ORDER_STATUS_LABELS = {
    pending: { label: 'Beklemede', color: 'bg-yellow-600/30 text-yellow-400' },
    paid: { label: 'Ödendi', color: 'bg-olive/30 text-green-400' },
    cancelled: { label: 'İptal', color: 'bg-gray-600/30 text-gray-400' },
    failed: { label: 'Hata', color: 'bg-red-600/30 text-red-400' }
  };

  const fetchOrders = async () => {
    try {
      setFetchingOrders(true);
      setError('');
      const idToken = await currentUser?.getIdToken?.();
      const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
      const res = await fetch(`${baseUrl}/api/admin-orders`, {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      if (res.ok) {
        const list = await res.json();
        setOrders(list);
        return;
      }
      // API hata verirse Firestore'dan direkt al
      const list = await getAllOrdersForAdmin();
      setOrders(list);
    } catch (error) {
      try {
        const list = await getAllOrdersForAdmin();
        setOrders(list);
      } catch (fallbackErr) {
        setError('Siparişler yüklenirken hata oluştu: ' + (error.message || 'Bilinmeyen hata'));
      }
    } finally {
      setFetchingOrders(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      // Logout error handled silently
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddModal = () => {
    setEditingItem(null);
    if (activeTab === 'branches') {
      setFormData({
        name: '', city: '', address: '', phone: '', whatsapp: '', email: '', hours: '', district: '', imageUrl: '',
        branchName: '', branchImage: '', description: '', badge: '', order: 0,
        productTitle: '', productDescription: '', productDuration: '', productPrice: '', productFeatures: '', productIcon: 'Droplets', productOrder: 0
      });
    } else if (activeTab === 'campaigns') {
      setFormData({
        name: '', city: '', address: '', phone: '', whatsapp: '', email: '', hours: '', district: '', imageUrl: '',
        branchName: '', branchImage: '', description: '', badge: '', order: campaigns.length,
        productTitle: '', productDescription: '', productDuration: '', productPrice: '', productFeatures: '', productIcon: 'Droplets', productOrder: 0
      });
    } else {
      setFormData({
        name: '', city: '', address: '', phone: '', whatsapp: '', email: '', hours: '', district: '', imageUrl: '',
        branchName: '', branchImage: '', description: '', badge: '', order: 0,
        productTitle: '', productDescription: '', productDuration: '', productPrice: '', productFeatures: '', productIcon: 'Droplets', productOrder: products.length
      });
    }
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    if (activeTab === 'branches') {
      setFormData({
        name: item.name || '',
        city: item.city || '',
        address: item.address || '',
        phone: item.phone || '',
        whatsapp: item.whatsapp || '',
        email: item.email || '',
        hours: item.hours || '',
        district: item.district || '',
        imageUrl: item.imageUrl || '',
        branchName: '', branchImage: '', description: '', badge: '', order: 0,
        productTitle: '', productDescription: '', productDuration: '', productPrice: '', productFeatures: '', productIcon: 'Droplets', productOrder: 0
      });
    } else if (activeTab === 'campaigns') {
      setFormData({
        name: '', city: '', address: '',
        phone: item.phone || '',
        whatsapp: item.whatsapp || '',
        email: '', hours: '', district: '', imageUrl: '',
        branchName: item.branchName || '',
        branchImage: item.branchImage || '',
        description: item.description || '',
        badge: item.badge || '',
        order: item.order || 0,
        productTitle: '', productDescription: '', productDuration: '', productPrice: '', productFeatures: '', productIcon: 'Droplets', productOrder: 0
      });
    } else {
      setFormData({
        name: '', city: '', address: '', phone: '', whatsapp: '', email: '', hours: '', district: '', imageUrl: '',
        branchName: '', branchImage: '', description: '', badge: '', order: 0,
        productTitle: item.title || '',
        productDescription: item.description || '',
        productDuration: item.duration || '',
        productPrice: item.price ?? '',
        productFeatures: Array.isArray(item.features) ? item.features.join('\n') : (item.features || ''),
        productIcon: item.icon || 'Droplets',
        productOrder: item.order ?? 0
      });
    }
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Dosya boyutu 10MB\'dan küçük olmalıdır');
      setTimeout(() => setError(''), 5000);
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Lütfen bir resim dosyası seçin');
      setTimeout(() => setError(''), 5000);
      return;
    }

    try {
      setUploadingImage(true);
      setError('');

      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: uploadData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Yükleme başarısız oldu');
      }

      setFormData(prev => ({
        ...prev,
        imageUrl: data.secure_url,
        branchImage: activeTab === 'campaigns' ? data.secure_url : prev.branchImage
      }));

      setSuccess('Fotoğraf başarıyla yüklendi!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      let errorMessage = err.message;

      if (err.message.includes('Invalid upload preset')) {
        errorMessage = 'Upload preset bulunamadı. Lütfen Cloudinary ayarlarını kontrol edin.';
      }

      setError('Fotoğraf yüklenirken hata oluştu: ' + errorMessage);
      setTimeout(() => setError(''), 8000);
    } finally {
      setUploadingImage(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);

      if (activeTab === 'branches') {
        if (!formData.name || !formData.address || !formData.phone) {
          setError('Lütfen şube adı, adres ve telefon bilgilerini girin');
          return;
        }

        const branchData = {
          name: formData.name.trim(),
          city: formData.city.trim(),
          address: formData.address.trim(),
          phone: formData.phone.trim(),
          whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
          email: formData.email.trim() || 'info@lunadenspa.com.tr',
          hours: formData.hours.trim() || 'Pazartesi-Cuma: 10:30-22:00, Cumartesi: 10:30-22:00, Pazar: 10:30-22:00',
          district: formData.district.trim() || '',
          imageUrl: formData.imageUrl.trim() || '',
          active: true
        };

        const db = await getDb();
        if (editingItem) {
          branchData.updatedAt = Timestamp.now();
          branchData.updatedBy = currentUser.email;
          await updateDoc(doc(db, 'branches', editingItem.id), branchData);
          setSuccess('Şube başarıyla güncellendi!');
        } else {
          branchData.createdAt = Timestamp.now();
          branchData.createdBy = currentUser.email;
          await addDoc(collection(db, 'branches'), branchData);
          setSuccess('Şube başarıyla eklendi!');
        }

        await fetchBranches();
      } else if (activeTab === 'campaigns') {
        if (!formData.branchName || !formData.description) {
          setError('Lütfen şube adı ve açıklama bilgilerini girin');
          return;
        }

        const campaignData = {
          branchName: formData.branchName.trim(),
          branchImage: formData.branchImage.trim() || formData.imageUrl.trim() || '',
          description: formData.description.trim(),
          badge: formData.badge.trim() || '',
          order: formData.order || 0,
          phone: formData.phone.trim() || '',
          whatsapp: formData.whatsapp.trim() || '',
          active: true
        };

        const db = await getDb();
        if (editingItem) {
          campaignData.updatedAt = Timestamp.now();
          campaignData.updatedBy = currentUser.email;
          await updateDoc(doc(db, 'campaigns', editingItem.id), campaignData);
          setSuccess('Kampanya başarıyla güncellendi!');
        } else {
          campaignData.createdAt = Timestamp.now();
          campaignData.createdBy = currentUser.email;
          await addDoc(collection(db, 'campaigns'), campaignData);
          setSuccess('Kampanya başarıyla eklendi!');
        }

        await fetchCampaigns();
      } else if (activeTab === 'products') {
        if (!formData.productTitle || !formData.productPrice) {
          setError('Lütfen ürün adı ve fiyat bilgilerini girin');
          return;
        }
        const features = formData.productFeatures
          ? formData.productFeatures.split('\n').map(f => f.trim()).filter(Boolean)
          : [];
        const productData = {
          title: formData.productTitle.trim(),
          description: formData.productDescription.trim() || '',
          duration: formData.productDuration.trim() || '',
          price: Number(formData.productPrice) || 0,
          features,
          icon: formData.productIcon || 'Droplets',
          order: Number(formData.productOrder) || 0,
          active: true
        };
        const db = await getDb();
        if (editingItem) {
          productData.updatedAt = Timestamp.now();
          productData.updatedBy = currentUser.email;
          await updateDoc(doc(db, 'products', editingItem.id), productData);
          setSuccess('Ürün başarıyla güncellendi!');
        } else {
          productData.createdAt = Timestamp.now();
          productData.createdBy = currentUser.email;
          await addDoc(collection(db, 'products'), productData);
          setSuccess('Ürün başarıyla eklendi!');
        }
        await fetchProducts();
      }

      setTimeout(() => {
        closeModal();
        setSuccess('');
      }, 2000);

    } catch (err) {
      setError('İşlem sırasında bir hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaignFromBranch = async (branch) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Fetch campaigns to check for duplicates
      const db = await getDb();
      const campaignsRef = collection(db, 'campaigns');
      let querySnapshot;
      try {
        const q = query(campaignsRef, where('active', '==', true));
        querySnapshot = await getDocs(q);
      } catch (error) {
        querySnapshot = await getDocs(campaignsRef);
      }

      const allCampaigns = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Check if campaign already exists for this branch
      const existingCampaign = allCampaigns.find(c => c.branchName === branch.name);
      if (existingCampaign) {
        setError(`"${branch.name}" için zaten bir kampanya mevcut`);
        setTimeout(() => setError(''), 3000);
        setLoading(false);
        return;
      }

      // Create campaign from branch data
      const campaignData = {
        branchName: branch.name || '',
        branchImage: branch.imageUrl || '',
        description: `${branch.name} şubemizde özel kampanyalar ve avantajlı fırsatlar`,
        badge: 'Özel Kampanya',
        order: allCampaigns.length,
        phone: branch.phone || '',
        whatsapp: branch.whatsapp || branch.phone || '',
        active: true,
        createdAt: Timestamp.now(),
        createdBy: currentUser.email
      };

      await addDoc(collection(db, 'campaigns'), campaignData);
      setSuccess(`"${branch.name}" için kampanya başarıyla oluşturuldu!`);

      // Fetch campaigns and switch to campaigns tab
      await fetchCampaigns();
      setTimeout(() => {
        setActiveTab('campaigns');
        setSuccess('');
      }, 1500);

    } catch (err) {
      setError('Kampanya oluşturulurken hata oluştu: ' + err.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    const itemName = activeTab === 'branches' ? item.name : activeTab === 'campaigns' ? item.branchName : item.title;
    const itemType = activeTab === 'branches' ? 'şube' : activeTab === 'campaigns' ? 'kampanya' : 'ürün';

    if (!window.confirm(`"${itemName}" ${itemType}sini silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const collectionName = activeTab === 'branches' ? 'branches' : activeTab === 'campaigns' ? 'campaigns' : 'products';
      const db = await getDb();

      if (activeTab === 'branches') {
        await updateDoc(doc(db, collectionName, item.id), {
          active: false,
          deletedAt: Timestamp.now(),
          deletedBy: currentUser.email
        });
      } else if (activeTab === 'products') {
        await updateDoc(doc(db, collectionName, item.id), {
          active: false,
          deletedAt: Timestamp.now(),
          deletedBy: currentUser.email
        });
      } else {
        await deleteDoc(doc(db, collectionName, item.id));
      }

      setSuccess(`${itemName} ${itemType}si silindi`);
      if (activeTab === 'branches') {
        await fetchBranches();
      } else if (activeTab === 'campaigns') {
        await fetchCampaigns();
      } else {
        await fetchProducts();
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Silme sırasında hata oluştu: ' + err.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-2 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-medium text-white truncate">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500 truncate hidden sm:block">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-1 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Tabs - scrollable on mobile */}
        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-gray-800 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab('branches')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'branches'
              ? 'border-white text-white'
              : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Şubeler</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'campaigns'
              ? 'border-white text-white'
              : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Kampanyalar</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'products'
              ? 'border-white text-white'
              : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Mağaza</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'orders'
              ? 'border-white text-white'
              : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Siparişler</span>
            </div>
          </button>
        </div>

        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-medium text-white mb-1 truncate">
              {activeTab === 'branches' ? 'Şube Yönetimi' : activeTab === 'campaigns' ? 'Kampanya Yönetimi' : activeTab === 'products' ? 'Mağaza Yönetimi' : 'Sipariş Takip'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Toplam {activeTab === 'branches' ? branches.length : activeTab === 'campaigns' ? campaigns.length : activeTab === 'products' ? products.length : orders.length} {activeTab === 'branches' ? 'şube' : activeTab === 'campaigns' ? 'kampanya' : activeTab === 'products' ? 'ürün' : 'sipariş'}
            </p>
          </div>
          {activeTab === 'orders' ? (
            <button
              onClick={fetchOrders}
              disabled={fetchingOrders}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 shrink-0 w-full sm:w-auto"
            >
              <RefreshCw className={`w-4 h-4 shrink-0 ${fetchingOrders ? 'animate-spin' : ''}`} />
              <span className="text-sm">Yenile</span>
            </button>
          ) : (
            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white text-black hover:bg-gray-200 shrink-0 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span className="text-sm">Yeni {activeTab === 'branches' ? 'Şube' : activeTab === 'campaigns' ? 'Kampanya' : 'Ürün'}</span>
            </button>
          )}
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-gray-900 border border-gray-800 p-3 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <p className="text-sm text-white">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-gray-900 border border-gray-800 p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <p className="text-sm text-white">{error}</p>
          </div>
        )}

        {/* Content Grid */}
        {activeTab === 'branches' ? (
          fetchingBranches ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-gray-800 border-t-white animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">Yükleniyor...</p>
              </div>
            </div>
          ) : branches.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Henüz şube yok</p>
              <button
                onClick={openAddModal}
                className="mt-4 text-white hover:text-gray-300 underline text-sm"
              >
                İlk şubeyi ekle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-gray-900 p-4 border border-gray-800"
                >
                  {branch.imageUrl && (
                    <div className="mb-3 overflow-hidden h-32">
                      <img
                        src={branch.imageUrl}
                        alt={branch.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-base font-medium text-white mb-1">{branch.name}</h3>
                      {branch.city && (
                        <span className="inline-block px-2 py-0.5 bg-gray-800 text-gray-400 text-xs">
                          {branch.district ? `${branch.district} / ${branch.city}` : branch.city}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-start gap-2 text-gray-400">
                        <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-gray-500" />
                        <span className="line-clamp-2">{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone className="w-3 h-3 shrink-0 text-gray-500" />
                        <span>{branch.phone}</span>
                      </div>
                      {branch.email && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Mail className="w-3 h-3 shrink-0 text-gray-500" />
                          <span className="truncate">{branch.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-800">
                    <button
                      onClick={() => handleCreateCampaignFromBranch(branch)}
                      className="flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-yellow-600 text-white hover:bg-yellow-700 text-xs shrink-0"
                      title="Kampanya Oluştur"
                      disabled={loading}
                    >
                      <Star className="w-3 h-3 fill-current shrink-0" />
                      <span>Kampanya</span>
                    </button>
                    <button
                      onClick={() => openEditModal(branch)}
                      className="flex-1 min-w-0 flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                    >
                      <Edit className="w-3 h-3 shrink-0" />
                      <span>Düzenle</span>
                    </button>
                    <button
                      onClick={() => handleDelete(branch)}
                      className="flex-1 min-w-0 flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                    >
                      <Trash2 className="w-3 h-3 shrink-0" />
                      <span>Sil</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : activeTab === 'campaigns' ? (
          fetchingCampaigns ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-gray-800 border-t-white animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">Yükleniyor...</p>
              </div>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-20">
              <Tag className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Henüz kampanya yok</p>
              <button
                onClick={openAddModal}
                className="mt-4 text-white hover:text-gray-300 underline text-sm"
              >
                İlk kampanyayı ekle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-gray-900 p-4 border border-gray-800"
                >
                  {campaign.branchImage && (
                    <div className="mb-3 overflow-hidden h-32">
                      <img
                        src={campaign.branchImage}
                        alt={campaign.branchName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-base font-medium text-white mb-1">{campaign.branchName}</h3>
                      {campaign.badge && (
                        <span className="inline-block px-2 py-0.5 bg-olive text-white text-xs">
                          {campaign.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-3">{campaign.description}</p>
                    <div className="space-y-1 text-xs">
                      {campaign.phone && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Phone className="w-3 h-3 shrink-0 text-gray-500" />
                          <span>{campaign.phone}</span>
                        </div>
                      )}
                      {campaign.whatsapp && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <svg className="w-3 h-3 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.385 1.262.614 1.694.787.712.28 1.36.24 1.872.147.571-.104 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          <span>{campaign.whatsapp}</span>
                        </div>
                      )}
                      <div className="text-gray-500">
                        Sıra: {campaign.order || 0}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-800">
                    <button
                      onClick={() => openEditModal(campaign)}
                      className="flex-1 min-w-0 flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                    >
                      <Edit className="w-3 h-3 shrink-0" />
                      <span>Düzenle</span>
                    </button>
                    <button
                      onClick={() => handleDelete(campaign)}
                      className="flex-1 min-w-0 flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                    >
                      <Trash2 className="w-3 h-3 shrink-0" />
                      <span>Sil</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : activeTab === 'products' ? (
          fetchingProducts ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-gray-800 border-t-white animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">Yükleniyor...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Henüz ürün yok</p>
              <button
                onClick={openAddModal}
                className="mt-4 text-white hover:text-gray-300 underline text-sm"
              >
                İlk ürünü ekle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => {
                const IconComponent = ICON_MAP[product.icon] || Star;
                return (
                  <div
                    key={product.id}
                    className="bg-gray-900 p-4 border border-gray-800"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-800 flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-white mb-1">{product.title}</h3>
                        <span className="text-olive font-bold">{product.price}₺</span>
                        {product.duration && (
                          <span className="text-gray-500 text-xs ml-2">{product.duration}</span>
                        )}
                      </div>
                    </div>
                    {product.description && (
                      <p className="text-xs text-gray-400 line-clamp-2 mb-3">{product.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-800">
                      <button
                        onClick={() => openEditModal(product)}
                        className="flex-1 min-w-0 flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                      >
                        <Edit className="w-3 h-3 shrink-0" />
                        <span>Düzenle</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="flex-1 min-w-0 flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                      >
                        <Trash2 className="w-3 h-3 shrink-0" />
                        <span>Sil</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          fetchingOrders ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-gray-800 border-t-white animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">Yükleniyor...</p>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Henüz sipariş yok</p>
            </div>
          ) : (
            <>
              {/* Sipariş arama */}
              <div className="mb-4 min-w-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Sipariş kodu veya müşteri adı ile ara..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:border-gray-700 outline-none text-sm"
                  />
                  {orderSearchQuery && (
                    <button
                      onClick={() => setOrderSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
              {(() => {
                const filtered = orders.filter((order) => {
                  if (!orderSearchQuery.trim()) return true;
                  const q = orderSearchQuery.trim().toLowerCase();
                  const orderCode = (order.id || '').toLowerCase();
                  const custName = (order.userName || '').toLowerCase();
                  const custEmail = (order.email || '').toLowerCase();
                  const custUserId = (order.userId || '').toLowerCase();
                  return (
                    orderCode.includes(q) ||
                    custName.includes(q) ||
                    custEmail.includes(q) ||
                    custUserId.includes(q)
                  );
                });
                return filtered.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-sm">
                    "{orderSearchQuery}" ile eşleşen sipariş bulunamadı.
                  </div>
                ) : filtered.map((order) => {
                const statusInfo = ORDER_STATUS_LABELS[order.status] || ORDER_STATUS_LABELS.pending;
                const orderDate = order.createdAt?.toDate?.()
                  ? order.createdAt.toDate().toLocaleString('tr-TR')
                  : (typeof order.createdAt === 'string' ? new Date(order.createdAt).toLocaleString('tr-TR') : '-');
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="bg-gray-900 p-3 sm:p-4 border border-gray-800 cursor-pointer hover:border-gray-700 transition-colors"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
                        <Package className="w-4 h-4 text-gray-500 shrink-0" />
                        <span className="font-mono text-xs sm:text-sm text-white truncate">
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                        <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-xs font-medium shrink-0 ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                      <span className="text-olive font-bold text-sm sm:text-base shrink-0">{formatPrice(order.total)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1 sm:mb-2">{orderDate}</div>
                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                      {order.items?.map((i) => `${i.title} x${i.quantity || 1}`).join(', ')}
                    </p>
                  </div>
                );
              });
              })()}
            </div>
            </>
          )
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-black max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-gray-800 my-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-black border-b border-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center z-10">
              <h3 className="text-base font-medium text-white">
                {editingItem
                  ? (activeTab === 'branches' ? 'Şube Düzenle' : activeTab === 'campaigns' ? 'Kampanya Düzenle' : 'Ürün Düzenle')
                  : (activeTab === 'branches' ? 'Yeni Şube' : activeTab === 'campaigns' ? 'Yeni Kampanya' : 'Yeni Ürün')
                }
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-4">
              {/* Success/Error in Modal */}
              {success && (
                <div className="bg-gray-900 border border-gray-800 p-2 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-white shrink-0" />
                  <p className="text-xs text-white">{success}</p>
                </div>
              )}

              {error && (
                <div className="bg-gray-900 border border-gray-800 p-2 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-white shrink-0" />
                  <p className="text-xs text-white">{error}</p>
                </div>
              )}

              {activeTab === 'products' ? (
                <>
                  {/* Ürün Adı */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Ürün Adı <span className="text-white">*</span>
                    </label>
                    <input
                      name="productTitle"
                      type="text"
                      value={formData.productTitle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                      placeholder="Örn: Türk Hamamı"
                      required
                    />
                  </div>

                  {/* Açıklama */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Açıklama
                    </label>
                    <textarea
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm resize-none"
                      placeholder="Ürün açıklaması"
                    />
                  </div>

                  {/* Süre ve Fiyat */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Süre
                      </label>
                      <input
                        name="productDuration"
                        type="text"
                        value={formData.productDuration}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="Örn: 60 dakika"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Fiyat (₺) <span className="text-white">*</span>
                      </label>
                      <input
                        name="productPrice"
                        type="number"
                        value={formData.productPrice}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="450"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {/* Özellikler */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Özellikler (her satıra bir özellik)
                    </label>
                    <textarea
                      name="productFeatures"
                      value={formData.productFeatures}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm resize-none"
                      placeholder="Her satıra bir özellik yazın"
                    />
                  </div>

                  {/* İkon ve Sıra */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        İkon
                      </label>
                      <select
                        name="productIcon"
                        value={formData.productIcon}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white focus:border-gray-700 outline-none text-sm"
                      >
                        {Object.keys(ICON_MAP).map((iconName) => (
                          <option key={iconName} value={iconName}>{iconName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Sıra
                      </label>
                      <input
                        name="productOrder"
                        type="number"
                        value={formData.productOrder}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        min="0"
                      />
                    </div>
                  </div>
                </>
              ) : activeTab === 'branches' ? (
                <>
                  {/* Şube Adı */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Şube Adı <span className="text-white">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                      placeholder="Örn: Kadıköy Şubesi"
                      required
                    />
                  </div>

                  {/* Şehir ve İlçe */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Şehir
                      </label>
                      <input
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="Örn: İstanbul"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        İlçe
                      </label>
                      <input
                        name="district"
                        type="text"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="Örn: Kadıköy"
                      />
                    </div>
                  </div>

                  {/* Adres */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Adres <span className="text-white">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm resize-none"
                      placeholder="Tam adres bilgisi"
                      required
                    />
                  </div>

                  {/* Telefon ve WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Telefon <span className="text-white">*</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="0212 555 5555"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        WhatsApp
                      </label>
                      <input
                        name="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="Boş ise telefon kullanılır"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                      placeholder="info@lunadenspa.com.tr"
                    />
                  </div>

                  {/* Çalışma Saatleri */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Çalışma Saatleri
                    </label>
                    <input
                      name="hours"
                      type="text"
                      value={formData.hours}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                      placeholder="Pazartesi-Cuma: 10:30-22:00"
                    />
                  </div>

                  {/* Fotoğraf Yükleme */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Şube Fotoğrafı
                    </label>

                    {formData.imageUrl && (
                      <div className="mb-2 relative overflow-hidden">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                          className="absolute top-1 right-1 p-1 bg-gray-900 text-white hover:bg-gray-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex-1 cursor-pointer min-w-0">
                        <div className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-800 text-white hover:bg-gray-700 text-xs w-full">
                          {uploadingImage ? (
                            <>
                              <div className="w-3 h-3 border border-white border-t-transparent animate-spin" />
                              <span>Yükleniyor...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3 h-3" />
                              <span>Yükle</span>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>

                      <input
                        name="imageUrl"
                        type="url"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="flex-1 min-w-0 px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-xs"
                        placeholder="veya URL"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      Max 10MB
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Campaign Fields */}
                  {/* Şube Adı */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Şube Adı <span className="text-white">*</span>
                    </label>
                    <input
                      name="branchName"
                      type="text"
                      value={formData.branchName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                      placeholder="Örn: Kadıköy Şubesi"
                      required
                    />
                  </div>

                  {/* Açıklama */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Açıklama <span className="text-white">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm resize-none"
                      placeholder="Kampanya açıklaması"
                      required
                    />
                  </div>

                  {/* Badge ve Sıra */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Badge (Etiket)
                      </label>
                      <input
                        name="badge"
                        type="text"
                        value={formData.badge}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="Örn: Özel Kampanya"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Sıra
                      </label>
                      <input
                        name="order"
                        type="number"
                        value={formData.order}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Telefon ve WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Telefon
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="0212 555 5555"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        WhatsApp
                      </label>
                      <input
                        name="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-sm"
                        placeholder="905551234567"
                      />
                    </div>
                  </div>

                  {/* Şube Resmi */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Şube Resmi
                    </label>

                    {(formData.branchImage || formData.imageUrl) && (
                      <div className="mb-2 relative overflow-hidden">
                        <img
                          src={formData.branchImage || formData.imageUrl}
                          alt="Preview"
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, branchImage: '', imageUrl: '' }))}
                          className="absolute top-1 right-1 p-1 bg-gray-900 text-white hover:bg-gray-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex-1 cursor-pointer min-w-0">
                        <div className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-800 text-white hover:bg-gray-700 text-xs w-full">
                          {uploadingImage ? (
                            <>
                              <div className="w-3 h-3 border border-white border-t-transparent animate-spin" />
                              <span>Yükleniyor...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3 h-3" />
                              <span>Yükle</span>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>

                      <input
                        name="branchImage"
                        type="url"
                        value={formData.branchImage}
                        onChange={handleChange}
                        className="flex-1 min-w-0 px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-xs"
                        placeholder="veya URL"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      Max 10MB
                    </p>
                  </div>
                </>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-2 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 text-sm"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-white text-black hover:bg-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                >
                  {loading ? (
                    <>
                      <div className="w-3 h-3 border border-black border-t-transparent animate-spin" />
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    <span>{editingItem ? 'Güncelle' : 'Ekle'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sipariş Detay Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-black max-w-lg w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-gray-800 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-black border-b border-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center z-10">
              <h3 className="text-base font-medium text-white">
                Sipariş #{selectedOrder.id?.slice(-8).toUpperCase()}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 sm:p-4 space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-medium ${(ORDER_STATUS_LABELS[selectedOrder.status] || ORDER_STATUS_LABELS.pending).color}`}>
                  {(ORDER_STATUS_LABELS[selectedOrder.status] || ORDER_STATUS_LABELS.pending).label}
                </span>
                <span className="text-olive font-bold text-lg">{formatPrice(selectedOrder.total)}</span>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Tarih</h4>
                <p className="text-sm text-white">
                  {selectedOrder.createdAt?.toDate?.()
                    ? selectedOrder.createdAt.toDate().toLocaleString('tr-TR')
                    : (typeof selectedOrder.createdAt === 'string' ? new Date(selectedOrder.createdAt).toLocaleString('tr-TR') : '-')}
                </p>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Müşteri Bilgileri</h4>
                <div className="space-y-1 text-sm">
                  {selectedOrder.userName && (
                    <p className="text-white">Ad: {selectedOrder.userName}</p>
                  )}
                  {selectedOrder.email && (
                    <p className="text-gray-300 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {selectedOrder.email}
                    </p>
                  )}
                  {selectedOrder.userPhone && (
                    <p className="text-gray-300 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {selectedOrder.userPhone}
                    </p>
                  )}
                  {!selectedOrder.userName && !selectedOrder.email && !selectedOrder.userPhone && (
                    <p className="text-gray-500">Müşteri ID: {selectedOrder.userId}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Ürünler</h4>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start sm:items-center gap-2 py-2 border-b border-gray-800 last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white line-clamp-2">{item.title}</p>
                        <p className="text-xs text-gray-500">Adet: {item.quantity || 1}</p>
                      </div>
                      <span className="text-olive font-medium shrink-0">{formatPrice((item.price || 0) * (item.quantity || 1))}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Toplam</span>
                  <span className="text-lg font-bold text-olive">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {selectedOrder.status === 'failed' && (selectedOrder.failedReasonMsg || selectedOrder.failedReasonCode) && (
                <div className="bg-red-900/30 border border-red-800/50 p-3 rounded">
                  <p className="text-xs text-red-400">
                    {selectedOrder.failedReasonMsg || `Hata kodu: ${selectedOrder.failedReasonCode}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
