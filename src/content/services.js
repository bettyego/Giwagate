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
    summary:
      'Finding the right home or investment, or selling one at a fair price, with the paperwork checked properly along the way.',
    body:
      'Buying in Abuja rewards patience and careful checking. We start with a clear brief, narrow the market to properties worth your time, and stay with you through negotiation and completion. For sellers, we advise on realistic pricing, present the property well and handle enquiries so you only meet serious buyers.',
    includes: [
      'A written brief agreed before any viewings',
      'Shortlists and accompanied inspections',
      'Guidance on title documents such as the C of O, R of O and Minister’s consent',
      'Coordination with your lawyer and surveyor through to completion',
    ],
    image: images.villaTerrace,
  },
  {
    id: 'lettings',
    enquiry: 'Renting a property',
    title: 'Lettings',
    audience: 'Tenants and landlords',
    summary:
      'Homes and offices to rent, and dependable tenants for landlords, with every cost and condition set out before anyone signs.',
    body:
      'Renting should not come with surprises. We explain the full cost of a tenancy upfront — rent, service charge, caution deposit, agency and legal fees — and make sure the agreement reflects what was discussed. Landlords get tenants who have been referenced, not just introduced.',
    includes: [
      'Viewings arranged around your schedule',
      'Tenant referencing before a lease is offered',
      'All costs itemised in writing before commitment',
      'Tenancy agreements reviewed with both parties',
    ],
    image: images.livingWarm,
  },
  {
    id: 'management',
    enquiry: 'Property management',
    title: 'Property management',
    audience: 'Owners and landlords',
    summary:
      'Day-to-day care of residential and commercial property for owners who want it handled properly, whether they live nearby or abroad.',
    body:
      'A well-managed property keeps its tenants and its value. We act as the point of contact for tenants, arrange maintenance and repairs, collect rent and keep you informed with regular statements — so you know the condition of your property without having to chase anyone.',
    includes: [
      'Rent collection and remittance',
      'Routine inspections with written reports',
      'Maintenance and repairs through trusted contractors',
      'Tenant relations, renewals and periodic statements',
    ],
    image: images.officeInterior,
  },
  {
    id: 'advisory',
    enquiry: 'Investment or diaspora advice',
    title: 'Investor & diaspora advisory',
    audience: 'Investors and clients outside Abuja',
    summary:
      'Practical guidance for people buying or holding property in Abuja from elsewhere in Nigeria or overseas.',
    body:
      'Distance should not mean guesswork. We can inspect on your behalf, walk you through properties on video, coordinate due diligence with your lawyer and report back in writing at each stage — so decisions are made on clear information rather than on trust alone.',
    includes: [
      'Guidance on districts, property types and likely returns',
      'Video walk-throughs and inspections on your behalf',
      'Coordination of searches and legal checks',
      'Written updates at every stage of a transaction',
    ],
    image: images.openPlanStair,
  },
]
