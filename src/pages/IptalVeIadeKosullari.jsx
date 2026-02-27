import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_INFO } from '../config/legalInfo';

const IptalVeIadeKosullari = () => {
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
            İPTAL VE İADE KOŞULLARI
          </h1>

          <div className="text-sm text-espresso leading-relaxed space-y-6">
            <section>
              <h2 className="font-semibold text-espresso mb-2">1. GENEL HÜKÜMLER</h2>
              <p>
                İşbu İptal ve İade Koşulları, {LEGAL_INFO.companyName} ({LEGAL_INFO.website}) üzerinden satın alınan spa, masaj ve wellness hizmetlerine (randevu bazlı) ilişkin iptal ve iade işlemlerini düzenler. 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri saklı kalmak kaydıyla, aşağıdaki koşullar uygulanır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">2. İPTAL TALEBİ</h2>
              <p>
                Müşteri, randevusunu iptal etmek istediğinde {LEGAL_INFO.email} e-posta adresine veya site üzerindeki ilgili kanallardan yazılı olarak başvuruda bulunmalıdır. İptal talebinin geçerliliği, talebin Satıcı'ya ulaştığı tarih ve saate göre belirlenir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">3. TAM İADE</h2>
              <p>
                Randevu saatine en geç <strong>{LEGAL_INFO.fullRefundHours} saat</strong> kala yapılan iptallerde, hizmet bedelinin tamamı Alıcı'ya iade edilir. İade, ödemenin yapıldığı kredi kartına/banka kartına yansıtılır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">4. KISMI İADE</h2>
              <p>
                Randevu saatine <strong>{LEGAL_INFO.partialRefundHoursMin} ile {LEGAL_INFO.partialRefundHoursMax} saat</strong> arasında kala yapılan iptallerde, hizmet bedelinin <strong>%{LEGAL_INFO.partialRefundPercent}</strong>'si Alıcı'ya iade edilir. Kalan tutar, randevu hazırlık maliyetleri ve iptal nedeniyle oluşan idari giderler karşılığı olarak Satıcı'da kalır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">5. İADESİZ DURUMLAR</h2>
              <p className="mb-2">
                Aşağıdaki hallerde herhangi bir ücret iadesi yapılmaz:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Randevu saatine <strong>{LEGAL_INFO.noRefundHours} saatten az</strong> süre kala yapılan iptaller</li>
                <li>Müşterinin randevuya gelmemesi (no-show) durumu</li>
                <li>Müşterinin randevu saatine önemli ölçüde geç kalması ve hizmetin ifa edilememesi</li>
                <li>Müşterinin hizmete başlandıktan sonra yarıda bırakması (hizmet ifasına başlanmış sayılır)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">6. İADE SÜRECİ</h2>
              <p>
                Onaylanan iadeler, banka ve ödeme kuruluşu süreçlerine bağlı olarak <strong>{LEGAL_INFO.refundProcessingDays} iş günü</strong> içinde Alıcı'nın ödeme yaptığı kredi kartına/banka kartına yansıtılır. İade, kart çıkaran bankanın işlem sürelerine bağlı olarak ek süre alabilir. İade tutarı, ödeme sırasında uygulanan KDV oranı düşülerek hesaplanır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">7. SATICI KAYNAKLI İPTAL</h2>
              <p>
                Randevunun Satıcı tarafından iptal edilmesi (mücbir sebep, personel yokluğu, tesis arızası vb.) halinde, Alıcı'ya ödenen bedelin tamamı, aynı süre içinde iade edilir. Alıcı, alternatif tarih/saat teklifi kabul etmekte serbesttir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">8. RANDEVU ERTELEME / DEĞİŞİKLİK</h2>
              <p>
                Randevu tarih veya saatinin değiştirilmesi talepleri, tam iade süresi içinde (randevudan {LEGAL_INFO.fullRefundHours} saat öncesine kadar) ücretsiz olarak yapılabilir. Bu süre dışındaki değişiklik talepleri, Satıcı'nın uygunluğuna bağlıdır ve ek ücret uygulanabilir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">9. ŞİKAYET VE İTİRAZ</h2>
              <p>
                Alıcı, iptal ve iade işlemlerine ilişkin şikayetlerini {LEGAL_INFO.email} adresine iletebilir. Ayrıca 6502 sayılı Kanun kapsamında Tüketici Hakem Heyetlerine veya Tüketici Mahkemelerine başvuru hakkı saklıdır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">10. YÜRÜRLÜK</h2>
              <p>
                İşbu koşullar, site üzerinden sipariş verildiği anda kabul edilmiş sayılır. Mesafeli Satış Sözleşmesi ile birlikte okunmalıdır.
              </p>
            </section>

            <section className="pt-4 border-t border-stone-dark/20">
              <p className="text-xs text-text-muted">
                Son güncelleme: Bu metin, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili mevzuata uygun olarak hazırlanmıştır.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default IptalVeIadeKosullari;
