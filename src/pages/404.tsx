import React from 'react'
import type { FC } from 'react'
import { Link } from 'gatsby'

interface State {}

const NotFoundPage: FC = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-2xl">{'잘못 찾아오셨어요. :)'}</div>
          <Link to="/">
            <button className="rounded border border-neutral-500 py-2 px-3 text-sm duration-150 hover:bg-neutral-50 hover:text-neutral-900">
              홈으로
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
