import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, MapPin, Phone, Mail, Clock, Upload, CheckCircle, AlertCircle, X, Building2, Image } from 'lucide-react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Cloudinary yapılandırması
const CLOUDINARY_CLOUD_NAME = 'ddqxl5msi';
const CLOUDINARY_UPLOAD_PRESET = 'luna_spa_preset'; // Bu preset'i Cloudinary'de oluşturmanız gerekiyor

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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-emerald-400" />
              <div>
                <h1 className="text-xl font-bold text-white">
                  Luna Den Spa - Admin Panel
                </h1>
                <p className="text-sm text-gray-400">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Şube Yönetimi</h2>
            <p className="text-gray-400">Toplam {branches.length} şube</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-emerald-500/50"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Yeni Şube Ekle</span>
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-300">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Branches Grid */}
        {fetchingBranches ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 text-lg">Şubeler yükleniyor...</p>
            </div>
          </div>
        ) : branches.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">Henüz şube eklenmemiş</p>
            <button
              onClick={openAddModal}
              className="mt-4 text-emerald-400 hover:text-emerald-300 underline"
            >
              İlk şubeyi ekleyin
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                {/* Branch Image */}
                {branch.imageUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden h-40">
                    <img
                      src={branch.imageUrl}
                      alt={branch.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Branch Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{branch.name}</h3>
                    {branch.city && (
                      <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full">
                        {branch.district ? `${branch.district} / ${branch.city}` : branch.city}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                      <span className="line-clamp-2">{branch.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>{branch.phone}</span>
                    </div>

                    {branch.email && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span className="truncate">{branch.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => openEditModal(branch)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Düzenle</span>
                  </button>
                  <button
                    onClick={() => handleDelete(branch)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {editingBranch ? 'Şube Düzenle' : 'Yeni Şube Ekle'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Success/Error in Modal */}
              {success && (
                <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-3 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-300">{success}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* Şube Adı */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Şube Adı <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="Örn: Kadıköy Şubesi"
                  required
                />
              </div>

              {/* Şehir ve İlçe */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Şehir
                  </label>
                  <input
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="Örn: İstanbul"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    İlçe
                  </label>
                  <input
                    name="district"
                    type="text"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="Örn: Kadıköy"
                  />
                </div>
              </div>

              {/* Adres */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Adres <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Tam adres bilgisi"
                  required
                />
              </div>

              {/* Telefon ve WhatsApp */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefon <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="0212 555 5555"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    WhatsApp
                  </label>
                  <input
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="Boş ise telefon kullanılır"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="info@lunadenspa.com.tr"
                />
              </div>

              {/* Çalışma Saatleri */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Çalışma Saatleri
                </label>
                <input
                  name="hours"
                  type="text"
                  value={formData.hours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="Pazartesi-Cuma: 10:30-22:00"
                />
              </div>

              {/* Fotoğraf Yükleme */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Şube Fotoğrafı
                </label>
                
                {/* Image Preview */}
                {formData.imageUrl && (
                  <div className="mb-3 relative rounded-lg overflow-hidden">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      {uploadingImage ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Yükleniyor...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          <span>Fotoğraf Yükle</span>
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
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="veya URL girin"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Maksimum dosya boyutu: 10MB. Desteklenen formatlar: JPG, PNG, GIF, WEBP
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
