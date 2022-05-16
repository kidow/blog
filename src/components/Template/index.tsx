import React from 'react'
import type { FC } from 'react'
import { graphql, Link } from 'gatsby'
import { BackTop, Footer, SEO, Comment } from 'components'

export interface Props {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        date: string
        description: string
        thumbnail: string
      }
      fields: {
        slug: string
      }
    }
    previous: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    } | null
    next: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    } | null
  }
}
interface State {}

const Template: FC<Props> = ({ data }) => {
  return (
    <>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description}
        thumbnail={data.markdownRemark.frontmatter.thumbnail}
        url={data.markdownRemark.fields.slug}
      />

      <section className="container mx-auto max-w-screen-md">
        <div className="my-10 space-y-4 text-center">
          <div className="mx-auto mb-10 flex max-w-xs items-center justify-between px-6 text-sm text-neutral-500">
            <a
              href="https://resume.kidow.me"
              target="_blank"
              className="hover:text-neutral-400 hover:underline"
            >
              Résumé
            </a>
            <Link to="/">
              <img src="/kidow-blog.svg" alt="" className="h-7" />
            </Link>
            <a
              href="https://github.com/kidow"
              target="_blank"
              className="hover:text-neutral-400 hover:underline"
            >
              Github
            </a>
          </div>
          <h1
            itemProp="headline"
            className="px-10 text-2xl font-extrabold tracking-tight text-neutral-200 md:text-3xl"
          >
            {data.markdownRemark.frontmatter.title}
          </h1>
          <div className="text-sm text-neutral-500">
            {data.markdownRemark.frontmatter.date}
          </div>
        </div>
      </section>

      <article className="container mx-auto min-h-screen max-w-screen-md">
        <div className="prose-sm prose-invert px-6 md:prose-base">
          <section
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            itemProp="articleBody"
          />
        </div>
        <div className="max-w-screen-md px-6 pt-10 pb-20">
          <Comment />
        </div>
      </article>

      <BackTop />
      <Footer />
    </>
  )
}

export const pageQuery = graphql`
  query postBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY년 MM월 DD일", locale: "ko")
        description
        thumbnail
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

export default Template
