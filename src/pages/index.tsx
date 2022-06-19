import React from 'react'
import type { FC } from 'react'
import { graphql } from 'gatsby'
import { Card, Footer, SEO } from 'components'
import { PROJECTS } from 'data'

const HomePage: FC<{
  data: {
    allMdx: {
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
          {data?.allMdx?.nodes.map((item) => (
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
        <div className="space-y-5">
          <h2 className="mt-20 w-40 border-b-2 border-neutral-50 pb-3 text-2xl sm:text-3xl">
            프로젝트
          </h2>
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {PROJECTS.map((item, key) => (
              <li className="group" key={key}>
                <a href={item.url} target="_blank">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="h-40 w-full rounded"
                    draggable={false}
                  />
                  <div className="mt-2 group-hover:underline">{item.name}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer path={path} />
    </main>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          date(fromNow: true, locale: "ko")
          keywords
          description
        }
        fields {
          slug
        }
      }
    }
  }
`

export default HomePage
