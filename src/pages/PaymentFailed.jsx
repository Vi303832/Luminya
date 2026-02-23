import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFailed = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="font-heading text-2xl font-light text-espresso mb-2">Ödeme Tamamlanamadı</h1>
        <p className="text-text-muted mb-8">
          Ödeme işleminiz tamamlanamadı. Lütfen tekrar deneyin veya farklı bir ödeme yöntemi kullanın.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/checkout"
            className="px-6 py-3 bg-olive text-white rounded-lg font-medium hover:bg-olive-dark transition-colors"
          >
            Tekrar Dene
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

export default PaymentFailed;
