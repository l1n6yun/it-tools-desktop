import { contextBridge, ipcRenderer } from 'electron'
import type { OpenDialogOptions, SaveDialogOptions } from 'electron'

// 暴露给渲染进程的 API
const electronAPI = {
  // 应用信息
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  getUserDataPath: () => ipcRenderer.invoke('get-user-data-path'),

  // 系统主题
  getSystemTheme: () => ipcRenderer.invoke('get-system-theme'),
  onSystemThemeChanged: (callback: (theme: 'dark' | 'light') => void) => {
    ipcRenderer.on('system-theme-changed', (_event, theme) => callback(theme))
  },

  // 外部链接
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),

  // 文件对话框
  showOpenDialog: (options: OpenDialogOptions) => ipcRenderer.invoke('show-open-dialog', options),
  showSaveDialog: (options: SaveDialogOptions) => ipcRenderer.invoke('show-save-dialog', options),

  // 文件操作
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath: string, data: Buffer) => ipcRenderer.invoke('write-file', filePath, data),

  // 菜单事件监听
  onToggleDarkMode: (callback: () => void) => {
    ipcRenderer.on('toggle-dark-mode', () => callback())
  },
  onOpenPreferences: (callback: () => void) => {
    ipcRenderer.on('open-preferences', () => callback())
  },
  onShowAbout: (callback: () => void) => {
    ipcRenderer.on('show-about', () => callback())
  },

  // 移除监听器
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  },
}

// 使用 contextBridge 暴露 API
contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// 类型导出
export type ElectronAPI = typeof electronAPI
