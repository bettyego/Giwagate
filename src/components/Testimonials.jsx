import { testimonials } from '../content/testimonials.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import './Testimonials.css'

/** Client testimonials, or a quiet "coming soon" until genuine reviews are added. */
export default function Testimonials() {
  return (
    <section className="section section--ivory testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading id="testimonials-title" eyebrow="Testimonials" title="What our clients say." />
        {testimonials.length > 0 ? (
          <ul role="list" className="testimonials__list">
            {testimonials.map((item, index) => (
              <Reveal as="li" key={item.name} className="testimonial" delay={(index % 3) * 80}>
                <blockquote>
                  <p>“{item.quote}”</p>
                </blockquote>
                <p className="testimonial__name">{item.name}</p>
                {item.detail && <p className="testimonial__detail">{item.detail}</p>}
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="testimonials__empty">
            <span className="testimonials__mark" aria-hidden="true">
              “
            </span>
            <p>Client testimonials coming soon.</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
