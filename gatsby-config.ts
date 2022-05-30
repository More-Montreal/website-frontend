import type { GatsbyConfig } from "gatsby";
require("dotenv").config({
  path: `.env`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `More MTL`,
    siteUrl: `https://www.construisonsmtl.ca`
  },
  plugins: ["gatsby-plugin-postcss", {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      "trackingId": "G-XL2QVGXY9B"
    }
  }, "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: "gatsby-source-strapi",
    options: {
      apiURL: process.env.API_URL || "http://localhost:1337",
      accessToken: process.env.STRAPI_TOKEN,
      collectionTypes: [
        {
          singularName: 'post',
          pluginOptions: {
            i18n: {
              locale: 'all'
            }
          }
        }, {
          singularName: 'post-category',
          pluginOptions: {
            i18n: {
              locale: 'all'
            }
          }
        }, {
          singularName: 'action',
          pluginOptions: {
            i18n: {
              locale: 'all'
            }
          }
        }, {
          singularName: 'event',
          pluginOptions: {
            i18n: {
              locale: 'all'
            }
          }
        }
      ],
      singleTypes: [
        {
          singularName: 'homepage',
          queryParams: {
            populate: {
              heroBackground: {
                populate: "*"
              },
              visionPoints: {
                populate: "*",
              },
            },
          },
          pluginOptions: {
            i18n: {
              locale: 'all'
            }
          }
        },
        {
          singularName: 'involvement-callout',
          pluginOptions: {
            i18n: {
              locale: 'all'
            }
          }
        }
      ],
      queryLimit: 1000,
    },
  }, {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/locales`,
      name: `locale`
    }
  }, {
    resolve: `gatsby-plugin-react-i18next`,
    options: {
      localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
      languages: [`fr`, `en`],
      defaultLanguage: `fr`,
      redirect: false,
      // if you are using Helmet, you must include siteUrl, and make sure you add http:https
      siteUrl: `https://www.construisonsmtl.ca`,
      i18nextOptions: {
        interpolation: {
          escapeValue: false // not needed for react as it escapes by default
        },
      },
      pages: [
        {
          matchPath: '/:lang?/:uid',
          languages: ['en', 'fr'],
          getLanguageFromPath: true,
        }
      ]
    }
  }, {
    resolve: "gatsby-plugin-react-svg",
    options: {
        include: "/assets/"
    }
  }]
};

export default config;
