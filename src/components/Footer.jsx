import { Link } from 'react-router'
import { navigation, site, contactLinks } from '../content/site.js'
import { services } from '../content/services.js'
import { ContactValue, Pending } from './Pending.jsx'
import Logo from './Logo.jsx'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const { contact } = site

  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" aria-label={`${site.name} — home`}>
              <Logo />
            </Link>
            <p>
              Real estate agency and property management in Abuja — helping clients buy, rent, let and look after
              property across the FCT.
            </p>
          </div>

          <nav className="site-footer__col" aria-label="Footer">
            <h2 className="site-footer__title">Explore</h2>
            <ul role="list">
              <li>
                <Link to="/">Home</Link>
              </li>
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2 className="site-footer__title">Services</h2>
            <ul role="list">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={`/services#${service.id}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__title">Contact</h2>
            <address>
              <p>
                {contact.address ? contact.address.map((line) => <span key={line}>{line}<br /></span>) : <Pending label="Office address" />}
              </p>
              <p>
                <ContactValue value={contact.phone} href={contactLinks.phone} label="Phone number" />
              </p>
              <p>
                <ContactValue value={contact.email} href={contactLinks.email} label="Email address" />
              </p>
            </address>
            {site.social.length > 0 && (
              <ul role="list" className="site-footer__social">
                {site.social.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="site-footer__base">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
