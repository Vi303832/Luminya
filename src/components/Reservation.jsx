import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Send, MapPin } from 'lucide-react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useForm, ValidationError } from '@formspree/react'

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
  const [branches, setBranches] = useState([])
  const [loadingBranches, setLoadingBranches] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: '',
    service: '',
    date: '',
    time: '',
    message: '',
  })

  // Formspree hook
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID)

  // Firebase'den şubeleri çek
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoadingBranches(true)
        const branchesRef = collection(db, 'branches')
        const q = query(branchesRef, where('active', '==', true))
        const querySnapshot = await getDocs(q)

        const branchesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          city: doc.data().city,
          ...doc.data()
        }))

        // Şehir ve isme göre sırala
        branchesData.sort((a, b) => {
          const cityCompare = (a.city || '').localeCompare(b.city || '', 'tr')
          if (cityCompare !== 0) return cityCompare
          return (a.name || '').localeCompare(b.name || '', 'tr')
        })

        setBranches(branchesData)
      } catch (error) {
        console.error('Error fetching branches:', error)
        setBranches([])
      } finally {
        setLoadingBranches(false)
      }
    }

    fetchBranches()
  }, [])

  // Form başarılı gönderildikten sonra formu temizle
  useEffect(() => {
    if (state.succeeded) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        branch: '',
        service: '',
        date: '',
        time: '',
        message: '',
      })
    }
  }, [state.succeeded])

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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information - Left Side */}
          <motion.div
            className="bg-white rounded-2xl p-8 md:p-10 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-3xl text-text-primary mb-10">İletişim Bilgileri</h3>

            {/* Address */}
            <div className="mb-7">
              <div className="flex items-start gap-4">
                <div className="bg-olive/10 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 text-olive" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base text-text-primary mb-2">Adres</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Yenibosna Merkez Mh. 1. Asena Sk.<br />
                    İstanbul Kongre Merkezi Otel A No:15A<br />
                    Bahçelievler / İSTANBUL
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="mb-7">
              <div className="flex items-start gap-4">
                <div className="bg-olive/10 p-3 rounded-lg">
                  <Phone className="w-5 h-5 text-olive" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base text-text-primary mb-3">Telefon</h4>
                  <div className="space-y-2">
                    <a
                      href="tel:+905331334339"
                      className="block text-lg font-semibold text-olive hover:text-olive-dark transition-colors duration-300"
                    >
                      +90 533 133 43 39
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-7">
              <div className="flex items-start gap-4">
                <div className="bg-olive/10 p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-olive" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base text-text-primary mb-2">E-posta</h4>
                  <a
                    href="mailto:rezervasyon@lunadenspa.com.tr"
                    className="text-base text-olive hover:text-olive-dark transition-colors duration-300 font-medium"
                  >
                    rezervasyon@lunadenspa.com.tr
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mb-7">
              <div className="flex items-start gap-4">
                <div className="bg-olive/10 p-3 rounded-lg">
                  <Clock className="w-5 h-5 text-olive" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base text-text-primary mb-3">Çalışma Saatleri</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Pazartesi - Cuma</span>
                      <span className="font-medium text-text-primary">10:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Cumartesi</span>
                      <span className="font-medium text-text-primary">10:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Pazar</span>
                      <span className="font-medium text-text-primary">11:00 - 21:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-olive/20 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.792532365258!2d28.822752215414707!3d40.997883029505955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa3ebb3e01c9d%3A0xce9745ee6c1a7b7b!2sYenibosna%20Merkez%2C%201.%20Asena%20Sk.%20No%3A15A%2C%2034149%20Bah%C3%A7elievler%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1682600000000!5m2!1str!2str"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luna Den Spa Konum"
                className="w-full"
              ></iframe>
            </div>
          </motion.div>

          {/* Reservation Form - Right Side */}
          <motion.div
            className="bg-white rounded-2xl p-8 md:p-10 shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-2xl md:text-3xl text-text-primary mb-8">Randevu Formu</h3>

            {state.succeeded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-olive/10 border border-olive/30 rounded-lg text-olive text-center font-medium"
              >
                Rezervasyon talebiniz başarıyla alındı! En kısa sürede size dönüş yapacağız.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  name="name"
                  placeholder="Adınız Soyadınız"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClasses}
                  required
                />
                <ValidationError
                  prefix="İsim"
                  field="name"
                  errors={state.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon Numaranız"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClasses}
                  required
                />
                <ValidationError
                  prefix="Telefon"
                  field="phone"
                  errors={state.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta Adresiniz"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClasses}
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </motion.div>

              {/* Branch */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  required
                  disabled={loadingBranches}
                >
                  <option value="">{loadingBranches ? 'Şubeler yükleniyor...' : 'Şube Seçin'}</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                      {branch.name} - {branch.city}
                    </option>
                  ))}
                </select>
                <ValidationError
                  prefix="Şube"
                  field="branch"
                  errors={state.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </motion.div>

              {/* Service */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <select
                  name="service"
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
                <ValidationError
                  prefix="Hizmet"
                  field="service"
                  errors={state.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </motion.div>

              {/* Date */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
              >
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={inputClasses}
                  required
                />
                <ValidationError
                  prefix="Tarih"
                  field="date"
                  errors={state.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </motion.div>

              {/* Time */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <select
                  name="time"
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
                <ValidationError
                  prefix="Saat"
                  field="time"
                  errors={state.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-text-muted" />
                <textarea
                  name="message"
                  placeholder="Mesajınız (Opsiyonel)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClasses} min-h-[120px] resize-none`}
                  rows={4}
                />
                <ValidationError
                  prefix="Mesaj"
                  field="message"
                  errors={state.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-olive text-white py-4 rounded-lg hover:bg-olive-dark transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: state.submitting ? 1 : 1.02 }}
                  whileTap={{ scale: state.submitting ? 1 : 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  {state.submitting ? 'Gönderiliyor...' : 'Rezervasyon Yap'}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Reservation
