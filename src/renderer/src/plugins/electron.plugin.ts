import type { App } from 'vue'

export interface ElectronPluginOptions {
  onDarkModeToggle?: () => void
  onOpenPreferences?: () => void
  onShowAbout?: () => void
}

export const electronPlugin = {
  install: (app: App, options: ElectronPluginOptions = {}) => {
    // 检查是否在 Electron 环境中
    const isElectron = typeof window !== 'undefined' && !!window.electronAPI

    app.config.globalProperties.$isElectron = isElectron
    app.provide('isElectron', isElectron)

    if (isElectron) {
      // 监听系统主题变化
      window.electronAPI.onSystemThemeChanged((theme) => {
        app.config.globalProperties.$systemTheme = theme
      })

      // 监听菜单事件
      window.electronAPI.onToggleDarkMode(() => {
        options.onDarkModeToggle?.()
      })

      window.electronAPI.onOpenPreferences(() => {
        options.onOpenPreferences?.()
      })

      window.electronAPI.onShowAbout(() => {
        options.onShowAbout?.()
      })
    }
  },
}

// 组合式 API
export function useElectron() {
  const isElectron = typeof window !== 'undefined' && !!window.electronAPI

  const getSystemTheme = async (): Promise<'dark' | 'light'> => {
    if (!isElectron) return 'light'
    return window.electronAPI.getSystemTheme()
  }

  const openExternal = async (url: string): Promise<void> => {
    if (!isElectron) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    await window.electronAPI.openExternal(url)
  }

  const showOpenDialog = async (options: Electron.OpenDialogOptions) => {
    if (!isElectron) return null
    return window.electronAPI.showOpenDialog(options)
  }

  const showSaveDialog = async (options: Electron.SaveDialogOptions) => {
    if (!isElectron) return null
    return window.electronAPI.showSaveDialog(options)
  }

  const readFile = async (filePath: string) => {
    if (!isElectron) return null
    return window.electronAPI.readFile(filePath)
  }

  const writeFile = async (filePath: string, data: Buffer) => {
    if (!isElectron) return
    return window.electronAPI.writeFile(filePath, data)
  }

  return {
    isElectron,
    getSystemTheme,
    openExternal,
    showOpenDialog,
    showSaveDialog,
    readFile,
    writeFile,
    electronAPI: isElectron ? window.electronAPI : null,
  }
}
