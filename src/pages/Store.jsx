import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User } from 'lucide-react';
import { MASSAGE_SERVICES, formatPrice, ICON_MAP } from '../data/massageServices';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDb } from '../utils/firebaseLazy';

const Store = () => {
  const navigate = useNavigate();
  const { addItem, itemCount } = useCart();
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = await getDb();
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('active', '==', true));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          icon: ICON_MAP[doc.data().icon] || ICON_MAP.Sparkles
        }));
        productsData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setProducts(productsData);
      } catch (err) {
        console.error('Ürünler yüklenemedi, varsayılan liste kullanılıyor:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const services = products.length > 0 ? products : MASSAGE_SERVICES;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Ana Sayfa', url: 'https://luminya.com/' },
    { name: 'Mağaza', url: 'https://luminya.com/store' }
  ]);

  const handleBuyNow = (service) => {
    addItem(service);
    navigate('/checkout');
  };

  const handleAddToCart = (service) => {
    addItem(service);
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Mağaza | Luminya Wellness - Masaj Hizmetleri"
        description="Masaj ve wellness hizmetlerimizi online satın alın. Türk hamamı, aromaterapi, Thai masaj, Hot Stone ve daha fazlası."
        canonical="/store"
        structuredData={{ '@context': 'https://schema.org', '@graph': [breadcrumbSchema] }}
      />

      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-light text-espresso mb-2">
                Masaj Hizmetleri <span className="italic text-olive-dark">Mağaza</span>
              </h1>
              <p className="text-text-muted">Hizmetlerimizi online satın alın, güvenli ödeme ile tamamlayın.</p>
            </div>
            <div className="flex items-center gap-3">
              {!currentUser && (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-olive-dark hover:text-olive transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Giriş Yap</span>
                </Link>
              )}
              <Link
                to="/checkout"
                className="flex items-center gap-2 px-4 py-2.5 bg-olive text-white rounded-lg text-sm font-medium hover:bg-olive-dark transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Sepet ({itemCount})</span>
              </Link>
            </div>
          </motion.div>

          {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-olive border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group relative bg-white rounded-2xl p-6 overflow-hidden border border-stone-dark/10 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-olive/5 via-olive/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative w-14 h-14 bg-olive/15 rounded-full flex items-center justify-center mb-4 group-hover:bg-olive/25 transition-colors">
                  <service.icon className="w-7 h-7 text-olive-dark" />
                </div>

                <h3 className="relative font-heading text-xl font-semibold text-espresso mb-2">
                  {service.title}
                </h3>

                <p className="relative text-espresso/70 text-sm mb-4 leading-relaxed font-light">
                  {service.description}
                </p>

                <div className="relative space-y-2 mb-4">
                  {(service.features || []).slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-espresso/60">
                      <div className="w-5 h-5 bg-olive/25 rounded-full flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 bg-olive-dark rounded-full" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="relative pt-4 border-t border-stone-dark/10">
                  <div className="text-xs text-espresso/60 mb-3 font-light">{service.duration}</div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-olive-dark font-bold text-lg">{formatPrice(service.price)}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(service)}
                        className="px-3 py-2 rounded-lg border border-olive/30 text-olive text-sm font-medium hover:bg-olive/10 transition-colors"
                      >
                        Sepete Ekle
                      </button>
                      <button
                        onClick={() => handleBuyNow(service)}
                        className="px-3 py-2 rounded-lg bg-olive text-white text-sm font-medium hover:bg-olive-dark transition-colors"
                      >
                        Hemen Al
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        </div>
      </section>
    </div>
  );
};

export default Store;
