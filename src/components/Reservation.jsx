import { useState } from 'react'

function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Rezervasyon talebiniz alınmıştır. En kısa sürede size dönüş yapacağız.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      service: '',
      message: '',
    })
  }

  return (
    <section id="contact" className="py-16 px-4 bg-stone-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-normal text-text-primary mb-4">Rezervasyon Yapın</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Huzur dolu bir deneyim için hemen randevu alın
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-normal text-text-primary mb-6">İletişim Bilgileri</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow">
                  <div className="bg-olive text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Adres</h4>
                    <p className="text-text-secondary">Nişantaşı, Teşvikiye Cad. No:123<br />Şişli, İstanbul</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow">
                  <div className="bg-olive text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Telefon</h4>
                    <p className="text-text-secondary">+90 212 123 45 67<br />+90 532 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow">
                  <div className="bg-olive text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">E-posta</h4>
                    <p className="text-text-secondary">info@ruhunuzu.com<br />rezervasyon@ruhunuzu.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow">
                  <div className="bg-olive text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Çalışma Saatleri</h4>
                    <p className="text-text-secondary">Pazartesi - Cumartesi: 09:00 - 21:00<br />Pazar: 10:00 - 19:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-stone-dark rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-dark rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-dark rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent"
                    placeholder="0532 123 45 67"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tarih *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-dark rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saat *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-dark rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hizmet *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-stone-dark rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent"
                >
                  <option value="">Hizmet seçin</option>
                  <option value="swedish">İsveç Masajı</option>
                  <option value="aromatherapy">Aromaterapi Masajı</option>
                  <option value="hotstone">Sıcak Taş Masajı</option>
                  <option value="deepissue">Derin Doku Masajı</option>
                  <option value="thai">Thai Masajı</option>
                  <option value="reflexology">Refleksoloji</option>
                  <option value="hamam">Hamam ve Kese</option>
                  <option value="package">Paket Hizmetler</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajınız
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-stone-dark rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent resize-none"
                  placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-olive text-white py-3 rounded-lg hover:bg-olive-dark transition font-medium text-lg"
              >
                Rezervasyon Talebi Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reservation
