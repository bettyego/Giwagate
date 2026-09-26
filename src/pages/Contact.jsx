import { useSearchParams } from 'react-router'
import { site, contactLinks } from '../content/site.js'
import { interests } from '../content/enquiry.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import './Contact.css'

export default function Contact() {
  usePageTitle('Contact')
  const [params] = useSearchParams()
  const { contact } = site
  const requested = params.get('interest')
  const interest = interests.includes(requested) ? requested : undefined
  // Links from service pages can name a topic, e.g. "procurement support", to start the message.
  const topic = params.get('topic')?.slice(0, 80)
  const defaultMessage = topic ? `I’d like to discuss ${topic}.` : ''

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s Talk Property."
        lead="Whether you’re looking to buy, sell, invest, build, renovate or professionally manage a property, we’d be pleased to understand what you need."
      />

      <section className="section contact" aria-label="Contact details and enquiry form">
        <div className="container contact__grid">
          <Reveal className="contact__details">
            <h2 className="contact__heading">Speak With Us Today</h2>
            <dl>
              <div>
                <dt>Company</dt>
                <dd>{site.name}</dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>
                  {contact.address.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                  <span className="contact__landmarks">{contact.landmarks}</span>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd className="contact__list">
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
              {contactLinks.whatsapp && (
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a className="text-link" href={contactLinks.whatsapp} target="_blank" rel="noreferrer">
                      Message us on WhatsApp
                    </a>
                  </dd>
                </div>
              )}
              {contact.hours && (
                <div>
                  <dt>Hours</dt>
                  <dd>{contact.hours}</dd>
                </div>
              )}
            </dl>
            <div className="contact__map">
              <MapEmbed query={contact.mapQuery} title={`Map showing ${site.name}, ${contact.address.join(', ')}`} />
              <a className="link-arrow" href={contactLinks.map} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </div>
          </Reveal>

          <Reveal className="contact__form" delay={100}>
            <h2 className="contact__heading">Send an enquiry</h2>
            <InquiryForm key={`${interest}-${topic}`} defaultInterest={interest} defaultMessage={defaultMessage} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
