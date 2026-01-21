import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Calendar, Clock, ArrowRight, User, Search, Tag } from "lucide-react";
import SEO, { generateArticleSchema, generateBreadcrumbSchema } from "../components/SEO";

// SEO odaklı kapsamlı blog içeriği
const blogPosts = [
  {
    id: 1,
    title: "Stresle Başa Çıkmanın 7 Doğal Wellness Yöntemi",
    slug: "stresle-basa-cikmanin-7-dogal-wellness-yontemi",
    excerpt: "Modern yaşamın getirdiği stres ve gerginlikten kurtulmanın en etkili doğal yöntemlerini keşfedin. Masaj terapisi, aromaterapi ve meditasyon teknikleriyle huzura ulaşın.",
    content: `Günümüz yaşam koşullarında stres, neredeyse herkesin karşılaştığı ortak bir sorundur. İş hayatının yoğunluğu, sosyal sorumluluklar ve günlük koşturmaca zihinsel ve fiziksel sağlığımızı olumsuz etkileyebilir. Ancak doğal wellness yöntemleriyle stresi yönetmek ve dengeli bir yaşam sürdürmek mümkündür.

**1. Aromaterapi ve Esansiyel Yağlar**
Lavanta, papatya ve bergamot gibi esansiyel yağlar sinir sistemini sakinleştirici etkilere sahiptir. Masaj seanslarında kullanılan aromaterapi yağları, hem fiziksel hem de mental rahatlama sağlar. Özellikle İsveç masajı ile birleştirildiğinde, stres hormonlarının seviyesi önemli ölçüde azalır.

**2. Derin Doku Masajı ve Gerginlik Çözme**
Kas gerginliği, stresin fiziksel belirtilerinden biridir. Derin doku masajı tekniği, kasların derinliklerine inerek biriken gerginliği çözer. Özellikle boyun, sırt ve omuz bölgelerinde uygulanan bu terapi, kronik ağrıları da hafifletir.

**3. Sıcak Taş Terapisi**
Volkanik taşlarla yapılan sıcak taş masajı, kan dolaşımını artırır ve kasları gevşetir. Bu antik terapi yöntemi, vücuttaki enerji akışını dengeler ve derin bir rahatlama hissi yaratır.

**4. Meditasyon ve Nefes Egzersizleri**
Spa ortamında uygulanan rehberli meditasyon seansları, zihinsel berraklık sağlar. Derin nefes teknikleri parasempatik sinir sistemini aktive ederek doğal sakinleşme tepkisini tetikler.

**5. Hidroterapı ve Spa Ritüelleri**
Sıcak su uygulamaları, hamam seansları ve Jacuzzi terapileri kasları gevşetir. Mineralli su banyoları cildi yeniler ve vücuttaki toksinlerin atılmasına yardımcı olur.

**6. Refleksoloji ve Akupresür**
Ayak refleksolojisi, vücuttaki tüm organlarla bağlantılı noktalara baskı uygulayarak genel dengeyi sağlar. Akupresür noktalarına yapılan masaj, enerji akışını düzenler ve stresi azaltır.

**7. Yoga ve Esneme Egzersizleri**
Spa wellness programlarına entegre edilen yoga seansları, esneklik kazandırır ve zihin-beden bağlantısını güçlendirir. Özellikle restoratif yoga, derin rahatlama sağlar.

**Sonuç**
Düzenli spa ve wellness uygulamaları, stres yönetiminin vazgeçilmez parçalarıdır. Luna Wellness Center olarak, size özel hazırlanmış wellness programlarımızla sağlıklı ve dengeli bir yaşam sürmenize yardımcı oluyoruz.`,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
    author: "Dr. Ayşe Kara",
    authorTitle: "Wellness Uzmanı",
    date: "15 Ocak 2026",
    readTime: "8 dk",
    category: "Wellness",
    tags: ["stres yönetimi", "aromaterapi", "masaj terapisi", "meditasyon", "spa"],
    featured: true,
  },
  {
    id: 2,
    title: "Aromaterapi: Esansiyel Yağların Şifa Gücü ve Kullanım Rehberi",
    slug: "aromaterapi-esansiyel-yaglarin-sifa-gucu",
    excerpt: "Binlerce yıldır kullanılan esansiyel yağların terapötik faydalarını öğrenin. Lavanta, gül, okaliptüs ve daha fazlası ile evde ve spa'da aromaterapi uygulamaları.",
    content: `Aromaterapi, bitkilerin esansiyel yağlarından elde edilen doğal bileşiklerin terapötik amaçlarla kullanılmasıdır. Bu antik şifa yöntemi, modern wellness endüstrisinin önemli bir parçası haline gelmiştir.

**Aromaterapi Nedir?**
Esansiyel yağlar, bitkilerin çiçek, yaprak, kök veya kabuklarından damıtma veya soğuk sıkma yöntemleriyle elde edilen yüksek konsantrasyonlu doğal ekstraktlardır. Bu yağlar, inhalasyon veya topikal uygulama yoluyla limbik sistemi etkiler ve çeşitli fiziksel ve psikolojik faydalar sağlar.

**Popüler Esansiyel Yağlar ve Faydaları:**

**Lavanta:** En çok kullanılan esansiyel yağdır. Sakinleştirici, rahatlatıcı ve uyku düzenleyici özelliklere sahiptir. Masaj terapisinde kullanıldığında kas gevşetici etki gösterir.

**Papatya:** Anti-enflamatuar ve sakinleştirici. Hassas ciltler için idealdir. Cilt bakım ürünlerinde ve masaj yağlarında sıkça kullanılır.

**Okaliptüs:** Solunum yollarını açar ve bağışıklık sistemini destekler. Özellikle soğuk algınlığı ve nezle dönemlerinde faydalıdır.

**Gül:** Cilt yenileyici ve anti-aging özelliklere sahiptir. Yüz bakım ürünlerinde ve lüks spa ritüellerinde kullanılır.

**Bergamot:** Ruh halini yükseltir ve anksiyeteyi azaltır. Enerji verici ve dengeleyici etkisi vardır.

**İlang-İlang:** Rahatlatıcı ve afrodizyak özellikler taşır. Lüks masaj seanslarında tercih edilir.

**Biberiye:** Mental berraklık sağlar ve konsantrasyonu artırır. Saç ve saçlı deri sağlığı için faydalıdır.

**Spa'da Aromaterapi Uygulamaları:**
Luna Wellness Center'da aromaterapi, her tedavinin ayrılmaz bir parçasıdır. Özellikle:
- Aromatik masaj seansları
- Yüz ve cilt bakım terapileri
- Hamam ritüelleri
- Aromaterapi difüzyon uygulamaları

**Evde Aromaterapi Kullanımı:**
- Banyo suyuna 5-10 damla ekleyin
- Difüzör ile odanıza yayın
- Taşıyıcı yağla (badem, jojoba) seyreltip masaj yapın
- Yastığınıza birkaç damla damlatın

**Dikkat Edilmesi Gerekenler:**
Esansiyel yağlar yüksek konsantrasyonludur, doğrudan cilde sürülmemelidir. Hamilelik, emzirme ve belirli sağlık durumlarında kullanmadan önce uzman görüşü alınmalıdır.`,
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80",
    author: "Zeynep Demir",
    authorTitle: "Aromaterapi Terapisti",
    date: "12 Ocak 2026",
    readTime: "10 dk",
    category: "Aromaterapi",
    tags: ["aromaterapi", "esansiyel yağlar", "doğal tedavi", "lavanta", "masaj"],
    featured: true,
  },
  {
    id: 3,
    title: "Cilt Bakımı ve Spa: İçeriden Dışarıya Güzellik Sırları",
    slug: "cilt-bakimi-ve-spa-guzellik-sirlari",
    excerpt: "Sağlıklı ve parlak bir cilt için spa bakımları, beslenme önerileri ve günlük cilt bakım rutinleri. Anti-aging, nemlendirme ve detoks teknikleri.",
    content: `Güzel bir cilt, iyi bir cilt bakım rutini, doğru beslenme ve profesyonel spa tedavilerinin kombinasyonuyla elde edilir. 

**Cilt Tipleri ve Özel Bakım İhtiyaçları:**

**Yağlı Cilt:** Düzenli derin temizlik maskeleri, hafif nemlendiriciler ve dengeleyici tonikler. Spa'da uygulanan hidra-facial tedavileri yağlı cilt için idealdir.

**Kuru Cilt:** Yoğun nemlendirme, hyaluronik asit içeren serumlar ve zengin yağlar. Nemlendiricili yüz maskeleri ve cilt terapileri önemlidir.

**Karma Cilt:** T-bölgesine özel uygulamalar, dengeleyici tedaviler. Özelleştirilmiş yüz bakımları gerektirir.

**Hassas Cilt:** Doğal ve organik ürünler, papatya ve aloe vera içeren formüller. Hassas cilt için özel spa protokolleri uygulanmalıdır.

**Spa'da Uygulanan Cilt Bakım Tedavileri:**

**1. Hydra Facial:** Derin temizlik, peeling ve yoğun nemlendirmeyi bir arada sunar. Cilt hemen parlaklaşır.

**2. Mikrodermabrazyon:** Ölü derinin nazikçe uzaklaştırılması, yeni hücrelerin ortaya çıkması. Anti-aging için etkilidir.

**3. Oksijen Terapisi:** Cilde oksijen pompalanarak hücre yenilenmesi hızlandırılır. Anında canlı ve parlak görünüm.

**4. LED Işık Terapisi:** Kırmızı ışık kolajen üretimini artırır, mavi ışık akneleri azaltır. Bilimsel olarak kanıtlanmış yöntemdir.

**5. Altın Maske Uygulaması:** Lüks anti-aging bakımı. 24 ayar altın cilt tonunu eşitler ve sıkılaştırır.

**6. Cilt Peeling Uygulamaları:** Kimyasal veya doğal asitlerle cildin yenilenmesi. Leke tedavisi ve parlak cilt için etkili.

**7. Collagen Boost Tedavisi:** Kolajen üretimini artıran özel serumlar ve masajlar. Yaşlanma belirtilerini azaltır.

**Beslenme ve Cilt Sağlığı:**
- Bol su tüketimi (günde 2-3 litre)
- Omega-3 yağ asitleri (somon, ceviz)
- Antioksidanlar (yeşil çay, böğürtlen, nar)
- Vitamin C (turunçgiller, kivi)
- Vitamin E (badem, avokado)
- Kolajen destekleyici gıdalar

**Günlük Cilt Bakım Rutini:**
**Sabah:** Temizleme, tonik, serum, göz çevresi kremi, nemlendirici, SPF 30+ güneş kremi
**Akşam:** Makyaj temizleme, derin temizlik, tonik, serum, gece kremi, göz çevresi kremi

**Luna Wellness Center Cilt Bakım Programları:**
Size özel hazırlanan cilt analizi sonrası, cildinizin ihtiyaçlarına yönelik özelleştirilmiş programlar sunuyoruz. Tüm tedavilerimiz dermatolojik olarak test edilmiş ürünlerle yapılmaktadır.`,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
    author: "Mehmet Özkan",
    authorTitle: "Dermatoloji Uzmanı",
    date: "10 Ocak 2026",
    readTime: "12 dk",
    category: "Cilt Bakımı",
    tags: ["cilt bakımı", "anti-aging", "spa", "güzellik", "yüz bakımı", "hydra facial"],
    featured: true,
  },
  {
    id: 4,
    title: "İsveç Masajı: Klasik Masaj Tekniklerinin Terapötik Faydaları",
    slug: "isvec-masaji-klasik-masaj-teknikleri",
    excerpt: "Dünyanın en popüler masaj türü olan İsveç masajının tekniğini, faydalarını ve uygulama şekillerini detaylı olarak öğrenin. Kas rahatlama, kan dolaşımı ve detoks.",
    content: `İsveç masajı (Swedish Massage), dünya genelinde en yaygın uygulanan klasik masaj tekniğidir. 19. yüzyılda Pehr Henrik Ling tarafından geliştirilen bu yöntem, beş temel hareket üzerine kuruludur.

**İsveç Masajının Temel Teknikleri:**

**1. Effleurage (Sıvazlama):** Uzun, akıcı hareketlerle kaslar ısıtılır ve kan dolaşımı artırılır. Masajın başlangıcı ve bitişinde kullanılır.

**2. Petrissage (Yoğurma):** Kaslar nazikçe yoğrulur, sıkılır ve gerilir. Derin kas dokusuna ulaşarak gerginliği çözer.

**3. Friction (Sürtme):** Derin dairesel hareketlerle kas liflerine ulaşılır. Özellikle sırt ve omuz bölgesinde etkilidir.

**4. Tapotement (Vurma):** Ritmik vuruş hareketleriyle kaslar uyarılır ve tonlanır. Enerji verici etkisi vardır.

**5. Vibration (Titreşim):** Kaslara titreşim verilerek gevşeme sağlanır. Rahatlatıcı ve sakinleştirici etkisi vardır.

**İsveç Masajının Sağlık Faydaları:**

**Fiziksel Faydalar:**
- Kas gerginliği ve ağrılarını azaltır
- Kan dolaşımını artırır
- Lenfatik sistemin çalışmasını destekler
- Eklem esnekliğini artırır
- Bağışıklık sistemini güçlendirir
- Vücut toksinlerinin atılımını hızlandırır
- Kas yaralanmalarının iyileşmesini destekler
- Postür bozukluklarını düzeltmeye yardımcı olur

**Psikolojik Faydalar:**
- Stres ve anksiyeteyi azaltır
- Uyku kalitesini artırır
- Serotonin ve dopamin seviyelerini yükseltir
- Mental berraklık sağlar
- Genel refah hissini artırır

**İsveç Masajı Seansı Nasıl İlerler?**

**1. Hazırlık:** Terapist, özel ihtiyaçlarınızı ve ağrı bölgelerinizi sorar.

**2. Ortam:** Rahat, sıcak bir odada, sakinleştirici müzik eşliğinde masaj yapılır.

**3. Yağlar:** Doğal masaj yağları veya aromaterapi yağları kullanılır.

**4. Süre:** Genellikle 60-90 dakika sürer.

**5. Basınç:** Orta şiddette bir basınç uygulanır, isteğe göre ayarlanabilir.

**Kimler İsveç Masajı Yaptırmalı?**
- İlk kez masaj deneyimi yaşayacak olanlar
- Kronik stres ve gerginlik yaşayanlar
- Masa başı çalışanlar
- Atletler ve sporcular
- Uyku problemi olanlar
- Genel rahatlama arayanlar

**Luna Wellness Center İsveç Masajı:**
Sertifikalı masaj terapistlerimiz, geleneksel İsveç masajı tekniklerini modern wellness anlayışıyla birleştirerek size özel seanslar hazırlıyor. Organik masaj yağları ve aromaterapi eklentileriyle deneyiminizi zenginleştiriyoruz.`,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80",
    author: "Can Yılmaz",
    authorTitle: "Masaj Terapisti",
    date: "8 Ocak 2026",
    readTime: "9 dk",
    category: "Masaj Terapisi",
    tags: ["İsveç masajı", "masaj", "terapi", "kas gevşetme", "rahatlama"],
  },
  {
    id: 5,
    title: "Derin Doku Masajı: Kronik Ağrı ve Gerginlik Tedavisi",
    slug: "derin-doku-masaji-kronik-agri-tedavisi",
    excerpt: "Kronik kas ağrıları, spor yaralanmaları ve derin kas gerginliği için etkili tedavi yöntemi. Derin doku masajının teknikleri ve iyileşme süreci.",
    content: `Derin doku masajı (Deep Tissue Massage), kas dokusunun derin katmanlarına odaklanan terapötik bir masaj tekniğidir. Özellikle kronik ağrı ve gerginlik problemlerinde son derece etkilidir.

**Derin Doku Masajı Nasıl Çalışır?**

Bu teknik, yavaş ve derin basınçla kas liflerinin, fasyanın (kas zarının) ve tendonların tedavi edilmesini içerir. Terapist, parmakları, yumrukları, dirsekleri ve hatta ön kollarını kullanarak kas dokusunun derinliklerine iner.

**Tedavi Edilen Durumlar:**
- Kronik bel ağrısı
- Boyun ve omuz gerginliği
- Siyatik sinir ağrısı
- Fibromiyalji
- Plantar fasiit
- Tennis elbow
- Spor yaralanmaları
- Postür bozuklukları
- Tekrarlayan hareket yaralanmaları

**Derin Doku vs İsveç Masajı:**
İsveç masajı rahatlatıcı ve yüzeysel iken, derin doku masajı terapötik ve derin odaklıdır. Derin doku masajı daha yoğun ve bazen hafif rahatsızlık verebilir, ancak sonuçları uzun süreli ve iyileştiricidir.

**Masaj Tekniği ve Uygulama:**

**1. Değerlendirme:** Terapist, ağrı noktalarını ve hareket kısıtlılıklarını değerlendirir.

**2. Isınma:** Önce yüzeysel dokular ısıtılır.

**3. Derin Baskı:** Yavaş, kademeli olarak derin dokulara inilir.

**4. Trigger Point Terapisi:** Ağrı noktalarına özel baskı uygulanır.

**5. Germe:** Kaslar pasif olarak gerilir ve esneklik kazandırılır.

**Masajdan Sonra Ne Beklemeli?**
- İlk 24-48 saat boyunca hafif ağrı ve hassasiyet normal karşılanmalıdır
- Bol su içilmeli (toksin atılımı için)
- Hafif esneme egzersizleri yapılabilir
- Sıcak duş veya banyo faydalıdır
- Yorucu fiziksel aktivitelerden kaçınılmalıdır

**Ne Sıklıkla Yapılmalı?**
Kronik problemler için haftada bir veya iki haftada bir seanslar önerilir. Bakım amaçlı ayda bir yeterlidir.

**Luna Wellness Center Derin Doku Masajı:**
Uzman terapistlerimiz, anatomik bilgi ve deneyimleriyle size özel tedavi planları hazırlar. Her seans öncesi detaylı değerlendirme yapılır ve terapi sürecinde düzenli takip edilirsiniz.`,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
    author: "Elif Şahin",
    authorTitle: "Fizik Tedavi Uzmanı",
    date: "5 Ocak 2026",
    readTime: "10 dk",
    category: "Masaj Terapisi",
    tags: ["derin doku masajı", "ağrı tedavisi", "kronik ağrı", "spor masajı", "terapi"],
  },
  {
    id: 6,
    title: "Hamam ve Türk Banyosu: Geleneksel Detoks ve Arınma Ritüeli",
    slug: "hamam-turk-banyosu-detoks-ritueli",
    excerpt: "Yüzyıllardır süregelen Türk hamam kültürünün sağlık faydaları, detoks etkisi ve modern spa uygulamalarıyla birleşimi. Kese, köpük ve masaj.",
    content: `Türk hamamı, binlerce yıllık bir kültürel miras ve eşsiz bir wellness deneyimidir. Bu geleneksel temizlik ve arınma ritüeli, modern spa endüstrisinin vazgeçilmez bir parçası haline gelmiştir.

**Türk Hamamının Tarihi:**
Osmanlı döneminden günümüze gelen hamam kültürü, hem fiziksel temizlik hem de sosyalleşme merkezi olmuştur. Bugün, geleneksel yöntemler modern wellness teknikleriyle birleştirilmiştir.

**Hamam Ritüeli Aşamaları:**

**1. Sıcaklık (Hararet):**
Hamam, sıcak ve nemli bir ortamdır (40-50°C). Bu sıcaklık vücut porlarını açar, kan dolaşımını artırır ve kasları gevşetir. İlk 10-15 dakika sadece sıcaklığa alışmak için beklenir.

**2. Kese:**
Kaba dokulu bir keseyle (exfoliating mitt) vücudun tüm bölgeleri ovulur. Bu işlem:
- Ölü deri hücrelerini temizler
- Kan dolaşımını uyarır
- Cildi yeniler ve parlatır
- Lenfatik drenajı destekler

**3. Köpük Sabunu:**
Özel dokuma bir bez torba (peştamal) ile zengin, kremsi köpük oluşturulur. Bu köpük:
- Cildi derinlemesine temizler
- Nemlendirici etki sağlar
- Rahatlık ve lüks hissi verir

**4. Yıkama:**
Bol ılık su ile köpük temizlenir. Geleneksel taş kurna ve bakır tas kullanılır.

**5. Masaj:**
Hamam masajı, sıcak mermer üzerinde yapılır. Bu masaj:
- Kasları gevşetir
- Eklemleri rahatlatır
- Detoks sürecini tamamlar
- Derin rahatlama sağlar

**6. Dinlenme:**
Soğuk odada (soğukluk) dinlenilir. Çay, meyve suları tüketilir.

**Hamam'ın Sağlık Faydaları:**

**Detoksifikasyon:** Terleme yoluyla toksinler atılır. Lenfatik sistem aktive olur.

**Cilt Yenilenmesi:** Ölü deri hücreleri uzaklaştırılır, cilt daha parlak ve pürüzsüz olur.

**Kas Gevşemesi:** Sıcaklık ve masaj kombinasyonu kasları derinlemesine rahatlatır.

**Kan Dolaşımı:** Sıcaklık ve kese işlemi kan dolaşımını %20-30 oranında artırır.

**Solunum Sistemi:** Nemli sıcak hava solunum yollarını açar, sinüzit ve alerjilerde rahatlatıcıdır.

**Stres Azaltma:** Geleneksel ritüel, meditasyon etkisi yaratır ve stresi azaltır.

**Bağışıklık Sistemi:** Düzenli hamam seansları bağışıklığı güçlendirir.

**Modern Hamam Uygulamaları:**
Luna Wellness Center'da, geleneksel Türk hamamı deneyimini lüks spa uygulamalarıyla birleştiriyoruz:
- Aromaterapi esanslı su buharı
- Altın ve gümüş parçacıklı özel köpük
- Derin doku masajı entegrasyonu
- Organik cilt bakım ürünleri
- Özel dinlenme alanları ve sağlıklı atıştırmalıklar

**Kimler Hamama Gidebilir?**
Neredeyse herkes hamam deneyimi yaşayabilir. Ancak:
- Yüksek tansiyon hastalarına dikkatli yaklaşılmalı
- Kalp rahatsızlığı olanlar doktor tavsiyesi almalı
- Hamile kadınlar sıcaklık seviyesine dikkat etmeli

**Ne Sıklıkla Hamama Gidilmeli?**
Haftada bir veya iki haftada bir seanslar ideal cilt yenilenmesi ve detoks için önerilir.`,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80",
    author: "Fatma Yıldız",
    authorTitle: "Geleneksel Hamam Uzmanı",
    date: "3 Ocak 2026",
    readTime: "11 dk",
    category: "Hamam & Spa",
    tags: ["hamam", "türk banyosu", "detoks", "kese", "spa ritueli", "geleneksel"],
  },
  {
    id: 7,
    title: "Refleksoloji: Ayaklardaki Şifa Noktaları ve Tedavi Yöntemi",
    slug: "refleksoloji-ayak-masaji-sifa-noktalari",
    excerpt: "Ayak refleksolojisi ile vücuttaki tüm organları etkileme tekniği. Akupresür noktaları, enerji akışı ve holistik tedavi yaklaşımı.",
    content: `Refleksoloji, ayaklardaki belirli noktalara uygulanan baskının vücuttaki ilgili organları ve sistemleri etkilediği antik bir şifa yöntemidir. Bu holistik terapi, Çin tıbbı ve Hint Ayurveda geleneğinden gelmektedir.

**Refleksoloji Nedir?**

Refleksoloji teorisine göre, ayaklar vücudun bir mikro haritasıdır. Her nokta, belirli bir organ, bez veya vücut bölümüne karşılık gelir. Bu noktalara uygulanan baskı:
- İlgili organın fonksiyonunu iyileştirir
- Enerji akışını dengeler
- Doğal şifa süreçlerini aktive eder
- Homeostaz (iç denge) sağlar

**Ayak Refleksoloji Haritası:**

**Ayak Parmakları:** Baş, beyin, sinüsler, dişler
**Ayak Tabanı (Üst Bölüm):** Akciğerler, kalp, göğüs bölgesi
**Ayak Kavsi:** Mide, dalak, karaciğer, pankreas, böbrekler
**Topuk Bölgesi:** Bağırsaklar, pelvis, siyatik sinir
**İç Kenar:** Omurga
**Dış Kenar:** Omuz, kol, diz, bacak

**Refleksolojinin Sağlık Faydaları:**

**1. Stres ve Anksiyete Azaltma**
Refleksoloji, sinir sistemini sakinleştirir ve parasempatik sistemi aktive eder. Araştırmalar, kortizol (stres hormonu) seviyelerini düşürdüğünü göstermektedir.

**2. Ağrı Yönetimi**
Baş ağrısı, migren, sırt ağrısı gibi kronik ağrılarda etkilidir. Endorfin salınımını artırır.

**3. Sindirim Sistemi Desteği**
Mide, bağırsak ve karaciğer noktalarına yapılan masaj, sindirim problemlerini hafifletir.

**4. Uyku Kalitesi**
Düzenli refleksoloji seansları, uyku düzenini iyileştirir ve insomnia tedavisinde destekleyicidir.

**5. Kan Dolaşımı ve Lenfatik Drenaj**
Özellikle ayaklarda şişlik ve dolaşım problemleri yaşayanlarda faydalıdır.

**6. Hormonal Denge**
Endokrin sistem noktalarına yapılan çalışma, hormonal dengeyi destekler.

**7. Bağışıklık Güçlendirme**
Lenf sistemi ve bağışıklık organlarının refleks noktaları çalışılır.

**Refleksoloji Seansı Nasıl Geçer?**

**1. Danışma:** Sağlık geçmişi, mevcut şikayetler ve hedefler sorulur.

**2. Ayak İncelemesi:** Ayaklar gözle muayene edilir, hassas bölgeler tespit edilir.

**3. Rahatlama:** Rahat bir koltuğa oturup ayaklar yükseltilir.

**4. Başlangıç Masajı:** Ayaklar rahatlatıcı şekilde masaj edilir.

**5. Refleks Noktalarına Çalışma:** Başparmak ve parmak uçlarıyla belirli noktalara kademeli baskı uygulanır.

**6. Bitiş:** Yumuşak hareketlerle seans sonlandırılır.

**7. Süre:** 45-60 dakika sürer.

**Refleksoloji Sonrası:**
- Hafif baş dönmesi veya enerji hissi normaldir
- Bol su içilmeli
- Birkaç saat dinlenme önerilir
- Bazı kişilerde detoks belirtileri (hafif mide bulantısı, baş ağrısı) görülebilir - bu olumludur

**Kimler Refleksoloji Yaptırabilir?**
- Kronik stres yaşayanlar
- Uyku problemleri olanlar
- Sindirim sorunları yaşayanlar
- Hormonal dengesizlik yaşayanlar
- Genel wellness arayanlar

**Dikkat Edilmesi Gerekenler:**
- Ayaklarda açık yara veya enfeksiyon varsa yapılmamalı
- Tromboz veya ciddi dolaşım problemlerinde dikkatli olunmalı
- Hamileliğin ilk trimesterinde dikkatli yaklaşılmalı

**Luna Wellness Center Refleksoloji:**
Uzman refleksologlarımız, geleneksel teknikleri modern wellness anlayışıyla birleştirerek size özel seanslar hazırlıyor.`,
    image: "https://images.unsplash.com/photo-1556817411-31f11679f242?w=1200&q=80",
    author: "Hakan Arslan",
    authorTitle: "Refleksoloji Uzmanı",
    date: "1 Ocak 2026",
    readTime: "10 dk",
    category: "Holistik Terapi",
    tags: ["refleksoloji", "ayak masajı", "akupresür", "holistik tedavi", "şifa"],
  },
  {
    id: 8,
    title: "Yoga ve Meditasyon: Zihin-Beden Bağlantısının Gücü",
    slug: "yoga-meditasyon-zihin-beden-baglantisi",
    excerpt: "Yoga ve meditasyon pratiklerinin fiziksel, mental ve ruhsal faydaları. Spa wellness programlarında yoga entegrasyonu ve günlük pratik önerileri.",
    content: `Yoga ve meditasyon, binlerce yıllık geçmişe sahip antik pratiklerdir. Modern wellness endüstrisinde, bu uygulamalar spa terapileriyle birleştirilerek bütünsel şifa deneyimleri yaratılmaktadır.

**Yoga Nedir?**

Yoga, Sanskrit dilinde "birleşme, bütünleşme" anlamına gelir. Fiziksel pozlar (asana), nefes teknikleri (pranayama) ve meditasyon kombinasyonudur.

**Yoga Türleri:**

**Hatha Yoga:** Temel pozların öğrenildiği, yavaş tempolu, başlangıç dostu yoga türüdür.

**Vinyasa Yoga:** Nefesle senkronize akıcı hareketler. Daha dinamik ve enerji vericidir.

**Yin Yoga:** Pasif, uzun süreli pozlar. Derin esneme ve rahatlama sağlar. Spa ortamında idealdir.

**Restorative Yoga:** Destekleyici malzemelerle yapılan, tamamen rahatlatıcı yoga. Stres ve tükenmişlik için mükemmeldir.

**Kundalini Yoga:** Enerji çalışması, nefes teknikleri ve mantralar içerir.

**Yoga'nın Fiziksel Faydaları:**
- Esneklik ve hareket genişliği artışı
- Kas gücü ve tonlaşma
- Postür düzeltme
- Denge ve koordinasyon geliştirme
- Eklem sağlığı
- Kronik ağrı azaltma (özellikle bel ve boyun)
- Kalp-damar sistemi sağlığı
- Solunum kapasitesi artışı

**Yoga'nın Psikolojik Faydaları:**
- Stres ve anksiyete azaltma
- Depresyon belirtilerini hafifletme
- Uyku kalitesi artırma
- Odaklanma ve konsantrasyon geliştirme
- Öz-farkındalık artışı
- Duygusal denge
- Zihinsel berraklık

**Meditasyon Nedir?**

Meditasyon, zihnin belli bir odak noktasında durulması, düşüncelerin gözlemlenmesi ve içsel huzura ulaşma pratiğidir.

**Meditasyon Türleri:**

**Mindfulness (Farkındalık) Meditasyonu:** Şimdiki ana odaklanma, düşünceleri yargılamadan gözlemleme.

**Nefes Meditasyonu:** Nefesin gözlemlenmesi ve farkındalığın nefeste tutulması.

**Beden Taraması:** Vücudun her bölümüne sırayla farkındalık götürme.

**Mantra Meditasyonu:** Belirli bir sözcük veya ses tekrarı.

**Guided Meditation (Rehberli Meditasyon):** Bir eğitmenin rehberliğinde yapılan meditasyon.

**Meditasyonun Bilimsel Faydaları:**

**Beyin Değişiklikleri:** MRI çalışmaları, düzenli meditasyonun beyin yapısını değiştirdiğini göstermiştir. Prefrontal korteks (karar verme) kalınlaşır, amigdala (korku merkezi) küçülür.

**Stres Azaltma:** Kortizol seviyelerinde %14-50 azalma.

**Bağışıklık:** Düzenli meditasyon yapanların antikor üretimi daha yüksektir.

**Kalp Sağlığı:** Tansiyon düşürücü etki, kalp hastalığı riskini azaltma.

**Ağrı Yönetimi:** Kronik ağrıda %57'ye kadar azalma.

**Yaşlanma:** Telomer (yaşlanma belirteci) uzunluğunu koruma.

**Spa'da Yoga ve Meditasyon:**

Luna Wellness Center'da yoga ve meditasyon, spa tedavilerinize entegre edilir:

**Sabah Yoga Seansları:** Güne huzurlu başlama.
**Meditasyon Odası:** Özel sessiz mekan.
**Yoga + Masaj Paketi:** Yoga sonrası derin doku masajı.
**Wellness Retreat:** Çok günlük yoga, meditasyon ve spa kombinasyonu.

**Evde Yoga ve Meditasyon Pratiği:**

**Başlangıç için:**
- Günde 10 dakika ile başlayın
- Sakin, rahat bir mekan seçin
- Sabah veya akşam, düzenli bir saat belirleyin
- Beklentisiz olun, süreç önemlidir

**Basit Meditasyon Egzersizi:**
1. Rahat oturun, sırtınız dik
2. Gözlerinizi kapatın
3. Nefes alın, verin - sadece gözlemleyin
4. Düşünceler gelecek - yargılamadan izleyin
5. Nazikçe tekrar nefese dönün
6. 10 dakika devam edin

**Temel Yoga Pozları:**
- Dağ Duruşu (Tadasana)
- Köpek Duruşu (Adho Mukha Svanasana)
- Çocuk Pozu (Balasana)
- Kedi-İnek (Marjaryasana-Bitilasana)
- Bacakları Yukarı Duruş (Viparita Karani)

Bu pratikler, spa deneyiminizi derinleştirir ve günlük yaşamınıza taşıyabileceğiniz araçlar sunar.`,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    author: "Selin Kaya",
    authorTitle: "Yoga & Meditasyon Eğitmeni",
    date: "29 Aralık 2025",
    readTime: "13 dk",
    category: "Yoga & Meditasyon",
    tags: ["yoga", "meditasyon", "mindfulness", "wellness", "zihin-beden", "stres"],
  },
];

// Tüm kategorileri çıkar
const allCategories = ["Tümü", ...new Set(blogPosts.map((post) => post.category))];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  // Sayfa yüklendiğinde en üste scroll et
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtrelenmiş blog yazıları
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Tümü" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Blog detay görünümü
  if (selectedPost) {
    // Convert date to ISO format for structured data
    const convertDateToISO = (dateStr) => {
      const months = {
        'Ocak': '01', 'Şubat': '02', 'Mart': '03', 'Nisan': '04',
        'Mayıs': '05', 'Haziran': '06', 'Temmuz': '07', 'Ağustos': '08',
        'Eylül': '09', 'Ekim': '10', 'Kasım': '11', 'Aralık': '12'
      };
      const parts = dateStr.split(' ');
      const day = parts[0].padStart(2, '0');
      const month = months[parts[1]];
      const year = parts[2];
      return `${year}-${month}-${day}`;
    };

    const articleSchema = generateArticleSchema({
      title: selectedPost.title,
      excerpt: selectedPost.excerpt,
      image: selectedPost.image,
      datePublished: convertDateToISO(selectedPost.date),
      dateModified: convertDateToISO(selectedPost.date),
      author: selectedPost.author,
      authorTitle: selectedPost.authorTitle,
      slug: selectedPost.slug,
      tags: selectedPost.tags
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: "Ana Sayfa", url: "https://luminya.com/" },
      { name: "Blog", url: "https://luminya.com/blog" },
      { name: selectedPost.title, url: `https://luminya.com/blog/${selectedPost.slug}` }
    ]);

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [breadcrumbSchema, articleSchema]
    };

    return (
      <div className="min-h-screen bg-cream">
        <SEO
          title={`${selectedPost.title} | Luminya Wellness Blog`}
          description={selectedPost.excerpt}
          keywords={selectedPost.tags.join(", ")}
          canonical={`/blog/${selectedPost.slug}`}
          ogImage={selectedPost.image}
          ogType="article"
          author={selectedPost.author}
          publishedTime={convertDateToISO(selectedPost.date)}
          structuredData={structuredData}
        />

        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-espresso/90 via-espresso/50 to-transparent" />
          
          {/* Geri Dön Butonu */}
          <motion.button
            onClick={() => setSelectedPost(null)}
            className="absolute top-8 left-8 flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-espresso rounded-full hover:bg-white transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span className="font-medium">Geri Dön</span>
          </motion.button>

          {/* Başlık ve Meta */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              <motion.span
                className="inline-block px-4 py-2 bg-olive text-white text-sm font-semibold rounded-full mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selectedPost.category}
              </motion.span>
              <motion.h1
                className="font-heading text-3xl md:text-5xl font-light text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {selectedPost.title}
              </motion.h1>
              <motion.div
                className="flex flex-wrap items-center gap-6 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{selectedPost.readTime} okuma</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* İçerik */}
        <article className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-espresso/80 leading-relaxed whitespace-pre-line">
              {selectedPost.content}
            </div>
          </motion.div>

          {/* Etiketler */}
          <motion.div
            className="mt-12 pt-8 border-t border-espresso/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <Tag className="w-5 h-5 text-olive" />
              {selectedPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-olive/10 text-olive text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Yazar Bilgisi */}
          <motion.div
            className="mt-12 p-8 bg-espresso/5 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-olive/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-olive" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-espresso font-medium">
                  {selectedPost.author}
                </h3>
                <p className="text-espresso/60">{selectedPost.authorTitle}</p>
              </div>
            </div>
          </motion.div>
        </article>

        {/* İlgili Yazılar */}
        <section className="bg-espresso/5 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-heading text-3xl text-espresso mb-8 text-center">
              İlgili Yazılar
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts
                .filter((post) => post.id !== selectedPost.id)
                .slice(0, 3)
                .map((post) => (
                  <motion.article
                    key={post.id}
                    onClick={() => {
                      setSelectedPost(post);
                      window.scrollTo(0, 0);
                    }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-soft cursor-pointer hover:shadow-elevated transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg text-espresso mb-2 group-hover:text-olive transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-espresso/70 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </motion.article>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Blog liste görünümü
  
  // Blog list structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "https://luminya.com/" },
    { name: "Blog", url: "https://luminya.com/blog" }
  ]);

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Luminya Wellness Blog",
    "description": "Spa, wellness, masaj terapileri ve sağlıklı yaşam hakkında uzman yazıları",
    "url": "https://luminya.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Luminya Wellness Center",
      "logo": {
        "@type": "ImageObject",
        "url": "https://luminya.com/logo.png"
      }
    },
    "blogPost": blogPosts.slice(0, 8).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.image,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.date,
      "keywords": post.tags.join(", ")
    }))
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, blogListSchema]
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Wellness Blog | Luminya Wellness Center - Sağlık, Güzellik ve Spa Rehberi"
        description="Masaj terapileri, aromaterapi, cilt bakımı, hamam ritüelleri, yoga ve meditasyon hakkında uzman yazıları. Luminya Wellness Center'dan sağlık ve güzellik önerileri. Stres yönetimi, detoks, holistik tedavi rehberleri."
        keywords="wellness blog, spa blog, masaj terapisi, aromaterapi, cilt bakımı, hamam, türk banyosu, yoga, meditasyon, stres yönetimi, sağlıklı yaşam, güzellik önerileri, spa terapileri, holistik tedavi, detoks, refleksoloji, derin doku masajı, hot stone"
        canonical="/blog"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative bg-espresso py-20 md:py-32 overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-olive/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-olive/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-olive/30 rounded-full text-sm font-medium text-olive mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              WELLNESS BLOG
            </motion.span>
            <h1 className="font-heading text-4xl md:text-6xl font-light text-white mb-6">
              Sağlık & Güzellik{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Rehberi</span>
                <motion.span
                  className="absolute inset-0 bg-olive/40 -skew-x-6 rounded"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
              Masaj terapileri, aromaterapi, cilt bakımı, hamam ritüelleri ve daha
              fazlası hakkında uzman görüşleri ve wellness önerileri
            </p>
          </motion.div>

          {/* Arama */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/40" />
              <input
                type="text"
                placeholder="Blog yazılarında ara... (aromaterapi, masaj, cilt bakımı vb.)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-full text-espresso placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-olive shadow-elevated"
              />
            </div>
          </motion.div>

          {/* Kategori Filtreleri */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-olive text-white shadow-soft"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Yazıları Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-espresso/60 text-lg">
                Aradığınız kriterlere uygun blog yazısı bulunamadı.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  onClick={() => {
                    setSelectedPost(post);
                    window.scrollTo(0, 0);
                  }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft cursor-pointer hover:shadow-elevated border border-espresso/5"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -10 }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                      <div className="absolute inset-0 bg-linear-to-t from-espresso/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Featured badge */}
                    {post.featured && (
                      <motion.span
                        className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-espresso text-xs font-bold rounded-full shadow-md"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        ÖNE ÇIKAN
                      </motion.span>
                    )}

                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-olive text-white text-xs font-semibold rounded-full shadow-md backdrop-blur-sm">
                      {post.category}
                    </span>
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
                    <p className="text-espresso/70 mb-4 line-clamp-3">{post.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-1 bg-olive/10 text-olive rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-espresso/10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-olive/15 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-olive" />
                        </div>
                        <span className="text-sm font-medium text-espresso">
                          {post.author}
                        </span>
                      </div>
                      <motion.span
                        className="flex items-center gap-1 text-olive font-medium text-sm"
                        whileHover={{ x: 5 }}
                      >
                        Devamını Oku
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* SEO Footer Content */}
      <section className="bg-espresso/5 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-espresso mb-6">
            Luna Wellness Blog'da Neler Var?
          </h2>
          <div className="text-espresso/70 leading-relaxed space-y-4">
            <p>
              <strong>Masaj Terapileri:</strong> İsveç masajı, derin doku masajı, sıcak
              taş terapisi, aromaterapi masajı ve daha fazlası hakkında detaylı
              bilgiler.
            </p>
            <p>
              <strong>Cilt Bakımı:</strong> Anti-aging bakımları, hydra facial, altın
              maske, LED ışık terapisi ve profesyonel cilt bakım önerileri.
            </p>
            <p>
              <strong>Hamam & Spa:</strong> Geleneksel Türk hamamı, kese-köpük
              ritüelleri, detoks programları ve hidroterapi uygulamaları.
            </p>
            <p>
              <strong>Holistik Tedaviler:</strong> Refleksoloji, akupresür, reiki ve
              enerji dengeleme teknikleri.
            </p>
            <p>
              <strong>Wellness & Yaşam:</strong> Yoga, meditasyon, sağlıklı beslenme,
              stres yönetimi ve dengeli yaşam önerileri.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
