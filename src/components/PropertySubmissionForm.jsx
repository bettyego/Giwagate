import { useId, useRef, useState } from 'react'
import { site } from '../content/site.js'
import { propertyTypes, titleDocuments, contactMethods } from '../content/enquiry.js'
import { deliverForm, EMAIL_PATTERN } from './formDelivery.js'
import './InquiryForm.css'

const MAX_PHOTOS = 10

const empty = {
  name: '',
  phone: '',
  email: '',
  location: '',
  type: propertyTypes[0],
  price: '',
  description: '',
  documents: titleDocuments[0],
  contactMethod: contactMethods[0],
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (values.phone.replace(/\D/g, '').length < 7) errors.phone = 'Please give us a phone number we can reach you on.'
  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'This email address doesn’t look quite right.'
  }
  if (!values.location.trim()) errors.location = 'Please tell us where the property is.'
  if (!values.description.trim()) errors.description = 'Please describe the property briefly.'
  return errors
}

/**
 * Form for owners who want to sell a property (`purpose="sell"`) or put land
 * forward for development (`purpose="development"`). Photographs can only be
 * sent when a form endpoint is configured; otherwise the visitor is asked to
 * attach them in their email app.
 */
export default function PropertySubmissionForm({ purpose = 'sell' }) {
  const uid = useId()
  const formRef = useRef(null)
  const [values, setValues] = useState(empty)
  const [photos, setPhotos] = useState([])
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const forDevelopment = purpose === 'development'
  const id = (name) => `${uid}-${name}`

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function choosePhotos(event) {
    setPhotos([...event.target.files].slice(0, MAX_PHOTOS))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (formRef.current?.elements.namedItem('company')?.value) {
      setStatus('sent')
      return
    }
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      formRef.current?.elements.namedItem(firstInvalid)?.focus()
      return
    }

    setStatus('sending')
    const result = await deliverForm({
      subject: forDevelopment
        ? `Development consideration: ${values.type}, ${values.location}`
        : `Property to sell: ${values.type}, ${values.location}`,
      fields: [
        ['Purpose', forDevelopment ? 'Development consideration' : 'Sell property'],
        ['Name', values.name],
        ['Phone', values.phone],
        ['Email', values.email],
        ['Property location', values.location],
        ['Property type', values.type],
        [forDevelopment ? 'Indicative value' : 'Asking price', values.price],
        ['Title / documentation', values.documents],
        ['Preferred contact method', values.contactMethod],
        ['Property description', values.description],
        ['Photographs', photos.length ? `${photos.length} selected` : ''],
      ],
      files: site.forms.endpoint ? photos : [],
    })
    setStatus(result)
    if (result === 'sent') {
      setValues(empty)
      setPhotos([])
      formRef.current?.reset()
    }
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

      <fieldset className="inquiry-form__group">
        <legend>Your details</legend>
        <div className="inquiry-form__grid">
          <div className="field inquiry-form__full">
            <label htmlFor={id('name')}>Full name</label>
            <input className="input" type="text" autoComplete="name" {...fieldProps('name')} />
            {fieldError('name')}
          </div>
          <div className="field">
            <label htmlFor={id('phone')}>Phone</label>
            <input className="input" type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('phone')} />
            {fieldError('phone')}
          </div>
          <div className="field">
            <label htmlFor={id('email')}>
              Email <span className="optional">(optional)</span>
            </label>
            <input className="input" type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />
            {fieldError('email')}
          </div>
          <fieldset className="field inquiry-form__full inquiry-form__choices">
            <legend>Preferred contact method</legend>
            <div>
              {contactMethods.map((method) => (
                <label key={method} className="choice">
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method}
                    checked={values.contactMethod === method}
                    onChange={update}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </fieldset>

      <fieldset className="inquiry-form__group">
        <legend>{forDevelopment ? 'The land or property' : 'The property'}</legend>
        <div className="inquiry-form__grid">
          <div className="field inquiry-form__full">
            <label htmlFor={id('location')}>Property location</label>
            <input className="input" type="text" placeholder="e.g. Plot 12, Guzape, Abuja" {...fieldProps('location')} />
            {fieldError('location')}
          </div>
          <div className="field">
            <label htmlFor={id('type')}>Property type</label>
            <select className="input" {...fieldProps('type')}>
              {propertyTypes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor={id('price')}>
              {forDevelopment ? 'Indicative value' : 'Asking price'} <span className="optional">(optional)</span>
            </label>
            <input className="input" type="text" inputMode="decimal" placeholder="₦" {...fieldProps('price')} />
          </div>
          <div className="field inquiry-form__full">
            <label htmlFor={id('documents')}>Title / documentation</label>
            <select className="input" {...fieldProps('documents')}>
              {titleDocuments.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="field inquiry-form__full">
            <label htmlFor={id('description')}>Property description</label>
            <textarea
              className="input"
              rows={5}
              placeholder={
                forDevelopment
                  ? 'Plot size, access, current use, and what you have in mind for the land.'
                  : 'Size, bedrooms, condition, key features and anything a buyer should know.'
              }
              {...fieldProps('description')}
            />
            {fieldError('description')}
          </div>
          <div className="field inquiry-form__full">
            <label htmlFor={id('photos')}>
              Upload photographs <span className="optional">(optional, up to {MAX_PHOTOS})</span>
            </label>
            <input id={id('photos')} className="input input--file" type="file" accept="image/*" multiple onChange={choosePhotos} />
            {photos.length > 0 && (
              <p className="field__hint">
                {photos.length} photo{photos.length === 1 ? '' : 's'} selected
                {!site.forms.endpoint && ' — your email app will open next; please attach them there before sending.'}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <div className="inquiry-form__actions">
        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Submit My Property'}
        </button>
        <p className="field__hint">We only use your details to respond to this submission.</p>
      </div>

      <div className="inquiry-form__status" role="status" aria-live="polite">
        {status === 'sent' && (
          <p className="inquiry-form__message is-success">
            Thank you — your property details have been received. We’ll be in touch soon.
          </p>
        )}
        {status === 'handoff' && (
          <p className="inquiry-form__message">
            Your email app should now open with your property details ready.{' '}
            {photos.length > 0
              ? 'Please attach your photographs to that email, then press send to reach us.'
              : 'Press send there to reach us.'}
          </p>
        )}
        {status === 'error' && (
          <p className="inquiry-form__message is-error">
            Sorry, your details couldn’t be sent just now. Please try again, or call us directly.
          </p>
        )}
        {status === 'unconfigured' && (
          <p className="inquiry-form__message is-error">
            Online submissions are not switched on yet, so this has <strong>not</strong> been sent. Please call us
            directly.
          </p>
        )}
      </div>
    </form>
  )
}
