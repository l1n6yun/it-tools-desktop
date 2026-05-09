/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  VITE_PLAUSIBLE_API_HOST: string
  VITE_PLAUSIBLE_DOMAIN: string
  PACKAGE_VERSION: string
  GIT_SHORT_SHA: string
  PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Electron API types
interface Window {
  electronAPI?: {
    getAppVersion: () => Promise<string>
    getAppPath: () => Promise<string>
    getUserDataPath: () => Promise<string>
    getSystemTheme: () => Promise<'dark' | 'light'>
    onSystemThemeChanged: (callback: (theme: 'dark' | 'light') => void) => void
    openExternal: (url: string) => Promise<void>
    showOpenDialog: (options: Electron.OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue>
    showSaveDialog: (options: Electron.SaveDialogOptions) => Promise<Electron.SaveDialogReturnValue>
    readFile: (filePath: string) => Promise<Buffer>
    writeFile: (filePath: string, data: Buffer) => Promise<void>
    onToggleDarkMode: (callback: () => void) => void
    onOpenPreferences: (callback: () => void) => void
    onShowAbout: (callback: () => void) => void
    removeAllListeners: (channel: string) => void
  }
}

declare namespace Electron {
  interface OpenDialogOptions {
    title?: string
    defaultPath?: string
    buttonLabel?: string
    filters?: Array<{ name: string; extensions: string[] }>
    properties?: Array<
      | 'openFile'
      | 'openDirectory'
      | 'multiSelections'
      | 'showHiddenFiles'
      | 'createDirectory'
      | 'promptToCreate'
      | 'noResolveAliases'
      | 'treatPackageAsDirectory'
      | 'dontAddToRecent'
    >
  }

  interface SaveDialogOptions {
    title?: string
    defaultPath?: string
    buttonLabel?: string
    filters?: Array<{ name: string; extensions: string[] }>
  }

  interface OpenDialogReturnValue {
    canceled: boolean
    filePaths: string[]
  }

  interface SaveDialogReturnValue {
    canceled: boolean
    filePath?: string
  }
}
