import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MesafeliSatisSozlesmesi = () => {
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
            MESAFELİ SATIŞ SÖZLEŞMESİ
          </h1>

          <div className="text-sm text-espresso leading-relaxed space-y-6">
            <section>
              <h2 className="font-semibold text-espresso mb-2">TARAFLAR</h2>
              <p className="mb-2">
                <strong>SATICI:</strong> Luminya Wellness Center, Nişantaşı Teşvikiye Cad. No:123 Şişli İstanbul, Vergi No: [Vergi No], E-posta: info@ruhunuzu.com
              </p>
              <p>
                <strong>ALICI:</strong> Hizmeti web sitesi üzerinden satın alan kullanıcı.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">KONU</h2>
              <p>
                İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait web sitesi üzerinden elektronik ortamda siparişini verdiği randevu/hizmetin satışı ve teslimi ile ilgili 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümlerince tarafların hak ve yükümlülükleridir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">HİZMET VE ÖDEME</h2>
              <p>
                Satın alınan hizmetin türü (Masaj/Spa), randevu tarihi ve saati ödeme sayfasında belirtildiği gibidir. Toplam bedel, KDV dahil olarak Alıcı tarafından PayTR güvenli ödeme sistemi aracılığıyla ödenir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">TESLİMAT</h2>
              <p>
                Hizmet, randevu tarihinde Satıcı'nın adresinde ifa edilecektir.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MesafeliSatisSozlesmesi;
