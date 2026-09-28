import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

/**
 * Link previews (WhatsApp, Facebook, LinkedIn) need absolute URLs. On Vercel
 * the production domain is provided at build time; SITE_URL can override it
 * (e.g. once a custom domain is set up). Locally it falls back to relative paths.
 */
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '')

const siteUrlInHtml = {
  name: 'site-url-in-html',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
}

// https://vite.dev/config/
export default defineConfig({
  // imagetools resizes/converts images imported with a query, e.g. `photo.jpg?w=800&format=webp`.
  // `include` also matches upper-case extensions such as .JPG, which many phones produce.
  plugins: [
    react(),
    imagetools({ include: '**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif,HEIF,AVIF,JPEG,JPG,PNG,TIFF,WEBP,GIF}?*' }),
    siteUrlInHtml,
  ],
})
