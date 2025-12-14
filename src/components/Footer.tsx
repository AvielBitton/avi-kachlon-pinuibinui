import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCallback } from 'react'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToSection = useCallback((anchor: string) => {
    setTimeout(() => {
      const element = document.getElementById(anchor)
      if (element) {
        const headerHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - headerHeight,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [])

  const handleAnchorClick = useCallback((anchor: string) => {
    if (location.pathname === '/') {
      scrollToSection(anchor)
    } else {
      navigate('/')
      scrollToSection(anchor)
    }
  }, [location.pathname, navigate, scrollToSection])

  return (
    <footer className="bg-surface-900 border-t border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg">
                א
              </div>
              <div>
                <div className="font-bold text-surface-100 text-lg">עו״ד אבי כחלון</div>
                <div className="text-xs text-surface-400">פינוי בינוי | התחדשות עירונית</div>
              </div>
            </Link>
            <p className="text-surface-400 text-sm leading-relaxed">
              ייצוג וליווי מקצועי לבעלי דירות בפרויקטי התחדשות עירונית בכל רחבי הארץ.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-surface-100 mb-4">ניווט מהיר</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleAnchorClick('about')}
                  className="text-surface-400 hover:text-primary-400 transition-colors"
                >
                  אודות
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAnchorClick('services')}
                  className="text-surface-400 hover:text-primary-400 transition-colors"
                >
                  שירותים
                </button>
              </li>
              <li>
                <Link to="/projects" className="text-surface-400 hover:text-primary-400 transition-colors">
                  פרויקטים
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleAnchorClick('contact')}
                  className="text-surface-400 hover:text-primary-400 transition-colors"
                >
                  צור קשר
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-surface-100 mb-4">יצירת קשר</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-surface-400">
                <PhoneIcon className="w-4 h-4 text-primary-500" />
                <a href="tel:+972501234567" className="hover:text-primary-400 transition-colors" dir="ltr">
                  050-123-4567
                </a>
              </li>
              <li className="flex items-center gap-2 text-surface-400">
                <MailIcon className="w-4 h-4 text-primary-500" />
                <a href="mailto:avi@example.com" className="hover:text-primary-400 transition-colors">
                  avi@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-800 text-center text-sm text-surface-500">
          <p>© {new Date().getFullYear()} עו״ד אבי כחלון. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
