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
        name: `blog`,
        path: `${__dirname}/blog`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              elements: ['h2']
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
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
                template: (title) => title
              }
            }
          }
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
    'gatsby-plugin-offline'
  ]
}
