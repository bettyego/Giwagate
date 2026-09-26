import { useId } from 'react'
import { Link, useSearchParams } from 'react-router'
import { properties, categoryLabels, priceRanges } from '../content/properties.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import PageHero from '../components/PageHero.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import Reveal from '../components/Reveal.jsx'
import CtaBand from '../components/CtaBand.jsx'
import './Properties.css'

const purposeOptions = [
  { value: '', label: 'All' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
]

const unique = (values) => [...new Set(values.filter(Boolean))].sort()
const locationOptions = unique(properties.map((p) => p.location))
const typeOptions = unique(properties.map((p) => p.type))
const categoryOptions = Object.keys(categoryLabels).filter((key) => properties.some((p) => p.categories?.includes(key)))
const bedroomOptions = [1, 2, 3, 4, 5]
const FILTERS = ['purpose', 'category', 'location', 'type', 'bedrooms', 'price']

export default function Properties() {
  usePageTitle('Properties')
  const uid = useId()
  const [params, setParams] = useSearchParams()

  const filters = Object.fromEntries(FILTERS.map((name) => [name, params.get(name) ?? '']))
  const range = priceRanges.find((r) => r.value === filters.price)

  const results = properties.filter(
    (p) =>
      (!filters.purpose || p.purpose === filters.purpose) &&
      (!filters.category || p.categories?.includes(filters.category)) &&
      (!filters.location || p.location === filters.location) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.bedrooms || (p.bedrooms ?? 0) >= Number(filters.bedrooms)) &&
      (!range || (p.priceValue != null && p.priceValue >= range.min && p.priceValue < range.max)),
  )

  const hasFilters = Object.values(filters).some(Boolean)
  const clearFilters = () => setParams({}, { replace: true, preventScrollReset: true })

  function setFilter(name, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(name, value)
    else next.delete(name)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const select = (name, label, allLabel, options) => (
    <div className="field filters__field">
      <label htmlFor={`${uid}-${name}`}>{label}</label>
      <select
        id={`${uid}-${name}`}
        className="input"
        value={filters[name]}
        onChange={(e) => setFilter(name, e.target.value)}
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <>
      <PageHero
        eyebrow="Properties"
        title="Find the Right Property. Make the Right Move."
        lead="Land, residential, commercial and investment property — for sale and for rent."
      />

      <section className="section listings" aria-labelledby="results-title">
        <div className="container">
          {properties.length > 0 ? (
            <>
              <form className="filters" role="search" aria-label="Filter properties" onSubmit={(e) => e.preventDefault()}>
                <fieldset className="filters__purpose">
                  <legend className="sr-only">Sale or rent</legend>
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
                <div className="filters__grid">
                  {select(
                    'category',
                    'Category',
                    'All categories',
                    categoryOptions.map((key) => ({ value: key, label: categoryLabels[key] })),
                  )}
                  {select('location', 'Location', 'All locations', locationOptions.map((v) => ({ value: v, label: v })))}
                  {select('type', 'Property type', 'All types', typeOptions.map((v) => ({ value: v, label: v })))}
                  {select(
                    'bedrooms',
                    'Bedrooms',
                    'Any',
                    bedroomOptions.map((n) => ({ value: String(n), label: `${n}+` })),
                  )}
                  {select('price', 'Price range', 'Any price', priceRanges)}
                </div>
              </form>

              <div className="listings__bar">
                <h2 id="results-title" className="listings__count" aria-live="polite">
                  {results.length} {results.length === 1 ? 'property' : 'properties'}
                </h2>
                {hasFilters && (
                  <button type="button" className="listings__clear" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
              </div>
            </>
          ) : (
            <h2 id="results-title" className="sr-only">
              Listings
            </h2>
          )}

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
              <h3>{hasFilters ? 'Nothing matches those filters right now.' : 'New listings are being prepared.'}</h3>
              <p>
                {hasFilters
                  ? 'Try widening your search, or tell us what you’re looking for and we’ll let you know when something suitable comes up.'
                  : 'Verified listings will be published here soon. Tell us what you’re looking for — location, budget and property type — and we’ll help you find it.'}
              </p>
              <div className="empty-state__actions">
                {hasFilters && (
                  <button type="button" className="btn btn--outline" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
                <Link to={`/contact?interest=${encodeURIComponent('Buy Property')}`} className="btn btn--primary">
                  Tell Us What You Need
                </Link>
                {!hasFilters && (
                  <Link to="/list-property" className="btn btn--outline">
                    List Your Property
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Own a Property in Abuja?"
        text="Your property deserves the right market. List it with us for professional presentation, targeted marketing and buyer engagement."
        action={{ to: '/list-property', label: 'List Your Property With Us' }}
      />
    </>
  )
}
