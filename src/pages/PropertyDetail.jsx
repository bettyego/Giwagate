import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getProperty, purposeLabels, categoryLabels, properties, hasVideo } from '../content/properties.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import Lightbox from '../components/Lightbox.jsx'
import VideoTour from '../components/VideoTour.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import Arrow from '../components/Arrow.jsx'
import NotFound from './NotFound.jsx'
import './PropertyDetail.css'

/** The three ways to enquire, each starting the enquiry form with a suitable message. */
const requests = [
  { id: 'inspection', label: 'Schedule Inspection', message: (p) => `I’d like to schedule an inspection of the ${p}.` },
  { id: 'advisor', label: 'Speak With an Advisor', message: (p) => `I’d like to speak with an advisor about the ${p}.` },
  { id: 'details', label: 'Request Details', message: (p) => `Please send me more details about the ${p}.` },
]

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getProperty(slug)
  const [viewing, setViewing] = useState(null)
  const [request, setRequest] = useState(requests[2])
  const formRef = useRef(null)
  usePageTitle(property ? `${property.title}, ${property.location}` : 'Property not found')

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
  const name = `${property.title.toLowerCase()} in ${property.location}`

  // Similar listings first: same purpose (sale/rent), then same location.
  const relevance = (p) => (p.purpose === property.purpose ? 2 : 0) + (p.location === property.location ? 1 : 0)
  const others = properties
    .filter((p) => p.slug !== property.slug)
    .sort((a, b) => relevance(b) - relevance(a))
    .slice(0, 3)

  const details = [
    ['Status', purposeLabels[property.purpose]],
    ['Property type', property.type],
    ['Category', property.categories?.map((c) => categoryLabels[c]).join(', ')],
    ['Location', property.location],
    ['Land / building size', property.size],
    ['Bedrooms', property.bedrooms],
    ['Bathrooms', property.bathrooms],
    ['Title / documentation', property.documents],
    ['Availability', property.availability],
    ['Price', property.price ?? 'On request'],
  ].filter(([, value]) => value)

  function chooseRequest(next) {
    setRequest(next)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Wait for the form to re-mount with the new message before focusing it.
    requestAnimationFrame(() => formRef.current?.querySelector('input:not([tabindex="-1"])')?.focus({ preventScroll: true }))
  }

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

          <header className="property-detail__header">
            <Reveal>
              <p className="eyebrow">
                {purposeLabels[property.purpose]} · {property.location}
              </p>
              <h1>{property.title}</h1>
            </Reveal>
            <Reveal className="property-detail__price" delay={100}>
              <span>Price</span>
              {property.price ?? 'On request'}
            </Reveal>
          </header>

          {tiles.length > 0 && (
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
                      <span className="sr-only">
                        Open photo {index + 1} of {photos.length}
                      </span>
                    )}
                  </button>
                </div>
              ))}
              <button type="button" className="gallery__all" onClick={() => setViewing(0)}>
                View all {photos.length} photos
              </button>
            </div>
          )}

          <Lightbox
            images={photos}
            index={viewing}
            onChange={setViewing}
            onClose={() => setViewing(null)}
            title={property.title}
          />

          <div className="property-actions">
            {requests.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`btn ${item.id === 'inspection' ? 'btn--primary' : 'btn--outline'}`}
                onClick={() => chooseRequest(item)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="property-detail__body">
            <div className="property-detail__main">
              <Reveal as="section" aria-labelledby="overview-title">
                <h2 id="overview-title" className="property-detail__heading">
                  Description
                </h2>
                <div className="property-detail__description">
                  {(property.description?.length ? property.description : [property.summary]).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
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

              {property.features?.length > 0 && (
                <Reveal as="section" aria-labelledby="features-title">
                  <h2 id="features-title" className="property-detail__heading">
                    Key features
                  </h2>
                  <ul role="list" className="checklist property-detail__features">
                    {property.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {hasVideo(property) && (
                <Reveal as="section" aria-labelledby="video-title">
                  <h2 id="video-title" className="property-detail__heading">
                    Video tour
                  </h2>
                  <VideoTour property={property} />
                </Reveal>
              )}

              {property.mapQuery && (
                <Reveal as="section" aria-labelledby="map-title">
                  <h2 id="map-title" className="property-detail__heading">
                    Location
                  </h2>
                  <MapEmbed query={property.mapQuery} title={`Map showing ${property.location}`} />
                </Reveal>
              )}
            </div>

            <aside className="property-detail__aside" aria-labelledby="enquire-title" ref={formRef}>
              <div className="enquiry-panel">
                <h2 id="enquire-title">{request.label}</h2>
                <p className="muted">Tell us how to reach you and we’ll respond promptly.</p>
                <div className="inquiry-form--stacked">
                  <InquiryForm
                    key={`${property.slug}-${request.id}`}
                    defaultInterest={property.purpose === 'rent' ? 'Other' : 'Buy Property'}
                    defaultMessage={request.message(name)}
                    subject={`${request.label}: ${property.title}, ${property.location}`}
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
