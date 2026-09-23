import { images } from '../content/images.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import CtaBand from '../components/CtaBand.jsx'
import './About.css'

const principles = [
  {
    title: 'Honest advice',
    text: 'We tell clients what we would want to be told — about price, condition, documents and timing — even when it isn’t what they hoped to hear.',
  },
  {
    title: 'Careful checks',
    text: 'Property in Abuja carries real risk when details are skipped. We look at titles, approvals and the property itself before recommending anything.',
  },
  {
    title: 'Clear communication',
    text: 'Costs are itemised in writing, questions are answered promptly, and clients abroad get updates they can act on without having to chase us.',
  },
]

const clients = [
  { title: 'Buyers', text: 'Families and individuals looking for a home to own.' },
  { title: 'Tenants', text: 'People and companies looking to rent homes or offices.' },
  { title: 'Landlords & owners', text: 'Owners who want good tenants and a well-kept property.' },
  { title: 'Investors', text: 'Clients building or managing a property portfolio.' },
  { title: 'Clients abroad', text: 'Nigerians in the diaspora buying or holding property at home.' },
  { title: 'Organisations', text: 'Companies and institutions sourcing staff housing or workspace.' },
]

export default function About() {
  usePageTitle('About')

  return (
    <>
      <PageHero
        eyebrow="About Giwagate"
        title="A straightforward property company in Abuja."
        lead="Giwagate Properties is a real estate agency and property management company based in Abuja. We help people buy, rent, let and look after property across the Federal Capital Territory."
        image={images.openPlanStair}
      />

      <section className="section" aria-labelledby="story-title">
        <div className="container about-story">
          <SectionHeading id="story-title" eyebrow="Our story" title="Who we are." />
          <Reveal className="placeholder-panel" delay={100}>
            <h3>Company story — to be provided</h3>
            <p>
              This section is reserved for Giwagate’s own account: when and why the company was founded, who leads
              it, and the kind of work the team does most. It has been left blank deliberately rather than filled with
              invented history.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="principles-title">
        <div className="container">
          <SectionHeading
            id="principles-title"
            eyebrow="How we work"
            title="What clients can expect from us."
          />
          <ol role="list" className="principles">
            {principles.map((item, index) => (
              <Reveal as="li" key={item.title} className="principle" delay={index * 80}>
                <span className="principle__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="clients-title">
        <div className="container about-clients">
          <SectionHeading
            id="clients-title"
            eyebrow="Who we work with"
            title="Clients with different needs, one standard of service."
          />
          <ul role="list" className="client-list">
            {clients.map((client, index) => (
              <Reveal as="li" key={client.title} delay={(index % 3) * 60}>
                <h3>{client.title}</h3>
                <p>{client.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="team-title">
        <div className="container">
          <SectionHeading id="team-title" eyebrow="People & credentials" title="The team behind Giwagate." />
          <div className="about-placeholders">
            <Reveal className="placeholder-panel">
              <h3>Team profiles — to be provided</h3>
              <p>Names, roles, short biographies and professional photographs of the people clients will deal with.</p>
            </Reveal>
            <Reveal className="placeholder-panel" delay={100}>
              <h3>Registrations & memberships — to be provided</h3>
              <p>
                For example, CAC registration and any professional bodies the company or its staff belong to. Only
                credentials Giwagate actually holds should be listed here.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand title="Let’s talk about your property." />
    </>
  )
}
