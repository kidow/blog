import { Link } from 'gatsby'
import React from 'react'
import type { FC } from 'react'

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
                className="rounded-full bg-neutral-800 py-1 px-3"
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
