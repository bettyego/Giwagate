import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  // imagetools resizes/converts images imported with a query, e.g. `photo.jpg?w=800&format=webp`.
  // `include` also matches upper-case extensions such as .JPG, which many phones produce.
  plugins: [react(), imagetools({ include: '**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif,HEIF,AVIF,JPEG,JPG,PNG,TIFF,WEBP,GIF}?*' })],
})
