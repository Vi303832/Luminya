import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Heart, Award, Leaf, Target } from "lucide-react";

const missionItems = [
  {
    icon: Heart,
    title: "Tutkumuz",
    description: "Her müşterimize eşsiz bir rahatlama deneyimi sunmak için çalışıyoruz.",
  },
  {
    icon: Award,
    title: "Kalitemiz",
    description: "En yüksek standartlarda hizmet ve ürün kalitesi ile fark yaratıyoruz.",
  },
  {
    icon: Leaf,
    title: "Doğallık",
    description: "Tamamen organik ve doğal ürünlerle sağlıklı bakım garantisi sunuyoruz.",
  },
  {
    icon: Target,
    title: "Vizyonumuz",
    description: "Türkiye'nin en güvenilir ve tercih edilen wellness markası olmak.",
  },
];

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-cream relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-olive/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-stone/30 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-olive/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-olive/10 rounded-full text-sm font-medium text-olive mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            MİSYONUMUZ
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl text-text-primary mb-4">
            Huzuru{" "}
            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="relative z-10">Yaşatmak</span>
              <motion.span
                className="absolute inset-0 bg-olive/20 -skew-x-6 rounded"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.span>
          </h2>
          <motion.p 
            className="text-text-secondary text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            15 yılı aşkın deneyimimizle, bedeninize ve ruhunuza hak ettiği bakımı sunuyoruz.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {missionItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center group"
              variants={{
                hidden: { opacity: 0, y: 50, rotateY: -20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                },
              }}
            >
              <motion.div
                className="relative w-24 h-24 mx-auto mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-olive/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-dashed border-olive/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div
                  className="absolute inset-4 bg-linear-to-br from-olive/20 to-olive/5 rounded-full 
                             flex items-center justify-center group-hover:from-olive/30 group-hover:to-olive/10 
                             transition-all duration-500"
                  whileHover={{ rotate: 10 }}
                >
                  <item.icon className="w-8 h-8 text-olive" />
                </motion.div>
              </motion.div>

              <motion.h3 
                className="font-heading text-xl font-semibold text-text-primary mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item.title}
              </motion.h3>
              <motion.p 
                className="text-text-secondary leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
