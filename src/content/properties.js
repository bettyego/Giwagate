import { folderPhotos, folderVideo } from './media.js'

/**
 * Property listings.
 *
 * Only real, verified Giwagate listings belong here — never placeholder
 * properties, prices or photos. While this list is empty the site shows a
 * "listings coming soon" message instead.
 *
 * To add a listing, copy this template into the `listings` array below:
 *
 *   {
 *     slug: 'four-bedroom-duplex-guzape',   // unique, URL-safe; also the photo folder name
 *     title: 'Four-bedroom terrace duplex',
 *     purpose: 'sale',                      // 'sale' | 'rent'
 *     categories: ['residential'],          // any of: 'land', 'residential', 'commercial', 'investment'
 *     type: 'Terrace',                      // e.g. 'Land', 'Detached house', 'Terrace', 'Apartment', 'Office'
 *     location: 'Guzape, Abuja',
 *     price: '₦250,000,000',                // display text, or null for "Price on request"
 *     priceValue: 250000000,                // number in naira, used by the price filter (or null)
 *     size: '450 sqm',                      // land and/or building size, or null
 *     bedrooms: 4,                          // or null
 *     bathrooms: 5,                         // or null
 *     summary: 'One sentence for listing cards.',
 *     description: ['Paragraph one.', 'Paragraph two.'],
 *     features: ['Gated estate', 'En-suite bedrooms'],
 *     documents: 'Certificate of Occupancy (C of O)',
 *     availability: 'Available now',
 *     mapQuery: 'Guzape, Abuja',            // what to search on the map, or null to hide it
 *     video: null,                          // optional YouTube link for a video tour
 *   },
 *
 * Photos: put them in src/assets/properties/<slug>/ (see that folder's README).
 * A video file in the same folder is used when `video` is empty.
 */
const listings = []

// Photos and videos from each listing's media folder.
export const properties = listings.map((listing) => ({
  ...listing,
  images: folderPhotos(listing.slug, listing.title),
  videoFile: folderVideo(listing.slug),
}))

export const purposeLabels = { sale: 'For sale', rent: 'For rent' }

export const categoryLabels = {
  land: 'Land',
  residential: 'Residential',
  commercial: 'Commercial',
  investment: 'Investment',
}

/** Price bands for the listings filter, in naira. */
export const priceRanges = [
  { value: 'under-50m', label: 'Under ₦50m', min: 0, max: 50e6 },
  { value: '50m-150m', label: '₦50m – ₦150m', min: 50e6, max: 150e6 },
  { value: '150m-500m', label: '₦150m – ₦500m', min: 150e6, max: 500e6 },
  { value: 'over-500m', label: 'Over ₦500m', min: 500e6, max: Infinity },
]

export function getProperty(slug) {
  return properties.find((p) => p.slug === slug)
}

export function hasVideo(property) {
  return Boolean(property.video || property.videoFile)
}

export function propertyFacts(property) {
  const facts = [property.type]
  if (property.size) facts.push(property.size)
  if (property.bedrooms) facts.push(`${property.bedrooms} bed`)
  if (property.bathrooms) facts.push(`${property.bathrooms} bath`)
  return facts
}

export const featuredProperties = properties.slice(0, 3)
