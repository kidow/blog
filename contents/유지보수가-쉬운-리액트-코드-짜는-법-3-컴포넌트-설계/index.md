---
title: 유지보수가 쉬운 리액트 코드 짜는 법 - (3) 컴포넌트 설계
date: 2022-05-28
description: 의외로 내용이 많기 때문에 개별 파트로 뺐습니다. 이 시리즈에서는 리액트 컴포넌트를 선언하고 사용할 때 어떠한 규칙을 사용하는 지 자세히 소개해보려고 합니다.
thumbnail: https://og.kidow.me/api/image?id=5pvfkcqqo7y
series: 유지보수가 쉬운 리액트 코드 짜는 법
order: 3
keywords: React
---

<!-- toc -->

의외로 내용이 많기 때문에 개별 파트로 뺐습니다. 이 시리즈에서는 리액트 컴포넌트를 선언하고 사용할 때 어떠한 규칙을 사용하는 지 자세히 소개해보려고 합니다.

## 선언

모든 컴포넌트의 이름은 **PascalCase**로 작성합니다. (e.g. `Input`, `ButtonGroup`)

컴포넌트를 생성할 때는 만들어둔 코드 스니펫을 사용해서 만듭니다. 코드 스니펫에도 정해둔 네이밍 규칙이 있습니다.

![컴포넌트 생성 코드 스니펫](component_snippet.gif)

[관련 코드 스니펫 링크](https://archive.kidow.me/docs/settings/Code%20Snippets)

```typescript
import type { FC } from 'react'

export interface Props {}
interface State {}

const Component: FC<Props> = () => {
  return <>Component</>
}

export default Component
```

### interface Props, State

Props와 State에 해당하는 타입을 이름그대로 지었습니다. Props를 export하는 이유는, jest나 storybook 등을 사용할 때 해당 Props를 재활용하기 때문입니다.

### state

`useState` 등으로 선언하는 변수들은 타입에 따라, 용도에 따라 선언하는 기준을 다르게 두고 있습니다. 모든 변수는 **camelCase**로 선언합니다.

```typescript{1}
interface State {
  isLoading: boolean
  password: string
  total: number
  isModalOpen: boolean
  postList: Post[]
}
```

`boolean` 타입의 변수들은 모두 접두사 `is`를 붙여서 boolean 값임을 명시합니다.

배열의 경우에는 접미사로 `List`를 붙여서 선언합니다.

또한, 객체 변수는 왠만하면 선언하지 않습니다. 객체는 단일 타입 변수로 바꿔 선언할 수도 있는 타입이고, 상태를 업데이트할 때 코드가 지저분해질 수도 있기 때문입니다.

## 네이밍 및 훅스와 변수 배치

다음 예시를 통해 설명해보겠습니다.

```typescript{13}
import { useEffect, useMemo } from 'react'
import { useRouter } from 'next'
import { useObjectState, request } from 'services'

interface State {
  isLoading: boolean
  id: string
  password: string
}

const PostPage = () => {
  // useObjectState는 항상 최상위에
  const [{ isLoading, id, password }, setState] = useObjectState<State>({
    isLoading: false,
    id: '',
    password: ''
  })
  // 나머지 Hooks들은 바로 아래에
  const { query } = useRouter()
  const [user] = useUser()

  // HTTP get에 해당하는 함수는 접두사 get으로 네이밍
  const get = async () => {
    try {
      await request.get('/posts')
    } catch (err) {
      console.log(err)
    }
  }

  // HTTP post에 해당하는 함수는 접두사 create로 네이밍
  const create = async () => {
    try {
      await request.post('/posts', {})
    } catch (err) {
      console.log(err)
    }
  }

  // useMemo는 useEffect 위에
  const isLoggedIn: boolean = useMemo(() => !!user?.id, [user])

  // useEffect는 return문 바로 위에
  useEffect(() => {
    get()
  }, [])

  useEffect(() => {
    ...
  }, [user])
  return ...
}

export default Page
```

여기서 다음과 같은 규칙들을 정해둡니다.

### 1. useObjectState는 항상 최상위에

[useObjectState](https://archive.kidow.me/docs/hooks/useObjectState)는 제가 직접 만든 hooks로, useState의 인자를 객체로 선언함으로써 모든 state를 한 hooks로 관리할 수 있습니다. state가 컴포넌트에서 가장 핵심인 요소라고 생각해서 최상위에 두었습니다. 만약 state의 초깃값으로 받아와야 할 값이 있다면 예외로 useObjectState보다 위에 선언해줍니다.

### 2. 나머지 hooks들은 useObjectState 바로 아래

useObjectState 이 외에 나머지 hooks들은 전부 useObjectState 아래에 별다른 순서 없이 나열해서 사용합니다.

### 3. useEffect는 항상 return문 위에

return문은 항상 최하단이고, 모든 useEffect는 return문 바로 위에 몰아넣습니다.

### 4. useMemo는 useEffect 위에

useMemo는 함수와 useEffect 사이에 모두 넣습니다.

### 5. 함수 네이밍

#### get, create, update, remove

api로 요청하는 함수의 경우는 CRUD에 맞게 접두사로 `create`, `get`, `update`, `remove`를 붙여서 이름을 지어줍니다. 만약 각각의 요청하는 함수가 하나만 있다면, 접두사 없이 한 단어로만 짓습니다. 이렇게 하는 이유는, 이 함수가 하나만 있다는 것을 명시하기 위함입니다.

그 외 나머지 함수들은 모두 접두사 `on`을 붙여서 이름을 짓습니다.

## 하위 컴포넌트

두 개 이상의 합성어로 이루어진 컴포넌트의 경우는 어떻게 이쁘게 설계해야할 지를 정말 많이 고민을 했습니다. `Button`과 `ButtonGroup` 컴포넌트를 예로 들어보겠습니다.

예전에는 컴포넌트를 이런 식으로 설계했었습니다.

```typescript
// components/Button/index.tsx
import type { FC } from 'react'

export interface Props {}
interface State {}

const Button: FC<Props> = ({ children }) => {
  return <button>{children}</button>
}

export default Button
```

```typescript
// components/ButtonGroup/index.tsx
import type { FC } from 'react'
import { Button } from 'components'

export interface Props {}
interface State {}

// ButtonGroup이라는 컴포넌트를 따로 만듬
const ButtonGroup: FC<Props> = () => {
  return (
    <div>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
    </div>
  )
}

export default ButtonGroup
```

```typescript
export { default as Button } from './Button'
export { default as ButtonGroup } from './ButtonGroup'
export { default as ButtonContainer } from './ButtonContainer'
// ... 또 다른 Button 관련 컴포넌트들이...
```

만약 Button과 관련된 컴포넌트가 계속해서 생길 경우에는, 가독성이 어느 순간 확 안좋아지면서 유지보수가 힘들어지더라구요.

그러다가 `Ant Design`의 컴포넌트 설계 방식을 알게 되었는데, 이 방식이 마음에 들어서 이 방식으로 하고 있습니다.

```typescript{6-8,11,15}
// components/Button/index.tsx
import type { FC } from 'react'
import ButtonGroup from './Group'

export interface Props {}
interface IButton extends FC<Props> {
  Group: typeof ButtonGroup
}
interface State {}

const Button: IButton = ({ children }) => {
  return <button>{children}</button>
}

Button.Group = ButtonGroup

export default Button
```

```typescript
export { default as Button } from './Button'
```

이렇게 선언하면 이제 이런식으로 활용이 가능합니다.

```typescript
<Button.Group></Button.Group>
```

`<ButtonGroup />`으로 선언하는 것보다는 훨씬 가독성이 좋아진 것 같습니다. 또한 `Button`만 불러오면 되니 import문 코드량도 줄어들 수 있습니다.

## 22.8.12 추가 수정

최근에 카카오 FE 기술블로그에서 컴포넌트를 확장 설계하는 방법을 소개했는데, 그 방식이 제가 하는 방식보다 더 명확하고 편한 것 같아서 저도 방식을 바꿨습니다.

interface를 추가로 선언해서 붙이는 방식은 이제 사용하지 않고, 대신 export default 시 `Object.assign` 을 사용해서 하위 컴포넌트들을 묶어서 내보냅니다.

```typescript{12}
// components/Button/index.tsx
import type { FC } from 'react'
import ButtonGroup from './Group'

export interface Props {}
interface State {}

const Button: FC<Props> = ({ children }) => {
  return <button>{children}</button>
}

export default Object.assign(Button, { Group: ButtonGroup })
```

참조: [합성 컴포넌트로 재사용성 극대화하기](https://fe-developers.kakaoent.com/2022/220731-composition-component/)
