import React from 'react'

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      type="text/javascript"
      async
      src="https://cdn.kidow.me/plugin.js"
      origin="https://plugin.kidow.me"
    ></script>
  ])
}
