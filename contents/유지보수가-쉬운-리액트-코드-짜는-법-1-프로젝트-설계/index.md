---
title: 유지보수가 쉬운 리액트 코드 짜는 법 - (1) 프로젝트 설계
date: 2022-05-26
description: Next.js를 중심으로, components, containers, services 등의 폴더들을 소개합니다.
thumbnail: https://og.kidow.me/api/image?id=sbs0dm5cvde
series: 유지보수가 쉬운 리액트 코드 짜는 법
order: 1
keywords: React, 유지보수
---

<!-- toc -->

> Next.js 12.1.0 버전 기준으로 작성한 글입니다. Typescript와 TailwindCSS를 사용했습니다.

먼저 대략적으로 아래와 같은 구조를 사용하고 있습니다.

![프로젝트 구조](./directorying.png)

components, pages, public, styles는 원래 CLI로 생성하면 기본적으로 만들어지는 폴더지만 containers, services, types는 제가 새로 만든 폴더입니다.

## components, 그리고 containers

components는 말 그대로 구성요소 모음으로, 공용으로 쓰이는 가장 작은 단위에 속하는 UI 구성요소들만을 모아 놓은 폴더입니다.

여러 번 사용될 수 있는 `Input`, `Button` 같은 것들이 대표적인 컴포넌트입니다.

컴포넌트의 이름은 **PascalCase**로 작성하고, 한 컴포넌트의 여러 파일이 있을 수 있기 때문에 폴더로 생성합니다.

![Alert 컴포넌트 예시](./components.png)

### index.tsx

상대 경로를 지정하고 import문을 깔끔하게 쓰기 위해서 `components/index.tsx` 파일을 생성합니다. (다른 폴더들도 마찬가지로 index 파일을 생성합니다.)

`index.tsx` 파일에서 모든 컴포넌트들을 내보냅니다. (다른 폴더도 마찬가지입니다.)

```typescript
// components/index.tsx
export { default as Alert } from './Alert'
export { default as Backdrop } from './Backdrop'
export { default as Button } from './Button'
export { default as ButtonGroup } from './ButtonGroup'
export { default as Card } from './Card'
```

여기서 코드 스니펫을 만들어 놓으면 빠르게 export문을 짤 수 있습니다.

![코드 스니펫(exp)](./exp.gif)

제가 쓰는 코드 스니펫들은 [이 곳](https://archive.kidow.me/docs/settings/Code%20Snippets)에 정리해놓았습니다.

## services

services는 UI가 아닌, 사용하는 함수와 변수, 인스턴스들을 모두 한 곳에 모아놓는 용도로 간단명료하게 사용하고 있습니다. 그렇기 때문에 그때그때 프로젝트마다 새로 생기면 하위 폴더를 만들어 관리합니다.

### containers 폴더

components도 있지만 containers라는 폴더도 있는데, containers는 UI 구성요소임에는 분명하지만 보통 **재사용**을 잘 하지않는 큰 단위의 컴포넌트들을 모아두고 있습니다. `Header`, `Footer` 처럼, UI를 구성하는 요소지만 재사용은 잘 하지 않는 구성요소들을 모아두는 용도로 사용합니다.

## services 폴더

services는 UI 구성요소에 해당하는 것들을 제외한 함수, 변수, 인스턴스 등을 담은 폴더로 활용하고 있습니다. 주로 `api`, `hooks`, `store`, `utils`, `data` 등이 있으며, 어떤 라이브러리를 쓰느냐에 따라 더 추가해서 쓰기도 합니다.

![services 폴더](./services.png)

serivces 폴더 하위의 파일들은 다음과 같이 *index.ts*를 생성한 뒤 여기서 모두 export를 해줍니다.

```typescript
export { default as request } from './api'
export * from './hooks'
export * from './store'
export * from './utils'
export * from './data'
...
```

이렇게 선언하면 import 시 모두 **services**안에서 선언될 수 있습니다. 이렇게 하는 이유는 가독성을 위해서입니다. MacOS 기준 option+클릭을 누르면 해당 파일이 위치한 곳으로 바로 갈 수 있기 때문에 저는 이것이 딱히 불편하지 않았습니다.

![option(alt) + 클릭](./option_click.gif)

### api

api 관련 코드들만 모아 놓고 쓰는 폴더입니다. 주로 사용하는 **axios** 에 대한 코드는 이렇습니다.

```typescript
// services/api/index.ts
import axios from 'axios'
import type { AxiosError } from 'axios'

const IS_DEV = process.env.NODE_ENV === 'development'

const request = axios.create({
  baseURL: 'baseURL',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use((config) => {
  if (IS_DEV) {
    console.log(
      '%c%s',
      'color: #d9480f; font-weight: bold',
      `${config.method?.toUpperCase()} ${config.url}`
    )
    if (config.params) {
      console.log('%c%s', 'color: #d9480f', 'req.query:')
      console.table(config.params)
    }
    if (config.data) {
      console.log('%c%s', 'color: #d9480f', 'req.body:')
      console.table(config.data)
    }
  }
  return config
})

request.interceptors.response.use(({ data, config }) => {
  if (IS_DEV) {
    console.log(
      '%c%s',
      'color: #d9480f',
      `${config.method?.toUpperCase()} ${config.url} | data:`
    )
    if (Array.isArray(data)) console.log(data)
    else console.table(data)
  }
  return data
})

export default request
```

`create` 메소드를 통해 axios 인스턴스를 생성해 줍니다. 인터셉터를 만들어 두면 request의 경우 모든 요청 시, response의 경우 모든 응답 시에 동일한 작업을 실행할 수 있습니다. 이렇게 세팅해둔 인스턴스를 내보냅니다.

request라는 이름은 마땅히 좋은 이름이 없어서 지었습니다. request는 다음과 같이 사용합니다.

```typescript
import { request } from 'services'

const Page = () => {
  ...
  const get = async () => {
    try {
      await request.post('url')
    } catch (err) {
      console.log(err)
    }
  }
  ...
}
```

### hooks

말그대로 접두사 **use**가 붙은 hooks들을 모두 한 곳에 모아놓은 용도로 사용합니다. 직접 만든 hooks를 모두 이 곳에 몰아놓습니다.

```typescript
// services/hooks/index.tsx
export function useObjectState() {
  ...
}

export const useUser = () => {
  ...
}

export function useOnClickOutside() {
  ...
}
```

### store

상태 관리에 대한 코드를 전부 모아놓은 폴더입니다. 현재 제가 주로 쓰는 라이브러리는 *Recoil*입니다. 요새는 상태 관리 라이브러리가 많아졌는데, store 역시도 어떤 라이브러리를 쓰든 간에 _store/index.ts_ 내에서 로직을 모두 내보낼 수 있도록 설계합니다.

```typescript
// services/store/index.ts
import { atom } from 'recoil'

export const userState = atom<IUser | null>({
  key: 'userState',
  default: null
})
```

### utils

자주 재사용할 수 있는 **커스텀 함수**들만 모아놓은 폴더입니다. 저는 왠만하면 직접 만들어서 쓸 수 있으면 npm으로 다운받지 않고 직접 선언해서 사용하는 편이라서, 이 폴더를 자주 사용하게 됩니다.

```typescript
// services/utils/index.ts

export const randomString = () => Math.random().toString(36).slice(2);

export function throttle(func: Function, wait: number) {
  let waiting = false;
  return function () {
    if (!waiting) {
      // @ts-ignore
      func.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, wait);
    }
  };
}

...
```

### data

utils가 함수라면 data는 **커스텀 상수**들의 모음입니다. data 안의 값들은 가독성을 위해 전부 **대문자와 snake_case**를 합성하여 네이밍을 합니다.

```typescript
// services/data/index.ts
export const IS_DEV = process.env.NODE_ENV === 'development';

export const IS_CLIENT = typeof window !== 'undefined';

export enum AUTH_TYPE {
  LOGIN = '로그인',
  SIGN_UP = '회원가입',
  FIND_PASSWORD = '비밀번호 찾기',
  RESIGN = '회원탈퇴'
}
...
```

### event

22년 6월 기준 Internet Explorer가 지원이 종료되면서, Web API 중 하나인 [`CustomEvent`](https://developer.mozilla.org/ko/docs/Web/API/CustomEvent/CustomEvent)를 서비스에 도입할 수 있게 되었습니다. CustomEvent는 흔히 잘 알고 있는 `addEventListner`에서 이벤트 리스너를 직접 만들 수 있게 해주는 API인데, 상태 관리 라이브러리를 전역 변수 관리 용도로 사용한다면, CustomEvent는 전역 함수 관리 용도로 사용합니다. event 코드는 다음과 같이 고정으로 작성해두고 사용합니다.

```typescript
export const add = (
  type: string,
  listener: EventListenerOrEventListenerObject
) => window.addEventListener(type, listener)

export const remove = (
  type: string,
  listener: EventListenerOrEventListenerObject
) => window.removeEventListener(type, listener)

export const once = (type: string, listener: any) => {
  const emitOnce = (event: any) => {
    listener(event)
    remove(type, emitOnce)
  }

  add(type, emitOnce)
}

export function emit<T>(type: string, detail?: T) {
  const event = new CustomEvent<T>(type, { detail })
  window.dispatchEvent(event)
}
```

```typescript
export * as EventListener from './event'
```

예를 들면 다음과 같이 사용합니다.

```typescript
const [isOpen, setIsOpen] = useState<boolean>(false)

const onBackdrop = ({ detail }: any) => setIsOpen(detail.open)

useEffect(() => {
  EventListener.add('backdrop', onBackdrop)
  return () => EventListener.remove('backdrop', onBackdrop)
}, [])

<button
  onClick={() => EventListener.emit('backdrop', { detail: { open: true } })}
>
  Open
</button>
```

한 번 이벤트 리스너가 등록이 되면, 어떤 코드에서건 `emit`을 실행하면 리스너의 함수가 실행이 가능해 집니다.

## types

### index.d.ts

타입스크립트를 사용하기 때문에, 직접 만드는 타입들도 따로 모아놓는 폴더로 사용합니다. 타입의 경우는 따로 export하지 않아도 알아서 적용되기 때문에 import를 하겠다고 타입을 내보낼 필요는 없더라구요. index가 아닌 다른 파일도 마찬가지입니다.

```typescript
// types/index.d.ts
interface ModalProps {
  ...
}

interface IUser {
  ...
}
```

## 마치며

프로젝트 설계에 있어 제가 가장 중요시 하는 것은 **가독성**입니다. 모든 폴더에 index로 하여금 내보내게 하는 것도 import 시 경로명을 간결하고 통일성있게 하기 위함입니다.
