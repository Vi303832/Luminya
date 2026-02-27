import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_INFO } from '../config/legalInfo';

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
              <h2 className="font-semibold text-espresso mb-2">MADDE 1 – TARAFLAR VE KONU</h2>
              <p className="mb-2">
                <strong>1.1.</strong> İşbu Üyelik Sözleşmesi, {LEGAL_INFO.companyName} ({LEGAL_INFO.website}) internet sitesi ve mobil uygulaması üzerinden sunulan hizmetlere üye olmak isteyen kullanıcılar ile {LEGAL_INFO.tradeName} arasında kurulur.
              </p>
              <p>
                <strong>1.2.</strong> Sözleşmenin konusu, kullanıcının siteye üye olması, üyelik hesabı üzerinden randevu alması, sipariş vermesi ve siteyi kullanmasına ilişkin hak ve yükümlülüklerin düzenlenmesidir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 2 – KAVRAMLAR</h2>
              <p className="mb-2">
                <strong>Site:</strong> {LEGAL_INFO.website} internet sitesi ve ilgili alt sayfaları.
              </p>
              <p className="mb-2">
                <strong>Üye:</strong> Siteye kayıt olarak kullanıcı hesabı oluşturan ve işbu sözleşmeyi kabul eden gerçek veya tüzel kişi.
              </p>
              <p>
                <strong>Hizmet:</strong> Site üzerinden sunulan spa, masaj, wellness randevu ve ilgili hizmetler.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 3 – ÜYELİK KOŞULLARI</h2>
              <p className="mb-2">
                <strong>3.1.</strong> Üyelik, 18 yaşını doldurmuş ve temyiz kudretine sahip gerçek kişiler ile yasal temsilcileri tarafından oluşturulmuş tüzel kişiler için geçerlidir.
              </p>
              <p className="mb-2">
                <strong>3.2.</strong> Üye, kayıt sırasında verdiği ad, soyad, e-posta, telefon, adres ve benzeri bilgilerin doğru, güncel ve eksiksiz olduğunu taahhüt eder. Yanlış veya eksik bilgi nedeniyle doğacak zararlardan Üye sorumludur.
              </p>
              <p>
                <strong>3.3.</strong> Üyelik ücretsizdir. Üye, siteyi kullanırken işbu sözleşme hükümlerine uymayı kabul eder.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 4 – ÜYE HESABININ KULLANIMI</h2>
              <p className="mb-2">
                <strong>4.1.</strong> Üye hesabı ve şifre kişiseldir; başkalarına devredilemez, kiralanamaz veya paylaşılamaz.
              </p>
              <p className="mb-2">
                <strong>4.2.</strong> Üye, hesap bilgilerinin gizliliğinden ve güvenliğinden sorumludur. Hesabın yetkisiz kullanımından doğacak zararlardan Üye sorumludur.
              </p>
              <p>
                <strong>4.3.</strong> Üye, hesabının kendi kusuru dışında başkaları tarafından kullanıldığını fark ettiğinde derhal {LEGAL_INFO.email} adresine bildirimde bulunmalıdır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 5 – YASAK DAVRANIŞLAR</h2>
              <p className="mb-2">
                Üye aşağıdaki davranışlarda bulunamaz:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Sahte, yanıltıcı veya başkasına ait bilgilerle kayıt olmak</li>
                <li>Sahte, iptal veya iade amacıyla kötüye kullanımı hedeflenen randevu oluşturmak</li>
                <li>Siteyi, sistemleri veya diğer kullanıcıları zarara uğratacak şekilde kullanmak</li>
                <li>Yasalara, genel ahlaka veya kamu düzenine aykırı içerik paylaşmak</li>
                <li>Üçüncü kişilerin fikri mülkiyet haklarını ihlal etmek</li>
                <li>Siteyi otomatik araçlar, bot veya benzeri yöntemlerle kötüye kullanmak</li>
              </ul>
              <p className="mt-2">
                Bu tür davranışların tespiti halinde Satıcı, üyeliği askıya alma veya sonlandırma hakkını saklı tutar.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 6 – SİTE SAHİBİNİN HAKLARI</h2>
              <p>
                İşbu sözleşmenin ihlali, yasak davranışlarda bulunulması veya mevzuata aykırılık tespit edilmesi halinde Satıcı, önceden bildirimde bulunmaksızın üyeliği askıya alabilir veya sonlandırabilir. Üye, bu durumda herhangi bir tazminat talep edemez.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 7 – SÖZLEŞME DEĞİŞİKLİĞİ</h2>
              <p>
                Satıcı, işbu sözleşmeyi tek taraflı olarak değiştirme hakkını saklı tutar. Değişiklikler, site üzerinde yayınlandığı andan itibaren geçerli olur. Üyeler aleyhine önemli değişikliklerde, mümkünse elektronik posta veya site bildirimi ile bilgilendirme yapılır. Değişiklikleri kabul etmeyen üye, üyeliğini sonlandırabilir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 8 – GİZLİLİK VE KİŞİSEL VERİLER</h2>
              <p>
                Üye bilgilerinin işlenmesi, 6698 sayılı Kişisel Verilerin Korunması Kanunu ve KVKK Aydınlatma Metni kapsamında gerçekleştirilir. Üye, kayıt sırasında bu metni okuduğunu ve kabul ettiğini beyan eder.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 9 – UYUŞMAZLIKLARIN ÇÖZÜMÜ</h2>
              <p>
                İşbu sözleşmeden doğan uyuşmazlıklarda {LEGAL_INFO.competentCourt} münhasıran yetkilidir. Uygulanacak hukuk Türkiye Cumhuriyeti kanunlarıdır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 10 – YÜRÜRLÜK</h2>
              <p>
                İşbu sözleşme, üye kayıt işlemini tamamladığında kabul edilmiş sayılır ve yürürlüğe girer. Üye, Mesafeli Satış Sözleşmesi ve İptal/İade Koşulları'nı da site üzerinden sipariş verirken kabul etmiş sayılır.
              </p>
            </section>

            <section className="pt-4 border-t border-stone-dark/20">
              <p className="text-xs text-text-muted">
                Son güncelleme: Bu metin, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi Hakkında Kanun kapsamında hazırlanmıştır.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default UyelikSozlesmesi;
