import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  // imagetools resizes/converts images imported with a query, e.g. `photo.jpg?w=800&format=webp`.
  plugins: [react(), imagetools()],
})
