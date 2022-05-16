import React, { useEffect, useRef } from 'react'
import type { FC } from 'react'

export interface Props {}
interface State {}

const Comment: FC<Props> = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    const attributes = {
      src: 'https://giscus.app/client.js',
      'data-repo': 'kidow/blog',
      'data-repo-id': 'R_kgDOHL90BQ',
      'data-category': 'Show and tell',
      'data-category-id': 'DIC_kwDOHL90Bc4CO_mx',
      'data-mapping': 'title',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'dark_protanopia',
      'data-lang': 'ko',
      crossOrigin: 'anonymouse',
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
