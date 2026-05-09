import { BrowserWindow, app, dialog, shell, nativeTheme, ipcMain } from 'electron'
import { readFile, writeFile } from 'fs/promises'

export function setupIpc(mainWindow: BrowserWindow): void {
  // 获取应用版本
  ipcMain.handle('get-app-version', () => {
    return app.getVersion()
  })

  // 获取系统主题
  ipcMain.handle('get-system-theme', () => {
    return nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
  })

  // 打开外部链接
  ipcMain.handle('open-external', async (_event, url: string) => {
    await shell.openExternal(url)
  })

  // 打开文件对话框
  ipcMain.handle('show-open-dialog', async (_event, options) => {
    const result = await dialog.showOpenDialog(mainWindow, options)
    return result
  })

  // 保存文件对话框
  ipcMain.handle('show-save-dialog', async (_event, options) => {
    const result = await dialog.showSaveDialog(mainWindow, options)
    return result
  })

  // 读取文件
  ipcMain.handle('read-file', async (_event, filePath: string) => {
    return await readFile(filePath)
  })

  // 写入文件
  ipcMain.handle('write-file', async (_event, filePath: string, data: Buffer) => {
    await writeFile(filePath, data)
  })

  // 获取应用路径
  ipcMain.handle('get-app-path', () => {
    return app.getAppPath()
  })

  // 获取用户数据路径
  ipcMain.handle('get-user-data-path', () => {
    return app.getPath('userData')
  })
}
