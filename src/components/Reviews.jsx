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
    <section className="py-20 md:py-32 bg-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-olive/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-stone/20 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-olive/10 rounded-full text-sm font-medium text-olive mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            YORUMLAR
          </motion.span>
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
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-br from-white to-stone-light/30 rounded-3xl p-8 md:p-12 shadow-elevated border border-stone-dark/10">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-olive/5 to-transparent rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-olive/5 to-transparent rounded-bl-3xl" />
            
            <Quote className="absolute top-6 left-6 w-12 h-12 text-olive/20" />

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center relative z-10"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                  >
                    <Star className="w-6 h-6 fill-olive text-olive drop-shadow-sm" />
                  </motion.div>
                ))}
              </div>

              <p className="font-body text-lg md:text-xl text-text-secondary italic mb-8 leading-relaxed px-4">
                "{testimonials[current].content}"
              </p>

              <div>
                <h4 className="font-heading text-xl font-normal text-text-primary mb-1">
                  {testimonials[current].name}
                </h4>
                <p className="text-olive text-sm font-medium">{testimonials[current].role}</p>
              </div>
            </motion.div>

            <div className="flex justify-center gap-4 mt-8 relative z-10">
              <motion.button
                onClick={prev}
                className="p-3 rounded-full border-2 border-stone-dark/30 hover:border-olive hover:bg-olive/10 transition-all duration-300 shadow-soft hover:shadow-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-olive" />
              </motion.button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === current 
                        ? "w-10 bg-gradient-to-r from-olive to-olive-dark shadow-olive" 
                        : "w-2 bg-stone-dark/50 hover:bg-olive/40"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              <motion.button
                onClick={next}
                className="p-3 rounded-full border-2 border-stone-dark/30 hover:border-olive hover:bg-olive/10 transition-all duration-300 shadow-soft hover:shadow-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-olive" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
