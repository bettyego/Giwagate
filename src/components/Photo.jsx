import Reveal from './Reveal.jsx'

/**
 * Image with a fixed-ratio frame. Stock images are labelled as illustrative
 * so they are never mistaken for company-owned property.
 */
export default function Photo({ image, className = '', sizes = '100vw', priority = false, reveal = true, showNote = true }) {
  const Wrapper = reveal ? Reveal : 'figure'
  const wrapperProps = reveal ? { as: 'figure', image: true } : {}

  return (
    <Wrapper className={`photo ${className}`} {...wrapperProps}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.srcSet ? sizes : undefined}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
      {image.stock && showNote && <figcaption className="photo__note">Illustrative image</figcaption>}
    </Wrapper>
  )
}
