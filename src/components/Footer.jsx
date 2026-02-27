import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Ana Sayfa", href: "/", type: "link" },
    { name: "Hizmetler", href: "/services", type: "link" },
    { name: "Blog", href: "/blog", type: "link" },
    { name: "Şubelerimiz", href: "/#locations", type: "scroll" },
  ];

  const corporateLinks = [
    { name: "Hakkımızda", href: "/about", type: "link" },
    { name: "İletişim", href: "/#reservation", type: "scroll" },
    { name: "Mesafeli Satış Sözleşmesi", href: "/mesafeli-satis-sozlesmesi", type: "link" },
    { name: "Ön Bilgilendirme Formu", href: "/on-bilgilendirme-formu", type: "link" },
    { name: "İptal ve İade Koşulları", href: "/iptal-ve-iade-kosullari", type: "link" },
    { name: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni", type: "link" },
    { name: "Üyelik Sözleşmesi", href: "/uyelik-sozlesmesi", type: "link" },
  ];

  const handleCorporateLinkClick = (e, link) => {
    e.preventDefault();
    if (link.type === "link") {
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.type === "scroll") {
      const hash = link.href.split('#')[1];
      if (window.location.pathname === "/") {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }
  };

  const handleQuickLinkClick = (e, link) => {
    e.preventDefault();
    if (link.type === "link") {
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.type === "scroll") {
      const hash = link.href.split('#')[1];
      if (window.location.pathname === "/") {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }
  };

  return (
    <footer id="contact" className="bg-linear-to-b from-espresso via-espresso/95 to-espresso pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 -right-20 w-72 h-72 bg-olive/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 -left-20 w-96 h-96 bg-olive/5 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="wrap-break-word"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-white">
              <span className="text-olive">Luminya</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Huzurun ve rahatlığın adresi. Profesyonel ekibimizle sizlere
              en iyi wellness deneyimini sunmak için buradayız.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 sm:space-y-3">
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
                    onClick={(e) => handleQuickLinkClick(e, link)}
                    className="text-sm sm:text-base text-gray-300 hover:text-olive transition-colors duration-300 inline-block cursor-pointer"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Kurumsal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 className="font-heading text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Kurumsal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {corporateLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.25 }}
                >
                  {link.type === "scroll" ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleCorporateLinkClick(e, link)}
                      className="text-sm sm:text-base text-gray-300 hover:text-olive transition-colors duration-300 inline-block cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm sm:text-base text-gray-300 hover:text-olive transition-colors duration-300 inline-block cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  )}
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
            className="wrap-break-word"
          >
            <h4 className="font-heading text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">İletişim</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-olive shrink-0 mt-1" />
                <a
                  href="https://maps.google.com/?q=Nişantaşı+Teşvikiye+Cad.+No:123+Şişli+İstanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-gray-300 hover:text-olive transition-colors cursor-pointer active:scale-[0.98] inline-block"
                >
                  Nişantaşı, Teşvikiye Cad. No:123
                  <br />
                  Şişli, İstanbul
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-olive shrink-0" />
                <a
                  href="tel:+902121234567"
                  className="text-sm sm:text-base text-gray-300 hover:text-olive transition-colors break-all"
                >
                  +90 212 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-olive shrink-0" />
                <a
                  href="mailto:info@ruhunuzu.com"
                  className="text-sm sm:text-base text-gray-300 hover:text-olive transition-colors break-all"
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
            <h4 className="font-heading text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Çalışma Saatleri</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-olive shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base text-gray-300">
                  <span className="block">Pazartesi - Cuma</span>
                  <span className="text-white font-medium whitespace-nowrap">10:00 - 22:00</span>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-olive shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base text-gray-300">
                  <span className="block">Cumartesi - Pazar</span>
                  <span className="text-white font-medium whitespace-nowrap">09:00 - 23:00</span>
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
            © {currentYear} Luminya Wellness Center. Tüm hakları saklıdır.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
