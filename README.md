<picture>
    <source srcset="./.github/logo-dark.png" media="(prefers-color-scheme: light)">
    <source srcset="./.github/logo-white.png" media="(prefers-color-scheme: dark)">
    <img src="./.github/logo-dark.png" alt="logo">
</picture>

<p align="center">
专为开发者和 IT 从业人员打造的工具集合。基于 <a href="https://github.com/CorentinTh/it-tools">it-tools</a> 二开，使用 electron-vite 封装为桌面应用，离线可用。
</p>

<p align="center">
  <a href="https://github.com/CorentinTh/it-tools">
    <img src="https://img.shields.io/badge/Original-CorentinTh%2Fit--tools-blue" alt="Original Project">
  </a>
  <a href="https://github.com/l1n6yun/it-tools-desktop/releases">
    <img src="https://img.shields.io/github/v/release/l1n6yun/it-tools-desktop" alt="Release">
  </a>
  <img src="https://img.shields.io/badge/Framework-electron--vite-47848F" alt="Electron Vite">
  <img src="https://img.shields.io/badge/License-GNU%20GPLv3-green" alt="License">
</p>

## 功能特性

- **丰富工具集**：聚合开发者常用的小工具，包括但不限于编码转换、JSON 格式化、UUID 生成、JWT 解码等
- **桌面应用**：使用 electron-vite 封装，可独立运行，无需浏览器
- **离线可用**：安装后无需网络连接，随时使用
- **原生体验**：支持系统托盘、快捷键等桌面原生功能

## 下载安装

### Windows

从 [Releases](https://github.com/l1n6yun/it-tools-desktop/releases) 页面下载 Windows 安装包（`.exe`）并安装。

### macOS

从 [Releases](https://github.com/l1n6yun/it-tools-desktop/releases) 页面下载 macOS 安装包（`.dmg`）并安装。

### Linux

从 [Releases](https://github.com/l1n6yun/it-tools-desktop/releases) 页面下载 Linux 安装包（`.AppImage`、`.deb`）并安装。

## 快速开始

### 从源码运行

```sh
# 克隆项目
git clone https://github.com/l1n6yun/it-tools-desktop.git

# 安装依赖
pnpm install

# 开发模式运行
pnpm dev
```

### 构建安装包

```sh
# 构建 Windows 安装包
pnpm build:win

# 构建 macOS 安装包
pnpm build:mac

# 构建 Linux 安装包
pnpm build:linux
```

## 开发指南

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 推荐 IDE 配置

[VSCode](https://code.visualstudio.com/) 配合以下扩展：

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（禁用 Vetur）
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally)

### 项目命令

| 命令            | 说明                   |
|-----------------|------------------------|
| `pnpm dev`      | 开发模式启动           |
| `pnpm build`    | 生产环境构建           |
| `pnpm test`     | 运行单元测试           |
| `pnpm lint`     | 代码检查               |
| `pnpm build:win` | 构建 Windows 安装包   |
| `pnpm build:mac` | 构建 macOS 安装包     |
| `pnpm build:linux` | 构建 Linux 安装包   |

### 创建新工具

使用脚手架快速创建新工具：

```sh
pnpm run script:create:tool my-tool-name
```

## 致谢

- 感谢 [Corentin Thomasset](https://corentin.tech) 创建的 [it-tools](https://github.com/CorentinTh/it-tools) 项目
- 本项目基于 it-tools 构建，遵循其开源协议

## License

基于 [GNU GPLv3](LICENSE) 协议开源。
