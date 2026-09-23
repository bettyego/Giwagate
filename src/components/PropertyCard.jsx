import { Link } from 'react-router'
import { purposeLabels, propertyFacts, hasVideo } from '../content/properties.js'
import Photo from './Photo.jsx'
import './PropertyCard.css'

export default function PropertyCard({ property, headingLevel: Heading = 'h3' }) {
  const [cover] = property.images

  return (
    <article className="property-card">
      <div className="property-card__media">
        <Photo image={cover} sizes="(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw" showNote={false} />
        <span className="property-card__purpose">{purposeLabels[property.purpose]}</span>
        <span className="property-card__media-count">
          {property.images.length} photos{hasVideo(property) && ' · Video'}
        </span>
      </div>
      <div className="property-card__body">
        <p className="property-card__area">{property.area}, Abuja</p>
        <Heading className="property-card__title">
          <Link to={`/properties/${property.slug}`} className="property-card__link">
            {property.title}
          </Link>
        </Heading>
        <p className="property-card__facts">{propertyFacts(property).join('  ·  ')}</p>
        <div className="property-card__footer">
          <p className="property-card__price">{property.price ?? 'Price on request'}</p>
          {property.sample && <span className="sample-flag">Sample listing</span>}
        </div>
      </div>
    </article>
  )
}
