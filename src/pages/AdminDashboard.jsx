import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, MapPin, Phone, Clock, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import BulkBranchUpload from '../components/BulkBranchUpload';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    hours: '',
    mapUrl: '',
    district: '',
    imageUrl: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.name || !formData.address || !formData.phone) {
      setError('Lütfen en az şube adı, adres ve telefon bilgilerini girin');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare branch data
      const branchData = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
        email: formData.email.trim() || '',
        hours: formData.hours.trim() || 'Pazartesi-Cumartesi: 09:00-21:00, Pazar: 10:00-20:00',
        mapUrl: formData.mapUrl.trim() || '',
        district: formData.district.trim() || '',
        imageUrl: formData.imageUrl.trim() || '',
        createdAt: Timestamp.now(),
        createdBy: currentUser.email,
        active: true
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'branches'), branchData);
      console.log('Branch added with ID:', docRef.id);
      
      setSuccess('Şube başarıyla eklendi! ID: ' + docRef.id);
      
      // Reset form
      setFormData({
        name: '',
        address: '',
        phone: '',
        whatsapp: '',
        email: '',
        hours: '',
        mapUrl: '',
        district: '',
        imageUrl: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
      
    } catch (err) {
      console.error('Error adding branch:', err);
      setError('Şube eklenirken bir hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-sm text-gray-600">{currentUser?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Şube Ekle</h2>
          <p className="text-gray-600">Yeni şube bilgilerini girerek veritabanına ekleyin</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          {/* Şube Adı */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Şube Adı <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                placeholder="Örn: Kadıköy Şubesi"
                required
              />
            </div>
          </div>

          {/* İlçe */}
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
              İlçe
            </label>
            <input
              id="district"
              name="district"
              type="text"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              placeholder="Örn: Kadıköy"
            />
          </div>

          {/* Adres */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Adres <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Tam adres bilgisi"
              required
            />
          </div>

          {/* Phone & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefon <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                  placeholder="0212 555 5555"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                  placeholder="Boş bırakılırsa telefon kullanılır"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              placeholder="info@ornek.com"
            />
          </div>

          {/* Çalışma Saatleri */}
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-2">
              Çalışma Saatleri
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="hours"
                name="hours"
                type="text"
                value={formData.hours}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                placeholder="Örn: Pazartesi-Cumartesi: 09:00-21:00"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Boş bırakılırsa varsayılan saat kullanılır</p>
          </div>

          {/* Harita URL */}
          <div>
            <label htmlFor="mapUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Harita URL (Google Maps Embed)
            </label>
            <input
              id="mapUrl"
              name="mapUrl"
              type="url"
              value={formData.mapUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              placeholder="https://www.google.com/maps/embed?..."
            />
          </div>

          {/* Görsel URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Görsel URL
            </label>
            <div className="relative">
              <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-rose-500 to-amber-500 text-white py-3 px-6 rounded-lg font-medium hover:from-rose-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Ekleniyor...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Şube Ekle</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Bulk Upload Component */}
        <BulkBranchUpload currentUser={currentUser} />
      </div>
    </div>
  );
};

export default AdminDashboard;
