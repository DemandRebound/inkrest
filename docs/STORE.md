# Chrome Web Store 上架材料

> 这份文档给维护者自己用，不随扩展打包。上架时以商店后台**当时的实际表单**为准；下面是按 2026-11 的政策整理好的可直接粘贴文案。

## 0. 前置

**仓库地址与固定链接**（`https://github.com/DemandRebound/inkrest`）

| 用途 | URL |
|------|-----|
| 主页 / `manifest.homepage_url` | `https://github.com/DemandRebound/inkrest` |
| 克隆（HTTPS / SSH） | `https://github.com/DemandRebound/inkrest.git` / `git@github.com:DemandRebound/inkrest.git` |
| **隐私政策（商店后台填这个）** | `https://github.com/DemandRebound/inkrest/blob/main/PRIVACY.md` |
| 隐私政策纯文本备选 | `https://raw.githubusercontent.com/DemandRebound/inkrest/main/PRIVACY.md` |
| Issues | `https://github.com/DemandRebound/inkrest/issues` |
| 私有漏洞报告 | `https://github.com/DemandRebound/inkrest/security/advisories/new` |

> 商店后台只认可公开访问的 URL，所以仓库必须先设为 **Public**；填完在浏览器无痕窗口打开一次确认无需登录即可查看。

- [x] `manifest.json` 已补 `homepage_url`（`https://github.com/DemandRebound/inkrest`）
- [ ] GitHub 仓库已公开，`PRIVACY.md` 的公开 URL 已在无痕窗口验证
- [ ] `manifest.json` 的 `version` 与本次发布一致（当前 `1.0.0`）
- [ ] `manifest.json` 的 `name` 与商店展示名一致；名称里**不要出现 "Chrome"**（Google 商标政策），「墨息 · Inkrest」可用
- [ ] 打包前跑一遍真机回归：深浅主题、8 个预设、图片背景、设置面板、常用站点空态

## 1. 单一目的声明（Single purpose）

> 中文：提供一个可自定义的极简新标签页，显示时钟、搜索框，以及由用户主动开启的常用站点快捷入口。
>
> English: A minimal, customizable new tab page that shows a clock, a search box, and optional shortcuts to the user's most-visited sites.

新标签页覆盖类扩展审核较严，需要在描述里说清楚：搜索**只跳转用户所选的引擎或用户输入的网址**，不劫持、不重定向到未声明的站点，不含广告与联盟链接。

## 2. 逐权限用途说明（Permission justification）

| 权限 | 触发条件 | 可直接粘贴的英文说明 |
|------|----------|----------------------|
| `storage` | 始终 | `Stores the user's theme, background, memo and site-block preferences in chrome.storage.sync, plus the uploaded background image and the daily top-sites snapshot in chrome.storage.local. No data leaves the browser.` |
| `topSites` | 仅当用户开启「显示常用站点」（默认关） | `Powers the optional "Frequent sites" feature, which is OFF by default. When the user enables it, the extension calls chrome.topSites.get() to display up to 8 frequently visited sites as favicon shortcuts. Only titles and URLs are read; no visit counts, timestamps or full history are accessed, and nothing is transmitted.` |
| `favicon` | 同上，用于取图标 | `Resolves site icons from Chrome's local favicon cache via chrome-extension://.../_favicon/ for the optional "Frequent sites" shortcuts. No third-party favicon service is contacted.` |

写法要点：说清**哪个可见功能**、**调用哪个 API**、**数据边界**。审核常见拒因是「权限无法对应到用户看得见的功能」以及「声明与代码不符」。

## 3. Privacy practices 数据表

**最容易填错的一格：`Web history` 要勾。** 判断是否勾选的标准是「是否访问」，不是「是否上传」。本项目调用了 `topSites`，属于访问浏览数据，即使全部留在本地也必须勾选并说明用途。

| 表单项 | 填法 |
|--------|------|
| Web history | ✅ 勾（仅本地读取最常访问站点用于显示快捷入口，不传输） |
| Personally identifiable information | ❌ |
| Website content | ❌ |
| User activity / Location / Health / Financial 等 | ❌ |
| Data sold or transferred to third parties | ❌ |
| Data used for unrelated purposes / 多用途 | ❌ |
| 是否有限定用途（Limited Use）认证 | ✅ 是 |

据 2026 年 7 月官方公告、**2026-08-01 起执行**的新规：数据收集必须严格限于声明的单一目的，且任何数据收集都要显著披露，数据处理方式变更需主动告知用户。本项目「零收集」是最容易自证的状态——审核者可在扩展页 DevTools 的 Network 面板看到零对外请求。

隐私政策 URL 填 `https://github.com/DemandRebound/inkrest/blob/main/PRIVACY.md`；同时建议把同一段说明放进商店「概述」末尾。若后台不接受 GitHub 页面，可改用 `https://raw.githubusercontent.com/DemandRebound/inkrest/main/PRIVACY.md`，或开启本仓库的 GitHub Pages 后用 Pages 地址。

## 4. 商店文案

**简短描述（≤132 字符）**

> 玄墨与宣纸两套配色的极简新标签页：时钟、可切换搜索、自定义背景、一行备忘。不联网，不追踪。

**详细描述**

```
墨息 · Inkrest 是一个不打扰人的新标签页。

· 玄墨 / 宣纸深浅两套配色，8 款背景预设，也可上传或拖入自己的图片
· 超大极简时钟，每分钟整点更新
· 搜索框可在 Google / Bing / DuckDuckGo 之间切换，默认收起、悬停才浮出
· 一行备忘、按需唤出的常用站点，全部默认关闭
· 模糊 / 暗度 / 界面透明度可调，可跟随系统深浅切换

隐私：不收集、不传输、不上传任何数据。没有后端、没有账号、没有分析 SDK、
没有远程代码，也不发起任何外部网络请求。所有设置只存在 Chrome 自带的
chrome.storage 里。常用站点功能默认关闭，开启后才读取 Chrome 已聚合的
最常访问站点列表（仅标题与 URL），图标来自浏览器本地缓存。

零依赖、零构建、MIT 开源。
```

English 版把中文逐段对应翻译即可，别加中文版没有的功能承诺。

## 5. 素材清单

| 素材 | 规格 | 状态 |
|------|------|------|
| 扩展图标 | 128×128 PNG | ✅ `icons/icon128.png` |
| 截图 | 1280×800 PNG，1–5 张 | ✅ `screenshots/` 4 张：`01-dark`（引擎展开）/ `02-light` / `03-panel` / `04-sites`，共约 3.3 MB |
| 宣传小图 | 440×280 | ⬜ |
| 分类 | Productivity | 建议 |
| 语言 | zh-CN（可加 en） | 建议 |

截图取自真实运行的页面：1280×800、不含调试锚点痕迹、不含 Chrome 原生页脚；「常用站点」用演示数据，避免暴露真实浏览记录。**界面若有改动，发布前必须重截**（用 CDP 锁定视口、每张独立 profile、开启 reduced-motion 关掉入场动画，再用调试锚点切主题 / 面板 / 站点）。商店上传时直接用 `screenshots/` 里的原图，**不要**把该目录打进扩展包。

## 6. 打包

在仓库根目录执行，只收运行必需文件与授权/隐私文档：

```sh
zip -r inkrest-1.0.0.zip \
  index.html app.js manifest.json icons/ \
  LICENSE README.md PRIVACY.md
```

不要打进包里：`.git/`、`docs/`、`tools/`、`screenshots/`、`CONTRIBUTING.md`、`SECURITY.md`、`.gitignore`、任何 `*.zip` 与本地截图。上传前解压一次，确认根目录直接就是 `manifest.json`。

## 7. 待维护者拍板的优化（本版未做）

**把 `topSites` / `favicon` 从 `permissions` 移到 `optional_permissions`**：常用站点默认关闭，正好适合在用户打开开关时再 `chrome.permissions.request()`。

- 收益：安装时不再出现「读取最常访问网站列表」的警告；权限范围最小；敏感权限审核更顺
- 代价：开启功能时多一步授权弹窗；要处理 `chrome.permissions.onRemoved`（用户随时可撤销）、权限未授予时的空态文案，以及 `fetchTopSites()` 的判断分支；属于功能改动，需要重新跑一轮回归

当前版本保持 required permissions + 上面的 justification 文案，这条路径同样可以上架。

## 8. 上架后回填

- [x] `manifest.json` 补 `homepage_url`（`https://github.com/DemandRebound/inkrest`）
- [ ] **拿到商店商品链接后**：在 `README.md` 安装章节最前面加「从 Chrome Web Store 安装」一节（商店未上架前不要放占位链接）
- [ ] 商店后台填 `PRIVACY.md` 的公开 URL：`https://github.com/DemandRebound/inkrest/blob/main/PRIVACY.md`
- [ ] `LICENSE` 版权行如需换成维护者署名（当前为 `Inkrest contributors`）
- [ ] 确认商店展示名、`manifest.name`、GitHub 仓库名三者一致：墨息 · Inkrest / `inkrest`
