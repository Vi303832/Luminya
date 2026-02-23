import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Package, Loader2 } from 'lucide-react';
import { getOrdersByUserId } from '../lib/orders';
import { formatPrice } from '../data/massageServices';

const STATUS_LABELS = {
  pending: { label: 'Beklemede', color: 'bg-amber-100 text-amber-800' },
  paid: { label: 'Ödendi', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'İptal', color: 'bg-gray-100 text-gray-600' },
  failed: { label: 'İptal', color: 'bg-red-100 text-red-800' }
};

const Profile = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!currentUser?.uid) return;
    const load = async () => {
      try {
        const list = await getOrdersByUserId(currentUser.uid);
        setOrders(list);
      } catch (err) {
        console.error(err);
      } finally {
        setOrdersLoading(false);
      }
    };
    load();
  }, [currentUser?.uid]);

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
              {ordersLoading ? (
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Yükleniyor...
                </div>
              ) : orders.length === 0 ? (
                <>
                  <p className="text-sm text-text-secondary">
                    Henüz siparişiniz bulunmuyor. Mağaza sayfasından hizmet satın alabilirsiniz.
                  </p>
                  <Link
                    to="/store"
                    className="inline-block mt-3 text-olive-dark font-medium hover:text-olive text-sm"
                  >
                    Mağazaya git →
                  </Link>
                </>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => {
                    const statusInfo = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
                    const orderDate = order.createdAt?.toDate?.()
                      ? order.createdAt.toDate().toLocaleDateString('tr-TR')
                      : '-';
                    return (
                      <div
                        key={order.id}
                        className="p-4 rounded-lg border border-stone-dark/10 bg-cream/30"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-olive-dark" />
                            <span className="font-medium text-espresso text-sm">
                              #{order.id.slice(-8).toUpperCase()}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="text-xs text-text-muted mb-1">{orderDate}</div>
                        <div className="text-sm text-espresso">
                          {order.items?.map((i) => i.title).join(', ')}
                        </div>
                        <div className="text-sm font-medium text-olive-dark mt-1">
                          {formatPrice(order.total)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
