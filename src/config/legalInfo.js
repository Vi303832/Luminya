/**
 * Sözleşmeler ve yasal metinler için merkezi bilgi config'i.
 * SOZLESMELER_GEREKLI_BILGILER.md dosyasındaki bilgileri buraya doldurun.
 * Tüm bilgilerin doğruluğundan siz sorumlusunuz.
 */
export const LEGAL_INFO = {
  // Satıcı / Şirket Bilgileri
  companyName: 'Luminya Wellness Center',
  tradeName: 'Luminya Wellness Center', // Ticaret unvanı (gerekirse farklı)
  mersisNo: '[MERSİS_NO]',
  taxNo: '[VERGİ_NO]',
  taxOffice: '[VERGİ_DAİRESİ]',
  address: '[TAM_ADRES]',
  city: 'İstanbul',
  district: 'Şişli',
  phone: '[TELEFON]',
  email: 'info@luminyaspa.com.tr',
  kepAddress: '[KEP_ADRESİ]', // Varsa doldurun
  website: 'https://luminyaspa.com.tr',

  // İptal ve İade
  fullRefundHours: 24,
  partialRefundHoursMin: 12,
  partialRefundHoursMax: 24,
  partialRefundPercent: 50,
  noRefundHours: 12,
  refundProcessingDays: '7-10',

  // Yetkili Mahkeme (satıcının yerleşim yerine göre - city ile eşleşmeli)
  competentCourt: 'İstanbul Tüketici Mahkemeleri',
  competentConsumerArbitration: 'İstanbul Tüketici Hakem Heyeti',
};
