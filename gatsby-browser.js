require('prismjs/themes/prism-tomorrow.min.css')
require('prismjs/plugins/command-line/prism-command-line.css')
require('./src/styles/index.css')

exports.shouldUpdateScroll = ({ routerProps: { location } }) =>
  location.pathname.length !== 2
