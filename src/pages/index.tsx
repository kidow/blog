import React from 'react'
import type { FC } from 'react'
import { Link, graphql } from 'gatsby'
import { Footer, SEO } from 'components'

const HomePage: FC<{
  data: {
    allMarkdownRemark: {
      nodes: Array<{
        id: string
        frontmatter: {
          title: string
          date: string
          description: string
          thumbnail: string
          keywords: string
        }
        fields: {
          slug: string
        }
      }>
    }
  }
  path: string
  location: {
    search: string
  }
}> = ({ data, path, location }) => {
  console.log('data', data)
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
            <li key={item.id}>
              <Link to={item.fields.slug}>
                <div className="group space-y-2">
                  <h2 className="h-12 line-clamp-2 group-hover:underline">
                    {item.frontmatter.title}
                  </h2>
                  <p className="h-[72px] text-neutral-400 line-clamp-3 group-hover:underline">
                    {item.frontmatter.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs md:text-sm">
                    {item.frontmatter.keywords.split(', ').map((keyword) => (
                      <span
                        className="rounded-full bg-neutral-800 py-1 px-3"
                        key={keyword}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-neutral-400">
                    {item.frontmatter.date}
                  </div>
                </div>
              </Link>
            </li>
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
          thumbnail
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
