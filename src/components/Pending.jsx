const TITLE = 'Placeholder — to be supplied by Giwagate Properties'

/** Inline marker for business information that has not been supplied yet. */
export function Pending({ label }) {
  return (
    <span className="pending" title={TITLE}>
      [{label} to be confirmed]
    </span>
  )
}

/** Renders a contact value as a link, or a placeholder when it is missing. */
export function ContactValue({ value, href, label, external = false }) {
  if (!value) return <Pending label={label} />
  if (!href) return <span>{value}</span>
  return (
    <a className="text-link" href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {value}
    </a>
  )
}
