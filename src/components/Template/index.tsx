import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { graphql, Link } from 'gatsby'
import { BackTop, Footer, SEO, Comment } from 'components'
import classnames from 'classnames'

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
      headings: Array<{ id: string; depth: number; value: string }>
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
  const [scrollTop, setScrollTop] = useState(0)

  const onScroll = () =>
    setScrollTop(
      document.documentElement
        ? document.documentElement.scrollTop || document.body.scrollTop
        : document.body.scrollTop
    )

  const isActive = (id: string, index: number): boolean => {
    if (typeof document === 'undefined') return false
    const element = document.getElementById(id)
    if (!element) return false
    const isOver = scrollTop - 180 >= element.offsetTop
    if (!data.markdownRemark.headings[index + 1]) return isOver
    const nextElement = document.getElementById(
      data.markdownRemark.headings[index + 1].id
    )
    if (!nextElement) return false
    const isNextUnder = scrollTop - 180 < nextElement.offsetTop
    return isOver && isNextUnder
  }

  useEffect(() => {
    if (!data.markdownRemark.headings) return
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
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
        <div className="prose-sm prose-invert relative px-6 md:prose-base">
          <div className="fixed top-[180px] right-[calc((100vw-768px)/2+768px)] hidden lg:block">
            <div className="z-10 flex flex-col gap-3 rounded-full border border-neutral-700 bg-neutral-800 p-2">
              <button className="rounded-full border border-neutral-700 p-2 hover:border-neutral-500">
                <img src="/links.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
              <button className="rounded-full border border-neutral-700 p-2 hover:border-neutral-500">
                <img src="/facebook.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
              <button className="rounded-full border border-neutral-700 p-2 hover:border-neutral-500">
                <img src="/twitter.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
              <button className="rounded-full border border-neutral-700 p-2 hover:border-neutral-500">
                <img src="/kakao-talk.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
            </div>
          </div>

          <section
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            itemProp="articleBody"
          />

          {!!data.markdownRemark.headings.length && (
            <div className="fixed bottom-16 right-16 z-10 hidden h-[calc(100vh-236px)] w-[calc((100vw-768px)/2-64px)] overflow-auto text-sm text-neutral-500 lg:block">
              <ol className="border-l border-neutral-800 !pl-2">
                {data.markdownRemark.headings.map((item, key) => (
                  <li
                    className={classnames('duration-150', {
                      'ml-2': item.depth === 3,
                      'scale-105 text-neutral-50': isActive(item.id, key)
                    })}
                    key={key}
                  >
                    <Link className="hover:text-neutral-200" to={`#${item.id}`}>
                      {item.value}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="flex max-w-screen-md justify-center px-6 pt-5">
          <div className="flex items-center gap-3">
            <button>
              <img src="/links.svg" alt="" className="!m-0 h-6 w-6" />
            </button>
            <button>
              <img src="/facebook.svg" alt="" className="!m-0 h-6 w-6" />
            </button>
            <button>
              <img src="/twitter.svg" alt="" className="!m-0 h-6 w-6" />
            </button>
            <button>
              <img src="/kakao-talk.svg" alt="" className="!m-0 h-6 w-6" />
            </button>
          </div>
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
      headings {
        depth
        id
        value
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
