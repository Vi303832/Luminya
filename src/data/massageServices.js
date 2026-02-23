import { Droplets, Heart, Flame, Flower, Wind, Leaf, Sparkles, Star } from 'lucide-react';

export const MASSAGE_SERVICES = [
  { id: 'turk-hamami', icon: Droplets, title: 'Türk Hamamı', description: 'Geleneksel Türk hamamı deneyimi. Kese, köpük masajı ve peştemal.', duration: '60 dakika', price: 450, features: ['Kese & Köpük', 'Göbek Taşı', 'Geleneksel Masaj', 'Peştemal Hizmeti'] },
  { id: 'aroma-terapi', icon: Heart, title: 'Aroma Terapi', description: 'Özel yağlarla yapılan aromatik masaj ile ruh ve beden dinginliği.', duration: '75 dakika', price: 550, features: ['Özel Yağ Karışımı', 'Rahatlatıcı Masaj', 'Aromaterapi Buhar', 'Sıcak Havlu'] },
  { id: 'hot-stone', icon: Flame, title: 'Hot Stone Masaj', description: 'Sıcak taşlarla yapılan derin doku masajı. Kasları gevşetir.', duration: '90 dakika', price: 650, features: ['Volkanik Taşlar', 'Derin Doku Masajı', 'Enerji Dengeleme', 'Aromaterapi'] },
  { id: 'spa-cilt-bakimi', icon: Flower, title: 'Spa & Cilt Bakımı', description: 'Profesyonel cilt bakımı ile cildinizi yenileyin ve canlandırın.', duration: '90 dakika', price: 600, features: ['Cilt Analizi', 'Peeling & Maske', 'Nemlendirme', 'Anti-Aging Bakım'] },
  { id: 'thai-masaj', icon: Wind, title: 'Thai Masaj', description: 'Gerinme ve baskı teknikleri ile esneklik ve enerji artışı.', duration: '90 dakika', price: 700, features: ['Gerinme Egzersizleri', 'Akupresur', 'Enerji Hatları', 'Yoga Teknikleri'] },
  { id: 'ayurvedik-terapi', icon: Leaf, title: 'Ayurvedik Terapi', description: 'Hint kökenli holistik yaklaşımla vücut ve zihin dengesi.', duration: '120 dakika', price: 800, features: ['Dosha Analizi', 'Bitki Yağları', 'Shirodhara', 'Marma Noktaları'] },
  { id: 'isvec-masaji', icon: Sparkles, title: 'İsveç Masajı', description: 'Klasik masaj teknikleriyle kasları gevşeten yumuşak terapi.', duration: '60 dakika', price: 500, features: ['Klasik Teknikler', 'Kas Gevşetme', 'Dolaşım Artışı', 'Stres Giderme'] },
  { id: 'refleksoloji', icon: Star, title: 'Refleksoloji', description: 'Ayak masajı ile tüm vücutta enerji dengeleme ve rahatlama.', duration: '45 dakika', price: 400, features: ['Refleks Noktaları', 'Akupresur', 'Enerji Dengeleme', 'Rahatlatıcı'] }
];

export const formatPrice = (price) => `${price}₺`;
