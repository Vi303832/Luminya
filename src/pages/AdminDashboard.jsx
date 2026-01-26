import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, MapPin, Phone, Mail, Clock, Upload, CheckCircle, AlertCircle, X, Building2, Image, Tag, Star } from 'lucide-react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

// Cloudinary yapılandırması
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('branches'); // 'branches' or 'campaigns'

  // Branches state
  const [branches, setBranches] = useState([]);
  const [fetchingBranches, setFetchingBranches] = useState(true);

  // Campaigns state
  const [campaigns, setCampaigns] = useState([]);
  const [fetchingCampaigns, setFetchingCampaigns] = useState(true);

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
    phone: '',
    whatsapp: ''
  });

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'branches') {
      fetchBranches();
    } else {
      fetchCampaigns();
    }
  }, [activeTab]);

  const fetchBranches = async () => {
    try {
      setFetchingBranches(true);
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
      console.error('Error fetching branches:', error);
      setError('Şubeler yüklenirken hata oluştu');
    } finally {
      setFetchingBranches(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      setFetchingCampaigns(true);
      const campaignsRef = collection(db, 'campaigns');

      let querySnapshot;
      try {
        // Try with orderBy first
        const q = query(campaignsRef, where('active', '==', true), orderBy('order', 'asc'));
        querySnapshot = await getDocs(q);
      } catch (orderByError) {
        // If orderBy fails (no index), use simple query
        console.log('orderBy failed, using simple query:', orderByError);
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
      console.error('Error fetching campaigns:', error);
      setError('Kampanyalar yüklenirken hata oluştu');
    } finally {
      setFetchingCampaigns(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
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
        name: '',
        city: '',
        address: '',
        phone: '',
        whatsapp: '',
        email: '',
        hours: '',
        district: '',
        imageUrl: '',
        branchName: '',
        branchImage: '',
        description: '',
        badge: '',
        order: 0
      });
    } else {
      setFormData({
        name: '',
        city: '',
        address: '',
        phone: '',
        whatsapp: '',
        email: '',
        hours: '',
        district: '',
        imageUrl: '',
        branchName: '',
        branchImage: '',
        description: '',
        badge: '',
        order: campaigns.length,
        phone: '',
        whatsapp: ''
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
        branchName: '',
        branchImage: '',
        description: '',
        badge: '',
        order: 0
      });
    } else {
      setFormData({
        name: '',
        city: '',
        address: '',
        phone: '',
        whatsapp: '',
        email: '',
        hours: '',
        district: '',
        imageUrl: '',
        branchName: item.branchName || '',
        branchImage: item.branchImage || '',
        description: item.description || '',
        badge: item.badge || '',
        order: item.order || 0,
        phone: item.phone || '',
        whatsapp: item.whatsapp || ''
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

      console.log('Uploading to Cloudinary...', {
        cloudName: CLOUDINARY_CLOUD_NAME,
        preset: CLOUDINARY_UPLOAD_PRESET
      });

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: uploadData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Cloudinary error:', data);
        throw new Error(data.error?.message || 'Yükleme başarısız oldu');
      }

      console.log('Upload successful:', data);

      setFormData(prev => ({
        ...prev,
        imageUrl: data.secure_url,
        branchImage: activeTab === 'campaigns' ? data.secure_url : prev.branchImage
      }));

      setSuccess('Fotoğraf başarıyla yüklendi!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Image upload error:', err);
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
      } else {
        // Campaigns
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
      }

      setTimeout(() => {
        closeModal();
        setSuccess('');
      }, 2000);

    } catch (err) {
      console.error('Error saving:', err);
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
      console.error('Error creating campaign from branch:', err);
      setError('Kampanya oluşturulurken hata oluştu: ' + err.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    const itemName = activeTab === 'branches' ? item.name : item.branchName;
    const itemType = activeTab === 'branches' ? 'şube' : 'kampanya';

    if (!window.confirm(`"${itemName}" ${itemType}sini silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const collectionName = activeTab === 'branches' ? 'branches' : 'campaigns';

      if (activeTab === 'branches') {
        // For branches, set active to false
        await updateDoc(doc(db, collectionName, item.id), {
          active: false,
          deletedAt: Timestamp.now(),
          deletedBy: currentUser.email
        });
      } else {
        // For campaigns, delete directly
        await deleteDoc(doc(db, collectionName, item.id));
      }

      setSuccess(`${itemName} ${itemType}si silindi`);
      if (activeTab === 'branches') {
        await fetchBranches();
      } else {
        await fetchCampaigns();
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting:', err);
      setError('Silme sırasında hata oluştu: ' + err.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-white" />
              <div>
                <h1 className="text-lg font-medium text-white">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Çıkış</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'branches'
              ? 'border-white text-white'
              : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Şubeler</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'campaigns'
              ? 'border-white text-white'
              : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Kampanyalar</span>
            </div>
          </button>
        </div>

        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-medium text-white mb-1">
              {activeTab === 'branches' ? 'Şube Yönetimi' : 'Kampanya Yönetimi'}
            </h2>
            <p className="text-sm text-gray-500">
              Toplam {activeTab === 'branches' ? branches.length : campaigns.length} {activeTab === 'branches' ? 'şube' : 'kampanya'}
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Yeni {activeTab === 'branches' ? 'Şube' : 'Kampanya'}</span>
          </button>
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
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-800">
                    <button
                      onClick={() => handleCreateCampaignFromBranch(branch)}
                      className="flex items-center justify-center gap-1 px-3 py-1.5 bg-yellow-600 text-white hover:bg-yellow-700 text-xs"
                      title="Kampanya Oluştur"
                      disabled={loading}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>Kampanya</span>
                    </button>
                    <button
                      onClick={() => openEditModal(branch)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Düzenle</span>
                    </button>
                    <button
                      onClick={() => handleDelete(branch)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Sil</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
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
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-800">
                    <button
                      onClick={() => openEditModal(campaign)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Düzenle</span>
                    </button>
                    <button
                      onClick={() => handleDelete(campaign)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Sil</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50">
          <div className="bg-black max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            {/* Modal Header */}
            <div className="sticky top-0 bg-black border-b border-gray-800 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-white">
                {editingItem
                  ? (activeTab === 'branches' ? 'Şube Düzenle' : 'Kampanya Düzenle')
                  : (activeTab === 'branches' ? 'Yeni Şube' : 'Yeni Kampanya')
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
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
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

              {activeTab === 'branches' ? (
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
                  <div className="grid grid-cols-2 gap-3">
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
                  <div className="grid grid-cols-2 gap-3">
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

                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-800 text-white hover:bg-gray-700 text-xs">
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
                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-xs"
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
                  <div className="grid grid-cols-2 gap-3">
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
                  <div className="grid grid-cols-2 gap-3">
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

                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-800 text-white hover:bg-gray-700 text-xs">
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
                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-gray-700 outline-none text-xs"
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
              <div className="flex gap-2 pt-3">
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
    </div>
  );
};

export default AdminDashboard;
