import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError('E-posta veya şifre hatalı');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.');
      } else {
        setError('Giriş yapılırken bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-olive/15 rounded-full mb-4">
            <Lock className="w-7 h-7 text-olive-dark" />
          </div>
          <h1 className="font-heading text-2xl font-light text-espresso mb-1">Hesabınıza Giriş Yapın</h1>
          <p className="text-sm text-text-muted">Siparişlerinizi takip edin</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-soft border border-stone-dark/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-olive/10 border border-olive/30 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-olive-dark shrink-0 mt-0.5" />
                <p className="text-sm text-espresso">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-text-secondary mb-1">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-cream/50 border border-stone-dark/20 rounded-lg text-espresso placeholder-text-muted focus:border-olive focus:ring-1 focus:ring-olive/30 outline-none text-sm transition-colors"
                  placeholder="ornek@email.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-text-secondary mb-1">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-cream/50 border border-stone-dark/20 rounded-lg text-espresso placeholder-text-muted focus:border-olive focus:ring-1 focus:ring-olive/30 outline-none text-sm transition-colors"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-olive text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-olive-dark focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-text-muted">
          Hesabınız yok mu?{' '}
          <Link to="/register" className="text-olive-dark font-medium hover:text-olive underline">
            Kayıt olun
          </Link>
        </p>

        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-text-muted hover:text-olive transition-colors">
            ← Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
