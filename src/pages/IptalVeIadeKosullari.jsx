import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
              <h2 className="font-semibold text-espresso mb-2">İptal Süresi</h2>
              <p>
                Randevu saatine en geç 24 saat kalana kadar yapılan iptallerde ücretin tamamı iade edilir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">Kısmi İade</h2>
              <p>
                Randevuya 12-24 saat kala yapılan iptallerde, hizmet bedelinin %50'si iade edilir.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">İadesiz Durum</h2>
              <p>
                Randevuya 12 saatten az süre kalmışsa veya müşteri randevuya gelmezse (No-Show), herhangi bir ücret iadesi yapılmaz.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-espresso mb-2">İade Süreci</h2>
              <p>
                Onaylanan iadeler, banka süreçlerine bağlı olarak 7-10 iş günü içinde Alıcı'nın kartına yansıtılır.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default IptalVeIadeKosullari;
