import { Link, useParams } from 'react-router'
import { getProperty, purposeLabels, properties } from '../content/properties.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import Arrow from '../components/Arrow.jsx'
import NotFound from './NotFound.jsx'
import './PropertyDetail.css'

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getProperty(slug)
  usePageTitle(property ? `${property.title}, ${property.area}` : 'Property not found')

  if (!property) {
    return (
      <NotFound
        title="We couldn’t find that property."
        text="It may have been let, sold or withdrawn, or the link may be incorrect."
        action={{ to: '/properties', label: 'Browse properties' }}
      />
    )
  }

  const [cover, ...rest] = property.images
  // Similar listings first: same purpose (buy/rent), then same area.
  const relevance = (p) => (p.purpose === property.purpose ? 2 : 0) + (p.area === property.area ? 1 : 0)
  const others = properties
    .filter((p) => p.slug !== property.slug)
    .sort((a, b) => relevance(b) - relevance(a))
    .slice(0, 3)
  const details = [
    ['Status', purposeLabels[property.purpose]],
    ['Type', property.type],
    ['Location', `${property.area}, Abuja`],
    property.bedrooms && ['Bedrooms', property.bedrooms],
    property.bathrooms && ['Bathrooms', property.bathrooms],
    ['Price', property.price ?? 'On request'],
  ].filter(Boolean)

  return (
    <>
      <article className="property-detail">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol role="list">
              <li>
                <Link to="/properties">Properties</Link>
              </li>
              <li aria-current="page">{property.title}</li>
            </ol>
          </nav>

          {property.sample && (
            <p className="notice property-detail__notice">
              <span>
                <strong>Sample listing.</strong> This page demonstrates how a Giwagate listing will look. It is not a
                real property and is not available to buy or rent.
              </span>
            </p>
          )}

          <header className="property-detail__header">
            <Reveal>
              <p className="eyebrow">
                {purposeLabels[property.purpose]} · {property.area}, Abuja
              </p>
              <h1>{property.title}</h1>
            </Reveal>
            <Reveal className="property-detail__price" delay={100}>
              <span>Price</span>
              {property.price ?? 'On request'}
            </Reveal>
          </header>

          <div className="gallery">
            <Photo image={cover} className="gallery__main" priority sizes="(min-width: 64em) 66vw, 100vw" />
            {rest.map((image, index) => (
              <Photo key={index} image={image} className="gallery__thumb" sizes="(min-width: 64em) 33vw, 50vw" />
            ))}
          </div>

          <div className="property-detail__body">
            <div className="property-detail__main">
              <Reveal as="section" aria-labelledby="overview-title">
                <h2 id="overview-title" className="property-detail__heading">
                  Overview
                </h2>
                <p className="lead">{property.summary}</p>
              </Reveal>

              <Reveal as="section" aria-labelledby="details-title">
                <h2 id="details-title" className="property-detail__heading">
                  Key details
                </h2>
                <dl className="facts">
                  {details.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal as="section" aria-labelledby="features-title">
                <h2 id="features-title" className="property-detail__heading">
                  Features
                </h2>
                <ul role="list" className="checklist property-detail__features">
                  {property.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="property-detail__aside" aria-labelledby="enquire-title">
              <div className="enquiry-panel">
                <h2 id="enquire-title">Enquire about this property</h2>
                <p className="muted">Ask a question or request a viewing, and we’ll get back to you.</p>
                <div className="inquiry-form--stacked">
                  <InquiryForm
                    key={property.slug}
                    defaultInterest={property.purpose === 'rent' ? 'Renting a property' : 'Buying a property'}
                    defaultMessage={`I’d like more information about the ${property.title.toLowerCase()} in ${property.area}.`}
                    subject={`${property.title}, ${property.area}`}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="section section--ivory" aria-labelledby="more-title">
          <div className="container">
            <div className="more-heading">
              <h2 id="more-title">More properties</h2>
              <Link to="/properties" className="link-arrow">
                View all <Arrow />
              </Link>
            </div>
            <ul role="list" className="property-grid">
              {others.map((item) => (
                <li key={item.slug}>
                  <PropertyCard property={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
