# 墨息 · Inkrest

一个不打扰人的 Chrome 新标签页。

玄墨 / 宣纸两套配色、超大时钟、可切换的搜索框、自定义背景、一行备忘、按需唤出的常用站点。**零依赖、零构建、零网络请求、零追踪**——所有代码就是仓库里的一个 HTML、一个 JS、一个 manifest。

仓库：[https://github.com/DemandRebound/inkrest](https://github.com/DemandRebound/inkrest) ｜ 许可：MIT ｜ 当前版本：1.0.0

> 刻意**不做点击动效**：新标签页是每天要开几十次的高频入口，点一下泛一圈涟漪属于干扰而不是反馈。页面静止时没有 `requestAnimationFrame`、没有 canvas、没有每帧分配，只有每分钟一次的时钟唤醒。

## 安装

### 从源码加载（开发者模式）

1. 克隆本仓库：`git clone https://github.com/DemandRebound/inkrest.git`（或用 SSH：`git clone git@github.com:DemandRebound/inkrest.git`）
2. 打开 `chrome://extensions/`，开启右上角「**开发者模式**」
3. 点「**加载已解压的扩展程序**」，选择**仓库根目录**（也就是 `manifest.json` 所在的那一层）
4. 新开一个标签页验证

> - Chrome 137 起官方版移除了 `--load-extension` 启动参数，需在扩展管理页手动加载一次，装好后长期保留。
> - Chrome 加载的是目录的实时引用，目录不要移动 / 改名 / 删除；改完代码回扩展管理页点 ⟳ 刷新。
> - 新标签页覆盖扩展只能启用一个，若装过同类扩展，先停用另一个。
> - 新增 manifest 权限后也必须点 ⟳ 刷新，否则新 API 不会生效。

### 直接当网页用

双击 `index.html` 或拖进浏览器窗口即可。预览模式没有 `chrome.storage` / `chrome.topSites`，会自动回退 `localStorage` 并对常用站点显示空态提示；**预览里调好的配置不会自动带进扩展环境**（两套存储互相独立）。也可以配合 `--app` 启动参数或设为主页使用。

## 功能

- **超大极简时钟**：细字重、等宽数字，每分钟整点更新；可在设置中隐藏
- **搜索引擎切换**：Google / Bing / DuckDuckGo 三枚图标圆钮默认收起，鼠标移到搜索区才依次浮出、移开收回；收起时占位不变，不引起布局跳动。搜索框右侧有一枚常驻微标显示当前引擎。支持按 `Tab` 循环切换，首次打开会一次性展开约 2.2 秒提示这里可以切换
- **自定义背景**：8 款预设（玄墨 / 黛 / 竹青 / 藤紫 + 宣纸 / 月白 / 藕荷 / 竹雾，深浅各半），也可上传或拖入本地图片；自动压缩存储、按画面亮度切换文字明暗、自动加纱层保证可读。**图片长期保留**，切到色块后可从「使用图片背景」卡片一键切回
- **深浅主题自适应**：浅色背景自动转墨色文字；可开启「跟随系统主题」，并为暗色 / 亮色分别指定预设（默认玄墨 ↔ 宣纸）
- **模糊 / 暗度 / 设置按钮透明度**：三个滑块实时生效
- **网址直达**：输入 `github.com` 这类域名直接访问，无需搜索
- **一行备忘（默认关）**：搜索区下方一行极淡文字，点击可编辑，上限 60 字，纯本地存储
- **常用站点（默认关）**：取自 `chrome.topSites` 的前 8 个站点，做成一排圆形 favicon 图标盘；**默认完全隐藏**，鼠标移到页面顶部才浮出，悬停可屏蔽单个站点。图标来自 Chrome 内置的 `_favicon` 本地缓存，取不到时退回域名首字母的彩色方块
- **操作反馈**：设置变更时底部浮出一条 1.5 秒的极轻提示，不用 alert、不引组件
- **设置面板分组**：五组原生 `<details>`，折叠状态持久化
- **无障碍**：`prefers-reduced-motion` 下自动关闭入场动画与错峰

## 快捷键

| 按键 | 作用 |
|------|------|
| `/` | 聚焦搜索框（焦点在任何输入框内时不抢） |
| `Enter` | 搜索 / 打开网址 |
| `Tab` | 循环切换搜索引擎（限搜索框内） |
| `Esc` | 清空并退出搜索框 / 关闭设置面板 |

## 隐私

**不收集、不传输、不上传任何数据。** 没有后端、没有账号、没有分析 SDK、没有崩溃上报、没有远程代码；所有设置与图片只存在 Chrome 自带的 `chrome.storage` 里。

`topSites` 只在用户主动开启「常用站点」后读取 Chrome 已聚合好的站点列表（标题 + URL），不含访问次数、时间或完整历史；`_favicon` 从浏览器本地图标缓存取图，不向任何第三方服务发请求。完整说明见 [PRIVACY.md](PRIVACY.md)。

## 权限

| 权限 | 用途 |
|------|------|
| `storage` | 保存设置（`sync`，由 Chrome 账号同步）与背景图 / 站点快照（`local`） |
| `topSites` | 仅在用户开启「常用站点」时，读取最常访问站点列表用于显示图标盘 |
| `favicon` | 通过 Chrome 内置 `chrome-extension://.../_favicon/` 读取站点图标（本地缓存，不联网） |

## 常见问题

- **页面底部有一行「… / 自定义 Chrome」**：这是 Chrome 138+ 给所有新标签页扩展强制附加的**浏览器原生页脚**，不属于本扩展，页面内的 CSS / JS 都摘不掉。在该页脚上右键 →「在新标签页上隐藏页脚」，或点「自定义 Chrome」→ 底部「页脚」→ 关闭显示。
- **不能给标签栏 / 工具栏上色**：浏览器框架归 Chrome 主题管，扩展无权修改。想两边一致，把 Chrome 外观模式设为「设备」（跟随系统深浅）即可。
- **常用站点显示空态**：空态文字本身会说明原因且**可点击重试**，常见为「扩展权限未生效（去扩展管理页点 ⟳ 刷新）」「Chrome 返回 0 条（新 profile / 关掉了『显示最常访问的网站』）」「全部被屏蔽」。详见 [CONTRIBUTING.md](CONTRIBUTING.md)。
- **双击 `index.html` 时常用站点不可用**：预览环境没有 `chrome.topSites`，用 `#sites` 调试锚点可看模拟数据。

## 开发

零依赖、无构建步骤。调试锚点、设计取舍、已修的坑和本地验证方式见 [CONTRIBUTING.md](CONTRIBUTING.md)；安全问题见 [SECURITY.md](SECURITY.md)；Chrome Web Store 上架材料见 [docs/STORE.md](docs/STORE.md)。问题与建议请走 [Issues](https://github.com/DemandRebound/inkrest/issues)。

## 文件结构

```
inkrest/
├── index.html          # 页面结构与全部样式
├── app.js              # 全部逻辑（无内联脚本，符合 MV3 CSP）
├── manifest.json       # MV3 清单
├── icons/              # 扩展图标 16/32/48/128
├── tools/make_icons.py # 图标生成脚本（纯 Python 标准库）
├── docs/STORE.md       # 商店上架材料
├── PRIVACY.md          # 隐私说明
├── CONTRIBUTING.md     # 开发笔记与调试锚点
├── SECURITY.md         # 漏洞报告
└── LICENSE             # MIT
```

## 致谢与许可

- 配色取自 [墨观 Inkstone](https://github.com/Konata9/inkstone) 的玄墨 Xuanmo / 宣纸 Xuanzhi 变体（该项目以 **MIT** 许可发布，色相骨架来自 zhongguose 中国传统色）。本项目只引用了其中若干颜色值。
- Google、Bing、DuckDuckGo 的名称与图标归各自权利人所有，本项目内联这些图标**仅用于标识对应的搜索服务**，不代表其背书或关联。
- 扩展图标由 `tools/make_icons.py` 生成，为本项目自有作品。
- 本项目代码以 **MIT** 许可发布，见 [LICENSE](LICENSE)。
