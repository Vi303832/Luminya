import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  const quickLinks = [
    { name: "Ana Sayfa", href: "#hero" },
    { name: "Hizmetler", href: "#services" },
    { name: "Tedaviler", href: "#treatments" },
    { name: "Ürünler", href: "#products" },
    { name: "Hakkımızda", href: "#about" },
    { name: "İletişim", href: "#contact" },
  ];

  return (
    <footer id="contact" className="bg-gradient-to-b from-espresso via-espresso/95 to-espresso pt-20 pb-8 relative overflow-hidden">
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
          className="absolute bottom-20 left-10 w-96 h-96 bg-olive/5 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-semibold mb-4 text-white">
              <span className="text-olive">Ruhunuzu</span> Wellness
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Huzurun ve rahatlığın adresi. Profesyonel ekibimizle sizlere
              en iyi wellness deneyimini sunmak için buradayız.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 bg-white/10 rounded-full hover:bg-olive hover:text-white transition-colors duration-300 text-white"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-lg font-semibold mb-6 text-white">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-olive transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading text-lg font-semibold mb-6 text-white">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-olive flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  Nişantaşı, Teşvikiye Cad. No:123
                  <br />
                  Şişli, İstanbul
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-olive flex-shrink-0" />
                <a
                  href="tel:+902121234567"
                  className="text-gray-300 hover:text-olive transition-colors"
                >
                  +90 212 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-olive flex-shrink-0" />
                <a
                  href="mailto:info@ruhunuzu.com"
                  className="text-gray-300 hover:text-olive transition-colors"
                >
                  info@ruhunuzu.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-heading text-lg font-semibold mb-6 text-white">Çalışma Saatleri</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-olive flex-shrink-0" />
                <div className="text-gray-300">
                  <span className="block">Pazartesi - Cuma</span>
                  <span className="text-white font-medium">10:00 - 22:00</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-olive flex-shrink-0" />
                <div className="text-gray-300">
                  <span className="block">Cumartesi - Pazar</span>
                  <span className="text-white font-medium">09:00 - 23:00</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="border-t border-white/10 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Ruhunuzu Wellness Center. Tüm hakları saklıdır.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
