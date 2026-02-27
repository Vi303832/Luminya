import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Shield, ArrowLeft, Loader2, Lock, CreditCard, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../data/massageServices';

const PAYMENT_TIMEOUT_MS = 5 * 60 * 1000; // 5 dakika

const Checkout = () => {
  const { items, total, updateQuantity } = useCart();
  const { currentUser, userProfile } = useAuth();
  const [paytrToken, setPaytrToken] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [legalAccepted, setLegalAccepted] = useState(false);
  const idempotencyKeyRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    idempotencyKeyRef.current = null;
  }, [items, total]);

  // Ödeme ekranında beklerken süre dolunca siparişi iptal et
  useEffect(() => {
    if (!paytrToken || !orderId || !currentUser) return;

    const timeoutId = setTimeout(async () => {
      try {
        const idToken = await currentUser.getIdToken();
        const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
        const res = await fetch(`${baseUrl}/api/cancel-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`
          },
          body: JSON.stringify({ orderId })
        });
        if (res.ok) {
          setPaytrToken(null);
          setOrderId(null);
          idempotencyKeyRef.current = null;
          setError('Ödeme süresi doldu. Sipariş iptal edildi. Yeniden denemek için aşağıdaki butona tıklayın.');
        }
      } catch (err) {
        console.error('Sipariş iptal hatası:', err);
        setError('Sipariş iptal edilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }, PAYMENT_TIMEOUT_MS);

    return () => clearTimeout(timeoutId);
  }, [paytrToken, orderId, currentUser]);

  useEffect(() => {
    if (paytrToken && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://www.paytr.com/js/iframeResizer.min.js';
      script.async = true;
      script.onload = () => {
        if (window.iFrameResize) {
          window.iFrameResize({}, '#paytriframe');
        }
      };
      document.body.appendChild(script);
      return () => {
        const s = document.querySelector('script[src*="iframeResizer"]');
        if (s) s.remove();
      };
    }
  }, [paytrToken]);

  const displayName = userProfile
    ? `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || currentUser?.email
    : currentUser?.email;

  const handleStartPayment = async () => {
    if (!currentUser || items.length === 0) return;
    setError('');
    setLoading(true);
    try {
      const idToken = await currentUser.getIdToken();
      if (!idempotencyKeyRef.current) {
        idempotencyKeyRef.current = crypto.randomUUID?.() || `pay_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      }
      const idempotencyKey = idempotencyKeyRef.current;
      const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
      const res = await fetch(`${baseUrl}/api/paytr-init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
          'Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify({
          items,
          total,
          email: currentUser.email,
          userName: displayName,
          userPhone: userProfile?.phone || ''
        })
      });
      const data = await res.json();
      if (data.token) {
        setPaytrToken(data.token);
        setOrderId(data.orderId || null);
      } else {
        setError(data.error || 'Ödeme başlatılamadı');
      }
    } catch (err) {
      console.error(err);
      setError('Ödeme başlatılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-soft border border-stone-dark/10 p-10 sm:p-14 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-stone/50 mb-6">
              <ShoppingBag className="w-10 h-10 text-olive/70" strokeWidth={1.5} />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-light text-espresso mb-2">
              Sepetiniz boş
            </h2>
            <p className="text-text-muted text-sm sm:text-base mb-8 max-w-sm mx-auto">
              Ödeme yapmak için mağazadan hizmet ekleyin.
            </p>
            <Link
              to="/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-olive text-white rounded-full font-medium text-sm hover:bg-olive-dark transition-colors shadow-soft hover:shadow-elevated"
            >
              Mağazaya git
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/store"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-olive mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Mağazaya dön
            </Link>
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-espresso mb-2">
              Ödeme <span className="italic text-olive-dark">Özeti</span>
            </h1>
            <p className="text-text-muted text-sm sm:text-base">
              Siparişinizi gözden geçirin ve güvenli ödeme ile tamamlayın.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-soft border border-stone-dark/10 overflow-hidden"
        >
          {/* Güvenli ödeme başlığı */}
          <div className="bg-linear-to-r from-olive/15 via-olive/10 to-stone/20 px-6 py-4 flex items-center gap-3 border-b border-stone-dark/10">
            <div className="flex items-center gap-2 text-olive-dark">
              <Shield className="w-5 h-5" />
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-espresso">
              SSL ile şifrelenmiş, güvenli ödeme
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Sipariş Özeti */}
            <div>
              <h2 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5" />
                Sipariş Özeti
              </h2>
              <div className="space-y-0 divide-y divide-stone-dark/10">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 first:pt-0"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-espresso text-sm sm:text-base block truncate">{item.title}</span>
                      <span className="text-text-muted text-xs sm:hidden">{formatPrice(item.price)} / adet</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="flex items-center gap-1 bg-stone/40 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-olive-dark hover:bg-olive/20 hover:text-espresso transition-colors disabled:opacity-40"
                          aria-label="Adet azalt"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-medium text-espresso">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-olive-dark hover:bg-olive/20 hover:text-espresso transition-colors"
                          aria-label="Adet artır"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-medium text-olive-dark min-w-16 text-right">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Müşteri Bilgileri */}
            {currentUser && (
              <div className="pt-4 border-t border-stone-dark/10">
                <h2 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                  Müşteri Bilgileri
                </h2>
                <dl className="space-y-2 text-sm bg-stone/30 rounded-xl p-4">
                  <div className="flex justify-between">
                    <dt className="text-text-secondary">Ad Soyad</dt>
                    <dd className="text-espresso font-medium">{displayName}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-secondary">E-posta</dt>
                    <dd className="text-espresso font-medium truncate max-w-[180px] sm:max-w-none">{currentUser.email}</dd>
                  </div>
                  {userProfile?.phone && (
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Telefon</dt>
                      <dd className="text-espresso font-medium">{userProfile.phone}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Toplam */}
            <div className="pt-4 border-t-2 border-stone-dark/20">
              <div className="flex justify-between items-center">
                <span className="font-medium text-espresso">Toplam</span>
                <span className="text-xl sm:text-2xl font-bold text-olive-dark">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Yasal Onay Checkbox */}
            <div className="pt-4 border-t border-stone-dark/10">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={legalAccepted}
                  onChange={(e) => setLegalAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-stone-dark/30 text-olive focus:ring-olive/30"
                />
                <span className="text-sm text-text-secondary group-hover:text-espresso transition-colors">
                  <Link to="/on-bilgilendirme-formu" className="text-olive hover:underline" target="_blank" rel="noopener noreferrer">Ön Bilgilendirme Formu</Link>,{' '}
                  <Link to="/mesafeli-satis-sozlesmesi" className="text-olive hover:underline" target="_blank" rel="noopener noreferrer">Mesafeli Satış Sözleşmesi</Link> ve{' '}
                  <Link to="/iptal-ve-iade-kosullari" className="text-olive hover:underline" target="_blank" rel="noopener noreferrer">İptal/İade Koşullarını</Link> okudum, onaylıyorum.
                </span>
              </label>
            </div>

            {/* Ödeme Butonu / PayTR Iframe */}
            <div className="pt-4">
              {error && (
                <div className="mb-4 p-4 bg-red-50/80 border border-red-200/80 rounded-xl text-sm text-red-700">
                  {error}
                </div>
              )}
              {paytrToken ? (
                <div className="space-y-4">
                  <iframe
                    id="paytriframe"
                    src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
                    frameBorder="0"
                    scrolling="no"
                    style={{ width: '100%' }}
                    title="PayTR Ödeme"
                    className="rounded-xl overflow-hidden"
                  />
                </div>
              ) : currentUser ? (
                <motion.button
                  onClick={handleStartPayment}
                  disabled={loading || !legalAccepted}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  className="w-full py-4 bg-gradient-primary text-white rounded-xl font-medium hover:shadow-olive transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-soft"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Hazırlanıyor...
                    </>
                  ) : !legalAccepted ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Yasal metinleri onaylayın
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Güvenli Ödemeye Geç
                    </>
                  )}
                </motion.button>
              ) : (
                <div className="bg-olive/10 border border-olive/30 rounded-xl p-5 text-center">
                  <p className="text-sm text-espresso mb-4">
                    Ödeme yapmak için giriş yapmanız gerekiyor.
                  </p>
                  <Link
                    to="/login"
                    state={{ from: '/checkout' }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-olive text-white text-sm font-medium hover:bg-olive-dark transition-colors shadow-soft"
                  >
                    Giriş Yap
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
