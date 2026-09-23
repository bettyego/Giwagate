/**
 * Property photos and videos, picked up automatically from folders.
 *
 * To add media for a listing, create a folder named after its `slug` in
 * src/assets/properties/ and drop files into it:
 *
 *   src/assets/properties/sample-villa-asokoro/01-front.jpg
 *   src/assets/properties/sample-villa-asokoro/02-living-room.jpg
 *   src/assets/properties/sample-villa-asokoro/tour.mp4
 *
 * Photos are shown in filename order, so number them; the first is the cover.
 * Smaller WebP copies are generated at build time. Keep videos short (under
 * ~50 MB) — longer tours are better uploaded to YouTube and linked with the
 * listing's `video` field instead.
 */
const originals = import.meta.glob('../assets/properties/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
})
const srcSets = import.meta.glob('../assets/properties/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
  query: { w: '480;800;1200;1600', format: 'webp', as: 'srcset' },
})
const videos = import.meta.glob('../assets/properties/*/*.{mp4,webm,MP4,WEBM}', {
  eager: true,
  import: 'default',
  query: '?url',
})

const folderOf = (path) => path.split('/').at(-2)
const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true })

/** Photos found in a listing's folder, as image entries, or [] when there are none. */
export function folderPhotos(slug, title) {
  const paths = Object.keys(originals)
    .filter((path) => folderOf(path) === slug)
    .sort(byName)
  return paths.map((path, index) => ({
    src: originals[path],
    srcSet: srcSets[path],
    alt: `${title} — photo ${index + 1} of ${paths.length}`,
    stock: false,
  }))
}

/** The first video file in a listing's folder, or null. */
export function folderVideo(slug) {
  const path = Object.keys(videos)
    .filter((p) => folderOf(p) === slug)
    .sort(byName)[0]
  return path ? videos[path] : null
}

/** Turns a YouTube link (watch, youtu.be or shorts) into its video id, or null. */
export function youtubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/)
  return match ? match[1] : null
}
