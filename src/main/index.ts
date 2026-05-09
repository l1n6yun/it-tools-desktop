import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createWindow } from './window'
import { setupMenu } from './menu'
import { setupIpc } from './ipc'

function createMainWindow(): void {
  const mainWindow = createWindow()

  // 设置应用菜单
  setupMenu(mainWindow)

  // 设置 IPC 通信
  setupIpc(mainWindow)

  // 开发模式下加载开发服务器
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 打开 DevTools（仅开发模式）
  if (is.dev) {
    // mainWindow.webContents.openDevTools()
  }
}

// 应用就绪
app.whenReady().then(() => {
  // 设置 App User Model Id (Windows)
  electronApp.setAppUserModelId('com.it-tools.desktop')

  // 在开发模式下默认通过 F12 打开 DevTools
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createMainWindow()

  app.on('activate', () => {
    // macOS: 点击 dock 图标时重新创建窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

// 关闭所有窗口时退出应用（Windows & Linux）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 处理外部链接
app.on('web-contents-created', (_, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // 在默认浏览器中打开外部链接
    if (url.startsWith('http')) {
      shell.openExternal(url)
      return { action: 'deny' }
    }
    return { action: 'allow' }
  })
})
