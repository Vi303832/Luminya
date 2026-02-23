import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut } from 'lucide-react';

const Profile = () => {
  const { currentUser, userProfile, logout } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayName = userProfile
    ? `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || currentUser?.email
    : currentUser?.email;

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 max-w-2xl py-24">
        <div className="bg-white rounded-2xl shadow-soft border border-stone-dark/10 overflow-hidden">
          <div className="bg-olive/10 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-olive/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-olive-dark" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-light text-espresso">{displayName}</h1>
                <p className="text-sm text-text-muted">{currentUser?.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">Profil Bilgileri</h2>
              <dl className="space-y-2 text-sm">
                {userProfile?.firstName && (
                  <>
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Ad</dt>
                      <dd className="text-espresso font-medium">{userProfile.firstName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Soyad</dt>
                      <dd className="text-espresso font-medium">{userProfile.lastName}</dd>
                    </div>
                  </>
                )}
                {userProfile?.phone && (
                  <div className="flex justify-between">
                    <dt className="text-text-secondary">Telefon</dt>
                    <dd className="text-espresso font-medium">{userProfile.phone}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-text-secondary">E-posta</dt>
                  <dd className="text-espresso font-medium">{currentUser?.email}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">Siparişlerim</h2>
              <p className="text-sm text-text-secondary">
                Henüz siparişiniz bulunmuyor. Mağaza sayfasından hizmet satın alabilirsiniz.
              </p>
              <Link
                to="/store"
                className="inline-block mt-3 text-olive-dark font-medium hover:text-olive text-sm"
              >
                Mağazaya git →
              </Link>
            </div>

            <div className="pt-4 border-t border-stone-dark/10">
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-espresso transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-text-muted hover:text-olive transition-colors">
            ← Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
