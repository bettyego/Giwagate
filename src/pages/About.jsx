import { images } from '../content/images.js'
import { site } from '../content/site.js'
import { about, values } from '../content/company.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import CtaBand from '../components/CtaBand.jsx'
import './About.css'

export default function About() {
  usePageTitle('About')
  const [opening, ...story] = about.story

  return (
    <>
      <PageHero
        eyebrow="About GIWAGATE"
        title="Building Value. Creating Wealth. Building Futures."
        lead={opening}
        image={images.openPlanStair}
      />

      <section className="section" aria-labelledby="story-title">
        <div className="container about-story">
          <SectionHeading id="story-title" eyebrow="Our story" title="Real estate is about people, places and long-term value." />
          <Reveal className="about-story__text" delay={100}>
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
        <div className="container">
          <Reveal as="figure" className="philosophy">
            <blockquote>
              <p>{site.philosophy}</p>
            </blockquote>
            <figcaption>Our philosophy</figcaption>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark" aria-label="Vision and mission">
        <div className="container vision-mission">
          <Reveal className="vision-mission__item">
            <p className="eyebrow">Our vision</p>
            <p className="vision-mission__text">{about.vision}</p>
          </Reveal>
          <Reveal className="vision-mission__item" delay={100}>
            <p className="eyebrow">Our mission</p>
            <p className="vision-mission__text">{about.mission}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="values-title">
        <div className="container">
          <div className="values-heading">
            <SectionHeading id="values-title" eyebrow="Core values" title="The values behind our name." />
            <p className="values-heading__word" aria-hidden="true">
              {values.map((value, index) => (
                <span key={index}>{value.letter}</span>
              ))}
            </p>
          </div>
          <ul role="list" className="values">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} className="value" delay={(index % 4) * 60}>
                <span className="value__letter" aria-hidden="true">
                  {value.letter}
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="what-title">
        <div className="container about-story">
          <SectionHeading id="what-title" eyebrow="What we do" title="From opportunity to completion." />
          <Reveal className="about-story__text" delay={100}>
            {about.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
