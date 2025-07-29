import { defineConfig } from "@solidjs/start/config";
import { withSolidBase } from "@kobalte/solidbase/config";

export default defineConfig(withSolidBase(
  // SolidStart config
  {
    server: {
      prerender: {
        crawlLinks: true
      }
    }
  },
  // SolidBase config
  {
    title: "Solid MapLibre GL",
    titleTemplate: ":title - Solid MapLibre GL",
    description: "Fully featured, fully customisable static site generation for SolidStart",
    themeConfig: {
      nav: [
        {
          text: 'Reference',
          link: '/reference'
        }
      ], 
      sidebar: {
        "/": {
          items: [
            {
              title: "Overview",
              collapsed: false,
              items: [
                {
                  title: "Home",
                  link: "/"
                },
                {
                  title: "About",
                  link: "/about"
                }
              ]
            }
          ]
        }
      }
    }
  }
));
