import React from 'react'
import type { FC } from 'react'
import { graphql, Link } from 'gatsby'
import { Card, Footer, SEO } from 'components'
import { PROJECTS } from 'data'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

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
          thumbnail: string
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
          <a
            href="https://whattime.co.kr/wcgo2ling"
            target="_blank"
            className="hover:text-neutral-400 hover:underline"
          >
            커피챗 예약
          </a>
        </div>
        <Link to={data?.allMdx?.nodes?.at(0)?.fields.slug || ''}>
          <article className="group mt-10 gap-10 sm:flex">
            <div className="hidden flex-1 sm:block">
              <img
                src={data?.allMdx?.nodes?.at(0)?.frontmatter.thumbnail}
                alt=""
              />
            </div>
            <div className="flex-1 space-y-2">
              <span className="rounded-full bg-neutral-800 py-1 px-3">
                {data?.allMdx?.nodes.at(0)?.frontmatter.keywords}
              </span>
              <div className="text-2xl font-semibold group-hover:underline">
                {data?.allMdx?.nodes.at(0)?.frontmatter.title}
              </div>
              <div className="text-neutral-400">
                {data?.allMdx?.nodes.at(0)?.frontmatter.description}
              </div>
              <p>
                {dayjs(data?.allMdx?.nodes.at(0)?.frontmatter.date).format(
                  'YYYY년 MM월 DD일'
                )}
              </p>
            </div>
          </article>
        </Link>
        <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.allMdx?.nodes.slice(1).map((item) => (
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
                    className="h-40 w-full rounded object-cover"
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
          date(locale: "ko")
          keywords
          description
          thumbnail
        }
        fields {
          slug
        }
      }
    }
  }
`

export default HomePage
