import { Link } from 'react-router'
import { images } from '../content/images.js'
import { getService } from '../content/services.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import Arrow from '../components/Arrow.jsx'
import CtaBand from '../components/CtaBand.jsx'
import './Developments.css'

const capabilities = [getService('development'), getService('construction'), getService('procurement')]

export default function Developments() {
  usePageTitle('Developments')
  const development = capabilities[0]

  return (
    <>
      <PageHero eyebrow="Developments" title={development.heading} lead={development.text[0]} image={images.cityTowers} />

      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Development capabilities"
            title="Concept, construction and supply — coordinated."
          />
          <ul role="list" className="card-grid card-grid--3">
            {capabilities.map((service, index) => (
              <Reveal as="li" key={service.id} delay={index * 80}>
                <article className="info-card capability">
                  <span className="info-card__number">{service.title}</span>
                  <h3>{service.heading}</h3>
                  {service.id !== 'development' && <p>{service.text[0]}</p>}
                  {service.includes && (
                    <ul role="list" className="checklist">
                      {service.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {service.focus && <p className="capability__focus">{service.focus.join(' • ')}</p>}
                  <Link to={service.cta.to} className="link-arrow capability__link">
                    {service.cta.label} <Arrow />
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark landowners" aria-labelledby="landowners-title">
        <div className="container landowners__grid">
          <div className="landowners__media">
            <Photo image={images.timberFacade} sizes="(min-width: 64em) 45vw, 100vw" />
          </div>
          <Reveal className="landowners__copy">
            <p className="eyebrow">Landowners & joint development</p>
            <h2 id="landowners-title">Have Land? Let’s Explore What It Could Become.</h2>
            <p className="landowners__statement">You bring the opportunity. We explore the possibilities together.</p>
            <p>
              Potential engagements may include property development discussions, development management, construction
              partnerships and other commercially appropriate structures subject to due diligence and mutually agreed
              terms.
            </p>
            <Link to="/list-property?purpose=development" className="btn btn--primary">
              Submit Your Property for Development Consideration
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Discuss a Development Project."
        text="Tell us about your site, your objectives and your timeline, and we’ll explore the right way forward with you."
        action={{ to: development.cta.to, label: development.cta.label }}
      />
    </>
  )
}
