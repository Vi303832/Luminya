import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const UyelikSozlesmesi = () => {
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
            ÜYELİK SÖZLEŞMESİ
          </h1>

          <div className="text-sm text-espresso leading-relaxed space-y-6">
            <section>
              <p>
                Kullanıcı, siteye üye olurken verdiği bilgilerin doğru olduğunu taahhüt eder.
              </p>
            </section>

            <section>
              <p>
                Üyelik hesapları kişiseldir, başkasına devredilemez.
              </p>
            </section>

            <section>
              <p>
                Sitenin kötüye kullanımı veya sahte randevu oluşturulması durumunda Satıcı, üyeliği sonlandırma hakkını saklı tutar.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default UyelikSozlesmesi;
