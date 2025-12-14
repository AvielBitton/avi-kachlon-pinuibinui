import { useState, useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'ראשי', href: '/', anchor: null },
  { label: 'אודות', href: '/', anchor: 'about' },
  { label: 'שירותים', href: '/', anchor: 'services' },
  { label: 'התהליך', href: '/', anchor: 'process' },
  { label: 'פרויקטים', href: '/projects', anchor: null },
  { label: 'צור קשר', href: '/', anchor: 'contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Reset active section when leaving homepage
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(null)
    }
  }, [location.pathname])

  // Track scroll position to update active section
  useEffect(() => {
    if (location.pathname !== '/') return

    const handleScroll = () => {
      const sections = ['about', 'services', 'process', 'contact']
      const scrollPosition = window.scrollY + 100 // Account for header

      // Check if at top of page
      if (scrollPosition < 300) {
        setActiveSection(null)
        return
      }

      // Find which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const scrollToSection = useCallback((anchor: string | null) => {
    if (!anchor) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(null)
      return
    }
    
    setActiveSection(anchor)
    
    // Small delay to ensure DOM is ready after navigation
    setTimeout(() => {
      const element = document.getElementById(anchor)
      if (element) {
        const headerHeight = 80 // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - headerHeight,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [])

  const handleNavClick = useCallback((href: string, anchor: string | null) => {
    setMobileMenuOpen(false)
    
    if (location.pathname === '/' && href === '/') {
      // Already on homepage, just scroll
      scrollToSection(anchor)
    } else if (href === '/') {
      // Navigate to homepage then scroll
      navigate('/')
      scrollToSection(anchor)
    }
    // For other routes (like /projects), let the Link handle it normally
  }, [location.pathname, navigate, scrollToSection])

  const isActiveNavItem = (item: typeof navItems[0]) => {
    // Projects page - check pathname
    if (item.href === '/projects') {
      return location.pathname === '/projects'
    }
    
    // Homepage sections
    if (location.pathname === '/') {
      // "ראשי" is active when no section is selected and at top
      if (item.anchor === null && item.href === '/') {
        return activeSection === null
      }
      // Other sections - check activeSection
      return activeSection === item.anchor
    }
    
    return false
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-surface-950/90 backdrop-blur-md border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => handleNavClick('/', null)}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
              א
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-surface-100 text-lg leading-tight">עו״ד אבי כחלון</div>
              <div className="text-xs text-surface-400">פינוי בינוי | התחדשות עירונית</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item.href === '/projects' ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActiveNavItem(item)
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-surface-300 hover:text-surface-100 hover:bg-surface-800'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href, item.anchor)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActiveNavItem(item)
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-surface-300 hover:text-surface-100 hover:bg-surface-800'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick('/', 'contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium text-sm transition-colors shadow-lg shadow-primary-600/20"
            >
              <PhoneIcon className="w-4 h-4" />
              ייעוץ ראשוני
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-surface-300 hover:text-surface-100 hover:bg-surface-800"
            aria-label="תפריט"
          >
            {mobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-900 border-t border-surface-800">
          <nav className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              item.href === '/projects' ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActiveNavItem(item)
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-surface-300 hover:text-surface-100 hover:bg-surface-800'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href, item.anchor)}
                  className={`block w-full text-right px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActiveNavItem(item)
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-surface-300 hover:text-surface-100 hover:bg-surface-800'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
            <button
              onClick={() => handleNavClick('/', 'contact')}
              className="block w-full mt-4 text-center px-4 py-3 bg-primary-600 text-white rounded-lg font-medium"
            >
              ייעוץ ראשוני
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}
