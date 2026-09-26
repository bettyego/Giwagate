import { Link } from 'react-router'
import { services, corporate } from '../content/services.js'
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
        title="Integrated property solutions, from opportunity to completion."
        lead="Acquisition, sales, development, construction, renovation, management, valuation and procurement — one company supporting you across the property lifecycle."
      >
        <nav aria-label="Services on this page" className="service-index">
          <ol role="list">
            {services.map((service, index) => (
              <li key={service.id}>
                <a href={`#${service.id}`}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {service.title}
                </a>
              </li>
            ))}
          </ol>
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
                {String(index + 1).padStart(2, '0')} — {service.title}
              </p>
              <h2 id={`${service.id}-title`}>{service.heading}</h2>
              {service.text.map((paragraph) => (
                <p key={paragraph} className="lead">
                  {paragraph}
                </p>
              ))}
              {service.includes && (
                <>
                  <h3 className="service-detail__label">{service.listLabel}</h3>
                  <ul role="list" className="checklist service-detail__list">
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {service.focus && (
                <>
                  <h3 className="service-detail__label">Focus</h3>
                  <ul role="list" className="tag-list">
                    {service.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {service.note && <p className="notice">{service.note}</p>}
              <Link to={service.cta.to} className="btn btn--primary">
                {service.cta.label} <Arrow />
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section section--deep corporate" aria-labelledby="corporate-title">
        <div className="container corporate__grid">
          <Reveal>
            <p className="eyebrow">Corporate clients</p>
            <h2 id="corporate-title">{corporate.heading}</h2>
          </Reveal>
          <Reveal className="corporate__body" delay={100}>
            <p className="lead">{corporate.text}</p>
            <ul role="list" className="tag-list">
              {corporate.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to={corporate.cta.to} className="btn btn--primary">
              {corporate.cta.label} <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
