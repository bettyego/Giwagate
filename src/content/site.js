/**
 * Business information for Giwagate Properties.
 *
 * Anything set to `null` has not been supplied yet and renders as a clearly
 * labelled placeholder on the site. Replace each `null` with the real value
 * once confirmed — no other code changes are needed.
 */
export const site = {
  name: 'Giwagate Properties',
  shortName: 'Giwagate',
  description: 'Real estate agency and property management company in Abuja, Nigeria.',
  city: 'Abuja',
  region: 'Federal Capital Territory, Nigeria',

  contact: {
    /** Display format, e.g. '+234 800 000 0000' */
    phone: null,
    /** International format, digits only, e.g. '2348000000000' */
    whatsapp: null,
    email: null,
    /** Array of address lines */
    address: null,
    /** e.g. 'Monday to Friday, 9am – 5pm' */
    hours: null,
  },

  /** e.g. [{ label: 'Instagram', href: 'https://instagram.com/...' }] */
  social: [],

  forms: {
    /**
     * URL that accepts a JSON POST of enquiry form data (e.g. Formspree, a
     * serverless function or a CRM webhook). When empty, the form falls back
     * to opening the visitor's email app if `contact.email` is set, and
     * otherwise tells the visitor that online enquiries are not yet active.
     */
    endpoint: null,
  },
}

export const navigation = [
  { to: '/properties', label: 'Properties' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const contactLinks = {
  phone: site.contact.phone ? `tel:${site.contact.phone.replace(/[^\d+]/g, '')}` : null,
  email: site.contact.email ? `mailto:${site.contact.email}` : null,
  whatsapp: site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}` : null,
}
