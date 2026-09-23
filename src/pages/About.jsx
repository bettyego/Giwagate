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
    text: 'The truth about price, condition and documents.',
  },
  {
    title: 'Careful checks',
    text: 'Titles, approvals and the property itself — checked first.',
  },
  {
    title: 'Clear communication',
    text: 'Costs in writing, prompt answers, regular updates.',
  },
]

const clients = [
  { title: 'Buyers', text: 'Homes to own.' },
  { title: 'Tenants', text: 'Homes and offices to rent.' },
  { title: 'Landlords & owners', text: 'Good tenants, well-kept property.' },
  { title: 'Investors', text: 'Building a portfolio.' },
  { title: 'Clients abroad', text: 'Property at home, managed from anywhere.' },
  { title: 'Organisations', text: 'Staff housing and workspace.' },
]

export default function About() {
  usePageTitle('About')

  return (
    <>
      <PageHero
        eyebrow="About Giwagate"
        title="A straightforward property company in Abuja."
        lead="Real estate agency and property management across the FCT."
        image={images.openPlanStair}
      />

      <section className="section" aria-labelledby="story-title">
        <div className="container about-story">
          <SectionHeading id="story-title" eyebrow="Our story" title="Who we are." />
          <Reveal className="placeholder-panel" delay={100}>
            <h3>Company story — to be provided</h3>
            <p>A few lines on when Giwagate was founded, who leads it and the work it does most.</p>
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
            title="Who we work with."
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
              <p>Photos, names and roles of the team.</p>
            </Reveal>
            <Reveal className="placeholder-panel" delay={100}>
              <h3>Registrations & memberships — to be provided</h3>
              <p>CAC registration and professional memberships actually held.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand title="Let’s talk about your property." />
    </>
  )
}
