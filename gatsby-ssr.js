import React from 'react'

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      type="text/javascript"
      async
      defer
      src="https://cdn.feedbank.app/plugin.js"
      plugin-key="53e1b21b-52a5-457c-8209-e4f8f12667ff"
    />
  ])
}
