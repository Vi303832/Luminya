import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { MapPin, Phone, Clock, Star, ChevronRight } from "lucide-react";
import { useState } from "react";
import BottomSheet from "./BottomSheet";
import BranchSelector, { SearchBar } from "./BranchSelector";
import BranchDetail from "./BranchDetail";

// Branch data
const branches = [
  {
    id: 1,
    name: 'Zeytinburnu Şube',
    city: 'İstanbul',
    address: 'Zeytinburnu, İstanbul, Zeytinburnu Hotel',
    phone: '0212 123 45 67',
    hours: '09:00 - 23:00',
    image: 'https://lunadenspa.com.tr/wp-content/uploads/2022/03/zeytinburnu-hotel.png'
  },
  {
    id: 2,
    name: 'Nişantaşı Şube',
    city: 'İstanbul',
    address: 'Nişantaşı, İstanbul, Abdi İpekçi Cad. No:28',
    phone: '0212 901 23 45',
    hours: '09:00 - 23:00',
    image: 'https://lunadenspa.com.tr/wp-content/uploads/2025/03/589c1c00d71d7-jpg.webp'
  },
  {
    id: 3,
    name: 'Avcılar Şube',
    city: 'İstanbul',
    address: 'Avcılar, İstanbul, Land Park Hotel',
    phone: '0212 345 67 89',
    hours: '09:00 - 23:00',
    image: 'https://lunadenspa.com.tr/wp-content/uploads/2022/03/avcilar-land-park.png'
  },
];

// Featured branches for the main display (first 3)
const featuredBranches = branches.slice(0, 3);

function Branches() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);
    setIsBottomSheetOpen(true);
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
    setSelectedBranch(null);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedBranch(null);
    setSearchQuery("");
  };

  const handleBackToList = () => {
    setSelectedBranch(null);
  };

  return (
    <>
      <section id="branches" className="py-20 md:py-32 bg-cream relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-32 -right-32 w-96 h-96 bg-olive/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-stone/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-1 bg-stone rounded-full text-sm font-medium text-espresso mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              ŞUBELER
            </motion.span>
            <h2 className="font-heading text-4xl md:text-5xl font-normal text-text-primary mb-4">
              Size En{" "}
              <motion.span className="relative inline-block">
                <span className="relative z-10">Yakın Şube</span>
                <motion.span
                  className="absolute inset-0 bg-olive/20 -skew-x-6 rounded"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.span>
            </h2>
            <motion.p
              className="text-text-secondary text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Türkiye genelinde 13 şubemizle hizmetinizdeyiz
            </motion.p>
          </motion.div>

          <motion.div
            ref={ref}
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {featuredBranches.map((branch, index) => (
              <motion.div
                key={branch.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer border border-stone-dark/20 hover:border-olive/40"
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
                }}
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(59, 33, 23, 0.15)" }}
                onClick={() => handleSelectBranch(branch)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-espresso/70 to-transparent" />

                  {/* Rating badge */}
                  <motion.div
                    className="absolute top-4 right-4 flex items-center gap-1 bg-cream/90 backdrop-blur-sm px-2 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <Star className="w-4 h-4 fill-olive text-olive" />
                    <span className="text-sm font-semibold text-espresso">4.9</span>
                  </motion.div>

                  {/* City badge */}
                  <motion.div
                    className="absolute bottom-4 left-4 flex items-center gap-1 text-cream"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{branch.city}</span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-3 group-hover:text-olive transition-colors">
                    {branch.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Phone className="w-4 h-4 text-olive" />
                      {branch.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Clock className="w-4 h-4 text-olive" />
                      {branch.hours}
                    </div>
                  </div>

                  <motion.div
                    className="flex items-center justify-between pt-4 border-t border-stone-dark/20"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-olive font-medium">Detaylı Bilgi</span>
                    <ChevronRight className="w-5 h-5 text-olive" />
                  </motion.div>
                </div>
              </motion.div>
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
              onClick={handleOpenBottomSheet}
              className="inline-flex items-center gap-2 px-8 py-3 bg-olive text-white rounded-full font-medium hover:bg-olive-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5" />
              Tüm Şubeleri Gör
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        title={selectedBranch ? selectedBranch.name : "Şubelerimiz"}
        searchBar={!selectedBranch && <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
      >
        {selectedBranch ? (
          <BranchDetail branch={selectedBranch} onBack={handleBackToList} />
        ) : (
          <BranchSelector
            onSelectBranch={handleSelectBranch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </BottomSheet>
    </>
  );
}

export default Branches;
