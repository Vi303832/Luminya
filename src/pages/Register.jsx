import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, User, Phone, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, phone, email, password } = formData;

    if (!firstName || !lastName || !phone || !email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    if (!kvkkAccepted) {
      setError('KVKK Aydınlatma Metni\'ni okuduğunuzu ve kabul ettiğinizi onaylamanız gerekmektedir');
      return;
    }

    const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setError('Geçerli bir telefon numarası girin');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await register({
        firstName,
        lastName,
        phone: cleanPhone,
        email,
        password
      });
      navigate('/login');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Bu e-posta adresi zaten kayıtlı');
      } else if (err.code === 'auth/invalid-email') {
        setError('Geçersiz e-posta adresi');
      } else if (err.code === 'auth/weak-password') {
        setError('Şifre en az 6 karakter olmalıdır');
      } else {
        setError('Kayıt sırasında bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-olive/15 rounded-full mb-4">
            <User className="w-7 h-7 text-olive-dark" />
          </div>
          <h1 className="font-heading text-2xl font-light text-espresso mb-1">Hesap Oluşturun</h1>
          <p className="text-sm text-text-muted">Ad, soyad, telefon ve e-posta ile kayıt olun</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-soft border border-stone-dark/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-olive/10 border border-olive/30 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-olive-dark shrink-0 mt-0.5" />
                <p className="text-sm text-espresso">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-text-secondary mb-1">
                  Ad
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 bg-cream/50 border border-stone-dark/20 rounded-lg text-espresso placeholder-text-muted focus:border-olive focus:ring-1 focus:ring-olive/30 outline-none text-sm transition-colors"
                    placeholder="Adınız"
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-medium text-text-secondary mb-1">
                  Soyad
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 bg-cream/50 border border-stone-dark/20 rounded-lg text-espresso placeholder-text-muted focus:border-olive focus:ring-1 focus:ring-olive/30 outline-none text-sm transition-colors"
                    placeholder="Soyadınız"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-text-secondary mb-1">
                Telefon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 bg-cream/50 border border-stone-dark/20 rounded-lg text-espresso placeholder-text-muted focus:border-olive focus:ring-1 focus:ring-olive/30 outline-none text-sm transition-colors"
                  placeholder="05XX XXX XX XX"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-text-secondary mb-1">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 bg-cream/50 border border-stone-dark/20 rounded-lg text-espresso placeholder-text-muted focus:border-olive focus:ring-1 focus:ring-olive/30 outline-none text-sm transition-colors"
                  placeholder="ornek@email.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={kvkkAccepted}
                  onChange={(e) => setKvkkAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-stone-dark/30 text-olive focus:ring-olive/30"
                />
                <span className="text-sm text-text-secondary group-hover:text-espresso transition-colors">
                  <Link to="/kvkk-aydinlatma-metni" target="_blank" rel="noopener noreferrer" className="text-olive hover:underline">
                    KVKK Aydınlatma Metni
                  </Link>
                  'ni okudum, kabul ediyorum.
                </span>
              </label>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-text-secondary mb-1">
                Şifre (min. 6 karakter)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
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
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-text-muted">
          Zaten hesabınız var mı?{' '}
          <Link to="/login" className="text-olive-dark font-medium hover:text-olive underline">
            Giriş yapın
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

export default Register;
