import { useId, useRef, useState } from 'react'
import { site } from '../content/site.js'
import { interests } from '../content/enquiry.js'
import './InquiryForm.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!values.email.trim() && !values.phone.trim()) {
    errors.email = 'Please give us an email address or a phone number.'
  } else if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'This email address doesn’t look quite right.'
  }
  if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Please check this phone number.'
  }
  if (!values.message.trim()) errors.message = 'Please add a short message.'
  return errors
}

function buildMailto(values, subject) {
  const body = [
    values.message,
    '',
    `Name: ${values.name}`,
    ...(values.email.trim() ? [`Email: ${values.email}`] : []),
    ...(values.phone.trim() ? [`Phone: ${values.phone}`] : []),
  ].join('\n')
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(`Enquiry: ${subject}`)}&body=${encodeURIComponent(body)}`
}

/**
 * Enquiry form. Delivery depends on configuration in content/site.js:
 *   1. forms.endpoint set  → JSON POST to that endpoint
 *   2. contact.email set   → opens the visitor's email app, pre-filled
 *   3. neither             → explains that online enquiries aren't active yet
 * The form never claims a message was sent unless the endpoint confirms it.
 */
export default function InquiryForm({ defaultInterest = interests[0], defaultMessage = '', subject }) {
  const uid = useId()
  const formRef = useRef(null)
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    interest: defaultInterest,
    message: defaultMessage,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const id = (name) => `${uid}-${name}`

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    // Honeypot: real visitors never see or fill this field, bots usually do.
    if (formRef.current?.elements.namedItem('company')?.value) {
      setStatus('sent')
      return
    }
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      formRef.current?.elements.namedItem(firstInvalid)?.focus()
      setStatus('idle')
      return
    }

    if (site.forms.endpoint) {
      setStatus('sending')
      try {
        const response = await fetch(site.forms.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, subject: subject ?? values.interest }),
        })
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        setStatus('sent')
        setValues((current) => ({ ...current, message: '' }))
      } catch {
        setStatus('error')
      }
      return
    }

    if (site.contact.email) {
      window.location.href = buildMailto(values, subject ?? values.interest)
      setStatus('handoff')
      return
    }

    setStatus('unconfigured')
  }

  const fieldProps = (name) => ({
    id: id(name),
    name,
    value: values[name],
    onChange: update,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? id(`${name}-error`) : undefined,
  })

  const fieldError = (name) =>
    errors[name] && (
      <p className="field__error" id={id(`${name}-error`)}>
        {errors[name]}
      </p>
    )

  return (
    <form ref={formRef} className="inquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={id('company')}>Leave this field empty</label>
        <input id={id('company')} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="inquiry-form__grid">
        <div className="field inquiry-form__full">
          <label htmlFor={id('name')}>Full name</label>
          <input className="input" type="text" autoComplete="name" {...fieldProps('name')} />
          {fieldError('name')}
        </div>

        <div className="field">
          <label htmlFor={id('email')}>Email</label>
          <input className="input" type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />
          {fieldError('email')}
        </div>

        <div className="field">
          <label htmlFor={id('phone')}>
            Phone or WhatsApp <span className="optional">(optional)</span>
          </label>
          <input className="input" type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('phone')} />
          {fieldError('phone')}
        </div>

        <div className="field inquiry-form__full">
          <label htmlFor={id('interest')}>I’m interested in</label>
          <select className="input" {...fieldProps('interest')}>
            {interests.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="field inquiry-form__full">
          <label htmlFor={id('message')}>Message</label>
          <textarea
            className="input"
            rows={5}
            placeholder="Tell us what you’re looking for — area, budget, timing, or anything else that matters."
            {...fieldProps('message')}
          />
          {fieldError('message')}
        </div>
      </div>

      <div className="inquiry-form__actions">
        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <p className="field__hint">We only use your details to respond to this enquiry.</p>
      </div>

      <div className="inquiry-form__status" role="status" aria-live="polite">
        {status === 'sent' && (
          <p className="inquiry-form__message is-success">
            Thank you — your enquiry has been received. We’ll be in touch soon.
          </p>
        )}
        {status === 'handoff' && (
          <p className="inquiry-form__message">
            Your email app should now open with your message ready. Please press send there to reach us.
          </p>
        )}
        {status === 'error' && (
          <p className="inquiry-form__message is-error">
            Sorry, your enquiry couldn’t be sent just now. Please try again, or contact us directly.
          </p>
        )}
        {status === 'unconfigured' && (
          <p className="inquiry-form__message is-error">
            Online enquiries are not switched on yet, so this message has <strong>not</strong> been sent. Please
            contact Giwagate Properties directly by phone or email for now.
          </p>
        )}
      </div>
    </form>
  )
}
