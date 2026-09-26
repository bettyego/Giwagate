import { site } from '../content/site.js'

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Sends a form, depending on configuration in content/site.js:
 *   1. forms.endpoint set → POST to that endpoint (multipart when there are files, JSON otherwise)
 *   2. contact.email set  → opens the visitor's email app, pre-filled
 *   3. neither            → nothing is sent
 * Resolves to 'sent', 'handoff', 'error' or 'unconfigured'. Never claims a
 * message was sent unless the endpoint confirms it.
 *
 * `fields` is an ordered list of [label, value] pairs; empty values are skipped.
 */
export async function deliverForm({ subject, fields, files = [] }) {
  const filled = fields.filter(([, value]) => String(value ?? '').trim())

  if (site.forms.endpoint) {
    try {
      let body
      let headers = { Accept: 'application/json' }
      if (files.length) {
        body = new FormData()
        body.append('subject', subject)
        filled.forEach(([label, value]) => body.append(label, value))
        files.forEach((file) => body.append('photographs', file))
      } else {
        body = JSON.stringify({ subject, ...Object.fromEntries(filled) })
        headers = { ...headers, 'Content-Type': 'application/json' }
      }
      const response = await fetch(site.forms.endpoint, { method: 'POST', headers, body })
      if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      return 'sent'
    } catch {
      return 'error'
    }
  }

  if (site.contact.email) {
    const text = filled.map(([label, value]) => `${label}: ${value}`).join('\n')
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
    return 'handoff'
  }

  return 'unconfigured'
}
