# Luna Den Spa - Renk Paleti Dokümantasyonu

## 🎨 Renk Şeması

Proje genelinde tutarlı bir renk paleti oluşturulmuştur. Tüm bileşenler bu renk paletini kullanır.

### 1. Ana Renkler (Primary Colors)

| Renk | Class Adı | Hex Kodu | Kullanım Alanı |
|------|-----------|----------|----------------|
| **Espresso** | `espresso` | `#2c1810` | Header arka planı, koyu metin |
| **Cream** | `cream` | `#f5f1e8` | Ana arka plan rengi |
| **Cream Dark** | `cream-dark` | `#ebe5d8` | Hover states |

### 2. Altın Tonları (Gold Accent)

| Renk | Class Adı | Hex Kodu | Kullanım Alanı |
|------|-----------|----------|----------------|
| **Gold** | `gold` | `#d4a574` | Ana vurgu rengi, butonlar |
| **Gold Dark** | `gold-dark` | `#b8925f` | Hover states, koyu altın |
| **Gold Light** | `gold-light` | `#e8c9a8` | Açık vurgular, gradientler |
| **Gold Pale** | `gold-pale` | `#f5ead8` | Çok hafif arka planlar |

### 3. Destekleyici Renkler (Supporting Colors)

| Renk | Class Adı | Hex Kodu | Kullanım Alanı |
|------|-----------|----------|----------------|
| **Forest** | `forest` | `#4a5d4f` | Spa teması, yeşil vurgular |
| **Sage** | `sage` | `#8a9a8d` | Açık yeşil detaylar |

### 4. Nötr Renkler (Neutral Colors)

| Renk | Class Adı | Hex Kodu | Kullanım Alanı |
|------|-----------|----------|----------------|
| **Text Primary** | `text-primary` | `#3a2a1f` | Ana metin rengi |
| **Text Secondary** | `text-secondary` | `#5a4a3f` | İkincil metin |
| **Text Muted** | `text-muted` | `#8a7a6f` | Soluk/yardımcı metin |
| **Border** | `border` | `#e0d7cc` | Çizgiler, ayırıcılar |
| **Background Light** | `bg-light` | `#faf8f5` | Alternatif açık arka plan |

## 🎨 Gradient Sınıfları

| Class Adı | Gradient | Kullanım |
|-----------|----------|----------|
| `bg-gradient-gold` | `#d4a574 → #b8925f` | Ana altın gradient |
| `bg-gradient-gold-warm` | `#e8c9a8 → #d4a574` | Sıcak altın gradient |
| `bg-gradient-espresso` | `#2c1810 → #3a2a1f` | Koyu kahverengi gradient |

## 📦 Kullanım Örnekleri

### Butonlar
```jsx
// Primary Button
<button className="bg-gold text-white hover:bg-gold-dark">
  Randevu Al
</button>

// Outline Button
<button className="border-2 border-gold text-gold hover:bg-gold hover:text-white">
  Detaylar
</button>
```

### Arka Planlar
```jsx
// Ana arka plan
<section className="bg-cream">

// Alternatif arka plan
<section className="bg-light">

// Gradient arka plan
<div className="bg-gradient-gold">
```

### Metin Renkleri
```jsx
<h1 className="text-text-primary">Başlık</h1>
<p className="text-text-secondary">Alt metin</p>
<small className="text-text-muted">Yardımcı bilgi</small>
```

### Border ve Çizgiler
```jsx
<div className="border border-border">
<hr className="border-t border-border" />
```

## ✅ Güncellenen Dosyalar

1. ✅ `src/index.css` - Renk paleti tanımları
2. ✅ `src/App.jsx` - Ana arka plan
3. ✅ `src/components/Header.jsx` - Navigation bar
4. ✅ `src/components/Hero.jsx` - Hero section
5. ✅ `src/components/PopularTherapies.jsx` - Hizmetler
6. ✅ `src/components/WellnessPackages.jsx` - Paketler
7. ✅ `src/components/WhyUs.jsx` - Ürünler
8. ✅ `src/components/Gallery.jsx` - Galeri
9. ✅ `src/components/Mission.jsx` - Hakkımızda
10. ✅ `src/components/Reviews.jsx` - Yorumlar
11. ✅ `src/components/Subscribe.jsx` - Bülten
12. ✅ `src/components/Reservation.jsx` - Rezervasyon formu
13. ✅ `src/components/Footer.jsx` - Footer

## 🎯 Tutarlılık Kuralları

1. **Hiçbir yerde hardcoded hex renk kodu kullanma**
2. **Her zaman tanımlı class adlarını kullan**
3. **Altın tonları vurgular için, cream tonları arka plan için**
4. **Text renkleri için text-primary, text-secondary, text-muted kullan**
5. **Hover states için -dark varyantlarını kullan**

## 🚀 Avantajlar

- ✅ Tutarlı görünüm
- ✅ Kolay bakım ve güncelleme
- ✅ Merkezi renk yönetimi
- ✅ Marka kimliği uyumu
- ✅ Profesyonel görünüm
- ✅ Kolay değiştirilebilir tema
