import { useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Heart, Users, Target, Clock, Shield } from "lucide-react";
import Mission from "../components/Mission";
import Stats from "../components/Stats";
import SEO, { organizationSchema, generateBreadcrumbSchema } from "../components/SEO";

const values = [
  {
    icon: Heart,
    title: "Kalite ve Müşteri Memnuniyeti",
    description: "Her ziyaretçimize özel, kusursuz hizmet sunmak temel prensiplerimizdendir."
  },
  {
    icon: Users,
    title: "Uzman Kadro",
    description: "Alanında uzman, sertifikalı terapistlerimizle güvenilir hizmet."
  },
  {
    icon: Shield,
    title: "Hijyen ve Güvenlik",
    description: "En yüksek hijyen standartları ile sağlığınız bizim önceliğimiz."
  },
  {
    icon: Target,
    title: "Kişiselleştirilmiş Yaklaşım",
    description: "Her misafirimizin ihtiyaçlarına özel, bireysel çözümler."
  }
];

const stats = [
  { number: "13+", label: "Şubemiz" },
  { number: "50K+", label: "Mutlu Müşteri" },
  { number: "15+", label: "Yıllık Deneyim" },
  { number: "100+", label: "Uzman Kadro" }
];

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "https://luminya.com/" },
    { name: "Hakkımızda", url: "https://luminya.com/about" }
  ]);

  // About Page structured data
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Hakkımızda - Luminya Wellness Center",
    "description": "2009 yılından beri Türkiye'nin önde gelen wellness ve spa merkezi. 13+ şube, 50.000+ mutlu müşteri, 15 yıllık deneyim.",
    "mainEntity": organizationSchema
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, aboutPageSchema]
  };

  return (
    <div className="bg-linear-to-b from-stone-light via-cream to-stone-light min-h-screen relative overflow-hidden">
      <SEO
        title="Hakkımızda | Luminya Wellness & Spa Center - Hikayemiz ve Değerlerimiz"
        description="2009'dan beri Türkiye'nin önde gelen wellness merkezi. 13+ şubemizde, 100+ uzman kadromuzla 50.000'den fazla mutlu müşteriye hizmet veriyoruz. 15 yıllık deneyim ve kalite garantisi."
        keywords="luminya hakkında, spa merkezi hikayesi, wellness center deneyim, türkiye spa, profesyonel masaj ekibi, uzman terapistler, spa şubeleri"
        canonical="/about"
        structuredData={structuredData}
      />
      {/* Decorative Background Elements */}
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
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-olive/20 rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10">
        <Stats />
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-block px-4 py-1 bg-stone rounded-full text-sm font-medium text-espresso mb-4 tracking-wider"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                HİKAYEMİZ
              </motion.span>
              <motion.h2
                className="font-heading text-4xl md:text-5xl font-normal text-text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Bir Tutku ile Başladı
              </motion.h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Luminya, insanların günlük stresin yükünü üzerlerinden atıp,
                  kendilerine zaman ayırabilecekleri bir sığınak yaratma vizyonuyla kuruldu.
                  2009 yılında küçük bir spa merkezinde başlayan yolculuğumuz, bugün
                  Türkiye genelinde 13 şubeye ulaştı.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Her şubemizde aynı kalite standartlarını koruyarak, misafirlerimize
                  unutulmaz wellness deneyimleri sunuyoruz. Geleneksel Türk hamamından
                  modern spa terapilerine kadar geniş bir hizmet yelpazesiyle,
                  her yaştan ve zevkten insana hitap ediyoruz.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Uzman kadromuz, sürekli eğitim ve gelişimle kendini yenileyerek,
                  dünya standartlarında hizmet sunmayı hedefliyor. Sizin huzurunuz ve
                  memnuniyetiniz, bizim en büyük başarımız.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=2070&q=60&fm=webp"
                  alt="Luminya Spa"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                />
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-espresso/50 to-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 bg-olive text-white p-6 rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 3 }}
              >
                {/* Clock icon is now static, no animation */}
                <Clock className="w-8 h-8 mb-2" />
                <div className="font-heading text-2xl font-bold">15+</div>
                <div className="text-sm opacity-90">Yıllık Deneyim</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-linear-to-b from-white via-cream/50 to-white relative z-10 overflow-hidden">
        {/* Additional decorative elements for this section */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-olive/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-1 bg-stone rounded-full text-sm font-medium text-espresso mb-4 tracking-wider"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              DEĞERLERİMİZ
            </motion.span>
            <motion.h2
              className="font-heading text-4xl md:text-5xl font-normal text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Bizi Biz Yapan Değerler
            </motion.h2>
            <motion.p
              className="text-text-secondary text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Hizmet anlayışımızın temelini oluşturan prensiplerimiz
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-olive/10"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
              >
                <motion.div
                  className="relative w-16 h-16 mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                >
                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-olive/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-olive rounded-full flex items-center justify-center"
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>

                <motion.h3
                  className="font-heading text-xl font-semibold text-text-primary mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  {value.title}
                </motion.h3>
                <motion.p
                  className="text-text-secondary leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  {value.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Component */}
      <Mission />



    </div>
  );
};

export default About;
