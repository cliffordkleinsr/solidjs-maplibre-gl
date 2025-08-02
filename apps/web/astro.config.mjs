// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'Solid MapLibre GL',
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
            //     items: [
            //         // Each item here is one entry in the navigation menu.
            //         {
			// 			label: 'Plain Map',
			// 			slug: 'guides/examples/plain',
			// 		},
            //         {
			// 			label: 'Marker and Popup',
			// 			slug: 'guides/examples/marker-popup',
			// 		},
            //        {
			// 			label: 'Draggable Marker',
			// 			slug: 'guides/examples/draggable-markers',
			// 		},
            //     ],
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