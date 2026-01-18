import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Send } from 'lucide-react'

const services = [
  'Thai Masajı',
  'Aromaterapi Masajı',
  'Hot Stone Masaj',
  'Cilt Bakımı Deluxe',
  'Türk Hamamı',
  'Yoga & Meditasyon',
  'Spa Paketi VIP',
  'İsveç Masajı',
  'Refleksoloji',
  'Derin Doku Masajı',
]

function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Rezervasyon talebiniz alınmıştır. En kısa sürede size dönüş yapacağız.')
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      message: '',
    })
  }

  const inputClasses =
    'w-full pl-12 pr-4 py-4 bg-white border border-stone-dark rounded-lg font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all duration-300'

  return (
    <section id="reservation" className="py-16 md:py-24 bg-stone-light">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 bg-olive/10 rounded-full text-sm font-medium text-olive mb-4">
            REZERVASYON
          </span>
          <h2 className="font-heading text-4xl font-normal text-text-primary mb-4">Rezervasyon Yapın</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Hemen randevu alın ve kendinizi şımartmaya başlayın
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Adınız Soyadınız"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
                required
              />
            </motion.div>

            {/* Phone */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="tel"
                placeholder="Telefon Numaranız"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClasses}
                required
              />
            </motion.div>

            {/* Email */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="email"
                placeholder="E-posta Adresiniz"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
                required
              />
            </motion.div>

            {/* Service */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className={`${inputClasses} pl-4 appearance-none cursor-pointer`}
                required
              >
                <option value="">Hizmet Seçin</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Date */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={inputClasses}
                required
              />
            </motion.div>

            {/* Time */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`${inputClasses} appearance-none cursor-pointer`}
                required
              >
                <option value="">Saat Seçin</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </select>
            </motion.div>

            {/* Message */}
            <motion.div
              className="relative md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-text-muted" />
              <textarea
                placeholder="Mesajınız (Opsiyonel)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClasses} min-h-[120px] resize-none`}
                rows={4}
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
            >
              <motion.button
                type="submit"
                className="w-full bg-olive text-white py-4 rounded-lg hover:bg-olive-dark transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Rezervasyon Yap
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Reservation
