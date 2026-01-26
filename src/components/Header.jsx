import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Change 'İletişim' and 'Şubelerimiz' to scroll to their sections
const navLinks = [
  { name: "Anasayfa", href: "/", type: "link" },
  { name: "Hakkımızda", href: "/about", type: "link" },
  { name: "Hizmetlerimiz", href: "/services", type: "link" },
  { name: "Blog", href: "/blog", type: "link" },
  { name: "Şubelerimiz", href: "/#locations", type: "hero-scroll" },
  { name: "İletişim", href: "/#reservation", type: "hero-scroll" },
];

const Navbar = ({ onOpenBottomSheet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrolls to a hash target if exists on the page
  const scrollToHash = (hash) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBottomSheetClick = () => {
    if (onOpenBottomSheet) {
      onOpenBottomSheet();
    }
    setIsOpen(false); // Close mobile menu if open
  };

  // Revised: Navigate to home then scroll to specific section from href
  const handleNavClick = (e, href, type) => {
    setIsOpen(false);

    if (type === "link") {
      // Regular link navigation - let React Router handle it normally
      // Don't prevent default, let Link component work naturally
      return;
    } else if (type === "hero-scroll") {
      // Prevent default only for scroll links
      e.preventDefault();

      // Extract the hash from href (e.g., "/#hero" -> "#hero", "/#locations" -> "#locations")
      const hash = href.includes("#") ? href.split("#")[1] : "hero";
      const targetHash = `#${hash}`;

      if (location.pathname === "/") {
        // Already home, scroll to target section
        setTimeout(() => {
          scrollToHash(targetHash);
        }, 100); // Small delay to ensure mobile menu closes first
      } else {
        // Go to home first, then scroll to target section
        navigate("/");
        setTimeout(() => {
          scrollToHash(targetHash);
        }, 500);
      }
    } else if (type === "scroll") {
      e.preventDefault();
      if (location.pathname === "/") {
        // On home, scroll immediately
        scrollToHash(href.replace("/", ""));
      } else {
        navigate(`/${href.split("#")[1] ? "" : href}`);
      }
    } else if (type === "contact") {
      e.preventDefault();
      if (location.pathname === "/") {
        // Already home, scroll instantly to contact
        scrollToHash(href.replace("/", ""));
      } else {
        // Go to home, then scroll immediately after navigation
        navigate("/");
        // Use slight timeout to ensure home has loaded
        setTimeout(() => {
          scrollToHash("#reservation");
        }, 10);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-x-hidden ${scrolled
        ? "bg-espresso/95 backdrop-blur-md shadow-elevated py-3"
        : "bg-espresso/40 backdrop-blur-sm py-5"
        }`}
    >
      <nav className="container mx-auto px-3 sm:px-6 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link to="/" onClick={(e) => handleNavClick(e, "/", "link")} className="shrink-0">
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl md:text-2xl font-normal text-white tracking-wide whitespace-nowrap">
                Luminya
              </span>
              <span className="text-[0.65rem] sm:text-xs text-white/70 tracking-[0.2em] sm:tracking-[0.3em] uppercase whitespace-nowrap">
                Spa & Wellness
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8">
          {navLinks.map((link, index) => (
            <Link key={link.name} to={link.href} onClick={(e) => handleNavClick(e, link.href, link.type)}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                whileHover={{ y: -2 }}
                className="relative text-sm font-medium text-white/90 hover:text-olive transition-colors group whitespace-nowrap"
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"
                  whileHover={{ width: "100%" }}
                />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={handleOpenBottomSheetClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:flex items-center gap-2 px-4 xl:px-5 py-2.5 bg-olive text-white rounded-full font-medium text-sm shadow-soft hover:shadow-elevated transition-all duration-300 whitespace-nowrap shrink-0"
          aria-label="Randevu almak için şube seç"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Phone className="w-4 h-4" />
          </motion.div>
          <span>Randevu Al</span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >

          </motion.div>
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-1.5 sm:p-2 text-white shrink-0"
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </motion.div>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-espresso/98 backdrop-blur-lg border-t border-white/10 overflow-x-hidden"
          >
            <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-3 sm:gap-4 max-w-7xl">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.type)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-base sm:text-lg font-medium text-white/90 hover:text-olive py-2 transition-colors"
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
              <motion.button
                onClick={handleOpenBottomSheetClick}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-2 sm:mt-4 flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-olive text-white rounded-full font-medium text-sm sm:text-base"
                aria-label="Randevu almak için şube seç"
              >
                <Phone className="w-4 h-4" />
                <span>Randevu Al</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
