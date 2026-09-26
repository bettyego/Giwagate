import Reveal from './Reveal.jsx'
import Photo from './Photo.jsx'
import './PageHero.css'

export default function PageHero({ eyebrow, title, lead, image, children }) {
  return (
    <section className={`page-hero on-dark ${image ? 'page-hero--media' : ''}`}>
      <div className="container">
        <div className="page-hero__text">
          <Reveal>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1>{title}</h1>
          </Reveal>
          {(lead || children) && (
            <Reveal className="page-hero__lead" delay={100}>
              {lead && <p className="lead">{lead}</p>}
              {children}
            </Reveal>
          )}
        </div>
      </div>
      {image && (
        <div className="container page-hero__media">
          <Photo image={image} priority sizes="(min-width: 80em) 1280px, 100vw" />
        </div>
      )}
    </section>
  )
}
