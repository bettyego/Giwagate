import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

/** Scrolls to the top (or to a #hash) and moves focus to <main> on navigation. */
function useRouteFocus(mainRef) {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname, hash, mainRef])
}

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  useRouteFocus(mainRef)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className={pathname === '/' ? 'main main--flush' : 'main'}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
