import { Link, useSearchParams } from 'react-router'
import { projects, projectCategories } from '../content/projects.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import './Projects.css'

const categoryLabel = Object.fromEntries(projectCategories.map((c) => [c.id, c.label]))

export default function Projects() {
  usePageTitle('Projects')
  const [params, setParams] = useSearchParams()
  const active = params.get('category') ?? ''
  const results = projects.filter((project) => !active || project.category === active)

  function choose(id) {
    setParams(id ? { category: id } : {}, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Our projects and portfolio."
        lead="Current and completed projects, properties for sale, development opportunities, renovation and interior work, and the properties we manage."
      />

      <section className="section projects" aria-labelledby="projects-title">
        <div className="container">
          <h2 id="projects-title" className="sr-only">
            Projects
          </h2>
          <div className="project-filter" role="group" aria-label="Filter projects by category">
            {[{ id: '', label: 'All' }, ...projectCategories].map((category) => (
              <button
                key={category.id}
                type="button"
                className="project-filter__option"
                aria-pressed={active === category.id}
                onClick={() => choose(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {results.length > 0 ? (
            <ul role="list" className="project-grid">
              {results.map((project, index) => (
                <Reveal as="li" key={project.title} delay={(index % 3) * 80}>
                  <article className="project-card">
                    {project.images?.[0] && (
                      <Photo image={project.images[0]} sizes="(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw" />
                    )}
                    <p className="project-card__category">{categoryLabel[project.category]}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <dl className="project-card__facts">
                      {[
                        ['Location', project.location],
                        ['Type', project.type],
                        ['Scope', project.scope],
                        ['Status', project.status],
                      ]
                        .filter(([, value]) => value)
                        .map(([label, value]) => (
                          <div key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                    </dl>
                  </article>
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="empty-state projects__empty">
              <h3>{projects.length ? 'No projects in this category yet.' : 'Our project portfolio is being prepared.'}</h3>
              <p>
                Projects will be published here as they are documented. In the meantime, we’d be glad to talk you
                through our work and what we could do for you.
              </p>
              <div className="empty-state__actions">
                <Link to="/contact" className="btn btn--primary">
                  Speak With Us
                </Link>
                <Link to="/developments" className="btn btn--outline">
                  Developments
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
