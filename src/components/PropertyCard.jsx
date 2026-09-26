import { Link } from 'react-router'
import { purposeLabels, propertyFacts, hasVideo } from '../content/properties.js'
import Photo from './Photo.jsx'
import './PropertyCard.css'

export default function PropertyCard({ property, headingLevel: Heading = 'h3' }) {
  const [cover] = property.images

  return (
    <article className="property-card">
      <div className="property-card__media">
        {cover ? (
          <Photo image={cover} sizes="(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw" showNote={false} />
        ) : (
          <div className="property-card__placeholder">Photos coming soon</div>
        )}
        <span className="property-card__purpose">{purposeLabels[property.purpose]}</span>
        {property.images.length > 0 && (
          <span className="property-card__media-count">
            {property.images.length} photos{hasVideo(property) && ' · Video'}
          </span>
        )}
      </div>
      <div className="property-card__body">
        <p className="property-card__area">{property.location}</p>
        <Heading className="property-card__title">
          <Link to={`/properties/${property.slug}`} className="property-card__link">
            {property.title}
          </Link>
        </Heading>
        <p className="property-card__facts">{propertyFacts(property).join('  ·  ')}</p>
        <div className="property-card__footer">
          <p className="property-card__price">{property.price ?? 'Price on request'}</p>
          {property.availability && <span className="sample-flag">{property.availability}</span>}
        </div>
      </div>
    </article>
  )
}
