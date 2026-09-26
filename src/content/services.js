import { images } from './images.js'

/**
 * Giwagate's eight service lines, as supplied by the company.
 *
 * `cta.to` points each call to action at the most useful page; contact links
 * pre-select the matching "I want to" option (see content/enquiry.js).
 */
const contact = (interest, topic) =>
  `/contact?interest=${encodeURIComponent(interest)}${topic ? `&topic=${encodeURIComponent(topic)}` : ''}`

export const services = [
  {
    id: 'acquisition',
    title: 'Land & Property Acquisition',
    heading: 'Find the Right Property. Make the Right Move.',
    summary: 'Suitable land, residential and commercial property for individuals, businesses and investors.',
    text: ['GIWAGATE assists individuals, businesses and investors seeking suitable land, residential and commercial property opportunities.'],
    listLabel: 'Services include',
    includes: [
      'Property search and sourcing',
      'Land acquisition opportunities',
      'Residential and commercial property sourcing',
      'Investment-property identification',
      'Property inspections and viewing coordination',
      'Negotiation support',
      'Transaction coordination',
    ],
    cta: { label: 'Find a Property', to: '/properties' },
    image: images.timberFacade,
  },
  {
    id: 'sales',
    title: 'Property Sales & Marketing',
    heading: 'Your Property Deserves the Right Market.',
    summary: 'Professional presentation, targeted marketing and buyer engagement for your property.',
    text: [
      'GIWAGATE helps position properties professionally for the market through appropriate presentation, targeted marketing, prospective-buyer engagement and transaction coordination.',
    ],
    listLabel: 'Services include',
    includes: [
      'Property listing',
      'Sales strategy',
      'Property presentation',
      'Digital marketing',
      'Buyer enquiries',
      'Property viewings',
      'Negotiation coordination',
      'Transaction support',
    ],
    cta: { label: 'List Your Property With Us', to: '/list-property' },
    image: images.villaTerrace,
  },
  {
    id: 'development',
    title: 'Real Estate Development',
    heading: 'From Opportunity to Valuable Assets.',
    summary: 'Development focused on functionality, quality, commercial viability and enduring value.',
    text: [
      'GIWAGATE approaches property development with a focus on functionality, quality, commercial viability and enduring value.',
    ],
    listLabel: 'Services can cover',
    includes: [
      'Project conceptualisation',
      'Planning coordination',
      'Development strategy',
      'Project execution',
      'Delivery oversight',
    ],
    cta: { label: 'Discuss a Development Project', to: contact('Develop/Build', 'a development project') },
    image: images.cityTowers,
  },
  {
    id: 'construction',
    title: 'Construction & Engineering',
    heading: 'Building With Purpose.',
    summary: 'Residential, commercial and related property projects, from concept through delivery.',
    text: [
      'Our construction and engineering solutions support residential, commercial and related property projects from concept through delivery.',
    ],
    listLabel: 'Services may include',
    includes: [
      'Building construction',
      'Engineering works',
      'Project coordination',
      'Contractor management',
      'Construction supervision',
      'Related development support',
    ],
    cta: { label: 'Start Your Project', to: contact('Develop/Build', 'a construction project') },
    image: images.openPlanStair,
  },
  {
    id: 'renovation',
    title: 'Renovation & Interior Solutions',
    heading: 'Reimagine Your Space.',
    summary: 'Renovation and interiors that improve function, appearance, usability and market appeal.',
    text: [
      'GIWAGATE provides renovation and interior solutions designed to improve the functionality, appearance, usability and market appeal of residential and commercial properties.',
    ],
    cta: { label: 'Transform Your Property', to: contact('Renovate') },
    image: images.livingModern,
  },
  {
    id: 'management',
    title: 'Property Management',
    heading: 'Own the Asset. Let Us Help Manage the Details.',
    summary: 'Tenant administration, rent monitoring, maintenance and reporting for property owners.',
    text: [],
    listLabel: 'Potential management support includes',
    includes: [
      'Tenant administration',
      'Rent monitoring',
      'Inspection coordination',
      'Maintenance management',
      'Service-provider coordination',
      'Reporting',
      'General property administration',
    ],
    cta: { label: 'Let Us Manage Your Property', to: '/property-management' },
    image: images.courtyardHouse,
  },
  {
    id: 'valuation',
    title: 'Property Valuation',
    heading: 'Better Property Decisions Begin With Better Information.',
    summary: 'Valuation and advisory support for better-informed property decisions.',
    text: ['GIWAGATE facilitates appropriate property valuation and advisory support to help clients make better-informed decisions.'],
    note: 'Where a transaction requires a formal statutory, financing or specialist valuation, the appropriate qualified professionals should be engaged.',
    cta: { label: 'Request a Property Assessment', to: contact('Request Valuation') },
    image: images.whiteVilla,
  },
  {
    id: 'procurement',
    title: 'Procurement & Supply',
    heading: 'Supporting Projects Beyond Construction.',
    summary: 'Coordinated sourcing and supply for development, construction, renovation and facilities.',
    text: [
      'GIWAGATE’s procurement capabilities support property development, construction, renovation and facility requirements through coordinated sourcing and supply.',
    ],
    focus: ['Quality', 'Value', 'Reliability', 'Accountability'],
    cta: { label: 'Request Procurement Support', to: contact('Other', 'procurement support') },
    image: images.officeInterior,
  },
]

export const getService = (id) => services.find((service) => service.id === id)

export const corporate = {
  heading: 'Real Estate Solutions for Businesses & Institutions',
  text: 'GIWAGATE can support corporate organisations, investors, developers, institutions and property owners with:',
  items: ['Property acquisition', 'Development', 'Construction', 'Procurement', 'Renovation', 'Property management', 'Related property solutions'],
  cta: { label: 'Discuss a Corporate Requirement', to: contact('Discuss Partnership', 'a corporate requirement') },
}
