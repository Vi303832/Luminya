import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const KvkkAydinlatmaMetni = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-stone/30 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          to="/"
          className="inline-block text-sm text-text-muted hover:text-olive mb-6 transition-colors"
        >
          ← Ana Sayfa
        </Link>

        <article className="bg-white border border-stone-dark/20 p-8 sm:p-10 max-w-[210mm] mx-auto">
          <h1 className="text-xl font-semibold text-espresso mb-8 pb-4 border-b border-stone-dark/20">
            KVKK AYDINLATMA METNİ
          </h1>

          <div className="text-sm text-espresso leading-relaxed space-y-6">
            <section>
              <h2 className="font-semibold text-espresso mb-2">Veri Sorumlusu</h2>
              <p>
                Luminya Wellness Center
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">İşlenen Veriler</h2>
              <p>
                Ad-Soyad, Telefon, E-posta.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">İşleme Amacı</h2>
              <p>
                Randevu kaydı oluşturmak, ödeme takibi yapmak ve gerektiğinde randevu değişikliği için iletişim kurmak.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">Veri Saklama</h2>
              <p>
                Verileriniz, yasal süreler boyunca güvenli sunucularımızda saklanır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">Üçüncü Taraflar</h2>
              <p>
                Verileriniz sadece ödeme işleminin tamamlanması amacıyla PayTR Ödeme Hizmetleri ile paylaşılmaktadır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">Haklarınız</h2>
              <p>
                KVKK'nın 11. maddesi uyarınca verilerinizin silinmesini her zaman info@ruhunuzu.com üzerinden talep edebilirsiniz.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default KvkkAydinlatmaMetni;
