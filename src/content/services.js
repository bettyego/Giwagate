import { images } from './images.js'

/**
 * Service descriptions. The scope below reflects a real estate agency and
 * property management company; Giwagate should confirm or adjust each item
 * so the site only promises what the business actually offers.
 */
export const services = [
  {
    id: 'sales',
    enquiry: 'Buying a property',
    title: 'Sales & acquisitions',
    audience: 'Buyers and sellers',
    summary: 'Buy or sell at a fair price, with the paperwork checked properly.',
    includes: [
      'Shortlists and accompanied viewings',
      'Title checks — C of O, R of O, Minister’s consent',
      'Support through to completion',
    ],
    image: images.villaTerrace,
  },
  {
    id: 'lettings',
    enquiry: 'Renting a property',
    title: 'Lettings',
    audience: 'Tenants and landlords',
    summary: 'Homes and offices to rent, and referenced tenants for landlords.',
    includes: ['Viewings around your schedule', 'Tenant referencing', 'Every cost itemised before you sign'],
    image: images.livingWarm,
  },
  {
    id: 'management',
    enquiry: 'Property management',
    title: 'Property management',
    audience: 'Owners and landlords',
    summary: 'Rent, repairs and tenants handled — with regular written reports.',
    includes: ['Rent collection', 'Routine inspections', 'Maintenance and repairs'],
    image: images.officeInterior,
  },
  {
    id: 'advisory',
    enquiry: 'Investment or diaspora advice',
    title: 'Investor & diaspora advisory',
    audience: 'Investors and clients outside Abuja',
    summary: 'Buy or hold property in Abuja from anywhere, with video tours and written updates.',
    includes: ['Video walk-throughs', 'Inspections on your behalf', 'Legal checks with your lawyer'],
    image: images.openPlanStair,
  },
]
