import { defineConfig } from 'electron-builder'

export default defineConfig({
  appId: 'com.l1n6yun.it-tools-desktop',
  productName: 'IT Tools Desktop',
  copyright: 'Copyright © 2024 l1n6yun',

  directories: {
    output: 'dist',
    buildResources: 'resources',
  },

  files: ['out/**/*', '!out/**/*.map'],

  extraResources: [
    {
      from: 'locales',
      to: 'locales',
    },
  ],

  win: {
    icon: 'resources/icon.ico',
    target: [
      { target: 'nsis', arch: ['x64'] },
      { target: 'portable', arch: ['x64'] },
    ],
    artifactName: '${productName}-${version}-${arch}-setup.${ext}',
  },

  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'IT Tools Desktop',
  },

  mac: {
    icon: 'resources/icon.icns',
    category: 'public.app-category.developer-tools',
    target: [
      { target: 'dmg', arch: ['x64', 'arm64'] },
      { target: 'zip', arch: ['x64', 'arm64'] },
    ],
    artifactName: '${productName}-${version}-${arch}.${ext}',
    hardenedRuntime: true,
    gatekeeperAssess: false,
  },

  dmg: {
    artifactName: '${productName}-${version}-${arch}.${ext}',
  },

  linux: {
    icon: 'resources/icons',
    category: 'Development',
    maintainer: 'l1n6yun',
    target: [
      { target: 'AppImage', arch: ['x64'] },
      { target: 'deb', arch: ['x64'] },
    ],
    artifactName: '${productName}-${version}-${arch}.${ext}',
  },

  appImage: {
    systemIntegration: 'ask',
  },

  publish: {
    provider: 'github',
    owner: 'l1n6yun',
    repo: 'it-tools-desktop',
  },
})
