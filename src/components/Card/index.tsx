import { Link } from 'gatsby'
import React from 'react'
import type { FC } from 'react'
import classnames from 'classnames'

export interface Props {
  title: string
  date: string
  description: string
  keywords: string
  slug: string
}
interface State {}

const Card: FC<Props> = ({ title, date, description, keywords, slug }) => {
  return (
    <li>
      <Link to={slug}>
        <div className="group space-y-2">
          <h2 className="text-lg line-clamp-2 group-hover:underline">
            {title}
          </h2>
          <p className="text-neutral-400 line-clamp-3 group-hover:underline">
            {description}
          </p>
          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            {keywords.split(', ').map((keyword) => (
              <span
                className={classnames('rounded-full bg-neutral-800 py-1 px-3', {
                  'border border-[#61dafb] text-[#61dafb]': keyword === 'React',
                  'border border-[#38bdf8] text-[#38bdf8]':
                    keyword === 'TailwindCSS',
                  'border border-[#bf4080] text-[#bf4080]': keyword === 'SCSS',
                  'border border-[#da936a] text-[#da936a]':
                    keyword === 'Styled Components'
                })}
                key={keyword}
              >
                {keyword}
              </span>
            ))}
          </div>
          <div className="text-sm text-neutral-400">{date}</div>
        </div>
      </Link>
    </li>
  )
}

export default Card
