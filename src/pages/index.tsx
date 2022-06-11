import React from 'react'
import type { FC } from 'react'
import { graphql } from 'gatsby'
import { Card, Footer, SEO } from 'components'

const HomePage: FC<{
  data: {
    allMarkdownRemark: {
      nodes: Array<{
        id: string
        frontmatter: {
          title: string
          date: string
          description: string
          keywords: string
        }
        fields: {
          slug: string
        }
      }>
    }
  }
  path: string
}> = ({ data, path }) => {
  return (
    <main>
      <SEO title="개발자 Kidow 블로그" />
      <div className="container mx-auto min-h-screen px-6 pt-10 pb-20">
        <div className="flex items-center gap-5 text-sm text-neutral-500">
          <img src="/kidow-blog.svg" alt="" className="h-7" />
          <a
            href="https://resume.kidow.me"
            target="_blank"
            className="hover:text-neutral-400 hover:underline"
          >
            Résumé
          </a>
          <a
            href="https://github.com/kidow"
            target="_blank"
            className="hover:text-neutral-400 hover:underline"
          >
            Github
          </a>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.allMarkdownRemark?.nodes.map((item) => (
            <Card
              key={item.id}
              title={item.frontmatter.title}
              date={item.frontmatter.date}
              description={item.frontmatter.description}
              keywords={item.frontmatter.keywords}
              slug={item.fields.slug}
            />
          ))}
        </ul>
      </div>
      <Footer path={path} />
    </main>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          date(fromNow: true, locale: "ko")
          description
          keywords
        }
        fields {
          slug
        }
      }
    }
  }
`

export default HomePage
