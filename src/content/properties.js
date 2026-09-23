import { images } from './images.js'

/**
 * Property listings.
 *
 * IMPORTANT: every entry below is a SAMPLE used to demonstrate the listing
 * design. They are marked `sample: true`, which labels them on the site.
 * Replace them with real, verified listings from Giwagate Properties and set
 * `sample: false` (or remove the flag).
 *
 * Fields
 *   slug        URL-safe identifier, unique
 *   purpose     'sale' | 'rent'
 *   type        'House' | 'Apartment' | 'Terrace' | 'Commercial' | 'Land'
 *   area        Abuja district
 *   price       Display string, or null to show "Price on request"
 *   bedrooms / bathrooms   numbers, or null where not applicable
 *   images      first image is used on cards
 */
export const properties = [
  {
    slug: 'sample-detached-house-maitama',
    title: 'Five-bedroom detached house',
    purpose: 'sale',
    type: 'House',
    area: 'Maitama',
    price: null,
    bedrooms: 5,
    bathrooms: 6,
    summary:
      'A detached family house on a quiet street, with generous living spaces, a staff quarters and parking for several cars.',
    features: ['Boys’ quarters', 'Swimming pool', 'Fitted kitchen', 'Parking for four cars', 'Backup power'],
    images: [images.villaTerrace, images.livingWarm, images.openPlanStair],
    sample: true,
  },
  {
    slug: 'sample-terrace-guzape',
    title: 'Four-bedroom terrace duplex',
    purpose: 'sale',
    type: 'Terrace',
    area: 'Guzape',
    price: null,
    bedrooms: 4,
    bathrooms: 5,
    summary:
      'A newly finished terrace duplex in a gated development, with an open-plan ground floor and hillside views from the upper rooms.',
    features: ['Gated estate', 'En-suite bedrooms', 'Private balcony', 'Estate security', 'Allocated parking'],
    images: [images.timberFacade, images.livingModern, images.openPlanStair],
    sample: true,
  },
  {
    slug: 'sample-apartment-wuse-2',
    title: 'Three-bedroom serviced apartment',
    purpose: 'rent',
    type: 'Apartment',
    area: 'Wuse II',
    price: null,
    bedrooms: 3,
    bathrooms: 3,
    summary:
      'A serviced apartment within walking distance of shops and restaurants, suited to professionals and small families.',
    features: ['Serviced building', 'Lift access', '24-hour power', 'Gym', 'Secure parking'],
    images: [images.livingModern, images.livingWarm, images.openPlanStair],
    sample: true,
  },
  {
    slug: 'sample-villa-asokoro',
    title: 'Six-bedroom villa with pool',
    purpose: 'sale',
    type: 'House',
    area: 'Asokoro',
    price: null,
    bedrooms: 6,
    bathrooms: 7,
    summary:
      'A substantial villa on a large plot with formal and family living areas, landscaped gardens and a pool terrace.',
    features: ['Large plot', 'Swimming pool', 'Cinema room', 'Boys’ quarters', 'Gatehouse'],
    images: [images.poolHouse, images.livingWarm, images.livingModern],
    sample: true,
  },
  {
    slug: 'sample-house-katampe',
    title: 'Four-bedroom semi-detached house',
    purpose: 'rent',
    type: 'House',
    area: 'Katampe Extension',
    price: null,
    bedrooms: 4,
    bathrooms: 4,
    summary:
      'A semi-detached house with a private courtyard, a study and a separate guest room on the ground floor.',
    features: ['Private courtyard', 'Study', 'Guest room', 'Fitted wardrobes', 'Water treatment'],
    images: [images.courtyardHouse, images.openPlanStair, images.livingModern],
    sample: true,
  },
  {
    slug: 'sample-office-cbd',
    title: 'Open-plan office floor',
    purpose: 'rent',
    type: 'Commercial',
    area: 'Central Business District',
    price: null,
    bedrooms: null,
    bathrooms: null,
    summary:
      'A full office floor in a managed building, fitted out with meeting rooms, a kitchenette and shared reception.',
    features: ['Managed building', 'Meeting rooms', 'Central air conditioning', 'Backup power', 'Basement parking'],
    images: [images.officeInterior, images.cityTowers, images.livingModern],
    sample: true,
  },
]

export const purposeLabels = { sale: 'For sale', rent: 'To let' }

export function getProperty(slug) {
  return properties.find((p) => p.slug === slug)
}

export function propertyFacts(property) {
  const facts = []
  if (property.bedrooms) facts.push(`${property.bedrooms} bedrooms`)
  if (property.bathrooms) facts.push(`${property.bathrooms} bathrooms`)
  facts.push(property.type)
  return facts
}

export const featuredProperties = properties.slice(0, 3)
