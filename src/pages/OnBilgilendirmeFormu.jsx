import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const OnBilgilendirmeFormu = () => {
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
            ÖN BİLGİLENDİRME FORMU
          </h1>

          <div className="text-sm text-espresso leading-relaxed space-y-6">
            <section>
              <h2 className="font-semibold text-espresso mb-2">Satıcı Bilgileri</h2>
              <p>
                Luminya Wellness Center<br />
                Adres: Nişantaşı, Teşvikiye Cad. No:123, Şişli, İstanbul<br />
                Telefon: +90 212 123 45 67<br />
                E-posta: info@ruhunuzu.com
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">Hizmet Özellikleri</h2>
              <p>
                Alıcı tarafından seçilen masaj/spa hizmeti ve seçilen randevu saati.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">Geçerlilik</h2>
              <p>
                İşbu formda yer alan bilgiler randevu saati gerçekleşene kadar geçerlidir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">Şikayet</h2>
              <p>
                Alıcı, hizmete ilişkin şikayetlerini info@ruhunuzu.com adresine iletebilir.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OnBilgilendirmeFormu;
