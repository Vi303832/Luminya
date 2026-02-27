import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_INFO } from '../config/legalInfo';

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
              <h2 className="font-semibold text-espresso mb-2">1. VERİ SORUMLUSU</h2>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla {LEGAL_INFO.tradeName} tarafından aşağıda açıklanan kapsamda işlenmektedir.
              </p>
              <p className="mt-2">
                Adres: {LEGAL_INFO.address}<br />
                E-posta: {LEGAL_INFO.email}
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">2. İŞLENEN KİŞİSEL VERİLER</h2>
              <p className="mb-2">
                Aşağıdaki kişisel verileriniz işlenmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Kimlik verileri:</strong> Ad, soyad</li>
                <li><strong>İletişim verileri:</strong> E-posta adresi, telefon numarası</li>
                <li><strong>Adres verileri:</strong> Teslimat/fatura adresi (faturalama gerektiğinde)</li>
                <li><strong>Müşteri işlem verileri:</strong> Sipariş bilgileri, randevu detayları, hizmet tercihleri</li>
                <li><strong>Finansal veriler:</strong> Ödeme işlemi sırasında ödeme kuruluşu (PayTR vb.) ile paylaşılan kart bilgileri – bu veriler doğrudan ödeme kuruluşunda işlenir, veri sorumlusu tarafından saklanmaz</li>
                <li><strong>İşlem güvenliği verileri:</strong> IP adresi, oturum bilgileri, çerez verileri (site kullanımı için)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">3. İŞLEME AMAÇLARI</h2>
              <p>
                Kişisel verileriniz; sözleşmenin kurulması ve ifası, randevu oluşturma ve yönetimi, ödeme işlemlerinin gerçekleştirilmesi, faturalandırma, müşteri hizmetleri, yasal yükümlülüklerin yerine getirilmesi, iletişim faaliyetleri ve (açık rıza ile) pazarlama faaliyetleri amacıyla işlenmektedir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">4. İŞLEME HUKUKİ SEBEPLERİ</h2>
              <p>
                Verileriniz; KVKK m. 5/2 uyarınca sözleşmenin kurulması veya ifası için zorunluluk, hukuki yükümlülük, meşru menfaat ve açık rıza (pazarlama için) gibi hukuki sebeplere dayanılarak işlenmektedir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">5. VERİ SAKLAMA SÜRESİ</h2>
              <p>
                Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal saklama süreleri (ticari defterler, vergi mevzuatı vb.) dikkate alınarak güvenli sunucularda saklanır. Amaç ortadan kalktığında veya yasal süreler dolduğunda veriler silinir veya anonim hale getirilir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">6. VERİ PAYLAŞIMI</h2>
              <p>
                Verileriniz; ödeme işlemlerinin tamamlanması amacıyla ödeme hizmeti sağlayıcıları (PayTR vb.), yasal zorunluluk halinde yetkili kamu kurumları ve hukuki danışmanlık hizmeti verenler ile KVKK'da öngörülen sınırlar içinde paylaşılabilir. Veriler yurt dışına aktarılmamaktadır (aktarım yapılacaksa ayrıca bilgilendirme yapılır).
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">7. HAKLARINIZ (KVKK m. 11)</h2>
              <p>
                İlgili kişi olarak; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK m. 7'deki şartlar çerçevesinde silinmesini veya yok edilmesini talep etme, otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme haklarına sahipsiniz.
              </p>
              <p className="mt-2">
                Bu haklarınızı kullanmak için {LEGAL_INFO.email} adresine yazılı başvuruda bulunabilir veya KEP adresi üzerinden iletebilirsiniz. Başvurularınız en geç 30 gün içinde sonuçlandırılacaktır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">8. ŞİKAYET HAKKI</h2>
              <p>
                KVKK kapsamındaki taleplerinize verilen cevaptan memnun kalmazsanız, Kişisel Verileri Koruma Kurulu'na (www.kvkk.gov.tr) şikayette bulunabilirsiniz.
              </p>
            </section>

            <section className="pt-4 border-t border-stone-dark/20">
              <p className="text-xs text-text-muted">
                6698 sayılı Kişisel Verilerin Korunması Kanunu ve ilgili mevzuat uyarınca hazırlanmıştır.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default KvkkAydinlatmaMetni;
