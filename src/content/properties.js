import { images } from './images.js'
import { folderPhotos, folderVideo } from './media.js'

/**
 * Property listings.
 *
 * IMPORTANT: every entry below is a SAMPLE used to demonstrate the listing
 * design. They are marked `sample: true`, which labels them on the site.
 * Replace them with real, verified listings from Giwagate Properties and set
 * `sample: false` (or remove the flag).
 *
 * Fields
 *   slug        URL-safe identifier, unique. Also the name of the listing's
 *               media folder in src/assets/properties/
 *   purpose     'sale' | 'rent'
 *   type        'House' | 'Apartment' | 'Terrace' | 'Commercial' | 'Land'
 *   area        Abuja district
 *   price       Display string, or null to show "Price on request"
 *   bedrooms / bathrooms   numbers, or null where not applicable
 *   summary     one short sentence — let the photos do the talking
 *   images      stock placeholders; replaced automatically by any photos in
 *               the listing's media folder (see media.js)
 *   video       optional YouTube link for a video tour. A video file in the
 *               listing's media folder is used when this is empty.
 */
const listings = [
  {
    slug: 'sample-detached-house-maitama',
    title: 'Five-bedroom detached house',
    purpose: 'sale',
    type: 'House',
    area: 'Maitama',
    price: null,
    bedrooms: 5,
    bathrooms: 6,
    summary: 'Detached family home on a quiet street, with staff quarters and generous parking.',
    features: ['Boys’ quarters', 'Swimming pool', 'Fitted kitchen', 'Parking for four cars', 'Backup power'],
    images: [images.villaTerrace, images.livingWarm, images.openPlanStair, images.whiteVilla, images.livingModern],
    video: null,
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
    summary: 'New terrace duplex in a gated estate, with hillside views from the upper floor.',
    features: ['Gated estate', 'En-suite bedrooms', 'Private balcony', 'Estate security', 'Allocated parking'],
    images: [images.timberFacade, images.livingModern, images.openPlanStair, images.courtyardHouse, images.livingWarm],
    video: null,
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
    summary: 'Serviced apartment close to shops and restaurants.',
    features: ['Serviced building', 'Lift access', '24-hour power', 'Gym', 'Secure parking'],
    images: [images.livingModern, images.livingWarm, images.openPlanStair, images.cityTowers],
    video: null,
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
    summary: 'Villa on a large plot with landscaped gardens and a pool terrace.',
    features: ['Large plot', 'Swimming pool', 'Cinema room', 'Boys’ quarters', 'Gatehouse'],
    images: [
      images.poolHouse,
      images.livingWarm,
      images.livingModern,
      images.whiteVilla,
      images.openPlanStair,
      images.villaTerrace,
    ],
    video: null,
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
    summary: 'Semi-detached house with a private courtyard, study and guest room.',
    features: ['Private courtyard', 'Study', 'Guest room', 'Fitted wardrobes', 'Water treatment'],
    images: [images.courtyardHouse, images.openPlanStair, images.livingModern, images.livingWarm],
    video: null,
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
    summary: 'Full office floor in a managed building, with meeting rooms and reception.',
    features: ['Managed building', 'Meeting rooms', 'Central air conditioning', 'Backup power', 'Basement parking'],
    images: [images.officeInterior, images.cityTowers, images.livingModern],
    video: null,
    sample: true,
  },
]

// Real photos and videos in a listing's media folder take over from the placeholders.
export const properties = listings.map((listing) => {
  const photos = folderPhotos(listing.slug, listing.title)
  return {
    ...listing,
    images: photos.length ? photos : listing.images,
    videoFile: folderVideo(listing.slug),
  }
})

export const purposeLabels = { sale: 'For sale', rent: 'To let' }

export function getProperty(slug) {
  return properties.find((p) => p.slug === slug)
}

export function hasVideo(property) {
  return Boolean(property.video || property.videoFile)
}

export function propertyFacts(property) {
  const facts = []
  if (property.bedrooms) facts.push(`${property.bedrooms} bedrooms`)
  if (property.bathrooms) facts.push(`${property.bathrooms} bathrooms`)
  facts.push(property.type)
  return facts
}

export const featuredProperties = properties.slice(0, 3)
