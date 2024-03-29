---
title: 5분 만에 Vercel로 무제한 파일 저장소 만들기
date: 2022-09-25
description: 시작하기 전에, 개인 도메인이 있다면 더욱 좋습니다. 본 내용은 Node.js v16 기준으로 작성되었습니다.
thumbnail: https://og.kidow.me/api/image?id=ta0citreps
keywords: Vercel, Express
---

> 시작하기 전에, 개인 도메인이 있다면 더욱 좋습니다. 본 내용은 Node.js v16 기준으로 작성되었습니다.

먼저 프로젝트를 생성합니다. 저는 `files` 라는 이름으로 폴더를 생성해보겠습니다.

```bash
mkdir files
cd files
```

git과 npm을 세팅해 줍니다. .gitignore는 node_modules만 제외시켜 줍니다.

```bash
git init
npm init -y
touch .gitignore
```

express를 설치합니다. 작성일 기준 express의 버전은 `^4.18.1` 입니다.

```bash
npm install express
```

package.json의 main과 scripts를 수정해 줍니다.

```json
{
  "name": "files",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1"
  }
}
```

`src` 폴더를 만들고 그 안에 `index.js` 를 생성합니다. 그리고 단 4줄만 적어줍니다.

```javascript
const express = require('express')
const app = express()
app.use(express.static('image'))
app.listen(4000)
```

세번째 줄에 `express.static('image')` 가 보이시나요? 저는 `files/image` 로 이미지를 저장할 폴더를 지정했기 때문에 저렇게 한 것이고, 여러분들은 여러분들이 원하는대로 이미지를 지정할 경로를 폴더를 만들어서 지정하면 됩니다.

![프로젝트 구조](files.png)

커밋 후 여러분의 깃허브에 올리시고, Vercel에 들어가 새 프로젝트를 생성해서 방금 올린 프로젝트를 임포트합니다. 기타 세팅도 건들일 필요 없이 바로 Deploy 누르시면 됩니다.

![Vercel 새 프로젝트 생성](create-project.png)

**됐습니다!** 이제 파일들을 폴더에 넣어서 커밋 후 배포만 하세요. 무제한으로 쓸 수 있는 파일 저장소가 완성됐습니다. 추가로 도메인이 있다면 적용하시면 됩니다.

![도메인 적용](domains.png)

![https://files.kidow.me/image/business-card.png](https://files.kidow.me/image/business-card.png)

끝. [https://files.kidow.me/image/business-card.png](https://files.kidow.me/image/business-card.png)

### +참고

Vercel에는 **Bandwidth** 라는 것이 있습니다. 프로젝트 배포 과정에서 수신 혹은 발신한 데이터의 총량을 말하는 데, Production과 Preview 환경 모두를 통틀어 말합니다.

월 별이 아닌 총 **100GB** 까지인데, 이 정도면 엄청나게 널널한 편이라 크게 신경쓸 필요는 없지만 특히 크고 작은 이미지 파일을 너무 많이 배포하면 순식간에 용량이 찰 수도 있으니 이 점만 유의하시면 될 겁니다.
