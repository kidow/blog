import React, { memo } from 'react'
import type { FC } from 'react'

export interface Props {}
interface State {}

const Snowfall: FC<Props> = () => {
  return (
    <div className="pointer-events-none fixed inset-0">
      {Array.from({ length: 50 }).map((_, key) => (
        <div className="snowflake" key={key} />
      ))}
    </div>
  )
}

export default memo(Snowfall)
