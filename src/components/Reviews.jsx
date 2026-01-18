import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ayşe Yılmaz",
    role: "Düzenli Müşteri",
    content:
      "Serenity Spa, hayatımda deneyimlediğim en güzel rahatlama anlarını yaşadığım yer. Profesyonel ekip ve muhteşem atmosfer ile her ziyaretim unutulmaz oluyor.",
    rating: 5,
  },
  {
    name: "Mehmet Kaya",
    role: "VIP Üye",
    content:
      "Thai masajı deneyimi harikaydı! Terapistlerin uzmanlığı ve kullanılan ürünlerin kalitesi gerçekten fark yaratıyor. Herkese tavsiye ederim.",
    rating: 5,
  },
  {
    name: "Zeynep Demir",
    role: "Yeni Müşteri",
    content:
      "İlk ziyaretimde bile kendimi evimde gibi hissettim. Türk hamamı deneyimi beklenenden çok daha güzeldi. Kesinlikle tekrar geleceğim!",
    rating: 5,
  },
  {
    name: "Can Özdemir",
    role: "Aktif Sporcu",
    content:
      "Spor sonrası kas ağrılarım için derin doku masajı yaptırdım. Gerçekten işe yarıyor. Terapistler anatomiye çok hakim. Sportif performansım arttı.",
    rating: 5,
  },
];

const Reviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-olive to-transparent mx-auto mb-6"></div>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-text-primary mb-4">
            Müşteri Yorumları
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Misafirlerimizin deneyimlerini dinleyin
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-stone-dark/20">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-olive/20" />

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-olive text-olive" />
                  </motion.div>
                ))}
              </div>

              <p className="font-body text-lg md:text-xl text-text-secondary italic mb-8 leading-relaxed px-4">
                "{testimonials[current].content}"
              </p>

              <div>
                <h4 className="font-heading text-xl font-normal text-text-primary">
                  {testimonials[current].name}
                </h4>
                <p className="text-text-muted text-sm mt-1">{testimonials[current].role}</p>
              </div>
            </motion.div>

            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                onClick={prev}
                className="p-3 rounded-full border border-stone-dark hover:border-olive hover:bg-olive/5 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </motion.button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-olive" : "w-2 bg-stone-dark"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
              <motion.button
                onClick={next}
                className="p-3 rounded-full border border-stone-dark hover:border-olive hover:bg-olive/5 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-text-primary" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
