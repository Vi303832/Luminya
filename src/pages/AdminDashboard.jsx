import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, MapPin, Phone, Mail, Clock, Upload, CheckCircle, AlertCircle, X, Building2, Image } from 'lucide-react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Cloudinary yapılandırması
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingBranches, setFetchingBranches] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    hours: '',
    district: '',
    imageUrl: ''
  });

  // Fetch branches
  useEffect(() => {
    fetchBranches();
  }, []);

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
    setEditingBranch(null);
    setFormData({
      name: '',
      city: '',
      address: '',
      phone: '',
      whatsapp: '',
      email: '',
      hours: '',
      district: '',
      imageUrl: ''
    });
    setShowModal(true);
  };

  const openEditModal = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name || '',
      city: branch.city || '',
      address: branch.address || '',
      phone: branch.phone || '',
      whatsapp: branch.whatsapp || '',
      email: branch.email || '',
      hours: branch.hours || '',
      district: branch.district || '',
      imageUrl: branch.imageUrl || ''
    });
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
        imageUrl: data.secure_url
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
    setEditingBranch(null);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.name || !formData.address || !formData.phone) {
      setError('Lütfen şube adı, adres ve telefon bilgilerini girin');
      return;
    }

    try {
      setLoading(true);
      
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

      if (editingBranch) {
        // Update existing branch
        branchData.updatedAt = Timestamp.now();
        branchData.updatedBy = currentUser.email;
        await updateDoc(doc(db, 'branches', editingBranch.id), branchData);
        setSuccess('Şube başarıyla güncellendi!');
      } else {
        // Add new branch
        branchData.createdAt = Timestamp.now();
        branchData.createdBy = currentUser.email;
        await addDoc(collection(db, 'branches'), branchData);
        setSuccess('Şube başarıyla eklendi!');
      }
      
      await fetchBranches();
      setTimeout(() => {
        closeModal();
        setSuccess('');
      }, 2000);
      
    } catch (err) {
      console.error('Error saving branch:', err);
      setError('İşlem sırasında bir hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (branch) => {
    if (!window.confirm(`"${branch.name}" şubesini silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      setLoading(true);
      await updateDoc(doc(db, 'branches', branch.id), {
        active: false,
        deletedAt: Timestamp.now(),
        deletedBy: currentUser.email
      });
      
      setSuccess(`${branch.name} şubesi silindi`);
      await fetchBranches();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting branch:', err);
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
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-medium text-white mb-1">Şube Yönetimi</h2>
            <p className="text-sm text-gray-500">Toplam {branches.length} şube</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Yeni Şube</span>
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

        {/* Branches Grid */}
        {fetchingBranches ? (
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
                {/* Branch Image */}
                {branch.imageUrl && (
                  <div className="mb-3 overflow-hidden h-32">
                    <img
                      src={branch.imageUrl}
                      alt={branch.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Branch Info */}
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

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-800">
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
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50">
          <div className="bg-black max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            {/* Modal Header */}
            <div className="sticky top-0 bg-black border-b border-gray-800 px-4 py-3 flex justify-between items-center">
              <h3 className="text-base font-medium text-white">
                {editingBranch ? 'Şube Düzenle' : 'Yeni Şube'}
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
                
                {/* Image Preview */}
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

                {/* Upload Button */}
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
                  
                  {/* Manual URL Input */}
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
                    <span>{editingBranch ? 'Güncelle' : 'Ekle'}</span>
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
