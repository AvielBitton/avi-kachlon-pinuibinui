import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function HomePage() {
  return (
    <div className="pt-16 md:pt-20">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyRepresentationSection />
      <ProcessSection />
      <ContactSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,15,16,0.8)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
          ליווי משפטי מקצועי בהתחדשות עירונית
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-surface-50 leading-tight mb-8">
          ייצוג בעלי דירות
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-400 to-primary-600">
            בפרויקטי פינוי-בינוי
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-surface-300 max-w-3xl mx-auto leading-relaxed mb-12">
          ייצוג וליווי מלא לבעלי דירות בפרויקטי פינוי־בינוי — מגיבוש המתחם והסמכת נציגויות, בחירת יזם ובעלי תפקידים ועד קבלת המפתח. המשרד מספק ליווי מקצועי, צמוד ושקוף, עם ניסיון רב בפרויקטים בכל רחבי הארץ.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-primary-600/20 hover:shadow-primary-500/30 cursor-pointer"
          >
            <PhoneIcon className="w-5 h-5" />
            לתיאום פגישה
          </button>
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-800 hover:bg-surface-700 text-surface-100 rounded-xl font-semibold text-lg transition-colors border border-surface-700"
          >
            צפייה בפרויקטים
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="w-6 h-6 text-surface-500" />
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-surface-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile image */}
          <div className="relative order-2 md:order-1 flex justify-center">
<div className="aspect-[4/5] max-w-sm rounded-2xl overflow-hidden border border-surface-700 shadow-2xl">
              <img 
                src="/avi-kachlon-pinuibinui/avi-profile.png"
                alt="עו״ד אבי כחלון"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative corner */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-600/10 rounded-full blur-2xl -z-10" />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
              אודות
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-50 mb-6">
              ליווי מקצועי ואישי
              <br />
              <span className="text-primary-400">לכל דייר ודייר</span>
            </h2>
            <p className="text-surface-300 text-lg leading-relaxed mb-6">
              המשרד מלווה בעלי דירות בפרויקטי פינוי־בינוי, בודק את ההסכמים, מנהל משא ומתן מול היזמים, ומנגיש לדיירים את כל המידע בשפה פשוטה וברורה.
            </p>
            <p className="text-surface-300 text-lg leading-relaxed mb-8">
              המטרה: להבטיח שהדיירים מקבלים את מלוא הזכויות, את הביטחונות הנכונים ואת התמורות הטובות ביותר, תוך שמירה על הוגנות ויעילות.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors cursor-pointer"
            >
              בואו נדבר
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      icon: DocumentIcon,
      title: 'בדיקה וניתוח משפטי',
      description: 'בדיקה וניתוח משפטי מעמיק של הסכמים',
    },
    {
      icon: ScaleIcon,
      title: 'ניהול משא ומתן',
      description: 'ניהול מו"מ מול היזם להשגת תמורות מיטביות',
    },
    {
      icon: UsersIcon,
      title: 'ליווי קבוצתי ואישי',
      description: 'ליווי קבוצתי ואישי לכל דייר',
    },
    {
      icon: BuildingIcon,
      title: 'עבודה מול מומחים',
      description: 'עבודה מול שמאים, מהנדסים ויועצים',
    },
    {
      icon: KeyIcon,
      title: 'ליווי עד המסירה',
      description: 'ליווי עד מסירת הדירות החדשות',
    },
    {
      icon: ShieldIcon,
      title: 'טיפול בהתנגדויות',
      description: 'טיפול בהתנגדויות, ליכוד קבוצת דיירים ופתרונות לדיירים מוחלשים',
    },
  ]

  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            שירותים
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-50 mb-6">
            ליווי מלא ומקצועי
          </h2>
          <p className="text-surface-300 text-lg max-w-2xl mx-auto">
            השירות כולל ליווי מלא ומקצועי, המגן על הדיירים לאורך כל הדרך ומשפר משמעותית את התנאים שהם מקבלים מהיזם.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-surface-900/50 border border-surface-800 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 transition-all hover:bg-surface-900"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-surface-100 mb-2">{service.title}</h3>
              <p className="text-surface-400 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyRepresentationSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-surface-900/50 to-surface-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            למה ייצוג?
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-50 mb-6">
            למה בעלי דירות צריכים ייצוג?
          </h2>
        </div>

        <div className="relative">
          {/* Quote card */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-surface-900 border border-surface-800">
            {/* Quote mark */}
            <div className="absolute top-6 right-8 text-8xl text-primary-500/20 font-serif leading-none">
              ״
            </div>
            
            <p className="relative text-xl sm:text-2xl text-surface-200 leading-relaxed">
              כל יזם מגיע לפרויקט עם צוות מקצועי — עו״ד, שמאי, מהנדסים ואנשי פיננסים.
              <span className="text-primary-400 font-medium"> בעלי הדירות חייבים גוף שמגן על האינטרסים שלהם</span>,
              מוודא שההסכם מאוזן, שהבטוחות חזקות ושכל דייר מקבל יחס הוגן ושקוף.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-600/10 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    { number: 1, title: 'פגישת היכרות ובדיקת צרכים' },
    { number: 2, title: 'בחינת ההסכם הראשון מול היזם' },
    { number: 3, title: 'הערות ומשא ומתן לשיפור התמורות' },
    { number: 4, title: 'פגישות דיירים ואישור התקדמות' },
    { number: 5, title: 'חתימות הדיירים' },
    { number: 6, title: 'ליווי עד היתר בנייה' },
    { number: 7, title: 'ליווי עד קבלת המפתח' },
  ]

  return (
    <section id="process" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            התהליך
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-50 mb-6">
            איך זה עובד?
          </h2>
          <p className="text-surface-300 text-lg max-w-2xl mx-auto">
            תהליך שקוף, מסודר ומקצועי שמוביל את בעלי הדירות לעסקה בטוחה ורווחית.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-1/2 right-0 left-0 h-0.5 bg-surface-800 -translate-y-1/2" />

          <div className="grid md:grid-cols-7 gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center group">
                {/* Step number */}
                <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-surface-900 border-2 border-primary-500/50 flex items-center justify-center text-primary-400 font-bold text-lg group-hover:border-primary-400 group-hover:bg-primary-500/10 transition-all">
                  {step.number}
                </div>
                
                {/* Title */}
                <div className="mt-4 text-sm text-surface-300 group-hover:text-surface-100 transition-colors">
                  {step.title}
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-2">
                    <ChevronDownIcon className="w-5 h-5 text-surface-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [copied, setCopied] = useState(false)
  const phoneNumber = '050-279-1374'
  const email = 'Avikachlon24@gmail.com'

  const copyPhone = () => {
    navigator.clipboard.writeText(phoneNumber.replace(/-/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 bg-surface-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            צור קשר
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-50 mb-4">
            בואו נדבר
          </h2>
          <p className="text-surface-300 text-lg">
            לקבלת מידע, שיחה או פגישה — אשמח לעמוד לרשותכם.
          </p>
        </div>

        {/* Contact buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href={`tel:+972${phoneNumber.replace(/-/g, '').substring(1)}`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-colors"
          >
            <PhoneIcon className="w-5 h-5" />
            התקשרו אליי
          </a>
          <a
            href={`https://wa.me/972${phoneNumber.replace(/-/g, '').substring(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
            וואטסאפ
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-surface-700 hover:bg-surface-600 text-surface-100 rounded-xl font-medium transition-colors border border-surface-600"
          >
            <MailIcon className="w-5 h-5" />
            שלחו מייל
          </a>
          <button
            onClick={copyPhone}
            className="inline-flex items-center gap-3 px-6 py-3 bg-surface-800 hover:bg-surface-700 text-surface-200 rounded-xl font-medium transition-colors border border-surface-700"
          >
            <CopyIcon className="w-5 h-5" />
            {copied ? 'הועתק!' : 'העתק מספר'}
          </button>
        </div>

        {/* Contact form */}
        <form
          action={`mailto:${email}`}
          method="GET"
          encType="text/plain"
          className="max-w-xl mx-auto"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-surface-300 mb-2">
                שם מלא
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-surface-800 border border-surface-700 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                placeholder="הזינו את שמכם"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-surface-300 mb-2">
                טלפון
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                dir="ltr"
                className="w-full px-4 py-3 bg-surface-800 border border-surface-700 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-left"
                placeholder="050-000-0000"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-surface-300 mb-2">
                הודעה
              </label>
              <textarea
                id="message"
                name="body"
                rows={4}
                className="w-full px-4 py-3 bg-surface-800 border border-surface-700 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                placeholder="כתבו את הודעתכם..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-primary-600/20"
            >
              שליחת הודעה
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

// Icons
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}


