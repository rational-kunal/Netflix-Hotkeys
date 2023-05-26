import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'Netflix Hotkeys',
  description: 'TODO: write description',
  version: '0.0.0',
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    // Instead of using a popup, we will use an options page
    // default_popup: 'src/popup.html',
    default_icon: 'img/logo-48.png',
  },
  options_page: 'src/options.html',
  background: {
    service_worker: 'src/background/index.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://www.netflix.com/*', 'https://www.netflix.com/*'],
      js: ['src/content/index.js'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  permissions: ['storage', 'tabs'],
})
