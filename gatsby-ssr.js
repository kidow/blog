import React from 'react'

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      defer
      src="https://cdn.feedbank.app/plugin.js"
      plugin-key="fa46598f-aa5e-46fc-be63-2d3e339383c5"
    />
  ])
}
