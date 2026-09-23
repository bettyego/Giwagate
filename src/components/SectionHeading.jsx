import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, intro, id, as: Heading = 'h2', className = '' }) {
  return (
    <Reveal className={`section-heading ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading id={id}>{title}</Heading>
      {intro && <p className="section-heading__intro lead">{intro}</p>}
    </Reveal>
  )
}
