import { Link } from 'react-router'
import { site, contactLinks } from '../content/site.js'
import Reveal from './Reveal.jsx'
import Arrow from './Arrow.jsx'
import './CtaBand.css'

export default function CtaBand({
  title = 'Let’s Talk Property.',
  text = 'Whether you’re looking to buy, sell, invest, build, renovate or professionally manage a property, we’d be pleased to understand what you need.',
  action = { to: '/contact', label: 'Speak With Us Today' },
}) {
  const { contact } = site

  return (
    <section className="cta-band section section--dark" aria-labelledby="cta-title">
      <div className="container cta-band__inner">
        <Reveal className="cta-band__copy">
          <p className="eyebrow">Get in touch</p>
          <h2 id="cta-title">{title}</h2>
          <p className="lead">{text}</p>
          <div className="cta-band__actions">
            <Link to={action.to} className="btn btn--primary">
              {action.label} <Arrow />
            </Link>
            {contactLinks.whatsapp && (
              <a href={contactLinks.whatsapp} className="btn btn--ghost-light" target="_blank" rel="noreferrer">
                Message on WhatsApp
              </a>
            )}
          </div>
        </Reveal>

        <Reveal as="dl" className="cta-band__details" delay={120}>
          <div>
            <dt>Phone</dt>
            <dd>
              {contactLinks.phones.map((phone) => (
                <a key={phone.tel} className="text-link" href={phone.href}>
                  {phone.display}
                </a>
              ))}
            </dd>
          </div>
          {contactLinks.email && (
            <div>
              <dt>Email</dt>
              <dd>
                <a className="text-link" href={contactLinks.email}>
                  {contact.email}
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt>Office</dt>
            <dd>{contact.address.join(', ')}</dd>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
