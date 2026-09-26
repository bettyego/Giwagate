import { Link } from 'react-router'
import { images } from '../content/images.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Arrow from '../components/Arrow.jsx'
import CtaBand from '../components/CtaBand.jsx'

const opportunities = [
  { title: 'Capital Appreciation', text: 'Properties with potential for long-term value growth.' },
  { title: 'Rental Income', text: 'Properties capable of supporting recurring rental income.' },
  { title: 'Land Investment', text: 'Strategic land opportunities for future development or appreciation.' },
  { title: 'Commercial Property', text: 'Property opportunities aligned with business or investment objectives.' },
  { title: 'Property Development', text: 'Land or assets that may offer development potential.' },
  {
    title: 'Portfolio Diversification',
    text: 'Property opportunities that complement an investor’s broader asset strategy.',
  },
]

const considerations = ['Budget', 'Preferred location', 'Investment horizon', 'Intended use', 'Risk considerations']

const advisor = `/contact?interest=${encodeURIComponent('Invest')}`

export default function Investment() {
  usePageTitle('Investment')

  return (
    <>
      <PageHero
        eyebrow="Investment"
        title="Don’t Just Buy Property. Understand the Opportunity."
        lead="GIWAGATE helps clients understand property opportunities based on their objectives."
        image={images.poolHouse}
      />

      <section className="section" aria-labelledby="opportunities-title">
        <div className="container">
          <SectionHeading id="opportunities-title" eyebrow="Types of opportunity" title="Match the property to the purpose." />
          <ul role="list" className="card-grid card-grid--3">
            {opportunities.map((item, index) => (
              <Reveal as="li" key={item.title} delay={(index % 3) * 80}>
                <article className="info-card">
                  <span className="info-card__number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="objective-title">
        <div className="container split">
          <SectionHeading id="objective-title" eyebrow="Our approach" title="Your Objective Comes First." />
          <Reveal className="split__body" delay={100}>
            <p className="lead">
              We start by understanding your budget, preferred location, investment horizon, intended use and risk
              considerations before presenting suitable opportunities.
            </p>
            <ul role="list" className="tag-list">
              {considerations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="notice">
              Property investment carries risk. Values and rental income can fall as well as rise, and no appreciation
              or return is guaranteed. We recommend independent legal and financial advice before you commit.
            </p>
            <Link to={advisor} className="btn btn--primary">
              Speak With a Property Investment Advisor <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Explore an Opportunity With Us."
        text="Tell us what you want your property investment to achieve, and we’ll help you understand the options."
        action={{ to: advisor, label: 'Speak With a Property Investment Advisor' }}
      />
    </>
  )
}
