import { Menu, BrowserWindow, app, shell, MenuItem, MenuItemConstructorOptions } from 'electron'
import { is } from '@electron-toolkit/utils'

export function setupMenu(mainWindow: BrowserWindow): void {
  const isMac = process.platform === 'darwin'

  const template: (MenuItemConstructorOptions | MenuItem)[] = [
    // { App } - 仅 macOS
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' as const },
              { type: 'separator' },
              {
                label: 'Preferences',
                accelerator: 'Cmd+,',
                click: () => mainWindow.webContents.send('open-preferences'),
              },
              { type: 'separator' },
              { role: 'services' as const },
              { type: 'separator' },
              { role: 'hide' as const },
              { role: 'hideOthers' as const },
              { role: 'unhide' as const },
              { type: 'separator' },
              { role: 'quit' as const },
            ],
          },
        ]
      : []),
    // { File }
    {
      label: 'File',
      submenu: [isMac ? { role: 'close' as const } : { role: 'quit' as const }],
    },
    // { Edit }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' as const, label: 'Undo', accelerator: 'CmdOrCtrl+Z' },
        { role: 'redo' as const, label: 'Redo', accelerator: 'CmdOrCtrl+Shift+Z' },
        { type: 'separator' },
        { role: 'cut' as const, label: 'Cut', accelerator: 'CmdOrCtrl+X' },
        { role: 'copy' as const, label: 'Copy', accelerator: 'CmdOrCtrl+C' },
        { role: 'paste' as const, label: 'Paste', accelerator: 'CmdOrCtrl+V' },
        { role: 'selectAll' as const, label: 'Select All', accelerator: 'CmdOrCtrl+A' },
      ],
    },
    // { View }
    {
      label: 'View',
      submenu: [
        { role: 'reload' as const, label: 'Reload', accelerator: 'CmdOrCtrl+R' },
        { role: 'forceReload' as const, label: 'Force Reload', accelerator: 'CmdOrCtrl+Shift+R' },
        { type: 'separator' },
        { role: 'resetZoom' as const, label: 'Actual Size', accelerator: 'CmdOrCtrl+0' },
        { role: 'zoomIn' as const, label: 'Zoom In', accelerator: 'CmdOrCtrl+=' },
        { role: 'zoomOut' as const, label: 'Zoom Out', accelerator: 'CmdOrCtrl+-' },
        { type: 'separator' },
        { role: 'togglefullscreen' as const, label: 'Toggle Full Screen' },
        {
          label: 'Toggle Dark Mode',
          accelerator: 'CmdOrCtrl+Shift+D',
          click: () => mainWindow.webContents.send('toggle-dark-mode'),
        },
      ],
    },
    // { Window }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' as const, label: 'Minimize' },
        { role: 'zoom' as const, label: 'Zoom' },
        ...(isMac
          ? [
              { type: 'separator' as const },
              { role: 'front' as const, label: 'Bring All to Front' },
            ]
          : []),
      ],
    },
    // { Help }
    {
      role: 'help',
      label: 'Help',
      submenu: [
        {
          label: 'About IT-Tools',
          click: () => mainWindow.webContents.send('show-about'),
        },
        { type: 'separator' },
        {
          label: 'GitHub Repository',
          click: async () => {
            await shell.openExternal('https://github.com/CorentinTh/it-tools')
          },
        },
        {
          label: 'Report Issue',
          click: async () => {
            await shell.openExternal('https://github.com/CorentinTh/it-tools/issues')
          },
        },
        { type: 'separator' },
        {
          label: 'Toggle Developer Tools',
          accelerator: isMac ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
          click: () => mainWindow.webContents.toggleDevTools(),
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
