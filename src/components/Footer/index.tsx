import React from 'react'
import { Link } from 'gatsby'
import type { FC } from 'react'
import classnames from 'classnames'

export interface Props {
  path?: string
}
interface State {}

const Footer: FC<Props> = ({ path }) => {
  return (
    <footer className="bg-neutral-800 text-xs">
      <div
        className={classnames('container mx-auto', {
          'max-w-screen-md': path !== '/'
        })}
      >
        <div className="p-6">
          <Link to="/">
            <img src="/kidow-blog.svg" alt="" className="h-6" />
          </Link>
          <div className="mt-2 text-sm text-neutral-400">
            더 게으르기 위해, 더 부지런히 공부하는 개발자입니다.
          </div>

          <div className="mb-1 mt-8">
            <a
              target="_blank"
              href="https://resume.kidow.me"
              className="text-base text-teal-600 hover:underline"
            >
              김동욱
            </a>
          </div>
          <Link
            className="text-teal-600 hover:underline"
            target="_blank"
            to="mailto:wcgo2ling@gmail.com"
          >
            wcgo2ling@gmail.com
          </Link>

          <div className="mt-4 border-t border-neutral-700 pt-4 text-neutral-600">
            © {new Date().getFullYear()} kidow. All right reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
