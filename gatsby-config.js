const path = require('path')

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: 'kidow 블로그',
    author: 'Dongwook Kim',
    description: '더 게으르기 위해 더 열심히 공부하는 개발자입니다.',
    siteUrl: 'https://blog.kidow.me'
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `contents`,
        path: `${__dirname}/contents`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              elements: ['h1', 'h2', 'h3']
            }
          },
          'gatsby-remark-prismjs-copy-button',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-mermaid',
          {
            resolve: 'gatsby-remark-images',
            options: {
              showCaptions: true
            }
          },
          {
            resolve: 'gatsby-remark-series',
            options: {
              render: {
                placeholder: 'toc',
                template: ({ items, name }) => `
                  <div class="series-container">
                    <div>${name}</div>
                    <ol>
                      ${items
                        ?.map(
                          (item, key) =>
                            `<li><span>${key + 1}. </span><a href="${
                              item.slug
                            }">${item.slug.slice(1, -1)}</a></li>`
                        )
                        .join('')}
                    </ol>
                  </div>
                `
              },
              resolvers: {
                slug: (markdownNode) => markdownNode.fields.slug
              }
            }
          },
          'gatsby-remark-external-links'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-TFHQLMX'
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        components: path.join(__dirname, 'src/components')
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Kidow 블로그',
        short_name: '블로그',
        icons: [
          {
            src: 'src/images/apple-touch-icon-57x57.png',
            sizes: '57x57',
            type: 'image/png'
          },
          {
            src: 'src/images/apple-touch-icon-60x60.png',
            sizes: '60x60',
            type: 'image/png'
          },
          {
            src: 'src/images/apple-touch-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'src/images/apple-touch-icon-76x76.png',
            sizes: '76x76',
            type: 'image/png'
          },
          {
            src: 'src/images/apple-touch-icon-114x114.png',
            sizes: '114x114',
            type: 'image/png'
          },
          {
            src: 'src/images/apple-touch-icon-120x120.png',
            sizes: '120x120',
            type: 'image/png'
          },
          {
            src: 'src/images/apple-touch-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'src/images/apple-touch-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        start_url: '/',
        display: 'standalone',
        theme_color: '#171717',
        background_color: '#19191c'
      }
    }
  ]
}
