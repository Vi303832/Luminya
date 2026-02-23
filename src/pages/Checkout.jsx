import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../data/massageServices';
import { createOrder } from '../lib/orders';

const Checkout = () => {
  const { items, total } = useCart();
  const { currentUser, userProfile } = useAuth();
  const [paytrToken, setPaytrToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      const order = await createOrder({
        userId: currentUser.uid,
        items,
        total
      });
      const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
      const res = await fetch(`${baseUrl}/api/paytr-init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
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
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-olive/50 mx-auto mb-4" />
          <h2 className="font-heading text-2xl text-espresso mb-2">Sepetiniz boş</h2>
          <p className="text-text-muted mb-6">Ödeme yapmak için ürün ekleyin.</p>
          <Link to="/store" className="text-olive-dark font-medium hover:text-olive underline">
            Mağazaya git →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 max-w-3xl py-24">
        <Link
          to="/store"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-olive mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Mağazaya dön
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-soft border border-stone-dark/10 overflow-hidden"
        >
          <div className="bg-olive/10 px-6 py-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-olive-dark" />
            <h1 className="font-heading text-xl font-light text-espresso">
              Güvenli Ödeme Özeti
            </h1>
          </div>

          <div className="p-6 space-y-6">
            {/* Sipariş Özeti */}
            <div>
              <h2 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                Sipariş Özeti
              </h2>
              <dl className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b border-stone-dark/10 last:border-0"
                  >
                    <dt className="text-espresso">
                      {item.title} <span className="text-text-muted">× {item.quantity}</span>
                    </dt>
                    <dd className="font-medium text-olive-dark">{formatPrice(item.price * item.quantity)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Müşteri Bilgileri */}
            {currentUser && (
              <div>
                <h2 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                  Müşteri Bilgileri
                </h2>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-text-secondary">Ad Soyad</dt>
                    <dd className="text-espresso font-medium">{displayName}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-secondary">E-posta</dt>
                    <dd className="text-espresso font-medium">{currentUser.email}</dd>
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
                <span className="text-xl font-bold text-olive-dark">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Ödeme Butonu / PayTR Iframe */}
            <div className="pt-4">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
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
                  />
                </div>
              ) : currentUser ? (
                <button
                  onClick={handleStartPayment}
                  disabled={loading}
                  className="w-full py-4 bg-olive text-white rounded-lg font-medium hover:bg-olive-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Hazırlanıyor...
                    </>
                  ) : (
                    'Güvenli Ödemeye Geç'
                  )}
                </button>
              ) : (
                <div className="bg-olive/10 border border-olive/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-espresso mb-3">
                    Ödeme yapmak için giriş yapmanız gerekiyor.
                  </p>
                  <Link
                    to="/login"
                    state={{ from: '/checkout' }}
                    className="inline-block px-6 py-2 rounded-lg bg-olive text-white text-sm font-medium hover:bg-olive-dark transition-colors"
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
