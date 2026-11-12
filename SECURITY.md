# 安全政策 / Security Policy

## 支持版本

| 版本 | 支持 |
|------|------|
| 1.0.x | ✅ |
| < 1.0 | ❌（尚未公开发布） |

只维护最新的已发布版本。修复会随下一个版本发布。

## 报告漏洞

请**不要**在公开 Issue 里贴尚未修复的漏洞细节。优先通过本仓库的 [Security Advisories](https://github.com/DemandRebound/inkrest/security/advisories/new)（GitHub 的私有报告入口）提交；若不便使用，可在 [Issues](https://github.com/DemandRebound/inkrest/issues) 里只说明「发现安全问题，请求私下联系」，不要附 PoC。

请尽量包含：影响版本、复现步骤、实际与预期行为、可能的影响面（例如是否可读取 `topSites` 数据、是否可执行脚本）。本项目是纯静态 MV3 扩展，没有后端，所以重点在页面内的注入面、URL 跳转和权限使用。

## 响应

维护者是个人开发者，无法承诺固定 SLA。确认后会先给出初步判断，修复后随版本发布并在发行说明中致谢（除非你希望匿名）。

## 范围内

- 页面内的脚本注入（备忘文本、站点标题/URL、背景 dataURL）
- 输入到 `location.href` 的跳转约束被绕过
- 权限被超出声明用途使用
- 从 `chrome.storage` 读回的配置导致崩溃或异常行为

## 不在范围内

- Chrome 自身行为：138+ 强制附加的新标签页页脚、浏览器框架配色、`chrome://extensions` 的开发者模式提示
- 预览模式（`file://`）下缺少 Chrome API 导致的空态
- 需要用户主动安装恶意扩展或已控制本机浏览器才能触发的场景

## 自行核查

本项目无任何外部网络请求、无远程代码、无主机权限。可在扩展页面的 DevTools → Network 面板过滤 HTTP / HTTPS 请求，应看到零条对外请求（本地的扩展协议、`data:`、`blob:` 条目不是上传）。
