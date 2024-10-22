// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import netlify from '@astrojs/netlify' // Use Netlify adapter

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server', // Keep it as 'server' or 'hybrid' for serverless functions
  adapter: netlify(), // Use Netlify adapter
})
