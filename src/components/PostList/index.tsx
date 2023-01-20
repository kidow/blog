import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import type { PageProps } from 'gatsby'
import { PROJECTS } from 'data'
import classnames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import ActivityCalendar from 'react-activity-calendar'
import type { Day } from 'react-activity-calendar'
import ReactTooltip from 'react-tooltip'
import { Footer, SEO, Snowfall } from 'components'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'

dayjs.extend(relativeTime)

export interface Props {}
interface State {}

const PostList = ({
  data,
  pageContext: { currentPage, numPages },
  path
}: PageProps<
  {
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
  },
  { currentPage: number; numPages: number }
>) => {
  const [list, setList] = useState<Day[]>([])

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/kidow?y=last')
      .then((res) => res.json())
      .then((json) => setList(json?.contributions || []))
      .catch((err) => console.log('err', err))
  }, [])
  return (
    <>
      <SEO />
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
        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {data?.allMdx?.nodes.map((item, key) => (
            <li
              key={key}
              className="sm:first:col-span-2 md:first:col-span-4 md:[&:nth-child(2)]:col-span-2 md:[&:nth-child(3)]:col-span-2"
            >
              <Link
                to={item.fields.slug}
                className={classnames({
                  'md:grid md:grid-cols-2 md:gap-8': key === 0
                })}
              >
                {key === 0 && (
                  <div className="overflow-hidden rounded">
                    <img
                      src={item.frontmatter.thumbnail}
                      alt=""
                      className="hidden duration-150 hover:scale-105 sm:block"
                    />
                  </div>
                )}
                <article className="group space-y-2">
                  <h2
                    className={classnames(
                      'text-lg line-clamp-2 group-hover:underline',
                      { 'sm:text-3xl sm:font-semibold': key === 0 }
                    )}
                  >
                    {item.frontmatter.title}
                  </h2>
                  <p className="text-neutral-400 line-clamp-3">
                    {item.frontmatter.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs md:text-sm">
                    {item.frontmatter.keywords?.split(', ').map((keyword) => (
                      <span
                        className={classnames(
                          'rounded-full bg-neutral-800 py-1 px-3',
                          {
                            'border border-[#61dafb] text-[#61dafb]':
                              keyword === 'React',
                            'border border-[#38bdf8] text-[#38bdf8]':
                              keyword === 'TailwindCSS',
                            'border border-[#bf4080] text-[#bf4080]':
                              keyword === 'SCSS',
                            'border border-[#da936a] text-[#da936a]':
                              keyword === 'Styled Components',
                            'border border-[#25c19f] text-[#25c19f]':
                              keyword === 'Docusaurus',
                            'border border-[#FF528C] text-[#FF528C]':
                              keyword === 'Storybook'
                          }
                        )}
                        key={keyword}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-neutral-400">
                    {dayjs(item.frontmatter.date).locale('ko').fromNow()}
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-10 flex select-none items-center justify-center">
          <li>
            <Link
              rel="prev"
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-800"
            >
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            </Link>
          </li>

          <li>
            <Link
              rel="prev"
              to={currentPage <= 2 ? '/' : `/${currentPage - 1}`}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-800"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
          </li>
          {numPages < 5
            ? Array.from({ length: numPages }).map((_, key) => (
                <li key={key}>
                  <Link
                    to={key === 0 ? '/' : `/${key + 1}`}
                    className={classnames(
                      'flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-800',
                      {
                        'font-bold':
                          key === 0 ? path === '/' : path === `/${key + 1}`
                      }
                    )}
                  >
                    {key + 1}
                  </Link>
                </li>
              ))
            : Array.from({ length: 5 }).map((_, key) => (
                <li key={key}>
                  <Link
                    to={
                      key === 0 && currentPage === 3
                        ? '/'
                        : `/${currentPage - 2}`
                    }
                    className={classnames(
                      'flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-800',
                      { 'font-bold': key === 2 }
                    )}
                  >
                    {currentPage - 2}
                  </Link>
                </li>
              ))}
          <li>
            <Link
              rel="next"
              to={
                currentPage === numPages
                  ? `/${numPages}`
                  : `/${currentPage + 1}`
              }
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-800"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          </li>
          <li>
            <Link
              rel="next"
              to={`/${numPages}`}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-800"
            >
              <ChevronDoubleRightIcon className="h-5 w-5" />
            </Link>
          </li>
        </ul>
        <div className="mt-20 flex justify-center">
          <ActivityCalendar
            data={list}
            labels={{
              months: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
              ],
              weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              totalCount: '{{count}} contributions in {{year}}',
              tooltip: '<strong>{{count}} contributions</strong> on {{date}}',
              legend: {
                less: 'Less',
                more: 'More'
              }
            }}
            theme={{
              level0: '#161b22',
              level1: '#0e4429',
              level2: '#006d32',
              level3: '#26a641',
              level4: '#39d353'
            }}
            children={<ReactTooltip html />}
          />
        </div>
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
      {/* <Snowfall /> */}
    </>
  )
}

export const Head = () => {
  const TITLE = 'kidow 블로그'
  const DESCRIPTION = '더 게으르기 위해 더 열심히 공부하는 개발자입니다.'
  const URL = 'https://blog.kidow.me'
  const IMAGE = 'https://og.kidow.me/api/image?id=rxzt4zk0v4o'
  return (
    <>
      <title>{TITLE}</title>
      <link rel="canonical" href={URL} />
      <meta name="description" content={DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#19191c" />
      <meta name="msapplication-TileColor" content="#19191c" />
      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content="blog, react, gatsby, tailwindcss, typescript, github, vercel, front-end"
      />
      <meta name="author" content="Dongwook Kim" />
      <meta
        name="google-site-verification"
        content="sbzpJiDpgeXijDrNF1qHG4W4P1DpMlpEuS-ztOQm0EU"
      />
      <meta
        name="naver-site-verification"
        content="b13059f284b5b3364c6329f2865cfc317cf5fd6c"
      />
      <meta name="og:title" content={TITLE} />
      <meta name="og:description" content={DESCRIPTION} />
      <meta name="og:type" content="website" />
      <meta name="og:image" content={IMAGE} />
      <meta name="og:image:width" content="1600" />
      <meta name="og:image:height" content="900" />
      <meta name="og:url" content={URL} />
      <meta name="og:locale" content="ko_KR" />
      <meta name="og:site_name" content={TITLE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:domain" content={URL} />
      <meta name="twitter:image" content={IMAGE} />
    </>
  )
}

export const query = graphql`
  query postList($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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

export default PostList
