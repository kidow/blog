import React from 'react'
import type { FC } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

export interface Props {}
interface State {}

const BackTop: FC<Props> = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-5 bottom-5 z-30 rounded-full bg-neutral-600 p-2 hover:bg-neutral-500 active:bg-neutral-700"
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  )
}

export default BackTop
