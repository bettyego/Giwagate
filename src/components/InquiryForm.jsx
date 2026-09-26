import { useId, useRef, useState } from 'react'
import { interests } from '../content/enquiry.js'
import { deliverForm, EMAIL_PATTERN } from './formDelivery.js'
import './InquiryForm.css'

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

/** Enquiry form. See formDelivery.js for how it is sent. */
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

    setStatus('sending')
    const result = await deliverForm({
      subject: `Enquiry: ${subject ?? values.interest}`,
      fields: [
        ['I want to', values.interest],
        ['Message', values.message],
        ['Name', values.name],
        ['Email', values.email],
        ['Phone', values.phone],
      ],
    })
    setStatus(result)
    if (result === 'sent') setValues((current) => ({ ...current, message: '' }))
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
          <label htmlFor={id('interest')}>I want to</label>
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
            placeholder="Tell us a little more — location, budget, timing, or anything else that matters."
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
            contact us directly by phone or email.
          </p>
        )}
      </div>
    </form>
  )
}
