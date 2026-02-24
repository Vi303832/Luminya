import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Package, Loader2, ArrowLeft, ShoppingBag, Mail, Phone, Lock, ChevronDown, ChevronUp, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { getOrdersByUserId } from '../lib/orders';
import { formatPrice } from '../data/massageServices';

const STATUS_LABELS = {
  pending: { label: 'Beklemede', color: 'bg-olive/20 text-olive-dark' },
  paid: { label: 'Ödendi', color: 'bg-olive/25 text-espresso' },
  cancelled: { label: 'İptal', color: 'bg-stone text-text-muted' },
  failed: { label: 'Hata', color: 'bg-red-100/80 text-red-700' }
};

const Profile = () => {
  const { currentUser, userProfile, logout, changePassword } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadOrders = useCallback(async () => {
    if (!currentUser?.uid) return;
    setOrdersLoading(true);
    try {
      const list = await getOrdersByUserId(currentUser.uid);
      setOrders(list);
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Ödeme başarılı sayfasından gelindiyse, callback gecikmesi için birkaç saniye sonra tekrar yükle
  useEffect(() => {
    if (location.state?.fromPaymentSuccess && currentUser?.uid) {
      const timer = setTimeout(() => {
        loadOrders();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.fromPaymentSuccess, currentUser?.uid, loadOrders]);

  const displayName = userProfile
    ? `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || currentUser?.email
    : currentUser?.email;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Tüm alanları doldurun');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Yeni şifre en az 6 karakter olmalıdır');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Yeni şifreler eşleşmiyor');
      return;
    }
    try {
      setPasswordLoading(true);
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess('Şifreniz başarıyla güncellendi');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setPasswordError('Mevcut şifre hatalı');
      } else if (err.code === 'auth/weak-password') {
        setPasswordError('Yeni şifre yeterince güçlü değil');
      } else {
        setPasswordError(err.message || 'Şifre değiştirilirken bir hata oluştu');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-olive mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </Link>
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-espresso mb-2">
              Hesabım <span className="italic text-olive-dark">Profil</span>
            </h1>
            <p className="text-text-muted text-sm sm:text-base">
              Siparişlerinizi ve profil bilgilerinizi görüntüleyin.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-2xl pb-20">
        {/* Profil kartı */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-soft border border-stone-dark/10 overflow-hidden"
        >
          {/* Avatar & isim alanı */}
          <div className="bg-linear-to-r from-olive/15 via-olive/10 to-stone/20 px-6 sm:px-8 py-8 border-b border-stone-dark/10">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-olive/25 rounded-full flex items-center justify-center shrink-0 ring-2 ring-white/80 shadow-soft">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-olive-dark" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <h2 className="font-heading text-xl sm:text-2xl font-light text-espresso truncate">
                  {displayName}
                </h2>
                <p className="text-sm text-text-muted truncate flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {currentUser?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Profil Bilgileri */}
            <div>
              <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                Profil Bilgileri
              </h3>
              <div className="space-y-0 divide-y divide-stone-dark/10 bg-stone/30 rounded-xl p-4">
                {userProfile?.firstName && (
                  <>
                    <div className="flex justify-between py-2.5 first:pt-0">
                      <span className="text-text-secondary text-sm">Ad</span>
                      <span className="text-espresso font-medium text-sm">{userProfile.firstName}</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-text-secondary text-sm">Soyad</span>
                      <span className="text-espresso font-medium text-sm">{userProfile.lastName}</span>
                    </div>
                  </>
                )}
                {userProfile?.phone && (
                  <div className="flex justify-between py-2.5 items-center">
                    <span className="text-text-secondary text-sm flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      Telefon
                    </span>
                    <span className="text-espresso font-medium text-sm">{userProfile.phone}</span>
                  </div>
                )}
                <div className="flex justify-between py-2.5 items-center">
                  <span className="text-text-secondary text-sm flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    E-posta
                  </span>
                  <span className="text-espresso font-medium text-sm truncate max-w-[180px] sm:max-w-none text-right">
                    {currentUser?.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Şifre Değiştir */}
            <div>
              <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                Güvenlik
              </h3>
              <div className="bg-stone/20 rounded-xl border border-stone-dark/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(!showPasswordForm);
                    setPasswordError('');
                    setPasswordSuccess('');
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-espresso hover:bg-stone/30 transition-colors"
                >
                  <span>Şifre değiştir</span>
                  {showPasswordForm ? (
                    <ChevronUp className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                {showPasswordForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-stone-dark/10"
                  >
                    <form onSubmit={handlePasswordSubmit} className="p-4 space-y-4">
                      {passwordError && (
                        <div className="flex items-start gap-2 p-3 bg-red-50/80 border border-red-200/80 rounded-lg text-sm text-red-700">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{passwordError}</span>
                        </div>
                      )}
                      {passwordSuccess && (
                        <div className="flex items-start gap-2 p-3 bg-olive/10 border border-olive/30 rounded-lg text-sm text-espresso">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-olive-dark" />
                          <span>{passwordSuccess}</span>
                        </div>
                      )}
                      <div>
                        <label htmlFor="currentPassword" className="block text-xs font-medium text-text-secondary mb-1">
                          Mevcut şifre
                        </label>
                        <input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-stone-dark/20 rounded-lg text-espresso text-sm placeholder-text-muted focus:border-olive focus:ring-1 focus:ring-olive/30 outline-none"
                          placeholder="••••••••"
                          disabled={passwordLoading}
                          autoComplete="current-password"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-xs font-medium text-text-secondary mb-1">
                          Yeni şifre
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-stone-dark/20 rounded-lg text-espresso text-sm placeholder-text-muted focus:border-olive focus:ring-1 focus:ring-olive/30 outline-none"
                          placeholder="En az 6 karakter"
                          disabled={passwordLoading}
                          autoComplete="new-password"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-medium text-text-secondary mb-1">
                          Yeni şifre tekrar
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-stone-dark/20 rounded-lg text-espresso text-sm placeholder-text-muted focus:border-olive focus:ring-1 focus:ring-olive/30 outline-none"
                          placeholder="••••••••"
                          disabled={passwordLoading}
                          autoComplete="new-password"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={passwordLoading}
                        className="w-full py-2.5 bg-olive text-white rounded-lg text-sm font-medium hover:bg-olive-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {passwordLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Güncelleniyor...
                          </>
                        ) : (
                          'Şifreyi Güncelle'
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Siparişlerim */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider flex items-center gap-2">
                  <Package className="w-3.5 h-3.5" />
                  Siparişlerim
                </h3>
                {currentUser?.uid && (
                  <button
                    type="button"
                    onClick={() => loadOrders()}
                    disabled={ordersLoading}
                    className="p-1.5 text-text-muted hover:text-olive hover:bg-olive/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Yenile"
                  >
                    <RefreshCw className={`w-4 h-4 ${ordersLoading ? 'animate-spin' : ''}`} />
                  </button>
                )}
              </div>
              {ordersLoading ? (
                <div className="flex items-center gap-2 text-sm text-text-muted py-8 justify-center bg-stone/20 rounded-xl">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Yükleniyor...
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-stone/20 rounded-xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-stone/50 mb-6">
                    <ShoppingBag className="w-7 h-7 text-olive/60" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    Henüz siparişiniz bulunmuyor. Mağaza sayfasından hizmet satın alabilirsiniz.
                  </p>
                  <Link
                    to="/store"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-olive text-white rounded-xl text-sm font-medium hover:bg-olive-dark transition-colors shadow-soft"
                  >
                    Mağazaya git
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order, i) => {
                    const statusInfo = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
                    const orderDate = order.createdAt?.toDate?.()
                      ? order.createdAt.toDate().toLocaleDateString('tr-TR')
                      : '-';
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="p-4 sm:p-5 rounded-xl border border-stone-dark/10 bg-cream/30 hover:bg-cream/50 transition-colors"
                      >
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Package className="w-4 h-4 text-olive-dark shrink-0" />
                            <span className="font-medium text-espresso text-sm truncate">
                              #{order.id.slice(-8).toUpperCase()}
                            </span>
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="text-xs text-text-muted mb-2">{orderDate}</div>
                        <p className="text-sm text-espresso line-clamp-2 mb-2">
                          {order.items?.map((i) => i.title).join(', ')}
                        </p>
                        <div className="text-sm font-medium text-olive-dark">
                          {formatPrice(order.total)}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Çıkış */}
            <div className="pt-4 border-t border-stone-dark/10">
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-muted hover:text-espresso hover:bg-stone/20 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
