import { Link } from 'react-router'
import { usePageTitle } from '../hooks/usePageTitle.js'
import './NotFound.css'

export default function NotFound({
  title = 'This page doesn’t exist.',
  text = 'The link may be out of date, or the address may have been typed incorrectly.',
  action = { to: '/', label: 'Back to the homepage' },
}) {
  usePageTitle('Page not found')

  return (
    <section className="section not-found">
      <div className="container container--narrow">
        <p className="eyebrow">Not found</p>
        <h1>{title}</h1>
        <p className="lead">{text}</p>
        <div className="not-found__actions">
          <Link to={action.to} className="btn btn--primary">
            {action.label}
          </Link>
          <Link to="/contact" className="btn btn--outline">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
