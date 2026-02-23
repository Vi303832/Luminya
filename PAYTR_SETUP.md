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
