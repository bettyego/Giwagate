import { youtubeId } from '../content/media.js'

/**
 * A listing's video tour: a YouTube link when one is set, otherwise a video
 * file from the listing's media folder. Renders nothing when there's neither.
 */
export default function VideoTour({ property }) {
  const id = youtubeId(property.video)
  const poster = property.images[0]?.src

  if (id) {
    return (
      <div className="video-tour">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={`Video tour: ${property.title}`}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }

  if (property.videoFile) {
    return (
      <div className="video-tour">
        <video src={property.videoFile} poster={poster} controls playsInline preload="metadata" />
      </div>
    )
  }

  return null
}
