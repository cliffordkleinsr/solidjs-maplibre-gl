// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
      title: 'Solid MapLibre GL',
      favicon: '/favicons/mapllibre.svg',
      head: [
          // Add ICO favicon fallback for Safari.
          {
          tag: 'link',
              attrs: {
                  rel: 'icon',
                  href: '/favicons/maplibre.svg',
                  sizes: '32x32',
              },
          },
      ],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cliffordkleinsr/solidjs-maplibre-gl' }],
      sidebar: [
          {
              label: 'Guides',
              items: [
                  // Each item here is one entry in the navigation menu.
                  {
                      label: 'Quickstart',
                      slug: 'guides/quickstart',
                  },
                 
                  
              ],
          },
          { 
              label: 'Examples',
              autogenerate: {directory: 'guides/examples'}
          },
          {
              label: 'Reference',
              autogenerate: { directory: 'reference' },
          },
      ],
      expressiveCode: {
          themes: ['material-theme-ocean', 'github-light'],
      }
      }), solidJs({ devtools: true })],
});