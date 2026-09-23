import { Link } from 'react-router'
import { images } from '../content/images.js'
import { services } from '../content/services.js'
import { featuredProperties, properties } from '../content/properties.js'
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
  { title: 'Talk', text: 'Tell us your budget, timing and area.' },
  { title: 'Shortlist', text: 'We narrow the options and arrange viewings — in person or on video.' },
  { title: 'Check', text: 'Title documents reviewed before any money changes hands.' },
  { title: 'Move in', text: 'Terms in writing, keys handed over. We can manage it after.' },
]

// Photos drawn from the listings, so real photos appear here as soon as they're added.
// Interior shots (not the covers already shown on cards) come first, and no photo repeats.
const mosaic = [
  ...properties.flatMap((property) => property.images.slice(1).map((image) => ({ property, image }))),
  ...properties.map((property) => ({ property, image: property.images[0] })),
]
  .filter(({ image }, index, all) => all.findIndex((item) => item.image.src === image.src) === index)
  .slice(0, 5)

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
          <p className="hero__lead lead hero__rise">Buy, rent, let and manage property across the FCT.</p>
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
          {images.hero.stock && <p className="hero__note">Illustrative image</p>}
        </div>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              id="featured-title"
              eyebrow="Properties"
              title="Selected homes and spaces."
              intro={featuredProperties.some((p) => p.sample) ? 'Sample listings shown while real ones are prepared.' : undefined}
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

      <section className="section section--ivory" aria-labelledby="services-title">
        <div className="container">
          <div className="split-heading">
            <SectionHeading id="services-title" eyebrow="What we do" title="Four services, one point of contact." />
            <Reveal className="split-heading__aside" delay={100}>
              <Link to="/services" className="link-arrow">
                All services <Arrow />
              </Link>
            </Reveal>
          </div>

          <ol role="list" className="service-cards">
            {services.map((service, index) => (
              <Reveal as="li" key={service.id} delay={index * 60}>
                <Link to={`/services#${service.id}`} className="service-card">
                  <Photo image={service.image} sizes="(min-width: 64em) 25vw, (min-width: 40em) 50vw, 100vw" reveal={false} />
                  <span className="service-card__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="service-card__title">
                    {service.title} <Arrow />
                  </span>
                  <span className="service-card__summary">{service.summary}</span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section mosaic-section" aria-labelledby="mosaic-title">
        <div className="container">
          <div className="split-heading">
            <SectionHeading id="mosaic-title" eyebrow="A closer look" title="Inside the properties." />
            <Reveal className="split-heading__aside" delay={100}>
              <Link to="/properties" className="link-arrow">
                Browse listings <Arrow />
              </Link>
            </Reveal>
          </div>
          <ul role="list" className="mosaic">
            {mosaic.map(({ property, image }) => (
              <li key={image.src} className="mosaic__item">
                <Link to={`/properties/${property.slug}`} aria-label={`${property.title}, ${property.area}`}>
                  <Photo image={image} sizes="(min-width: 64em) 40vw, 50vw" />
                  <span className="mosaic__caption" aria-hidden="true">
                    {property.area}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark process" aria-labelledby="process-title">
        <div className="container">
          <SectionHeading id="process-title" eyebrow="How we work" title="From first call to handover." />
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
            <Photo image={images.courtyardHouse} sizes="(min-width: 64em) 55vw, 100vw" />
          </div>
          <Reveal className="feature__copy">
            <p className="eyebrow">Clients outside Abuja</p>
            <h2 id="diaspora-title">Buying from a distance.</h2>
            <p className="lead">Video tours, inspections on your behalf and written updates at every step.</p>
            <Link to="/services#advisory" className="link-arrow">
              Investor &amp; diaspora advisory <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="areas-title">
        <div className="container">
          <SectionHeading id="areas-title" eyebrow="Across the FCT" title="Where we work." />
          <ul role="list" className="districts">
            {districts.map((district, index) => (
              <Reveal as="li" key={district.name} className="district" delay={(index % 4) * 60} title={district.note}>
                {district.name}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
