import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { navigation, site, contactLinks } from '../content/site.js'
import { ContactValue } from './Pending.jsx'
import Logo from './Logo.jsx'
import './Header.css'

const SCROLL_THRESHOLD = 24

export default function Header() {
  const { pathname } = useLocation()
  const overlayRoute = pathname === '/'
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD)
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  // Close the menu whenever the route changes.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (!open) return

    menuRef.current?.querySelector('a')?.focus({ preventScroll: true })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 64em)').matches) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  const solid = !overlayRoute || scrolled || open
  const primaryNav = navigation.filter((item) => item.to !== '/contact')

  return (
    <header className={`site-header ${solid ? 'is-solid' : 'is-overlay'} ${open ? 'is-menu-open' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label={`${site.name} — home`}>
          <Logo />
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ul role="list">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/contact" className={`btn ${solid ? 'btn--primary' : 'btn--ghost-light'} site-header__cta`}>
          Contact us
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-toggle__bar" aria-hidden="true" />
          <span className="menu-toggle__bar" aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" ref={menuRef} className={`mobile-menu ${open ? 'is-open' : ''}`} inert={!open}>
        <nav className="container mobile-menu__nav" aria-label="Mobile">
          <ul role="list">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container mobile-menu__contact">
          <p className="eyebrow">Speak with us</p>
          <p>
            <ContactValue value={site.contact.phone} href={contactLinks.phone} label="Phone number" />
          </p>
          <p>
            <ContactValue value={site.contact.email} href={contactLinks.email} label="Email address" />
          </p>
        </div>
      </div>
    </header>
  )
}
