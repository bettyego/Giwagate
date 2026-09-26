import { Link, useSearchParams } from 'react-router'
import { site, contactLinks } from '../content/site.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import PropertySubmissionForm from '../components/PropertySubmissionForm.jsx'
import './ListProperty.css'

const copy = {
  sell: {
    pageTitle: 'List Your Property',
    eyebrow: 'Sell your property',
    title: 'Ready to Sell?',
    lead: 'Your property represents significant value. Its marketing should reflect that.',
    formTitle: 'Tell us about your property',
  },
  development: {
    pageTitle: 'Submit Land for Development',
    eyebrow: 'Landowners & joint development',
    title: 'Have Land? Let’s Explore What It Could Become.',
    lead: 'You bring the opportunity. We explore the possibilities together.',
    formTitle: 'Submit your property for development consideration',
  },
}

export default function ListProperty() {
  const [params] = useSearchParams()
  const purpose = params.get('purpose') === 'development' ? 'development' : 'sell'
  const text = copy[purpose]
  usePageTitle(text.pageTitle)

  return (
    <>
      <PageHero eyebrow={text.eyebrow} title={text.title} lead={text.lead} />

      <section className="section list-property" aria-labelledby="submission-title">
        <div className="container list-property__grid">
          <Reveal as="aside" className="list-property__aside">
            {purpose === 'development' ? (
              <p>
                Potential engagements may include property development discussions, development management,
                construction partnerships and other commercially appropriate structures, subject to due diligence and
                mutually agreed terms.
              </p>
            ) : (
              <p>
                Share the essentials and we’ll be in touch to discuss presentation, marketing and the next steps for
                your property.
              </p>
            )}
            <div className="list-property__call">
              <p className="eyebrow">Prefer to talk?</p>
              {contactLinks.phones.map((phone) => (
                <a key={phone.tel} className="list-property__phone" href={phone.href}>
                  {phone.display}
                </a>
              ))}
              {contactLinks.email && (
                <a className="text-link" href={contactLinks.email}>
                  {site.contact.email}
                </a>
              )}
            </div>
            <p className="list-property__switch">
              {purpose === 'development' ? (
                <>
                  Looking to sell instead? <Link to="/list-property" className="text-link">List your property for sale</Link>
                </>
              ) : (
                <>
                  Have land to develop?{' '}
                  <Link to="/list-property?purpose=development" className="text-link">
                    Submit it for development consideration
                  </Link>
                </>
              )}
            </p>
          </Reveal>

          <Reveal className="list-property__form" delay={100}>
            <h2 id="submission-title" className="list-property__heading">
              {text.formTitle}
            </h2>
            <PropertySubmissionForm key={purpose} purpose={purpose} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
