import React from 'react'

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      type="text/javascript"
      async
      src="https://beta.cdn.feedbank.app/plugin.js"
      plugin-key="b4164b86-acd0-4f10-8171-906046cd71ab"
    ></script>
  ])
}