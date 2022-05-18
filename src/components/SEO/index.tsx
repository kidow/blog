import React from 'react'
import type { FC, DetailedHTMLProps, MetaHTMLAttributes } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

export interface Props {
  title?: string
  description?: string
  thumbnail?: string
  url?: string
  meta?: DetailedHTMLProps<
    MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[]
}

const SEO: FC<Props> = ({ title, description, thumbnail, url, meta }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  const TITLE = title || site?.siteMetadata?.title
  const DESCRIPTION = description || site?.siteMetadata?.description
  const THUMBNAIL = thumbnail || 'https://opengraph.kidow.me/api?id=rxzt4zk0v4o'
  const URL = `https://blog.kidow.me${url}`
  return (
    <Helmet
      htmlAttributes={{ lang: 'ko', dir: 'ltr' }}
      title={TITLE}
      link={[{ rel: 'canonical', href: URL }]}
      meta={[
        { name: 'description', content: DESCRIPTION },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#19191c' },
        { name: 'msapplication-TileColor', content: '#19191c' },
        { name: 'robots', content: 'index, follow' },
        {
          name: 'keywords',
          content:
            'blog, react, gatsby, tailwindcss, typescript, github, vercel, front-end'
        },
        { name: 'author', content: 'Dongwook Kim' },
        {
          name: 'google-site-verification',
          content: 'sbzpJiDpgeXijDrNF1qHG4W4P1DpMlpEuS-ztOQm0EU'
        },
        {
          name: 'naver-site-verification',
          content: 'b13059f284b5b3364c6329f2865cfc317cf5fd6c'
        },
        { property: 'og:title', content: TITLE },
        { property: 'og:description', content: DESCRIPTION },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: THUMBNAIL },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '600' },
        { property: 'og:url', content: URL },
        { property: 'og:locale', content: 'ko_KR' },
        { property: 'og:site_name', content: "Web Developer Kidow's Blog" },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:title', content: TITLE },
        { property: 'twitter:description', content: DESCRIPTION },
        { property: 'twitter:domain', content: URL },
        { property: 'twitter:image', content: THUMBNAIL },
        ...(meta ?? [])
      ]}
    />
  )
}

export default SEO
