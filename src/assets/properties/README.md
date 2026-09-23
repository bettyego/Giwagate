# Property photos and videos

Each listing gets its own folder here, named exactly like its `slug` in
`src/content/properties.js`. For example:

```
src/assets/properties/
  sample-villa-asokoro/
    01-front.jpg
    02-living-room.jpg
    03-kitchen.jpg
    tour.mp4
```

- **Photos** (`.jpg`, `.png`, `.webp`) show up on the site automatically, in
  filename order. The first one is the cover photo on listing cards, so number
  your files `01-…`, `02-…` and so on.
- Once a folder has photos, they replace the stock images for that listing.
- **Videos** (`.mp4`, `.webm`): keep them short, ideally under 50 MB. GitHub
  rejects files over 100 MB. For longer tours, upload to YouTube and paste the
  link into the listing's `video` field in `properties.js`.
- Landscape photos at least 1600 px wide look best.
