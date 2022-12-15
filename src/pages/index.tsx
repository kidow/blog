import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { graphql, Link } from 'gatsby'
import { Footer, SEO } from 'components'
import { PROJECTS } from 'data'
import classnames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import ActivityCalendar from 'react-activity-calendar'
import type { Day } from 'react-activity-calendar'

dayjs.extend(relativeTime)

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
  const [list, setList] = useState<Day[]>([])

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/kidow?y=last')
      .then((res) => res.json())
      .then((json) => setList(json?.contributions || []))
      .catch((err) => console.log('err', err))
  }, [])
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
              level0: '#dcfce7',
              level1: '#86efac',
              level2: '#22c55e',
              level3: '#15803d',
              level4: '#14532d'
            }}
            // children={<ReactTooltip html />}
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
