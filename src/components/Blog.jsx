import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Stresle Başa Çıkmanın 7 Doğal Yolu",
    excerpt: "Günlük hayatın stresinden kurtulmanın en etkili wellness yöntemlerini keşfedin.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    author: "Dr. Ayşe Kara",
    date: "15 Ocak 2026",
    readTime: "5 dk",
    category: "Wellness",
  },
  {
    id: 2,
    title: "Aromaterapi: Ruha İyi Gelen Kokular",
    excerpt: "Esansiyel yağların gücünü keşfedin ve evde kendi aromaterapi ritüelinizi oluşturun.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80",
    author: "Zeynep Demir",
    date: "12 Ocak 2026",
    readTime: "7 dk",
    category: "Aromaterapi",
  },
  {
    id: 3,
    title: "Sağlıklı Beslenme ve Spa: Mükemmel Uyum",
    excerpt: "İçeriden dışarıya güzellik için beslenme ve spa bakımını nasıl birleştireceğinizi öğrenin.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    author: "Mehmet Özkan",
    date: "10 Ocak 2026",
    readTime: "6 dk",
    category: "Beslenme",
  },
];

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section id="blog" className="py-20 md:py-32 bg-espresso relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-espresso to-espresso/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-olive/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-olive/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
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
            className="inline-block px-4 py-1 bg-olive/30 rounded-full text-sm font-medium text-olive mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            BLOG
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-white mb-4">
            Wellness{" "}
            <motion.span
              className="relative inline-block"
            >
              <span className="relative z-10">Rehberi</span>
              <motion.span
                className="absolute inset-0 bg-olive/40 -skew-x-6 rounded"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.span>
          </h2>
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Sağlık, güzellik ve wellness hakkında en güncel bilgiler
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              onClick={() => navigate('/blog')}
              className="group bg-white rounded-2xl overflow-hidden shadow-elevated cursor-pointer hover:shadow-2xl border border-white/10"
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration: 0.6 },
                },
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-espresso/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category badge */}
                <motion.span
                  className="absolute top-4 left-4 px-3 py-1 bg-olive text-white text-xs font-semibold rounded-full shadow-md backdrop-blur-sm"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {post.category}
                </motion.span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-espresso/60 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-normal text-espresso mb-3 group-hover:text-olive transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-espresso/70 mb-4 line-clamp-2">{post.excerpt}</p>

                {/* Author & Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-espresso/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-olive/15 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-olive" />
                    </div>
                    <span className="text-sm font-medium text-espresso">{post.author}</span>
                  </div>
                  <motion.span
                    className="flex items-center gap-1 text-olive font-medium text-sm group/link"
                    whileHover={{ x: 5 }}
                  >
                    Devamını Oku
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-olive text-white rounded-full hover:bg-olive-dark transition-all duration-500 font-medium shadow-soft hover:shadow-elevated"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tüm Yazıları Gör
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
