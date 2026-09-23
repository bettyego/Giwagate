import { Link } from 'react-router'
import { site, contactLinks } from '../content/site.js'
import { ContactValue } from './Pending.jsx'
import Reveal from './Reveal.jsx'
import Arrow from './Arrow.jsx'
import './CtaBand.css'

export default function CtaBand({
  title = 'Tell us what you’re looking for.',
  text = 'Buying, renting, letting or managing — a short conversation is the best start.',
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
            <Link to="/contact" className="btn btn--light">
              Make an enquiry <Arrow />
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
              <ContactValue value={contact.phone} href={contactLinks.phone} label="Phone number" />
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <ContactValue value={contact.email} href={contactLinks.email} label="Email address" />
            </dd>
          </div>
          <div>
            <dt>Office</dt>
            <dd>{contact.address ? contact.address.join(', ') : <ContactValue label="Office address" />}</dd>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
