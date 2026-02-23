# PayTR Ödeme Entegrasyonu Kurulumu

## 1. Vercel Ortam Değişkenleri

Vercel Dashboard > Project > Settings > Environment Variables bölümüne ekleyin:

| Değişken | Açıklama |
|----------|----------|
| `PAYTR_MERCHANT_ID` | PayTR Mağaza No |
| `PAYTR_MERCHANT_KEY` | PayTR API Key |
| `PAYTR_MERCHANT_SALT` | PayTR API Salt |
| `PAYTR_TEST_MODE` | Test için `1`, canlı için `0` |
| `SITE_URL` | Site URL (örn: `https://luminya.com`) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Firebase Admin JSON (callback için) |

## 2. PayTR Mağaza Paneli Ayarları

- **Destek & Kurulum > Ayarlar > Bildirim URL:**  
  `https://siteniz.com/api/paytr-callback`

## 3. Firebase Service Account

1. Firebase Console > Project Settings > Service Accounts
2. "Generate new private key" ile JSON indirin
3. JSON içeriğini tek satır olarak `FIREBASE_SERVICE_ACCOUNT_JSON` değişkenine yapıştırın

## 4. Firestore İndeksi

`firestore.indexes.json` dosyası mevcut. Deploy için:

```bash
firebase deploy --only firestore:indexes
```

Veya Firebase Console'dan ilk sipariş sorgusu çalıştığında otomatik oluşturma linki çıkar.

## 5. Firestore Güvenlik Kuralları

`firestore.rules` dosyasını Firebase'e deploy edin:

```bash
firebase deploy --only firestore:rules
```

Kurallar:
- **users**: Sadece kendi profili okunup yazılabilir
- **orders**: Sadece kendi siparişleri okunabilir, sadece kendisi için sipariş oluşturulabilir
- **branches / campaigns**: Herkes okuyabilir, giriş yapmış kullanıcılar yazabilir
- **rateLimits / idempotencyKeys**: Sadece API (backend) erişir

## 6. Güvenlik Özellikleri

- **Veri Validasyonu**: Zod ile schema doğrulama (items, total, email, vb.)
- **Idempotency**: Aynı `Idempotency-Key` ile tekrarlanan isteklerde önbelleğe alınmış yanıt döner (çift tıklama önleme)
- **Rate Limiting**: IP başına dakikada 10 istek limiti
