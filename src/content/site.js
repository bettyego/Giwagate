/**
 * Business information for Giwagate Properties Limited.
 *
 * Anything set to `null` (or an empty list) has not been supplied yet and is
 * simply left off the site. Fill it in once confirmed — no other code changes
 * are needed.
 */
export const site = {
  name: 'Giwagate Properties Limited',
  shortName: 'Giwagate',
  promise: 'Building Value, Creating Wealth.',
  philosophy: 'More Than Properties… We Build Futures.',
  description:
    'An integrated real estate and property solutions company in Abuja: acquisition, sales, development, construction, renovation, management, valuation and procurement.',
  city: 'Abuja',
  region: 'Federal Capital Territory, Nigeria',

  contact: {
    /** `display` is shown on the site; `tel` is the international dialling form. */
    phones: [
      { display: '0912 924 1886', tel: '+2349129241886' },
      { display: '0907 834 2723', tel: '+2349078342723' },
    ],
    /** International format, digits only, e.g. '2349129241886'. Not supplied yet. */
    whatsapp: null,
    email: 'giwagateproperties@gmail.com',
    address: ['4th Floor, Nicon Plaza', 'Central Area, Abuja'],
    landmarks: 'Opposite BUA Group • Beside Kefianos Motors • By Grand Square',
    /** Used for the map embed. */
    mapQuery: 'Nicon Plaza, Central Area, Abuja',
    /** e.g. 'Monday to Friday, 9am – 5pm'. Not supplied yet. */
    hours: null,
  },

  /** e.g. [{ label: 'Instagram', href: 'https://instagram.com/...' }] */
  social: [],

  forms: {
    /**
     * URL that accepts a POST of form data (e.g. Formspree, a serverless
     * function or a CRM webhook). Enquiries are sent as JSON; property
     * submissions as multipart form data so photographs can be included.
     * When empty, forms open the visitor's email app pre-filled instead.
     */
    endpoint: null,
  },
}

/** Main navigation. Home is reached through the logo on desktop and listed in the mobile menu. */
export const navigation = [
  { to: '/about', label: 'About' },
  { to: '/properties', label: 'Properties' },
  { to: '/services', label: 'Services' },
  { to: '/developments', label: 'Developments' },
  { to: '/investment', label: 'Investment' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export const contactLinks = {
  phones: site.contact.phones.map((phone) => ({ ...phone, href: `tel:${phone.tel}` })),
  email: site.contact.email ? `mailto:${site.contact.email}` : null,
  whatsapp: site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}` : null,
  map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapQuery)}`,
}
