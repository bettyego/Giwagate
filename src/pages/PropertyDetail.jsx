import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { getProperty, purposeLabels, properties, hasVideo } from '../content/properties.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import Lightbox from '../components/Lightbox.jsx'
import VideoTour from '../components/VideoTour.jsx'
import Arrow from '../components/Arrow.jsx'
import NotFound from './NotFound.jsx'
import './PropertyDetail.css'

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getProperty(slug)
  const [viewing, setViewing] = useState(null)
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

  const photos = property.images
  // The grid shows up to five photos; the last tile notes how many more there are.
  const tiles = photos.slice(0, 5)
  const hidden = photos.length - tiles.length
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
                <strong>Sample listing.</strong> Not a real property.
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

          <div className={`gallery gallery--${tiles.length}`}>
            {tiles.map((image, index) => (
              <div key={index} className={index === 0 ? 'gallery__main' : 'gallery__thumb'}>
                <Photo
                  image={image}
                  priority={index === 0}
                  reveal={index !== 0}
                  sizes={index === 0 ? '(min-width: 64em) 50vw, 100vw' : '(min-width: 64em) 25vw, 50vw'}
                />
                <button type="button" className="gallery__open" onClick={() => setViewing(index)}>
                  {index === tiles.length - 1 && hidden > 0 ? (
                    <span className="gallery__more">+{hidden} more</span>
                  ) : (
                    <span className="sr-only">Open photo {index + 1} of {photos.length}</span>
                  )}
                </button>
              </div>
            ))}
            <button type="button" className="gallery__all" onClick={() => setViewing(0)}>
              View all {photos.length} photos
            </button>
          </div>

          <Lightbox images={photos} index={viewing} onChange={setViewing} onClose={() => setViewing(null)} title={property.title} />

          <div className="property-detail__body">
            <div className="property-detail__main">
              {hasVideo(property) && (
                <Reveal as="section" aria-labelledby="video-title">
                  <h2 id="video-title" className="property-detail__heading">
                    Video tour
                  </h2>
                  <VideoTour property={property} />
                </Reveal>
              )}

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
                <p className="muted">Ask a question or book a viewing.</p>
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
