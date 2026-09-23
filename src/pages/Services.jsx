import { Link } from 'react-router'
import { services } from '../content/services.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import Arrow from '../components/Arrow.jsx'
import CtaBand from '../components/CtaBand.jsx'
import './Services.css'

export default function Services() {
  usePageTitle('Services')

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything a property needs, from search to upkeep."
        lead="Most clients come to us for one thing — a home to buy, a tenant, someone to manage a building — and stay because it’s simpler to have one team handle the rest."
      >
        <nav aria-label="Services on this page" className="service-index">
          <ul role="list">
            {services.map((service) => (
              <li key={service.id}>
                <a href={`#${service.id}`}>{service.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section service-detail ${index % 2 ? 'section--ivory service-detail--reverse' : ''}`}
          aria-labelledby={`${service.id}-title`}
        >
          <div className="container service-detail__grid">
            <div className="service-detail__media">
              <Photo image={service.image} sizes="(min-width: 64em) 50vw, 100vw" />
            </div>
            <Reveal className="service-detail__copy">
              <p className="eyebrow">
                {String(index + 1).padStart(2, '0')} — {service.audience}
              </p>
              <h2 id={`${service.id}-title`}>{service.title}</h2>
              <p className="lead">{service.summary}</p>
              <p>{service.body}</p>
              <h3 className="service-detail__label">What’s included</h3>
              <ul role="list" className="checklist">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to={`/contact?interest=${encodeURIComponent(service.enquiry)}`} className="link-arrow">
                Enquire about {service.title.toLowerCase()} <Arrow />
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand title="Not sure which service you need?" text="Describe your situation and we’ll tell you honestly how we can help — or point you to someone better placed if we can’t." />
    </>
  )
}
