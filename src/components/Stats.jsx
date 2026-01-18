import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Award, Clock, Star } from "lucide-react";

const stats = [
  { icon: Users, value: 15, suffix: "+", label: "Yıllık Deneyim" },
  { icon: Award, value: 50, suffix: "+", label: "Uzman Terapist" },
  { icon: Clock, value: 100, suffix: "%", label: "Müşteri Memnuniyeti" },
  { icon: Star, value: 4.9, suffix: "", label: "Ortalama Puan" },
];

const AnimatedNumber = ({ value, suffix, inView }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const startTime = Date.now();
      const isFloat = !Number.isInteger(value);

      const updateValue = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * value;

        setDisplayValue(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };

      updateValue();
    }
  }, [inView, value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="py-20 md:py-32 bg-linear-to-b from-stone-light via-cream to-stone-light relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-olive/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-stone/30 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translate(50%, 50%)' }}
        />
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-olive/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
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
            className="inline-block px-4 py-1 bg-olive/10 rounded-full text-sm font-medium text-olive mb-4 tracking-[0.2em]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            HAKKIMIZDA
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl text-text-primary mb-4">
            Mükemmelliğe ve{" "}
            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="relative z-10">Yenilemeye</span>
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
            Yılların tecrübesiyle, binlerce müşterimize huzur ve rahatlık sunduk.
            Kaliteli hizmet anlayışımızla fark yaratıyoruz.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <motion.div
                className="relative w-24 h-24 mx-auto mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated rings */}
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
                  <stat.icon className="w-8 h-8 text-olive" />
                </motion.div>
              </motion.div>

              <div className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
              </div>
              <p className="text-text-secondary font-body">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
