import React, { useEffect, useState, useCallback } from 'react'
import type { FC } from 'react'
import { graphql, Link } from 'gatsby'
import {
  BackTop,
  Footer,
  SEO,
  Comment,
  Dialog,
  DialogShow,
  DialogShowModal,
  DialogCustomView,
  Snowfall
} from 'components'
import classnames from 'classnames'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { CalendarIcon } from '@heroicons/react/24/outline'

export interface Props {
  data: {
    mdx: {
      body: string
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
      headings: Array<{ depth: number; value: string }>
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

  const isActive = (value: string, index: number): boolean => {
    if (typeof document === 'undefined') return false
    const element = document.getElementById(value)
    if (!element) return false
    const isOver = scrollTop - 180 >= element.offsetTop
    if (!data.mdx.headings[index + 1]) return isOver
    const nextElement = document.getElementById(
      data.mdx.headings[index + 1].value.replaceAll(' ', '-')
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

    if (!data.mdx.headings) return
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return (
    <>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.frontmatter.description}
        thumbnail={data.mdx.frontmatter.thumbnail}
        url={data.mdx.fields.slug}
        keywords={data.mdx.frontmatter.keywords}
      />

      <section className="container z-10 mx-auto max-w-screen-md">
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
            {data.mdx.frontmatter.title}
          </h1>
          <div className="text-sm text-neutral-500">
            {data.mdx.frontmatter.date}
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm">
            {data.mdx.frontmatter.keywords?.split(', ').map((keyword) => (
              <span
                className="rounded-full bg-neutral-800 px-3 py-1"
                key={keyword}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <article className="container mx-auto min-h-screen max-w-screen-md">
        <div className="prose-sm prose-invert relative px-6 md:prose-base">
          <div className="fixed top-[180px] right-[calc((100vw-768px)/2+768px)] hidden lg:block">
            <div className="z-10 flex flex-col gap-3 rounded-full border border-neutral-700 bg-neutral-800 p-2">
              <button
                onClick={onCopyLink}
                className="rounded-full border border-neutral-700 p-2 hover:border-neutral-500"
              >
                <img src="/links.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
              <button
                onClick={onShareFacebook}
                className="rounded-full border border-neutral-700 p-2 hover:border-neutral-500"
              >
                <img src="/facebook.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
              <button
                onClick={onShareTwitter}
                className="rounded-full border border-neutral-700 p-2 hover:border-neutral-500"
              >
                <img src="/twitter.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
              <button
                onClick={onShareKakaoTalk}
                className="rounded-full border border-neutral-700 p-2 hover:border-neutral-500"
              >
                <img src="/kakao-talk.svg" alt="" className="!m-0 h-6 w-6" />
              </button>
            </div>
          </div>

          <MDXProvider
            components={{
              Dialog,
              DialogShow,
              DialogShowModal,
              DialogCustomView
            }}
          >
            <section className="text-neutral-400" id="markdown">
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </section>
          </MDXProvider>

          {!!data.mdx.headings.length && (
            <div className="fixed bottom-16 right-16 z-10 hidden h-[calc(100vh-236px)] w-[calc((100vw-768px)/2-64px)] overflow-auto text-sm text-neutral-500 scrollbar-hide lg:block">
              <ol className="border-l border-neutral-800 !pl-2">
                {data.mdx.headings.map((item, key) => (
                  <li
                    className={classnames('duration-150', {
                      'ml-3': item.depth === 4,
                      'ml-2': item.depth === 3,
                      'scale-105 text-neutral-50': isActive(
                        item.value.replaceAll(' ', '-'),
                        key
                      )
                    })}
                    key={key}
                  >
                    <Link
                      className="hover:text-neutral-200"
                      to={`#${item.value.replaceAll(' ', '-')}`}
                    >
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
          <div className="mt-5 flex justify-between border-y border-neutral-800 py-10">
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

      <section className="flex items-center justify-center bg-black py-16 px-5">
        <div className="text-center">
          <div className="text-xl font-semibold lg:text-3xl">
            웹사이트 피드백 수집을 자동화하세요.
          </div>
          <div className="mt-2 text-neutral-400">
            구글 폼보다 효과적인 방식을 택해 보세요.
          </div>
          <div className="gatsby-highlight mb-4" data-language="html">
            <pre className="language-html">
              <code className="language-html">
                <span className="token tag">
                  <span className="token tag">
                    <span className="token punctuation">&lt;</span>script
                  </span>
                  <br />
                  <span className="token attr-name">{'  defer'}</span>
                  <br />
                  <span className="token attr-name">{'  async'}</span>
                  <br />
                  <span className="token attr-name">{'  src'}</span>
                  <span className="token attr-value">
                    <span className="token punctuation attr-equals">=</span>
                    <span className="token punctuation">"</span>
                    https://cdn.feedbank.app/plugin.js
                    <span className="token punctuation">"</span>
                  </span>
                  <br />
                  <span className="token attr-name">{'  plugin-key'}</span>
                  <span className="token attr-value">
                    <span className="token punctuation attr-equals">=</span>
                    <span className="token punctuation">"</span>
                    [개인 키]
                    <span className="token punctuation">"</span>
                    <br />
                  </span>
                  <span className="token punctuation">/&gt;</span>
                </span>
              </code>
            </pre>
          </div>
          <div className="mt-7">
            <a
              href="https://feedbank.app?utm_source=kidow-blog&utm_medium=blog"
              target="_blank"
              className="rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 py-2.5 px-4 text-white"
            >
              방문하기
            </a>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center border-t border-neutral-800 bg-black py-16 px-5">
        <div className="text-center">
          <div className="text-xl font-semibold lg:text-3xl">
            개발자 채팅방에 놀러오세요.
          </div>
          <div className="mt-2 text-neutral-400">
            Github 프로필 연동으로 개발자만 가입할 수 있습니다.
          </div>
          <div className="mt-7">
            <a
              href="https://coddee.dev?utm_source=blog&utm_medium=blog"
              target="_blank"
              className="rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 py-2.5 px-4 text-white"
            >
              방문하기
            </a>
          </div>
        </div>
      </section>

      <a
        href="https://whattime.co.kr/wcgo2ling"
        target="_blank"
        className="group fixed right-5 bottom-16 z-30 cursor-pointer rounded-full bg-neutral-600 p-2 text-sm duration-100 active:bg-neutral-700"
      >
        <span className="hidden px-1 group-hover:inline-block">
          커피챗 예약하기
        </span>
        <CalendarIcon className="h-5 w-5 group-hover:hidden" />
      </a>
      <BackTop />
      <Footer />
      {/* <Snowfall /> */}
      <div className="fixed top-5 left-0 z-50 flex w-full animate-fade-up justify-center">
        <div className="animate-bounce rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4">
          <a href="https://kidow.me" target="_blank" className="font-semibold">
            새 블로그로 이전하였습니다. 클릭 시 이동
          </a>
        </div>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query postBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    mdx(id: { eq: $id }) {
      body
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
        value
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
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
