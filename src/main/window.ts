import { BrowserWindow, screen, nativeTheme } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

export function createWindow(): BrowserWindow {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

  const windowWidth = 1500;
  const windowHeight = 900;

  const mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    minWidth: 900,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    frame: true,
    titleBarStyle: 'default',
    icon: icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
  })

  // 窗口准备就绪后显示
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 监听系统主题变化
  nativeTheme.on('updated', () => {
    mainWindow.webContents.send('system-theme-changed', nativeTheme.shouldUseDarkColors)
  })

  return mainWindow
}

export function getWindowById(id: number): BrowserWindow | null {
  return BrowserWindow.fromId(id)
}
