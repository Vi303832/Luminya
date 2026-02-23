import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const PaymentSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="font-heading text-2xl font-light text-espresso mb-2">Ödeme Başarılı</h1>
        <p className="text-text-muted mb-8">
          Ödemeniz alındı. Siparişinizi profil sayfasından takip edebilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/profile"
            className="px-6 py-3 bg-olive text-white rounded-lg font-medium hover:bg-olive-dark transition-colors"
          >
            Siparişlerim
          </Link>
          <Link
            to="/store"
            className="px-6 py-3 border border-olive/30 text-olive rounded-lg font-medium hover:bg-olive/10 transition-colors"
          >
            Mağazaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
