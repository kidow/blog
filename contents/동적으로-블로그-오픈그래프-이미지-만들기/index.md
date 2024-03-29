---
title: 블로그 오픈그래프 이미지 동적으로 만들기
date: 2023-01-14
description: 동적으로 오픈그래프용 이미지를 만들 수 있다는 것을 알았을 때, opengraph.kidow.me 라는 주소로 Node.js 프로젝트를 만들어서 블로그에 썸네일로 쓰던 때가 있었습니다.
thumbnail: https://og.kidow.me/api/image?id=bgk4y13n3sw
keywords: Nextjs, Vercel, Opengraph, Satori, Supabase
---

동적으로 오픈그래프용 이미지를 만들 수 있다는 것을 알았을 때, `opengraph.kidow.me` 라는 주소로 Node.js 프로젝트를 만들어서 블로그에 썸네일로 쓰던 때가 있었습니다.

처음 이 것을 알게 된 때가 Vercel이 자기네 플랫폼을 이용해 Open Graph Image를 만드는 것을 소개한 오픈소스를 접했을 때였는데, 그 오픈소스를 보고서 따라 만들었었죠.

몰랐는데 22년 10월에 Vercel에서 아예 라이브러리를 발표했었네요.

### 기존

기존에 Vercel이 [og-image](https://og-image.vercel.app)에서 이 기술을 소개했을 때는, Puppeteer를 이용해서 html와 css를 그리고 스크린샷을 찍는게 오래 걸려서 url을 요청하면 오픈그래프 이미지가 다소 늦게 뜨는 한계가 있었죠.

### 현재

[이 포스트](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images)에 따르면 현재는 기존보다 속도보다 5배 빨라진 것 같더라구요.

[이 곳](https://og-playground.vercel.app)에서 테스트도 가능합니다.

그래서 알게된 시점에 바로 적용해 보았습니다.

## 적용

처음에 Vercel에서 Next.js로 프로젝트를 만든 후,
Typescript와 Supabase를 추가로 적용 후 코드를 작성한 결과입니다.

```typescript
// pages/api/image.tsx
import { ImageResponse } from '@vercel/og'
import type { ImageResponseOptions } from '@vercel/og'
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const config = {
  runtime: 'edge'
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

const response = (
  title: string = '개발자 Kidow 블로그',
  description: string = '더 게으르기 위해 더 열심히 공부하는 개발자입니다.',
  color: string = '#2f363d'
) => (
  <div tw="flex flex-col h-full w-full bg-white relative p-20">
    <div tw="flex mb-[1.8rem] w-[1040px]">
      <div tw="flex-1 text-[5rem] text-[#2f363d]" style={{ lineHeight: 0.98 }}>
        {title}
      </div>
      <img
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publics/kidow.png`}
        alt="Kidow"
        width={150}
        tw="ml-10"
      />
    </div>
    <div tw="text-[#6e7681]" style={{ fontSize: '33.6px' }}>
      {description}
    </div>
    <div tw="flex absolute left-20 bottom-32 text-[2rem] items-center">
      <svg
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        fill="#2f363d"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
      </svg>
      <div tw="ml-4 text-[#2f363d]">https://github.com/kidow</div>
    </div>
    <div tw="flex absolute left-20 bottom-20 text-[2rem] items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#2f363d"
        width={32}
        height={32}
      >
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
      <div tw="ml-4 text-[#2f363d]">wcgo2ling@gmail.com</div>
    </div>
    <div
      tw="absolute bottom-0 w-[1200px] h-6"
      style={{ backgroundColor: color }}
    />
  </div>
)

export default async function handler(req: NextRequest) {
  try {
    const options: ImageResponseOptions = {
      width: 1200,
      height: 600
    }
    const { searchParams } = new URL(req.url)
    const { data } = await supabase
      .from('thumbnails')
      .select('title, description, color, url')
      .eq('id', searchParams.get('id'))
      .single()
    if (!data) return new ImageResponse(response(), options)

    return new ImageResponse(
      response(data.title, data.description, data.color),
      options
    )
  } catch (e) {
    console.log(e)
    return new ImageResponse(response(), { width: 1200, height: 600 })
  }
}
```

저같은 경우는 Supabase도 사용해서 블로그 포스트의 title과 description도 저장하다 보니 감안하시고 보시면 됩니다.

`@vercel/og` 패키지를 설치하고, ImageResponse의 첫 번째 인자로 jsx를 내보내면 됩니다.

자세한 것은 [이 곳](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples)에서 보실 수 있습니다.

![https://og.kidow.me/api/image?id=bgk4y13n3sw](https://og.kidow.me/api/image?id=bgk4y13n3sw)

마지막은 제가 만든, 이 페이지에 적용된 오픈그래프 이미지입니다.

## 문제

다만 문제가 있는데, 속도를 빠르게 하기 위해서인지 커스텀 폰트를 받아 쓸 때 Vercel hobby 플랜 기준 파일 용량이 **1mb**이 넘으면 안됩니다. pro 플랜은 2mb구요. 1mb 이하를 만족하는 폰트 파일이 많지 않아서 잘 찾아서 적용하셔야 할 겁니다.
