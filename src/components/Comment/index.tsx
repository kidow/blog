import React, { useEffect, useRef } from 'react'
import type { FC } from 'react'

export interface Props {}

const Comment: FC<Props> = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    const attributes = {
      src: 'https://giscus.app/client.js',
      'data-repo': 'kidow/blog',
      'data-repo-id': 'R_kgDOHWExHw',
      'data-category': 'Q&A',
      'data-category-id': 'DIC_kwDOHWExH84CPIj8',
      'data-mapping': 'title',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'dark_dimmed',
      'data-lang': 'ko',
      crossOrigin: 'anonymous',
      async: 'true'
    }
    Object.entries(attributes).forEach(([key, value]) =>
      script.setAttribute(key, value)
    )
    ref.current?.appendChild(script)
  }, [])
  return <div ref={ref} />
}

export default Comment
