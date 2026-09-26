import { Link } from 'react-router'
import { images } from '../content/images.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Arrow from '../components/Arrow.jsx'
import CtaBand from '../components/CtaBand.jsx'

const support = [
  'Tenant coordination',
  'Rent administration',
  'Routine inspection coordination',
  'Maintenance and repairs',
  'Vendor coordination',
  'Expense monitoring',
  'Occupancy reporting',
  'Owner updates',
]

const proposal = `/contact?interest=${encodeURIComponent('Request Property Management')}`

export default function PropertyManagement() {
  usePageTitle('Property Management')

  return (
    <>
      <PageHero
        eyebrow="Property management"
        title="Your Property. Professionally Managed."
        lead="You invested in the property. We help you manage the responsibilities around it."
        image={images.courtyardHouse}
      >
        <Link to={proposal} className="btn btn--primary">
          Get a Property Management Proposal <Arrow />
        </Link>
      </PageHero>

      <section className="section" aria-labelledby="support-title">
        <div className="container">
          <SectionHeading id="support-title" eyebrow="Potential support" title="The day-to-day details, handled." />
          <ul role="list" className="card-grid card-grid--4">
            {support.map((item, index) => (
              <Reveal as="li" key={item} delay={(index % 4) * 60}>
                <article className="info-card">
                  <span className="info-card__number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item}</h3>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Get a Property Management Proposal."
        text="Tell us about your property, its current occupancy and what you need help with."
        action={{ to: proposal, label: 'Get a Property Management Proposal' }}
      />
    </>
  )
}
