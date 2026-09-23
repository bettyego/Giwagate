import { useEffect, useRef, useState } from 'react'

/**
 * Fades content up once it scrolls into view. Pass `image` to use the slower
 * image treatment instead. Motion is disabled by CSS for reduced-motion users.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, image = false, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  const classes = [image ? 'reveal-image' : 'reveal', visible && 'is-visible', className].filter(Boolean).join(' ')
  const mergedStyle = delay ? { ...style, '--reveal-delay': `${delay}ms` } : style

  return (
    <Tag ref={ref} className={classes} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  )
}
