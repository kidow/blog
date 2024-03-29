---
title: Toast Component 만들기
date: 2022-12-09
description: 개발자 채팅방 커디를 만들면서 유저들에게 알림 메시지를 띄워야 하는 경우가 있었습니다. 프로필 정보를 수정한다던지, 로그인을 하라는 안내 메시지를 띄운다던지, 에러 메시지를 띄워야 할 때가 그렇죠.
thumbnail: https://og.kidow.me/api/image?id=fguze8xin4
keywords: React, Component, Toast, CustomEvent
---

개발자 채팅방 [커디](https://coddee.dev)를 만들면서 유저들에게 알림 메시지를 띄워야 하는 경우가 있었습니다.

- 프로필 정보를 수정했을 때 **성공** 메시지를 띄운다던지,
- 로그인하지 않고 채팅을 치려할 때 로그인을 하라는 **안내** 메시지를 띄운다던지,
- 에러가 발생했을 때 이를 알리기 위한 **에러** 메시지를 띄워야 할 때가 그렇죠.

## 결과

먼저 결과물부터 보여드리면 이렇습니다.

![상단에 2개의 메시지가 보이시나요?](/example.png)

### 코드

```typescript
// Toast Component
import { useCallback, useEffect } from 'react'
import type { FC } from 'react'
import { EventListener, useObjectState } from 'services'
import { createPortal } from 'react-dom'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

export interface Props {}
interface State {
  list: Array<{
    id: string
    message: string
    type: NToast.Type
  }>
}

const Toast: FC<Props> = () => {
  const [{ list }, setState] = useObjectState<State>({ list: [] })

  const onMessage = useCallback(
    ({ detail }: any) =>
      setState({
        list: !!detail.id
          ? list.filter((item) => item.id !== detail.id)
          : [
              ...list,
              {
                id: Math.random().toString(36).slice(2),
                message: detail?.message,
                type: detail.type
              }
            ]
      }),
    [list.length]
  )

  useEffect(() => {
    EventListener.once('toast', onMessage)
  }, [list.length])

  if (!list.length) return null
  return createPortal(
    <div role="alertdialog">
      <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 space-y-4">
        {list.map((item) => (
          <div
            className="animate-fade-up w-72 cursor-pointer rounded bg-white py-2 px-4 dark:bg-black"
            id={item.id}
            key={item.id}
            onClick={() => EventListener.emit('toast', { id: item.id })}
            role="alert"
            style={{
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
            }}
          >
            <div className="flex items-center gap-2">
              <span>
                {item.type === 'success' && (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                )}
                {item.type === 'info' && (
                  <InformationCircleIcon className="h-5 w-5 text-blue-500" />
                )}
                {item.type === 'warn' && (
                  <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />
                )}
                {item.type === 'error' && (
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </span>
              <span className="select-none text-sm">{item?.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}

export default Toast
```

```typescript
// _app.tsx
import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Toast } from 'containers'

interface Props {}
interface State {}

function MyApp({ Component, pageProps }: AppProps<Props>) {
  return (
    <>
      <Component {...pageProps} />
      <Toast />
    </>
  )
}

export default MyApp
```

## 전제 조건

먼저 다음과 같은 조건이 필요했습니다.

1. 전역에서 사용할 수 있어야 한다.
2. 클릭 시 해당 토스트는 사라진다.
3. 토스트는 위치가 고정되어 있는 컴포넌트이므로 독립적인 DOM으로 처리해야 한다.

여기서 UI에 대한 이야기는 건너뛰도록 하겠습니다.

### 전역에서 사용할 수 있도록 ☁️

보통 React같은 SPA에서 전역 상태 관리를 염두하면 Redux같은 라이브러리를 생각하기 마련인데, 사실 Window에서 내장된 기능을 사용해도 충분합니다.
바로 `CustomEvent` 라는 것인데요,

우리가 addEventListener처럼 이벤트 리스너를 등록할 때, window나 document에 내장된 이벤트를 사용하는 게 아닌 나만의 커스텀 이벤트를 만들 수 있는 기능입니다. 또한 변수를 인자로 담아 보낼 수도 있어서 전역 상태 관리를 대체하는 용도로 사용 가능합니다.

[참조 링크](https://developer.mozilla.org/ko/docs/Web/API/CustomEvent/CustomEvent)

예전부터 있던 기능이었지만 IE에서 호환되지 않아 널리 사용되지 못했지만 IE가 생을 마감하면서 점점 적극적으로 도입이 되고 있는 추세입니다.

![거의 모든 브라우저를 지원한다.](/compatibility.png)

저는 CustomEvent를 다음과 같은 함수로 만들어서 내보냈습니다.

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

각각의 함수에 대해 설명하자면

- add: addEventListener와 같은 역할
- remove: removeEventListener와 같은 역할
- once: 실행 순간 add해서 한 번만 실행하고 다시 remove하는 역할
- emit: 등록한 이벤트를 실행하는 함수. 새로 만들어진 이벤트를 CustomEvent라는 생성자 함수에 인자로 넣고 `dispatchEvent`라는 함수를 통해 이벤트를 발생시킵니다. 만약 add로 이벤트가 등록되지 않았다면 emit은 실행되지 않습니다.

위에 Toast Component에서 다시 보시면

```typescript
const onMessage = useCallback(
  ({ detail }: any) =>
    setState({
      list: !!detail.id
        ? list.filter((item) => item.id !== detail.id)
        : [
            ...list,
            {
              id: Math.random().toString(36).slice(2),
              message: detail?.message,
              type: detail.type
            }
          ]
    }),
  [list.length]
)

useEffect(() => {
  EventListener.once('toast', onMessage)
}, [list.length])
```

### 클릭 시 사라진다 💥

위의 onMessage라는 함수를 보시면 `detail`이라는 값을 꺼내 쓰고 있는데, 커스텀 이벤트는 인자를 담아서 보낼 때 만드시 detail이라는 속성에 보낸 인자들이 담아져서 오게 됩니다.

Toast의 경우 랜덤 생성한 난수를 id로 부여해서, id를 인자에 담아 보내는 경우는 여러 개의 토스트 메시지 중 특정 토스트 메시지를 클릭한 경우이기 때문에 filter를 통해 제외하고, 그렇지 않은 경우는 새로 생성하는 경우이기 때문에 목록에서 가장 뒤에 새로 추가하도록 처리했습니다.

### Toast는 독립적인 DOM으로서 처리

Toast는 고정된 위치에서 나타나기 때문에 독립적인 위치에 있어야 한다고 생각했습니다. React의 `createPortal`을 사용하여 `document.body` 하위로 새 DOM을 생성해줍니다.

## toast 함수

위에서는 Toast 컴포넌트와 이벤트 리스너만 만들었고, 정작 이벤트를 보내는 함수를 만들지 않았는데요, 저는 다음과 같이 만들었습니다.

```typescript
export const toast = {
  success: (message: string) =>
    EventListener.emit<NToast.Emit>('toast', { message, type: 'success' }),
  info: (message: string) =>
    EventListener.emit<NToast.Emit>('toast', { message, type: 'info' }),
  warn: (message: string) =>
    EventListener.emit<NToast.Emit>('toast', { message, type: 'warn' }),
  error: (message: string) =>
    EventListener.emit<NToast.Emit>('toast', { message, type: 'error' })
}
```

위 함수는 다음과 같이 사용합니다.

```typescript
import { toast } from 'services'

toast.success('적용되었습니다.')
toast.info('로그인을 해주세요.')
toast.error('죄송합니다. 에러가 발생했습니다.')
```

## 정리

- `window.CustomEvent` 덕분에 전역에서 Toast 같은 컴포넌트를 다루기 수월해졌다.
- `createPortal`을 통해 전역 컴포넌트를 별개의 DOM으로 취급하여 CSS 충돌을 최대한 방지 가능
