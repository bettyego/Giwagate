import { useId } from 'react'
import { Link, useSearchParams } from 'react-router'
import { properties } from '../content/properties.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import Reveal from '../components/Reveal.jsx'
import CtaBand from '../components/CtaBand.jsx'
import './Properties.css'

const purposeOptions = [
  { value: '', label: 'All' },
  { value: 'sale', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
]

const unique = (key) => [...new Set(properties.map((p) => p[key]))].sort()
const typeOptions = unique('type')
const areaOptions = unique('area')

export default function Properties() {
  usePageTitle('Properties')
  const uid = useId()
  const [params, setParams] = useSearchParams()

  const filters = {
    purpose: params.get('purpose') ?? '',
    type: params.get('type') ?? '',
    area: params.get('area') ?? '',
  }

  const results = properties.filter(
    (p) =>
      (!filters.purpose || p.purpose === filters.purpose) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.area || p.area === filters.area),
  )

  const hasFilters = Object.values(filters).some(Boolean)

  function setFilter(name, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(name, value)
    else next.delete(name)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <PageHero
        eyebrow="Properties"
        title="Homes and spaces across Abuja."
        lead="Browse properties for sale and to let. If you can’t see what you need, tell us — much of what we handle never reaches a public listing."
      />

      <section className="section listings" aria-labelledby="results-title">
        <div className="container">
          <form className="filters" role="search" aria-label="Filter properties" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="filters__purpose">
              <legend className="sr-only">Looking to</legend>
              {purposeOptions.map((option) => (
                <label key={option.value} className="segmented">
                  <input
                    type="radio"
                    name="purpose"
                    value={option.value}
                    checked={filters.purpose === option.value}
                    onChange={() => setFilter('purpose', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>

            <div className="field filters__field">
              <label htmlFor={`${uid}-type`}>Property type</label>
              <select
                id={`${uid}-type`}
                className="input"
                value={filters.type}
                onChange={(e) => setFilter('type', e.target.value)}
              >
                <option value="">All types</option>
                {typeOptions.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="field filters__field">
              <label htmlFor={`${uid}-area`}>Area</label>
              <select
                id={`${uid}-area`}
                className="input"
                value={filters.area}
                onChange={(e) => setFilter('area', e.target.value)}
              >
                <option value="">All areas</option>
                {areaOptions.map((area) => (
                  <option key={area}>{area}</option>
                ))}
              </select>
            </div>
          </form>

          <div className="listings__bar">
            <h2 id="results-title" className="listings__count" aria-live="polite">
              {results.length} {results.length === 1 ? 'property' : 'properties'}
            </h2>
            {hasFilters && (
              <button type="button" className="listings__clear" onClick={() => setParams({}, { replace: true })}>
                Clear filters
              </button>
            )}
          </div>

          {results.length > 0 ? (
            <ul role="list" className="property-grid">
              {results.map((property, index) => (
                <Reveal as="li" key={property.slug} delay={(index % 3) * 80}>
                  <PropertyCard property={property} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <h3>{hasFilters ? 'Nothing matches those filters right now.' : 'No properties are listed at the moment.'}</h3>
              <p>
                {hasFilters ? 'Try widening your search, or tell us' : 'Tell us'} what you’re looking for and we’ll let
                you know when something suitable comes up.
              </p>
              <div className="empty-state__actions">
                {hasFilters && (
                  <button type="button" className="btn btn--outline" onClick={() => setParams({}, { replace: true })}>
                    Clear filters
                  </button>
                )}
                <Link to="/contact" className="btn btn--primary">
                  Describe what you need
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Own a property in Abuja?"
        text="If you’re thinking of selling or letting, or want someone reliable to manage it, we’d be glad to talk it through."
      />
    </>
  )
}
