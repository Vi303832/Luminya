import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_INFO } from '../config/legalInfo';

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
              <h2 className="font-semibold text-espresso mb-2">MADDE 1 – TARAFLAR</h2>
              <p className="mb-2">
                <strong>1.1. SATICI / HİZMET SAĞLAYICI:</strong>
              </p>
              <p className="mb-2 pl-4">
                {LEGAL_INFO.tradeName}<br />
                Adres: {LEGAL_INFO.address}<br />
                MERSİS No: {LEGAL_INFO.mersisNo}<br />
                Vergi No: {LEGAL_INFO.taxNo}<br />
                Vergi Dairesi: {LEGAL_INFO.taxOffice}<br />
                Telefon: {LEGAL_INFO.phone}<br />
                E-posta: {LEGAL_INFO.email}<br />
                {LEGAL_INFO.kepAddress && `KEP: ${LEGAL_INFO.kepAddress}`}
              </p>
              <p className="mb-2">
                <strong>1.2. ALICI / TÜKETİCİ:</strong>
              </p>
              <p className="pl-4">
                İşbu sözleşmeye konu hizmeti {LEGAL_INFO.website} internet sitesi üzerinden satın alan ve sipariş sırasında beyan ettiği bilgileri veren gerçek veya tüzel kişi.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 2 – KONU</h2>
              <p>
                İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait {LEGAL_INFO.website} internet sitesi üzerinden elektronik ortamda siparişini verdiği spa, masaj ve wellness hizmetlerinin (randevu bazlı) satışı ve ifası ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve 27 Kasım 2014 tarihli, 29188 sayılı Resmî Gazete'de yayımlanan Mesafeli Sözleşmeler Yönetmeliği hükümlerince tarafların hak ve yükümlülüklerinin düzenlenmesidir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 3 – SÖZLEŞME KONUSU HİZMETİN TEMEL NİTELİKLERİ</h2>
              <p className="mb-2">
                Sözleşmeye konu hizmetin türü, süresi, birim fiyatı, toplam bedeli, randevu tarihi ve saati, hizmetin ifa edileceği şube adresi, ödeme sayfasında ve sipariş özetinde Alıcı'ya açıkça gösterilir. Alıcı, siparişi onaylamadan önce bu bilgileri inceleme ve değiştirme imkânına sahiptir.
              </p>
              <p>
                Hizmetler arasında Türk Hamamı, Aromaterapi, Hot Stone Masaj, Spa & Cilt Bakımı, Thai Masaj, Ayurvedik Terapi, İsveç Masajı, Refleksoloji ve benzeri wellness hizmetleri yer alabilir. Her hizmetin özellikleri, süresi ve fiyatı site üzerinde belirtilir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 4 – ÖDEME</h2>
              <p>
                Toplam bedel, KDV dahil olarak Alıcı tarafından sipariş sırasında, güvenli ödeme altyapısı (PayTR veya benzeri) aracılığıyla kredi kartı veya banka kartı ile tahsil edilir. Ödeme, siparişin onaylanması ile birlikte alınır. Fiyatlar Türk Lirası (₺) cinsindendir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 5 – HİZMETİN İFASI VE TESLİMAT</h2>
              <p>
                Hizmet, Alıcı'nın sipariş sırasında seçtiği randevu tarihi ve saatinde, Satıcı'nın belirttiği şube adresinde ifa edilecektir. Alıcı, randevu saatine uygun şekilde hizmet yerinde hazır bulunmakla yükümlüdür. Randevuya geç kalma veya gelmeme (no-show) durumunda İptal ve İade Koşulları uygulanır.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 6 – CAYMA HAKKI</h2>
              <p>
                6502 sayılı Kanun'un 48. maddesi uyarınca, tüketicinin onayı ile hizmetin ifasına başlanmasından önce cayma hakkı kullanılabilir. Alıcı, randevu tarih ve saatini onaylayıp ödemeyi gerçekleştirdiğinde, hizmetin ifasına başlanmamış olması kaydıyla, İptal ve İade Koşulları'nda belirtilen sürelere uygun olarak iptal talebinde bulunabilir. Cayma hakkının kullanımı ve iade koşulları, ayrıca yayımlanan İptal ve İade Koşulları metninde düzenlenmiştir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 7 – TARAFLARIN YÜKÜMLÜLÜKLERİ</h2>
              <p className="mb-2">
                <strong>7.1.</strong> Satıcı, sözleşme konusu hizmeti, taahhüt edilen nitelik ve koşullarda, randevu saatinde ifa etmekle yükümlüdür.
              </p>
              <p className="mb-2">
                <strong>7.2.</strong> Alıcı, sipariş sırasında verdiği bilgilerin doğru ve güncel olduğunu taahhüt eder. Yanlış veya eksik bilgi nedeniyle doğacak aksaklıklardan Alıcı sorumludur.
              </p>
              <p>
                <strong>7.3.</strong> Alıcı, randevuya zamanında gelmek ve hizmetin ifası için gerekli kişisel hazırlığı yapmakla yükümlüdür.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 8 – GİZLİLİK VE KİŞİSEL VERİLER</h2>
              <p>
                Taraflar, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerin işlenmesine ilişkin ayrıntılı bilgilendirmenin KVKK Aydınlatma Metni'nde yer aldığını kabul eder. Alıcı, sipariş sırasında bu metni okuduğunu ve kabul ettiğini beyan eder.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 9 – UYUŞMAZLIKLARIN ÇÖZÜMÜ</h2>
              <p>
                İşbu sözleşmeden doğan uyuşmazlıklarda; (a) 6502 sayılı Kanun kapsamında Tüketici Hakem Heyetlerine başvuru için 3.000 TL'ye kadar (bu tutar Bakanlar Kurulu kararı ile güncellenir) olan alacak talepleri için Tüketici Hakem Heyeti, (b) Bu tutarın üzerindeki talepler ile tüketicinin aleyhine açılacak davalarda Satıcı'nın yerleşim yeri, Alıcı aleyhine açılacak davalarda Alıcı'nın yerleşim yeri {LEGAL_INFO.competentCourt} münhasıran yetkilidir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">MADDE 10 – YÜRÜRLÜK</h2>
              <p>
                İşbu sözleşme, Alıcı tarafından elektronik ortamda onaylandığı anda yürürlüğe girer. Sözleşme, Türkiye Cumhuriyeti kanunlarına tabidir.
              </p>
            </section>

            <section className="pt-4 border-t border-stone-dark/20">
              <p className="text-xs text-text-muted">
                Bu sözleşme 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümlerine uygun olarak hazırlanmıştır.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MesafeliSatisSozlesmesi;
