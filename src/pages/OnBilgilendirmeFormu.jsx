import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_INFO } from '../config/legalInfo';

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
              <h2 className="font-semibold text-espresso mb-2">1. SATICI BİLGİLERİ</h2>
              <p>
                {LEGAL_INFO.tradeName}<br />
                Adres: {LEGAL_INFO.address}<br />
                Telefon: {LEGAL_INFO.phone}<br />
                E-posta: {LEGAL_INFO.email}<br />
                Web: {LEGAL_INFO.website}
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">2. HİZMETİN TEMEL NİTELİKLERİ</h2>
              <p>
                Sipariş konusu hizmet, Alıcı tarafından seçilen spa, masaj veya wellness hizmetidir. Hizmetin türü, süresi, birim fiyatı, toplam bedeli (KDV dahil), randevu tarihi ve saati, hizmetin ifa edileceği şube adresi ödeme sayfasında ve sipariş özetinde açıkça gösterilir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">3. ÖDEME BİLGİLERİ</h2>
              <p>
                Toplam bedel, güvenli ödeme altyapısı aracılığıyla kredi kartı veya banka kartı ile tahsil edilir. Fiyatlar Türk Lirası (₺) cinsindendir ve KDV dahildir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">4. HİZMETİN İFASI</h2>
              <p>
                Hizmet, Alıcı'nın seçtiği randevu tarihi ve saatinde, Satıcı'nın belirttiği şube adresinde ifa edilecektir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">5. İPTAL VE CAYMA HAKKI</h2>
              <p>
                İptal ve iade koşulları, ayrıca yayımlanan İptal ve İade Koşulları metninde detaylı olarak belirtilmiştir. Randevudan {LEGAL_INFO.fullRefundHours} saat öncesine kadar yapılan iptallerde tam iade, {LEGAL_INFO.partialRefundHoursMin}-{LEGAL_INFO.partialRefundHoursMax} saat arası iptallerde kısmi iade uygulanır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">6. GİZLİLİK VE VERİ KORUMA</h2>
              <p>
                Kişisel verilerin işlenmesine ilişkin ayrıntılı bilgi KVKK Aydınlatma Metni'nde yer almaktadır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">7. ŞİKAYET</h2>
              <p>
                Alıcı, hizmete ilişkin şikayetlerini {LEGAL_INFO.email} adresine iletebilir. Ayrıca Tüketici Şikayet Hattı (Alo 175) veya Tüketici Hakem Heyetlerine başvuru hakkı saklıdır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">8. GEÇERLİLİK</h2>
              <p>
                İşbu ön bilgilendirme formunda yer alan bilgiler, Mesafeli Satış Sözleşmesi'nin ayrılmaz parçasıdır ve sipariş onayı ile birlikte sözleşme kurulana kadar geçerlidir.
              </p>
            </section>

            <section className="pt-4 border-t border-stone-dark/20">
              <p className="text-xs text-text-muted">
                6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca hazırlanmıştır.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OnBilgilendirmeFormu;
