import { Link } from 'react-router'
import { images } from '../content/images.js'
import { services } from '../content/services.js'
import { featuredProperties } from '../content/properties.js'
import { districts } from '../content/abuja.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PropertyCard from '../components/PropertyCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import Arrow from '../components/Arrow.jsx'
import CtaBand from '../components/CtaBand.jsx'
import './Home.css'

const steps = [
  {
    title: 'A proper conversation',
    text: 'We start with what you need — budget, timing, location, and just as importantly, what would make a property wrong for you.',
  },
  {
    title: 'A considered shortlist',
    text: 'We narrow the options before you spend time on them, then arrange inspections in person or by video walk-through.',
  },
  {
    title: 'Checks before commitment',
    text: 'Before any money changes hands, title documents are reviewed and we recommend an independent search at AGIS through your lawyer.',
  },
  {
    title: 'Handover, and after',
    text: 'Terms are agreed in writing and keys change hands when everything is in order. Owners can ask us to stay on as managers.',
  },
]

export default function Home() {
  usePageTitle()

  return (
    <>
      <section className="hero on-dark" aria-labelledby="hero-title">
        <div className="hero__media">
          <img
            src={images.hero.src}
            srcSet={images.hero.srcSet}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="container hero__content">
          <p className="eyebrow hero__rise">Real estate &amp; property management · Abuja</p>
          <h1 id="hero-title" className="hero__title hero__rise">
            Property in Abuja, <em>handled properly.</em>
          </h1>
          <p className="hero__lead lead hero__rise">
            Giwagate Properties helps people buy, rent, let and manage property across the Federal Capital Territory —
            with honest advice, careful checks and someone who picks up when you call.
          </p>
          <div className="hero__actions hero__rise">
            <Link to="/properties" className="btn btn--light">
              View properties
            </Link>
            <Link to="/contact" className="btn btn--ghost-light">
              Speak with us
            </Link>
          </div>
        </div>
        <div className="container hero__footer hero__rise">
          <ul role="list" className="hero__services">
            {services.map((service) => (
              <li key={service.id}>{service.title}</li>
            ))}
          </ul>
          <p className="hero__note">Illustrative image</p>
        </div>
      </section>

      <section className="section intro" aria-labelledby="intro-title">
        <div className="container intro__grid">
          <Reveal className="intro__label">
            <p className="eyebrow" id="intro-title">
              About Giwagate
            </p>
          </Reveal>
          <div className="intro__body">
            <Reveal as="p" className="intro__statement">
              A family home in Maitama, office space in the Central Business District, or a reliable tenant for a
              property you own — the work is the same: understand what you need, check everything properly, and see it
              through.
            </Reveal>
            <Reveal className="intro__detail" delay={100}>
              <p>
                Giwagate Properties is a real estate agency and property management company based in Abuja. We work
                with buyers, tenants, landlords and investors, whether they live in Abuja or look after their property
                from elsewhere in Nigeria or abroad.
              </p>
              <Link to="/about" className="link-arrow">
                More about us <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="services-title">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              id="services-title"
              eyebrow="What we do"
              title="Four services, one point of contact."
            />
            <Reveal className="split-heading__aside" delay={100}>
              <Link to="/services" className="link-arrow">
                All services <Arrow />
              </Link>
            </Reveal>
          </div>

          <ol role="list" className="service-rows">
            {services.map((service, index) => (
              <Reveal as="li" key={service.id} delay={index * 60}>
                <Link to={`/services#${service.id}`} className="service-row">
                  <span className="service-row__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="service-row__title">{service.title}</span>
                  <span className="service-row__summary">{service.summary}</span>
                  <span className="service-row__arrow" aria-hidden="true">
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              id="featured-title"
              eyebrow="Properties"
              title="Selected homes and spaces."
              intro="Listings are being prepared. The properties shown here are samples that demonstrate how listings will appear."
            />
            <Reveal className="split-heading__aside" delay={100}>
              <Link to="/properties" className="link-arrow">
                View all properties <Arrow />
              </Link>
            </Reveal>
          </div>

          <ul role="list" className="property-grid">
            {featuredProperties.map((property, index) => (
              <Reveal as="li" key={property.slug} delay={index * 80}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark process" aria-labelledby="process-title">
        <div className="container">
          <SectionHeading
            id="process-title"
            eyebrow="How we work"
            title="From first conversation to handover."
            intro="Most property problems in Abuja start with something that wasn’t checked. Our process is built to avoid that."
          />
          <ol role="list" className="process__steps">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.title} className="process__step" delay={index * 80}>
                <span className="process__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section feature" aria-labelledby="diaspora-title">
        <div className="container feature__grid">
          <div className="feature__media">
            <Photo image={images.livingWarm} sizes="(min-width: 64em) 55vw, 100vw" />
          </div>
          <Reveal className="feature__copy">
            <p className="eyebrow">Clients outside Abuja</p>
            <h2 id="diaspora-title">Buying or managing from a distance.</h2>
            <p className="lead">
              Distance should not mean guesswork. For clients in Lagos, abroad or simply too busy to attend every
              viewing, we can inspect on your behalf, walk you through properties on video, and report back in writing at
              every stage.
            </p>
            <ul role="list" className="checklist">
              <li>Video walk-throughs and inspections on your behalf</li>
              <li>Coordination of searches and legal checks with your lawyer</li>
              <li>Ongoing management with regular written statements</li>
            </ul>
            <Link to="/services#advisory" className="link-arrow">
              Investor &amp; diaspora advisory <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="areas-title">
        <div className="container">
          <SectionHeading
            id="areas-title"
            eyebrow="Across the FCT"
            title="Abuja, district by district."
            intro="Every part of the city has its own character, prices and practicalities. A brief guide to some of the areas people ask about most."
          />
          <ul role="list" className="districts">
            {districts.map((district, index) => (
              <Reveal as="li" key={district.name} className="district" delay={(index % 4) * 60}>
                <h3 className="district__name">{district.name}</h3>
                <p>{district.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
