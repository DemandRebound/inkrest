# 开发笔记 / Contributing

## 环境

零依赖、无构建步骤。只需要一个支持 Manifest V3 的 Chromium 浏览器（Chrome 137+）。`index.html` / `app.js` / `manifest.json` 就是全部运行时代码，`tools/make_icons.py` 只用 Python 标准库，用来重新生成 `icons/`。

加载方式见 [README](README.md#安装)。

## 代码结构

| 文件 | 职责 |
|------|------|
| `index.html` | DOM + 全部 CSS（深/浅两套 CSS 变量由 `html[data-theme]` 切换）；**无内联脚本**，符合 MV3 CSP |
| `app.js` | 单个 IIFE：配置与状态、存储、渲染、设置面板、搜索、时钟、常用站点、启动与调试锚点 |
| `manifest.json` | MV3 清单，`chrome_url_overrides.newtab` 覆盖新标签页 |

几个值得知道的实现约束：

- **存储**：扩展环境用 `chrome.storage`（设置走 `sync`、背景图与站点快照走 `local`），预览环境回退 `localStorage`，旧配置会自动迁移。滑块等高频写入做 320ms 节流以避开 `sync` 写入配额，切换引擎 / 开关 / 屏蔽这类低频关键操作 `save(true)` 立即落盘。
- **配置校验**：从 storage 读回的内容属于外部输入，`load()` 末尾统一走 `normalizeState()` 夹取类型与范围；所有预设索引经 `presetAt()` 兜底；图片只接受 base64 dataURL。
- **注入面**：站点标题、域名、备忘文本一律用 `textContent` / `dataset` 写入；站点 URL 二次校验只允许 `http(s)`；`a.href` 不接受其他 scheme。
- **性能取向**：页面静止时零动画、零 rAF，时钟按「下一分钟边界」的 `setTimeout` 链每分钟唤醒一次；从 storage 读回的站点快照按天固化以保持顺序稳定，但**空结果绝不落盘**，否则一整天都会显示空态。
- **不做点击动效**：不是漏做，是取舍。详见 [README](README.md)。

## 调试锚点

在 `index.html` 后加 hash 即可，全部**不落盘**，用于截图核对与回归：

| 锚点 | 作用 |
|------|------|
| `#panel` | 直接展开设置面板 |
| `#preset:N` | 切到第 N 个背景预设（0–7） |
| `#auto` | 临时开启「跟随系统」并展开面板 |
| `#peek` | 强制保持引擎按钮展开（模拟 hover） |
| `#memo[:light]` | 临时开启备忘并填示例文字，可加 `:light` 切宣纸 |
| `#toast` | 显示一条示例操作反馈 |
| `#sites[:light][:img][:plain]` | 注入 10 个模拟站点（预览环境用内联 SVG 造同款图标）并保持顶部浮出；`:light` 切浅色、`:img` 叠斑驳测试图、`:plain` 不强制浮出以验证真实 hover |
| `#img[:light][:nopanel][:off][:peek]` | 用一张斑驳高对比度测试图模拟已上传图片；`:light` 亮图、`:nopanel` 不展开面板、`:off` 模拟已切到色块、`:peek` 保持引擎展开 |

## 本地验证建议

- 改完代码后必须到 `chrome://extensions/` 点该扩展的 ⟳ 刷新；**新增 manifest 权限尤其如此**，否则新 API 不存在，功能会静默退化成空态。
- 页面可直接双击 `index.html` 预览，但 `chrome.topSites` / `favicon` 不可用，不要据此判断站点功能。
- 用无头 Chrome 的 CDP 截图做像素级回归时，注意两个坑：连续 `Page.navigate` 到同一路径只改 hash 属于同文档跳转，脚本不会重跑，锚点会失效（先回 `about:blank` 强制跨文档加载）；不要用 `--virtual-time-budget`，它会把 CSS transition 冻结在起点。
- 深浅两套主题、8 个预设、图片背景、面板展开、常用站点空态都值得各截一帧核对。

## 已修的坑

- **常用站点空结果被固化**：早期版本把一次空结果也写进当天快照，之后一整天都不再重拉，权限生效后仍显示「暂无常用站点」。现在空结果不落盘且会清掉旧缓存。
- **损坏配置让启动中断**：早期版本直接拿 `state.preset` 索引 `PRESETS`，越界会让 `boot()` 在渲染前抛异常（背景空白、引擎按钮全消失）；非法图片串还会被拼进 `url(...)`。现由 `normalizeState()` + `presetAt()` 兜底。
- **`/` 快捷键抢焦点**：全局监听曾把备忘输入框里的 `/` 拦下并跳到搜索框，导致斜杠打不出来。现在焦点在任何可编辑控件时都不拦截。
- **面板开合闪烁**：备忘上的 `pointerdown` 需要 `stopPropagation`，否则面板已展开时会被 document 的「点外部关闭」先收起、再被 click 打开。
- **删特效时的连带监听**：删除点击动效时，不能把所有「为动效加的监听」一刀切；逐条确认是否还承担其他职责。

## 提交习惯

- commit message 用中文，写清「为什么」，涉及踩坑时按编号 lesson 记录
- 每个可运行版本先由维护者真机验证，再提交；工作树保持干净
- 视觉 / 行为改动附上前后对比数据（像素差异、锚点探针结果）

## 问题与建议

欢迎通过本仓库的 [Issues](https://github.com/DemandRebound/inkrest/issues) 提出。涉及未公开的安全问题请走 [SECURITY.md](SECURITY.md) 的渠道。
