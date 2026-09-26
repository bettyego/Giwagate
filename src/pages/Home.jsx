import { Fragment } from 'react'
import { Link } from 'react-router'
import { images } from '../content/images.js'
import { site } from '../content/site.js'
import { featuredProperties } from '../content/properties.js'
import { pillars, principles, intents, whyGiwagate, journey, trust } from '../content/company.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PropertyCard from '../components/PropertyCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import Arrow from '../components/Arrow.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CtaBand from '../components/CtaBand.jsx'
import './Home.css'

const number = (index) => String(index + 1).padStart(2, '0')

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
          <p className="eyebrow hero__rise">{site.name}</p>
          <h1 id="hero-title" className="hero__title hero__rise">
            Property With Purpose. <em>Investment With Vision.</em>
          </h1>
          <p className="hero__lead lead hero__rise">
            Discover, acquire, develop and manage real estate with a partner committed to transparency,
            professionalism and long-term value.
          </p>
          <p className="hero__tagline hero__rise">{site.promise}</p>
          <div className="hero__actions hero__rise">
            <Link to="/properties" className="btn btn--primary">
              Explore Properties
            </Link>
            <Link to="/contact" className="btn btn--ghost-light">
              Speak With an Advisor
            </Link>
          </div>
        </div>
        <div className="container hero__footer hero__rise">
          <ul role="list" className="hero__pillars" aria-label="What we do">
            {pillars.map((pillar, index) => (
              <Fragment key={pillar}>
                {index > 0 && (
                  <li className="hero__dot" aria-hidden="true">
                    •
                  </li>
                )}
                <li>{pillar}</li>
              </Fragment>
            ))}
          </ul>
          {images.hero.stock && <p className="hero__note">Illustrative image</p>}
        </div>
      </section>

      <section className="section approach" aria-labelledby="approach-title">
        <div className="container">
          <div className="approach__grid">
            <div className="approach__copy">
              <SectionHeading
                id="approach-title"
                eyebrow="Our approach"
                title="Property Is More Than an Asset. It Is a Foundation for the Future."
              />
              <Reveal className="approach__text" delay={100}>
                <p className="lead">
                  At GIWAGATE, we understand that every property decision matters. For some clients, it is the dream of
                  owning a first home. For others, it is acquiring land, developing a commercial asset, expanding an
                  investment portfolio or professionally managing an existing property.
                </p>
                <p>Whatever the objective, our approach is built around four principles:</p>
              </Reveal>
            </div>
            <div className="approach__media">
              <Photo image={images.villaTerrace} sizes="(min-width: 64em) 40vw, 100vw" />
            </div>
          </div>

          <ol role="list" className="principles-band">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle} delay={index * 80}>
                <span className="principles-band__number" aria-hidden="true">
                  {number(index)}
                </span>
                {principle}
              </Reveal>
            ))}
          </ol>

          <Reveal as="p" className="approach__closing">
            We combine market understanding, professional execution and customer-focused service to help individuals,
            families, businesses and investors make better property decisions.
          </Reveal>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="intents-title">
        <div className="container">
          <SectionHeading id="intents-title" eyebrow="How we can help" title="What Can We Help You Achieve?" />
          <ul role="list" className="intents">
            {intents.map((intent, index) => (
              <Reveal as="li" key={intent.title} delay={(index % 4) * 60}>
                <Link to={intent.to} className="intent">
                  <span className="intent__number" aria-hidden="true">
                    {number(index)}
                  </span>
                  <h3 className="intent__title">{intent.title}</h3>
                  <p>{intent.text}</p>
                  <span className="intent__arrow" aria-hidden="true">
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal as="li" delay={180}>
              <Link to="/contact" className="intent intent--cta">
                <h3 className="intent__title">Not sure where to start?</h3>
                <span className="btn btn--primary">Tell Us What You Need</span>
              </Link>
            </Reveal>
          </ul>
        </div>
      </section>

      {featuredProperties.length > 0 && (
        <section className="section" aria-labelledby="featured-title">
          <div className="container">
            <div className="split-heading">
              <SectionHeading id="featured-title" eyebrow="Properties" title="Featured properties." />
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
      )}

      <section className="section section--ivory why" aria-labelledby="why-title">
        <div className="container why__grid">
          <div className="why__intro">
            <SectionHeading id="why-title" eyebrow="Why GIWAGATE" title="A property partner for the long term." />
            <div className="why__media">
              <Photo image={images.livingWarm} sizes="(min-width: 64em) 38vw, 100vw" />
            </div>
          </div>
          <ul role="list" className="why__list">
            {whyGiwagate.map((item, index) => (
              <Reveal as="li" key={item.title} className="why__item" delay={(index % 2) * 80}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--deep journey" aria-labelledby="journey-title">
        <div className="container">
          <SectionHeading id="journey-title" eyebrow="Your journey with us" title="From first conversation to lasting support." />
          <ol role="list" className="journey__steps">
            {journey.map((step, index) => (
              <Reveal as="li" key={step} className="journey__step" delay={index * 70}>
                <span className="journey__number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{step}</h3>
              </Reveal>
            ))}
          </ol>
          <Reveal as="p" className="journey__closing">
            Our relationship doesn’t have to end when the transaction does.
          </Reveal>
        </div>
      </section>

      <section className="section trust" aria-labelledby="trust-title">
        <div className="container trust__grid">
          <SectionHeading id="trust-title" eyebrow="Trust & due diligence" title={trust.heading} />
          <Reveal className="trust__text" delay={100}>
            {trust.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
        <div className="container">
          <Reveal as="ul" role="list" className="trust__highlight">
            {trust.highlight.map((phrase) => (
              <li key={phrase}>{phrase}</li>
            ))}
          </Reveal>
        </div>
      </section>

      <Testimonials />

      <CtaBand />
    </>
  )
}
