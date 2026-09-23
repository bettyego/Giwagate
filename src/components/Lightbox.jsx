import { useEffect, useRef } from 'react'
import './Lightbox.css'

/**
 * Full-screen photo viewer built on <dialog>, so focus trapping and Escape
 * come from the browser. Arrow keys and swipes move between photos.
 * `index` is the open photo, or null when closed.
 */
export default function Lightbox({ images, index, onChange, onClose, title }) {
  const ref = useRef(null)
  const touchX = useRef(null)
  const open = index !== null

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const count = images.length
  const go = (step) => onChange((index + step + count) % count)

  function handleKeyDown(event) {
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  function handleTouchEnd(event) {
    const dx = event.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  const image = open ? images[index] : null

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={`${title} photos`}
      onClose={onClose}
      onKeyDown={open ? handleKeyDown : undefined}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={open ? handleTouchEnd : undefined}
      // A click on the backdrop (the dialog itself, not its contents) closes it.
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {image && (
        <>
          <div className="lightbox__bar">
            <p aria-live="polite">
              {index + 1} / {count}
            </p>
            <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close photos">
              ✕
            </button>
          </div>
          <figure className="lightbox__stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <img key={index} src={image.src} srcSet={image.srcSet} sizes="100vw" alt={image.alt} />
            {image.stock && <figcaption className="photo__note">Illustrative image</figcaption>}
          </figure>
          {count > 1 && (
            <>
              <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous photo">
                ‹
              </button>
              <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next photo">
                ›
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  )
}
