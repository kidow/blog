import React, { useEffect, useState, useCallback } from 'react'
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
        keywords: string
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

  const onCopyLink = useCallback(async () => {
    try {
      await window.navigator.clipboard.writeText(
        window.location.origin + window.location.pathname
      )
      alert('URL이 복사되었습니다.')
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onShareFacebook = useCallback(
    () =>
      window.open(
        `http://www.facebook.com/sharer.php?u=${
          window.location.origin + window.location.pathname
        }`,
        '_blank',
        'width=600,height=400'
      ),
    []
  )

  const onShareTwitter = useCallback(
    () =>
      window.open(
        `https://twitter.com/intent/tweet?url=${
          window.location.origin + window.location.pathname
        }`,
        '_blank',
        'width=600,height=400'
      ),
    []
  )

  const onShareKakaoTalk = useCallback(
    () =>
      window.Kakao?.Link?.sendScrap({
        requestUrl: window.location.origin + window.location.pathname
      }),
    []
  )

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
    script.defer = true
    document.head.appendChild(script)
    script.onload = () => {
      window.Kakao?.init(process.env.GATSBY_KAKAO_API_KEY)
    }

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

      <section className="container max-w-screen-md mx-auto">
        <div className="my-10 space-y-4 text-center">
          <div className="flex items-center justify-between max-w-xs px-6 mx-auto mb-10 text-sm text-neutral-500">
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
          <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm">
            {data.markdownRemark.frontmatter.keywords
              ?.split(', ')
              .map((keyword) => (
                <span
                  className="px-3 py-1 rounded-full bg-neutral-800"
                  key={keyword}
                >
                  {keyword}
                </span>
              ))}
          </div>
        </div>
      </section>

      <article className="container max-w-screen-md min-h-screen mx-auto">
        <div className="relative px-6 prose-sm prose-invert md:prose-base">
          <div className="fixed top-[180px] right-[calc((100vw-768px)/2+768px)] hidden lg:block">
            <div className="z-10 flex flex-col gap-3 p-2 border rounded-full border-neutral-700 bg-neutral-800">
              <button
                onClick={onCopyLink}
                className="p-2 border rounded-full border-neutral-700 hover:border-neutral-500"
              >
                <img src="/links.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
              <button
                onClick={onShareFacebook}
                className="p-2 border rounded-full border-neutral-700 hover:border-neutral-500"
              >
                <img src="/facebook.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
              <button
                onClick={onShareTwitter}
                className="p-2 border rounded-full border-neutral-700 hover:border-neutral-500"
              >
                <img src="/twitter.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
              <button
                onClick={onShareKakaoTalk}
                className="p-2 border rounded-full border-neutral-700 hover:border-neutral-500"
              >
                <img src="/kakao-talk.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
            </div>
          </div>

          <section
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            itemProp="articleBody"
            className="text-neutral-400"
            id="markdown"
          />

          {!!data.markdownRemark.headings.length && (
            <div className="fixed bottom-16 right-16 z-10 hidden h-[calc(100vh-236px)] w-[calc((100vw-768px)/2-64px)] overflow-auto text-sm text-neutral-500 scrollbar-hide lg:block">
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

        <div className="flex justify-center px-6 pt-5">
          <div className="flex items-center gap-3">
            <button onClick={onCopyLink}>
              <img src="/links.svg" alt="" className="!m-0 h-6 w-6" />
            </button>
            <button onClick={onShareFacebook}>
              <img src="/facebook.svg" alt="" className="!m-0 h-6 w-6" />
            </button>
            <button onClick={onShareTwitter}>
              <img src="/twitter.svg" alt="" className="!m-0 h-6 w-6" />
            </button>
            <button onClick={onShareKakaoTalk}>
              <img src="/kakao-talk.svg" alt="" className="!m-0 h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="px-6 pt-10">
          <Comment />
        </div>

        <div className="px-6 pb-20">
          <div className="flex justify-between py-10 mt-5 border-y border-neutral-800">
            <div>
              {!!data.previous && (
                <>
                  <div className="text-sm text-neutral-700">이전 글</div>
                  <Link
                    className="text-neutral-300 hover:underline"
                    to={data.previous.fields.slug}
                  >
                    {data.previous.frontmatter.title}
                  </Link>
                </>
              )}
            </div>
            <div className="text-right">
              {!!data.next && (
                <>
                  <div className="text-sm text-neutral-700">다음 글</div>
                  <Link
                    className="text-neutral-300 hover:underline"
                    to={data.next.fields.slug}
                  >
                    {data.next.frontmatter.title}
                  </Link>
                </>
              )}
            </div>
          </div>
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
        keywords
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
