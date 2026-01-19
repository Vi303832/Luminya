import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const BulkBranchUpload = ({ currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Gerçek şube verileri
  const branchesData = [
    {
      name: 'Revizyon Yapı Kahramanmaraş',
      district: 'Onikişubat',
      city: 'Kahramanmaraş',
      address: 'Hayrullah, Malik Ejder Cad. No:34 Onikişubat/Kahramanmaraş',
      phone: '0535 957 34 23',
      whatsapp: '0535 957 34 23',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
    },
    {
      name: 'Clarion Hotel Kahramanmaraş',
      district: 'Merkez',
      city: 'Kahramanmaraş',
      address: 'Clarion Hotel Kahramanmaraş',
      phone: '0344 000 00 00',
      whatsapp: '0344 000 00 00',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
    },
    {
      name: 'Soliport Hotel & Spa Alaçatı',
      district: 'Alaçatı',
      city: 'İzmir',
      address: 'Alaçatı, 18000 Sk No:17, 35930 Çeşme/İzmir',
      phone: '0532 499 85 23',
      whatsapp: '0532 499 85 23',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    },
    {
      name: 'Korupark AVM Bursa',
      district: 'Osmangazi',
      city: 'Bursa',
      address: 'Adnan Menderes Bulvarı Korupark AVM No:2, 16000 Osmangazi/Bursa',
      phone: '0530 048 89 26',
      whatsapp: '0542 116 16 56',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?w=800'
    },
    {
      name: 'Land Park Hotel',
      district: 'Avcılar',
      city: 'İstanbul',
      address: 'Merkez, E5, D-100 Güney Yan Yolu No:131, 34310 Avcılar/İstanbul',
      phone: '0532 679 46 23',
      whatsapp: '0532 679 46 23',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://lunadenspa.com.tr/wp-content/uploads/2022/03/avcilar-land-park.png'
    },
    {
      name: 'The Conforium Hotel İstanbul',
      district: 'Zeytinburnu',
      city: 'İstanbul',
      address: 'Gökalp, 39. Sk. No:21, 34020 Zeytinburnu/İstanbul',
      phone: '0532 379 92 23',
      whatsapp: '0532 379 92 23',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      name: 'Dedeman Şanlıurfa',
      district: 'Haliliye',
      city: 'Şanlıurfa',
      address: 'Atatürk, Meteoroloji Caddesi No:19, 63100 Haliliye/Şanlıurfa',
      phone: '0539 339 63 23',
      whatsapp: '0539 339 63 23',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
    },
    {
      name: 'Ramada by Wyndham Istanbul Merter',
      district: 'Merter',
      city: 'İstanbul',
      address: 'Luna Den Spa Ramada by Wyndham Istanbul Merter',
      phone: '0549 613 17 47',
      whatsapp: '0549 613 17 47',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    },
    {
      name: 'Pullman Otel',
      district: 'Bahçelievler',
      city: 'İstanbul',
      address: 'Yenibosna Merkez, 1. Asena Sk. No:15, 34295 Bahçelievler/İstanbul',
      phone: '0532 300 48 98',
      whatsapp: '0532 300 48 98',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    },
    {
      name: 'Ramada Otel Elazığ',
      district: 'Merkez',
      city: 'Elazığ',
      address: 'Luna Den Spa Ramada Otel Elazığ',
      phone: '0532 300 44 30',
      whatsapp: '0532 300 44 30',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    },
    {
      name: 'Euphoria Fitness Osmangazi Bursa',
      district: 'Osmangazi',
      city: 'Bursa',
      address: 'Kükürtlü, Dr. Rüştü Burlu Cd. 10/11, 16000 Osmangazi/Bursa',
      phone: '0505 858 50 65',
      whatsapp: '0505 858 50 65',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
    },
    {
      name: 'Ramada By Wyndham Çeşme',
      district: 'Çeşme',
      city: 'İzmir',
      address: 'Dalyan Mahallesi, 3394 Sokak No:42, 35930 Çeşme/İzmir',
      phone: '0531 885 93 72',
      whatsapp: '0531 885 93 72',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    },
    {
      name: 'Dolce Hotels and Resorts by Wyndham',
      district: 'Alaçatı',
      city: 'İzmir',
      address: 'Alaçatı, 18000 Sk No:4/6, 35930 Çeşme/İzmir',
      phone: '0531 885 93 73',
      whatsapp: '0531 885 93 73',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    },
    {
      name: 'Euphoria Plus Ege Park AVM',
      district: 'Balçova',
      city: 'İzmir',
      address: 'Bahçelerarası, Ege Park AVM, Mithatpaşa Cd. No:44, 35330 Balçova/İzmir',
      phone: '0542 582 61 10',
      whatsapp: '0542 582 61 10',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
    },
    {
      name: 'Latanya Hotel Ankara',
      district: 'Çankaya',
      city: 'Ankara',
      address: 'Kavaklıdere, Büklüm Cd No:1, Latanya Hotel 06660 Çankaya/Ankara',
      phone: '0530 743 64 06',
      whatsapp: '0530 743 64 06',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      name: 'Büyük Mardin Oteli',
      district: 'Artuklu',
      city: 'Mardin',
      address: 'Mahalle, Saraçoğlu, Yeni Yol Cd. No:275, 47100 Artuklu/Mardin',
      phone: '0532 134 73 97',
      whatsapp: '0532 134 73 97',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    },
    {
      name: 'Sera Lake Center Hotel Trabzon',
      district: 'Akçaabat',
      city: 'Trabzon',
      address: 'Dürbinar, Atatürk Blv. No:3, 61300 Akçaabat/Trabzon',
      phone: '0531 660 73 19',
      whatsapp: '0531 660 73 19',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
    },
    {
      name: 'The Green Park Hotel Diyarbakır',
      district: 'Sur',
      city: 'Diyarbakır',
      address: 'Gazi Cd. No:101, 21200 Sur/Diyarbakır',
      phone: '0536 402 10 00',
      whatsapp: '0536 402 10 00',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      name: 'Days Inn & Suites by Wyndham Esenyurt İstanbul',
      district: 'Esenyurt',
      city: 'İstanbul',
      address: 'Zafer, Adile Naşit Blv. No:6-10/1, 34513 Esenyurt/İstanbul',
      phone: '0554 008 12 15',
      whatsapp: '0554 008 12 15',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    },
    {
      name: 'Casa Nova Hotel İstanbul',
      district: 'Küçükçekmece',
      city: 'İstanbul',
      address: 'İkitelli OSB, Barış Sk. No:19, 34307 Küçükçekmece/İstanbul',
      phone: '0546 173 68 34',
      whatsapp: '0546 173 68 34',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      name: 'Sürmeli Hotel İstanbul',
      district: 'Şişli',
      city: 'İstanbul',
      address: 'Beşiktaş, Gayrettepe, Prof. Dr. Bülent Tarcan Sk. No:3, 34349 Şişli/İstanbul',
      phone: '0530 155 57 35',
      whatsapp: '0530 155 57 35',
      email: 'info@lunadenspa.com.tr',
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    }
  ];

  const handleBulkUpload = async () => {
    if (!window.confirm(`${branchesData.length} şube Firebase'e eklenecek. Onaylıyor musunuz?`)) {
      return;
    }

    setLoading(true);
    setResults(null);

    const uploadResults = {
      success: [],
      failed: []
    };

    try {
      for (const branch of branchesData) {
        try {
          const branchData = {
            name: branch.name,
            district: branch.district,
            city: branch.city,
            address: branch.address,
            phone: branch.phone,
            whatsapp: branch.whatsapp,
            email: branch.email,
            hours: 'Pazartesi-Cuma: 10:30-22:00, Cumartesi: 10:30-22:00, Pazar: 10:30-22:00',
            mapUrl: '',
            imageUrl: branch.imageUrl,
            createdAt: Timestamp.now(),
            createdBy: currentUser.email,
            active: true
          };

          const docRef = await addDoc(collection(db, 'branches'), branchData);
          uploadResults.success.push({ name: branch.name, id: docRef.id });
          
          // Her 5 şubede bir kısa bekleme (rate limiting için)
          if (uploadResults.success.length % 5 === 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`Error uploading ${branch.name}:`, error);
          uploadResults.failed.push({ name: branch.name, error: error.message });
        }
      }

      setResults(uploadResults);
    } catch (error) {
      console.error('Bulk upload error:', error);
      alert('Toplu yükleme sırasında bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mt-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Toplu Şube Yükleme</h3>
        <p className="text-gray-600">
          {branchesData.length} adet şube bilgisini tek seferde Firebase'e yükleyin
        </p>
      </div>

      {/* Upload Button */}
      {!results && (
        <button
          onClick={handleBulkUpload}
          disabled={loading}
          className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Yükleniyor... ({branchesData.length} şube)</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>{branchesData.length} Şubeyi Yükle</span>
            </>
          )}
        </button>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Success */}
          {results.success.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-green-800 mb-2">
                    Başarıyla Yüklendi: {results.success.length} şube
                  </p>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {results.success.map((item, index) => (
                      <p key={index} className="text-sm text-green-700">
                        ✓ {item.name} (ID: {item.id})
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Failed */}
          {results.failed.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-red-800 mb-2">
                    Başarısız: {results.failed.length} şube
                  </p>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {results.failed.map((item, index) => (
                      <p key={index} className="text-sm text-red-700">
                        ✗ {item.name}: {item.error}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={() => setResults(null)}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
          >
            Yeni Yükleme Yap
          </button>
        </div>
      )}

      {/* Preview */}
      {!loading && !results && (
        <div className="mt-6 border-t pt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Yüklenecek Şubeler (Önizleme - İlk 5):
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            {branchesData.slice(0, 5).map((branch, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold text-gray-900">{branch.name}</p>
                <p className="text-xs mt-1">
                  {branch.city} - {branch.district} | {branch.phone}
                </p>
              </div>
            ))}
            {branchesData.length > 5 && (
              <p className="text-center text-gray-500 italic pt-2">
                ... ve {branchesData.length - 5} şube daha
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkBranchUpload;
