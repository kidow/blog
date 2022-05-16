import React from 'react'
import type { FC } from 'react'
import '../styles/index.css'
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
        }
        fields: {
          slug: string
        }
      }>
    }
  }
}> = ({ data }) => {
  return (
    <main>
      <SEO />
      <div className="container mx-auto min-h-screen pt-10 pb-20">
        <div className="flex items-center gap-5">
          <img src="/kidow-blog.svg" alt="" className="h-7" />
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.allMarkdownRemark?.nodes.map((item, key) => (
            <li key={key}>
              <Link to={item.fields.slug}>
                <div className="group space-y-2">
                  <h2 className="line-clamp-2 group-hover:underline">
                    {item.frontmatter.title}
                  </h2>
                  <p className="text-neutral-400 line-clamp-3 group-hover:underline">
                    {item.frontmatter.description}
                  </p>
                  <div className="text-sm text-neutral-400">
                    {item.frontmatter.date}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
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
        }
        fields {
          slug
        }
      }
    }
  }
`

export default HomePage
