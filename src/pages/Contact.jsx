import { useSearchParams } from 'react-router'
import { site, contactLinks } from '../content/site.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import { interests } from '../content/enquiry.js'
import { ContactValue, Pending } from '../components/Pending.jsx'
import './Contact.css'

export default function Contact() {
  usePageTitle('Contact')
  const [params] = useSearchParams()
  const { contact } = site
  const requested = params.get('interest')
  const interest = interests.includes(requested) ? requested : undefined

  const details = [
    { label: 'Phone', content: <ContactValue value={contact.phone} href={contactLinks.phone} label="Phone number" /> },
    {
      label: 'WhatsApp',
      content: (
        <ContactValue
          value={contact.whatsapp && 'Message us on WhatsApp'}
          href={contactLinks.whatsapp}
          label="WhatsApp number"
          external
        />
      ),
    },
    { label: 'Email', content: <ContactValue value={contact.email} href={contactLinks.email} label="Email address" /> },
    {
      label: 'Office',
      content: contact.address ? (
        contact.address.map((line) => <span key={line}>{line}<br /></span>)
      ) : (
        <Pending label="Office address" />
      ),
    },
    { label: 'Hours', content: contact.hours ?? <Pending label="Office hours" /> },
  ]

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us about property in Abuja."
        lead="Tell us a little about what you need. The more detail you share — area, budget, timing — the more useful our first reply will be."
      />

      <section className="section contact" aria-label="Contact details and enquiry form">
        <div className="container contact__grid">
          <Reveal className="contact__details">
            <h2 className="contact__heading">Contact details</h2>
            <dl>
              {details.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.content}</dd>
                </div>
              ))}
            </dl>
            <div className="placeholder-panel contact__map">
              <h3>Office location</h3>
              <p>A map will appear here once the office address has been confirmed.</p>
            </div>
          </Reveal>

          <Reveal className="contact__form" delay={100}>
            <h2 className="contact__heading">Send an enquiry</h2>
            <InquiryForm key={interest} defaultInterest={interest} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
