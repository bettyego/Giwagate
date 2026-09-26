import './MapEmbed.css'

/** Google Maps embed for a place or address. Needs no API key. */
export default function MapEmbed({ query, title }) {
  return (
    <div className="map-embed">
      <iframe
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
