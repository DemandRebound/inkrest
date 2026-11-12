(function () {
  "use strict";

  /* ================= 配置 ================= */
  const ENGINES = [
    {
      id: "google", name: "Google", url: "https://www.google.com/search?q=",
      icon: '<svg viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>'
    },
    {
      id: "bing", name: "Bing", url: "https://www.bing.com/search?q=",
      icon: '<svg viewBox="0 0 24 24"><path fill="#008373" d="M5 3v16l3.72 2L18 15.82v-4.09L9.77 8.95l1.61 3.89L13.94 14L8.7 16.92V4.27z"/></svg>'
    },
    {
      id: "ddg", name: "DuckDuckGo", url: "https://duckduckgo.com/?q=",
      icon: '<svg viewBox="0 0 24 24"><path fill="#DE5833" d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 .984C18.083.984 23.016 5.916 23.016 12S18.084 23.016 12 23.016.984 18.084.984 12C.984 5.917 5.916.984 12 .984zm0 .938C6.434 1.922 1.922 6.434 1.922 12c0 4.437 2.867 8.205 6.85 9.55-.237-.82-.776-2.753-1.6-6.052-1.184-4.741-2.064-8.606 2.379-9.813.047-.011.064-.064.03-.093-.514-.467-1.382-.548-2.233-.38a.06.06 0 0 1-.07-.058c0-.011 0-.023.011-.035.205-.286.572-.507.822-.64a1.843 1.843 0 0 0-.607-.335c-.059-.022-.059-.12-.006-.144.006-.006.012-.012.024-.012 1.749-.233 3.586.292 4.49 1.448.011.011.023.017.035.023 2.968.635 3.509 4.837 3.328 5.998a9.607 9.607 0 0 0 2.346-.576c.746-.286 1.008-.222 1.101-.053.1.193-.018.513-.28.81-.496.567-1.393 1.01-2.974 1.137-.546.044-1.029.024-1.445.006-.789-.035-1.339-.059-1.633.39-.192.298-.041.998 1.487 1.22 1.09.157 2.078.047 2.798-.034.643-.07 1.073-.118 1.172.069.21.402-.996 1.207-3.066 1.224-.158 0-.315-.006-.467-.011-1.283-.065-2.227-.414-2.816-.735a.094.094 0 0 1-.035-.017c-.105-.059-.31.045-.188.267.07.134.444.478 1.004.776-.058.466.087 1.184.338 2l.088-.016c.041-.009.087-.019.134-.025.507-.082.775.012.926.175.717-.536 1.913-1.294 2.03-1.154.583.694.66 2.332.53 2.99-.004.012-.017.024-.04.035-.274.117-1.783-.296-1.783-.511-.059-1.075-.26-1.173-.493-1.225h-.156c.006.006.012.018.018.03l.052.12c.093.257.24 1.063.13 1.26-.112.199-.835.297-1.284.303-.443.006-.543-.158-.637-.408-.07-.204-.103-.675-.103-.95a.857.857 0 0 1 .012-.216c-.134.058-.333.193-.397.281-.017.262-.017.682.123 1.149.07.221-1.518 1.164-1.74.99-.227-.181-.634-1.952-.459-2.67-.187.017-.338.075-.42.191-.367.508.093 2.933.582 3.248.257.169 1.54-.553 2.176-1.095.105.145.305.158.553.158.326-.012.782-.06 1.103-.158.192.45.423.972.613 1.388 4.47-1.032 7.803-5.037 7.803-9.82 0-5.566-4.512-10.078-10.078-10.078zm1.791 5.646c-.42 0-.678.146-.795.332-.023.047.047.094.094.07.14-.075.357-.161.701-.156.328.006.516.09.67.159l.023.01c.041.017.088-.03.059-.065-.134-.18-.332-.35-.752-.35zm-5.078.198a1.24 1.24 0 0 0-.522.082c-.454.169-.67.526-.67.76 0 .051.112.057.141.011.081-.123.21-.31.617-.478.408-.17.73-.146.951-.094.047.012.083-.041.041-.07a.989.989 0 0 0-.558-.211zm5.434 1.423a.651.651 0 0 0-.655.647.652.652 0 0 0 1.307 0 .646.646 0 0 0-.652-.647zm.283.262h.008a.17.17 0 0 1 .17.17c0 .093-.077.17-.17.17a.17.17 0 0 1-.17-.17c0-.09.072-.165.162-.17zm-5.358.076a.752.752 0 0 0-.758.758c0 .42.338.758.758.758s.758-.337.758-.758a.756.756 0 0 0-.758-.758zm.328.303h.01c.112 0 .2.089.2.2 0 .11-.088.197-.2.197a.195.195 0 0 1-.197-.198c0-.107.082-.194.187-.199z"/></svg>'
    }
  ];

  // 取色自 Inkstone 玄墨主题（zhongguose 中国传统色）
  // theme 决定界面文字用米白还是墨色，深色 4 款 + 浅色 4 款
  const PRESETS = [
    { name: "玄墨", theme: "dark",  css: "radial-gradient(120% 90% at 22% -8%, rgba(99,187,208,.12), transparent 58%), linear-gradient(160deg, #201e26 0%, #100f14 100%)" },
    { name: "黛",   theme: "dark",  css: "radial-gradient(120% 90% at 78% -8%, rgba(54,51,71,.95), transparent 62%), linear-gradient(160deg, #24222c 0%, #101015 100%)" },
    { name: "竹青", theme: "dark",  css: "radial-gradient(120% 90% at 25% 0%, rgba(18,170,156,.18), transparent 60%), linear-gradient(160deg, #16241f 0%, #0b0f0d 100%)" },
    { name: "藤紫", theme: "dark",  css: "radial-gradient(120% 90% at 75% 0%, rgba(188,132,168,.20), transparent 60%), linear-gradient(160deg, #251c26 0%, #110e13 100%)" },
    { name: "宣纸", theme: "light", css: "radial-gradient(120% 90% at 26% -10%, rgba(255,255,255,.9), transparent 62%), linear-gradient(160deg, #f7f2e7 0%, #e5dbc9 100%)" },
    { name: "月白", theme: "light", css: "radial-gradient(120% 90% at 28% -10%, rgba(255,255,255,.95), transparent 62%), linear-gradient(160deg, #f2f7fb 0%, #d9e4ed 100%)" },
    { name: "藕荷", theme: "light", css: "radial-gradient(120% 90% at 72% -10%, rgba(255,255,255,.9), transparent 62%), linear-gradient(160deg, #f8edf0 0%, #e5d3da 100%)" },
    { name: "竹雾", theme: "light", css: "radial-gradient(120% 90% at 24% -10%, rgba(255,255,255,.92), transparent 62%), linear-gradient(160deg, #eff5ee 0%, #d6e3d8 100%)" }
  ];

  // 所有预设索引访问都走这里：配置损坏时也只会退回第一款，不会让 boot 抛异常
  const presetAt = (i) => PRESETS[i] || PRESETS[0];

  const KEY = "ntp.settings.v2";
  const DEFAULTS = {
    engine: "google",
    preset: 0,
    image: null,
    useImage: false,     // 当前是否显示图片背景（图片本身保留，切色块不丢）
    imageTheme: null,    // 图片自己算出的文字明暗，切回图片时要用它而非色块主题
    blur: 0,
    dim: 28,
    dimTouched: false,   // 用户手动调过暗度后，不再随主题自动改
    uiOpacity: 100,
    showClock: true,
    theme: "dark",
    autoTheme: false,    // 跟随系统深浅色切换
    darkPreset: 0,       // 系统暗色时用的背景预设
    lightPreset: 4,      // 系统亮色时用的背景预设
    guided: false,       // 是否已展示过「引擎按钮可展开」的一次性引导
    memo: "",            // 一行备忘文本（用户内容，恢复默认时不清）
    showMemo: false,     // 默认关闭，不往常驻层加元素
    showSites: false,    // 常用站点默认关闭，且不常驻显示（hover 顶部才浮出）
    blockedSites: [],    // 被屏蔽的 hostname（用户偏好，恢复默认时保留）
    groups: { theme: true, bg: true, look: true, memo: true, sites: true }  // 各分组是否展开
  };

  /* ================= 状态 ================= */
  let state = Object.assign({}, DEFAULTS);

  // 从 storage / localStorage 读回的配置属于外部输入。任何一个字段损坏都可能让
  // boot() 在渲染前抛异常（实测 preset=99 会让背景空白、引擎按钮全部消失），
  // 非法图片串还会被直接拼进 url(...)。统一在这里夹到合法范围，一次堵住全部入口。
  function normalizeState() {
    const idx = (v, fb) => Number.isInteger(v) && v >= 0 && v < PRESETS.length ? v : fb;
    const num = (v, lo, hi, fb) => {
      const n = Number(v);
      return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : fb;
    };
    const bool = (v, fb) => typeof v === "boolean" ? v : fb;

    state.preset = idx(state.preset, DEFAULTS.preset);
    state.darkPreset = idx(state.darkPreset, DEFAULTS.darkPreset);
    state.lightPreset = idx(state.lightPreset, DEFAULTS.lightPreset);
    state.engine = ENGINES.some((e) => e.id === state.engine) ? state.engine : DEFAULTS.engine;
    state.theme = state.theme === "light" ? "light" : "dark";
    state.imageTheme = state.imageTheme === "light" || state.imageTheme === "dark"
      ? state.imageTheme : null;
    // 只接受 base64 图片 dataURL：任何带引号 / 右括号 / 分号的注入串都会被判非法
    state.image = typeof state.image === "string" &&
      /^data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]+$/i.test(state.image)
      ? state.image : null;
    state.useImage = bool(state.useImage, false) && !!state.image;

    state.blur = num(state.blur, 0, 24, DEFAULTS.blur);
    state.dim = num(state.dim, 0, 70, DEFAULTS.dim);
    state.uiOpacity = num(state.uiOpacity, 20, 100, DEFAULTS.uiOpacity);
    ["showClock", "showMemo", "showSites", "autoTheme", "guided", "dimTouched"]
      .forEach((k) => { state[k] = bool(state[k], DEFAULTS[k]); });
    state.memo = typeof state.memo === "string" ? state.memo.slice(0, 60) : "";
    state.blockedSites = Array.isArray(state.blockedSites)
      ? state.blockedSites.filter((h) => typeof h === "string").slice(0, 200) : [];
    const g = state.groups && typeof state.groups === "object" ? state.groups : {};
    state.groups = {};
    Object.keys(DEFAULTS.groups).forEach((k) => { state.groups[k] = bool(g[k], true); });
  }

  // 扩展环境用 chrome.storage（官方推荐，且 settings 可跨设备同步）；
  // 双击 index.html 直接打开时没有 chrome API，回退到 localStorage。
  const HAS_CHROME = typeof chrome !== "undefined" &&
    !!(chrome.storage && chrome.storage.sync && chrome.storage.local);
  const NS = "ntp.";

  async function load() {
    let loaded = false;
    if (HAS_CHROME) {
      try {
        const [sync, local] = await Promise.all([
          chrome.storage.sync.get(NS + "settings"),
          chrome.storage.local.get(NS + "image")
        ]);
        const saved = sync[NS + "settings"];
        const image = local[NS + "image"];
        if (saved || image) {
          state = Object.assign({}, DEFAULTS, saved || {}, { image: image || (saved && saved.image) || null });
          // 旧版没有 useImage 字段：只要存过图，就认为当时正在用图片背景
          if (state.image && saved && saved.useImage === undefined) state.useImage = true;
          loaded = true;
        }
      } catch (e) { /* 读取失败则继续尝试迁移 */ }
    }
    if (!loaded) {
      try {
        const raw = localStorage.getItem(KEY) || localStorage.getItem("ntp.settings.v1");
        if (raw) {
          state = Object.assign({}, DEFAULTS, JSON.parse(raw));
          save(); // 把旧版 localStorage 配置迁移到 chrome.storage
        }
      } catch (e) { /* 忽略损坏的配置 */ }
    }
    normalizeState();
  }

  // 滑块拖动会高频触发写入，chrome.storage.sync 有写入配额，必须节流；
  // 但低频且关键的操作（切换引擎）可传 immediate 跳过节流，避免立刻关标签页丢配置
  let saveTimer = null;
  function save(immediate) {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    if (immediate) { writeNow(); return; }
    saveTimer = setTimeout(writeNow, 320);
  }

  async function writeNow() {
    saveTimer = null;
    const snapshot = Object.assign({}, state);
    const image = snapshot.image;
    delete snapshot.image;

    if (HAS_CHROME) {
      try {
        await chrome.storage.sync.set({ [NS + "settings"]: snapshot });
        await chrome.storage.local.set({ [NS + "image"]: image || null });
        return;
      } catch (e) { /* 落到 localStorage */ }
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(Object.assign({}, snapshot, { image: image })));
    } catch (e) {
      // 图片过大时降级：只存其余设置
      try { localStorage.setItem(KEY, JSON.stringify(Object.assign({}, snapshot, { image: null }))); } catch (e2) {}
    }
  }

  /* ================= 元素 ================= */
  const $ = (id) => document.getElementById(id);
  const bg = $("bg"), dimLayer = $("dim-layer");
  const clockEl = $("clock"), dateEl = $("date");
  const clockBlock = $("clock-block"), form = $("search-form"), input = $("q");
  const enginesEl = $("engines"), panel = $("panel"), settingsBtn = $("settings-btn");
  const searchZone = $("search-zone"), engineChip = $("engine-chip");
  const memoEl = $("memo"), memoSwitch = $("memo-switch"), memoInput = $("memo-input");
  const toastEl = $("toast");
  const sitesZone = $("sites-zone"), sitesList = $("sites-list");
  const sitesSwitch = $("sites-switch"), sitesHint = $("sites-hint");
  const sitesRefresh = $("sites-refresh"), sitesUnblock = $("sites-unblock");
  const groupEls = {
    theme: $("group-theme"), bg: $("group-bg"),
    look: $("group-look"), memo: $("group-memo"), sites: $("group-sites")
  };
  const presetsEl = $("presets"), fileInput = $("file");
  const blurRange = $("blur"), blurVal = $("blur-val");
  const dimRange = $("dim"), dimVal = $("dim-val");
  const uiRange = $("ui-o"), uiVal = $("ui-o-val");
  const clockSwitch = $("clock-switch"), dropHint = $("drop-hint");
  const autoSwitch = $("auto-switch"), autoDetail = $("auto-detail");
  const darkPresetsEl = $("dark-presets"), lightPresetsEl = $("light-presets");
  const uploadBtn = $("upload"), clearImageBtn = $("clear-image");
  const useImageBtn = $("use-image"), useImageThumb = $("use-image-thumb"),
    useImageLabel = $("use-image-label");

  /* ---- 极轻操作反馈：1.5 秒自动消失，不引组件、不用 alert ---- */
  let toastTimer = null;
  function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1500);
  }

  /* ---- 设置面板分组折叠：默认全展开，收起状态持久化 ---- */
  function renderGroups() {
    Object.keys(groupEls).forEach((k) => {
      groupEls[k].open = state.groups[k] !== false;
    });
  }

  Object.keys(groupEls).forEach((k) => {
    groupEls[k].addEventListener("toggle", () => {
      // 初始化赋值同样会派发 toggle，值没变就不写盘
      if ((state.groups[k] !== false) === groupEls[k].open) return;
      state.groups = Object.assign({}, state.groups, { [k]: groupEls[k].open });
      save();
    });
  });

  /* ================= 渲染 ================= */

  function applyBackground() {
    const has = !!state.image && state.useImage;
    const css = has ? "url(" + state.image + ")" : presetAt(state.preset).css;
    bg.style.backgroundImage = css;
    document.documentElement.classList.toggle("has-image", has);
    syncImageUI();
  }

  // 面板里的「图片主题」卡片：只要存过图就常驻，点一下即可从色块切回
  function syncImageUI() {
    const hasImage = !!state.image;
    const inUse = hasImage && state.useImage;
    useImageBtn.hidden = !hasImage;
    useImageBtn.classList.toggle("active", inUse);
    useImageThumb.style.backgroundImage = hasImage ? "url(" + state.image + ")" : "";
    useImageLabel.textContent = inUse ? "图片背景 · 使用中" : "使用图片背景";
    uploadBtn.textContent = hasImage ? "更换图片" : "上传图片";
    clearImageBtn.hidden = !hasImage;
  }

  function useImageBackground() {
    if (!state.image) return;
    state.useImage = true;
    // 切色块时 state.theme 会被改成色块主题，恢复图片要换回图片自己的明暗
    if (state.imageTheme) {
      applyTheme(state.imageTheme);
      if (!state.dimTouched) state.dim = state.imageTheme === "dark" ? 34 : 22;
    }
    save();
    applyBackground();
    applyLook();
    renderPresets();
    showToast("已切换为图片背景");

    // 旧配置没存 imageTheme：重新解码图片采样一次，校正文字明暗
    if (!state.imageTheme) {
      const probe = new Image();
      probe.onload = () => {
        applyTheme(averageLuminance(probe) > 0.56 ? "light" : "dark");
        state.imageTheme = state.theme;
        if (!state.dimTouched) state.dim = state.theme === "dark" ? 34 : 22;
        save();
        applyLook();
      };
      probe.src = state.image;
    }
  }

  // 浅色背景：文字转墨色，保证可读与不刺眼
  function applyTheme(theme) {
    const light = theme === "light";
    state.theme = light ? "light" : "dark";
    document.documentElement.dataset.theme = state.theme;
  }

  // 暗度层随主题换颜色：深底压黑纱，浅底蒙白纱（提亮），文字都压得住
  function dimStyle() {
    const v = state.dim / 100;
    return state.theme === "light"
      ? "rgba(255,255,255," + (v * 0.92).toFixed(3) + ")"
      : "rgba(0,0,0," + v.toFixed(3) + ")";
  }

  function applyLook() {
    document.documentElement.style.setProperty("--blur", state.blur + "px");
    document.documentElement.style.setProperty("--ui-o", state.uiOpacity / 100);
    dimLayer.style.background = dimStyle();
    clockBlock.classList.toggle("hidden", !state.showClock);
    clockSwitch.classList.toggle("on", state.showClock);
    blurRange.value = state.blur;
    blurVal.textContent = state.blur;
    dimRange.value = state.dim;
    dimVal.textContent = state.dim;
    uiRange.value = state.uiOpacity;
    uiVal.textContent = state.uiOpacity;
  }

  /* ---- 一行备忘：默认关，开启后是唯一一条常驻的被动信息 ---- */
  function renderMemo() {
    memoEl.hidden = !state.showMemo;
    memoEl.textContent = state.memo || "点这里写点什么";
    memoEl.classList.toggle("empty", !state.memo);
    memoSwitch.classList.toggle("on", state.showMemo);
    memoSwitch.setAttribute("aria-pressed", String(state.showMemo));
    // 正在输入时不要把光标位置重置掉
    if (document.activeElement !== memoInput) memoInput.value = state.memo;
  }

  memoSwitch.addEventListener("click", () => {
    state.showMemo = !state.showMemo;
    save(true);
    renderMemo();
  });

  memoInput.addEventListener("input", () => {
    state.memo = memoInput.value.slice(0, 60);
    save();                    // 打字高频，走节流
    memoEl.textContent = state.memo || "点这里写点什么";
    memoEl.classList.toggle("empty", !state.memo);
  });

  memoInput.addEventListener("change", () => save(true));  // 失焦兜底，防止立刻关页丢字

  // 页面上的备忘可点击：打开设置面板并聚焦输入框。
  // 阻止 pointerdown 冒泡：面板已展开时，document 的「点外部关闭」会先收起再被 click
  // 打开，中间会闪一下；这与点击动效无关，是面板开合逻辑本身需要的。
  memoEl.addEventListener("pointerdown", (ev) => ev.stopPropagation());
  memoEl.addEventListener("click", () => {
    togglePanel(true);
    setTimeout(() => { memoInput.focus(); memoInput.select(); }, 120);
  });

  /* ================= 常用站点：topSites + 按天固化 + 顶部按需浮现 ================= */
  const SITES_MAX = 8;
  const SITES_KEY = "ntp.sites.v1";   // file:// 预览时的降级存储键
  // 空态文案：[页面长提示, 面板短提示]。原来拆成两张同键表，键容易走偏且每次
  // 渲染都重建两个对象；合成一张按 sitesDiag 取一次即可。
  const SITE_EMPTY = {
    "no-permission": ["扩展尚未获得常用站点权限 · 到 chrome://extensions 点 ⟳ 刷新后重试",
      "权限未生效 · 到扩展页点 ⟳ 刷新"],
    "preview": ["常用站点需在扩展环境中使用（预览可用 #sites 看模拟数据）", "预览环境无此 API"],
    "error": ["读取常用站点失败 · 点此重试", "读取失败 · 点「刷新站点」重试"],
    "empty": ["Chrome 未返回常用站点 · 点此重试", "Chrome 返回 0 条 · 点「刷新站点」重试"],
    "blocked": ["站点已全部屏蔽 · 点此恢复", "已全部屏蔽 · 点「恢复已屏蔽」"],
    "idle": ["正在读取常用站点…", "正在读取…"]
  };
  let siteList = [];
  let sitesDiag = "idle";   // idle / ok / no-permission / preview / error / empty / blocked

  function today() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") +
      "-" + String(d.getDate()).padStart(2, "0");
  }

  function hostOf(url) {
    try { return new URL(url).hostname.replace(/^www\./i, ""); } catch (e) { return ""; }
  }

  /* ---- 站点图标：Chrome 内置 _favicon，取本地缓存、不联网、不泄露浏览记录 ---- */
  function faviconUrl(pageUrl) {
    if (typeof chrome === "undefined" || !chrome.runtime || !chrome.runtime.getURL) return null;
    const u = new URL(chrome.runtime.getURL("/_favicon/"));
    u.searchParams.set("pageUrl", pageUrl);
    u.searchParams.set("size", "64");   // 高分屏下按 22px 显示也不糊
    return u.toString();
  }

  // 域名哈希决定兜底色，同一站点每次颜色一致
  function hueOf(host) {
    let h = 0;
    for (let i = 0; i < host.length; i++) h = (h * 31 + host.charCodeAt(i)) % 360;
    return h;
  }

  // 预览环境没有 chrome.runtime：用内联 SVG 造一枚同类图标，方便截图核对布局
  function mockIcon(host) {
    const ch = /^[a-z0-9]/i.test(host) ? host.charAt(0).toUpperCase() : "•";
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">' +
      '<rect width="64" height="64" rx="16" fill="hsl(' + hueOf(host) + ',30%,42%)"/>' +
      '<text x="32" y="44" font-family="Arial,Helvetica,sans-serif" font-size="36" ' +
      'font-weight="600" fill="#ffffff" text-anchor="middle">' + ch + "</text></svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  // Chrome 96+ 的 get() 返回 Promise，旧版走 callback；两个入口都注册，谁先到用谁。
  // 返回 {list, error}：把「正常返回空」和「调用失败」分开，空态才能给出正确提示
  function callTopSites() {
    return new Promise((resolve) => {
      let settled = false;
      let failTimer = null;
      const done = (v, failed) => {
        if (settled) return;
        settled = true;
        if (failTimer !== null) clearTimeout(failTimer);
        resolve({ list: Array.isArray(v) ? v : [], error: !!failed });
      };
      const ok = (v) => done(v, false);
      const fail = () => done([], true);
      try {
        const r = chrome.topSites.get(ok);
        if (r && typeof r.then === "function") r.then(ok, fail);
      } catch (e) {
        try { chrome.topSites.get(ok); } catch (e2) { fail(); }
      }
      if (!settled) failTimer = setTimeout(fail, 2500);   // 权限异常时不永久挂起
    });
  }

  async function fetchTopSites() {
    // 扩展环境里 API 不存在，说明 manifest 新增的 topSites 权限还没刷新生效
    if (typeof chrome === "undefined" || !chrome.topSites || !chrome.topSites.get) {
      sitesDiag = HAS_CHROME ? "no-permission" : "preview";
      return [];
    }
    const r = await callTopSites();
    if (r.error) { sitesDiag = "error"; return []; }
    const list = r.list
      .filter((s) => s && /^https?:\/\//i.test(s.url) && hostOf(s.url))
      .map((s) => ({ url: s.url, title: s.title || hostOf(s.url) }));
    sitesDiag = list.length ? "ok" : "empty";
    return list;
  }

  async function readSiteCache() {
    if (HAS_CHROME) {
      try { return (await chrome.storage.local.get(NS + "sites"))[NS + "sites"] || null; }
      catch (e) { return null; }
    }
    try { return JSON.parse(localStorage.getItem(SITES_KEY) || "null"); } catch (e) { return null; }
  }

  async function writeSiteCache(list) {
    const data = { date: today(), list: list };
    if (HAS_CHROME) {
      try { await chrome.storage.local.set({ [NS + "sites"]: data }); return; } catch (e) { /* 落到 localStorage */ }
    }
    try { localStorage.setItem(SITES_KEY, JSON.stringify(data)); } catch (e) {}
  }

  async function clearSiteCache() {
    if (HAS_CHROME) {
      try { await chrome.storage.local.remove(NS + "sites"); return; } catch (e) { /* 落到 localStorage */ }
    }
    try { localStorage.removeItem(SITES_KEY); } catch (e) {}
  }

  // 按天固化不是为了省调用（topSites 本就实时），而是让顺序一整天不变，保住肌肉记忆。
  // 但空结果绝不固化：权限刚生效 / Chrome 启动瞬间都可能短暂返回 0 条，
  // 一旦把空数组存成当天快照，之后一整天都不会重拉，用户会一直看到「暂无常用站点」。
  async function refreshSites(force) {
    // #sites 调试锚点自注入数据，真实拉取（很可能为空）会把它冲掉
    if (location.hash.includes("#sites")) { renderSites(); return; }
    if (!state.showSites && !force) { renderSites(); return; }
    const cached = force ? null : await readSiteCache();
    if (cached && cached.date === today() && Array.isArray(cached.list) && cached.list.length) {
      siteList = cached.list;
      sitesDiag = "ok";
    } else {
      siteList = await fetchTopSites();
      if (siteList.length) await writeSiteCache(siteList);
      else await clearSiteCache();   // 连旧缓存一起清掉，下次打开仍会重试
    }
    renderSites();
  }

  function visibleSites() {
    const blocked = new Set(state.blockedSites || []);
    // 站点列表可能来自按天固化的缓存，重新校验 scheme，避免非 http(s) 进 a.href
    return siteList
      .filter((s) => s && /^https?:\/\//i.test(s.url) && hostOf(s.url))
      .filter((s) => !blocked.has(hostOf(s.url)))
      .slice(0, SITES_MAX);
  }

  function renderSites() {
    sitesSwitch.classList.toggle("on", state.showSites);
    sitesSwitch.setAttribute("aria-pressed", String(state.showSites));
    sitesUnblock.hidden = !(state.blockedSites && state.blockedSites.length);
    sitesZone.hidden = !state.showSites;
    if (!state.showSites) return;

    const list = visibleSites();
    sitesList.innerHTML = "";
    if (!list.length) {
      // 有源数据却一个都不显示 = 被全部屏蔽，别误报成「Chrome 没给数据」
      if (siteList.length && (state.blockedSites || []).length) sitesDiag = "blocked";
      const empty = document.createElement("span");
      empty.className = "sites-empty";
      const texts = SITE_EMPTY[sitesDiag] || SITE_EMPTY.empty;
      empty.textContent = texts[0];
      empty.title = "点击重试";
      empty.addEventListener("click", () => {
        if (sitesDiag === "blocked") { sitesUnblock.click(); return; }
        refreshSites(true).then(() =>
          showToast(siteList.length ? "已更新常用站点" : "仍未读取到常用站点，检查扩展权限"));
      });
      sitesList.appendChild(empty);
      sitesHint.textContent = texts[1];
      return;
    }
    sitesDiag = "ok";
    sitesHint.textContent = "每天更新一次 · 顶部唤出 · 悬停可屏蔽";

    list.forEach((s, i) => {
      const host = hostOf(s.url);
      const wrap = document.createElement("div");
      wrap.className = "site-wrap rank-" + (i < 2 ? 1 : i < 5 ? 2 : 3);

      // 图标优先，域名只进 dataset / title 供 hover 提示；文本一律 textContent 防注入
      const a = document.createElement("a");
      a.className = "site";
      a.href = s.url;
      a.dataset.host = host;
      a.title = (s.title && s.title !== host ? s.title + " · " : "") + host;
      a.setAttribute("aria-label", host);

      const icon = document.createElement("img");
      icon.className = "site-icon";
      icon.alt = "";
      icon.decoding = "async";

      // favicon 取不到时退回首字母，颜色由域名哈希决定，不出现空白盘
      const letter = document.createElement("span");
      letter.className = "site-letter";
      letter.textContent = /^[a-z0-9]/i.test(host) ? host.charAt(0).toUpperCase() : "•";
      letter.style.backgroundColor = "hsl(" + hueOf(host) + ", 30%, 42%)";
      letter.hidden = true;

      const src = faviconUrl(s.url) ||
        (location.hash.includes("#sites") ? mockIcon(host) : null);
      if (src) {
        icon.addEventListener("error", () => { icon.hidden = true; letter.hidden = false; });
        icon.src = src;
      } else {
        icon.hidden = true;
        letter.hidden = false;
      }
      a.appendChild(icon);
      a.appendChild(letter);

      const hide = document.createElement("button");
      hide.className = "site-hide";
      hide.type = "button";
      hide.textContent = "×";
      hide.title = "屏蔽 " + host;
      hide.setAttribute("aria-label", "屏蔽 " + host);
      hide.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        state.blockedSites = Array.from(new Set((state.blockedSites || []).concat(host)));
        save(true);
        renderSites();
        showToast("已屏蔽 " + host);
      });

      wrap.appendChild(a);
      wrap.appendChild(hide);
      sitesList.appendChild(wrap);
    });
  }

  sitesSwitch.addEventListener("click", () => {
    state.showSites = !state.showSites;
    save(true);
    renderSites();
    if (state.showSites) {
      refreshSites();
      showToast("已开启：鼠标移到页面顶部唤出");
    }
  });

  sitesRefresh.addEventListener("click", async () => {
    await refreshSites(true);
    showToast(siteList.length ? "已更新常用站点" : "仍未读取到常用站点，检查扩展权限");
  });

  sitesUnblock.addEventListener("click", () => {
    state.blockedSites = [];
    save(true);
    renderSites();
    showToast("已恢复被屏蔽的站点");
  });

  // 切换引擎后短暂保持展开，让用户看见新的选中态（焦点回到输入框时不会立刻收回）
  // ms === 0 表示常驻展开（调试锚点用，不设收回定时器）
  let pinTimer = null;
  function pinEngines(ms) {
    searchZone.classList.add("pinned");
    clearTimeout(pinTimer);
    if (ms === 0) { pinTimer = null; return; }
    pinTimer = setTimeout(() => searchZone.classList.remove("pinned"), ms || 1400);
  }

  function renderEngines() {
    enginesEl.innerHTML = "";
    ENGINES.forEach((e) => {
      const b = document.createElement("button");
      b.className = "engine" + (state.engine === e.id ? " active" : "");
      b.type = "button";
      b.title = e.name;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", e.name);
      b.setAttribute("aria-selected", String(state.engine === e.id));
      b.innerHTML = e.icon;
      b.addEventListener("click", () => {
        state.engine = e.id;
        save(true);
        renderEngines();
        input.focus();
        pinEngines();
      });
      enginesEl.appendChild(b);
    });

    // 按钮收起时，搜索框右侧的微标仍显示当前引擎
    const current = ENGINES.find((e) => e.id === state.engine) || ENGINES[0];
    engineChip.innerHTML = current.icon;
    engineChip.title = "当前搜索引擎：" + current.name;
  }

  function applyPreset(i) {
    const p = PRESETS[i];
    if (!p) return;
    state.preset = i;
    state.useImage = false; // 图片保留，只是暂不显示，随时可清除
    // 跟随系统开启时，点选色块等于在改对应槽位（暗色/亮色各记一个）
    if (state.autoTheme) {
      if (p.theme === "dark") state.darkPreset = i;
      else state.lightPreset = i;
    }
    applyTheme(p.theme);
    // 浅色背景不需要压暗，深色背景保留默认暗度；用户手动调过就不再干预
    if (!state.dimTouched) state.dim = p.theme === "dark" ? 28 : 0;
    save();
    applyBackground();
    applyLook();
    renderPresets();
    renderAutoUI();
  }

  /* ================= 跟随系统主题 ================= */
  const darkMQ = window.matchMedia("(prefers-color-scheme: dark)");

  function systemDark() { return darkMQ.matches; }

  function applyAuto() {
    const target = systemDark() ? state.darkPreset : state.lightPreset;
    if (state.image && state.useImage) {
      // 自定义图片背景保留，只跟随系统切换文字明暗
      applyTheme(presetAt(target).theme);
      if (!state.dimTouched) state.dim = state.theme === "dark" ? 32 : 20;
      applyBackground();
      applyLook();
    } else {
      applyPreset(target);
    }
    renderAutoUI();
  }

  function onSystemThemeChange() {
    if (state.autoTheme) applyAuto();
  }

  if (darkMQ.addEventListener) darkMQ.addEventListener("change", onSystemThemeChange);
  else darkMQ.addListener(onSystemThemeChange); // 兼容旧版 Safari

  function renderAutoUI() {
    autoSwitch.classList.toggle("on", state.autoTheme);
    autoDetail.hidden = !state.autoTheme;
    if (!state.autoTheme) return;
    renderMiniGrid(darkPresetsEl, "dark", state.darkPreset);
    renderMiniGrid(lightPresetsEl, "light", state.lightPreset);
  }

  function renderMiniGrid(el, theme, activeIdx) {
    el.innerHTML = "";
    PRESETS.forEach((p, i) => {
      if (p.theme !== theme) return;
      const b = document.createElement("button");
      b.className = "swatch" + (i === activeIdx ? " active" : "");
      b.style.backgroundImage = p.css;
      b.title = p.name;
      b.setAttribute("aria-label", theme + " 主题用「" + p.name + "」");
      b.addEventListener("click", () => applyPreset(i));
      el.appendChild(b);
    });
  }

  autoSwitch.addEventListener("click", () => {
    state.autoTheme = !state.autoTheme;
    save();
    if (state.autoTheme) applyAuto();
    else renderAutoUI();
  });

  function renderPresets() {
    presetsEl.innerHTML = "";
    PRESETS.forEach((p, i) => {
      const b = document.createElement("button");
      b.className = "swatch" + (!state.useImage && state.preset === i ? " active" : "");
      b.style.backgroundImage = p.css;
      b.title = p.name;
      b.setAttribute("aria-label", "背景 " + p.name);
      b.addEventListener("click", () => applyPreset(i));
      presetsEl.appendChild(b);
    });
  }

  /* ================= 时钟 ================= */
  const WEEK = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  function tick() {
    const now = new Date();
    const text = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
    if (clockEl.textContent !== text) clockEl.textContent = text;
    const d = (now.getMonth() + 1) + "月" + now.getDate() + "日 " + WEEK[now.getDay()];
    if (dateEl.textContent !== d) dateEl.textContent = d;
  }

  // 时钟只显示到分钟：每秒 setInterval 有 59/60 是无效唤醒。改成对齐到下一分钟
  // 边界的 setTimeout 链，每分钟只唤醒一次；休眠/挂起后醒来会按真实时间重新对齐。
  function scheduleTick() {
    const now = new Date();
    const delay = 60000 - now.getSeconds() * 1000 - now.getMilliseconds() + 20;
    setTimeout(() => { tick(); scheduleTick(); }, delay);
  }

  /* ================= 搜索 ================= */
  function go(raw) {
    const q = (raw || "").trim();
    if (!q) return;
    const isUrl = /^(https?:\/\/)/i.test(q) || (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(q) && /\./.test(q));
    if (isUrl) {
      location.href = /^(https?:\/\/)/i.test(q) ? q : "https://" + q;
      return;
    }
    const eng = ENGINES.find((e) => e.id === state.engine) || ENGINES[0];
    location.href = eng.url + encodeURIComponent(q);
  }

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    go(input.value);
  });

  /* ================= 设置面板 ================= */
  function togglePanel(open) {
    const next = open === undefined ? !panel.classList.contains("open") : open;
    panel.classList.toggle("open", next);
    settingsBtn.classList.toggle("open", next);
  }

  settingsBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    togglePanel();
  });

  document.addEventListener("pointerdown", (ev) => {
    if (!panel.classList.contains("open")) return;
    if (panel.contains(ev.target) || settingsBtn.contains(ev.target)) return;
    togglePanel(false);
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      if (panel.classList.contains("open")) { togglePanel(false); return; }
      if (document.activeElement === input) { input.value = ""; input.blur(); }
      return;
    }
    if (ev.key === "/" && document.activeElement !== input) {
      // 焦点在任何可编辑控件里都不能抢：否则备忘输入框连 "/" 都打不出来
      const t = document.activeElement;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      ev.preventDefault();
      input.focus();
    }
  });

  // 输入框内按 Tab：循环切换搜索引擎
  input.addEventListener("keydown", (ev) => {
    if (ev.key !== "Tab") return;
    ev.preventDefault();
    const i = ENGINES.findIndex((e) => e.id === state.engine);
    const next = ENGINES[(i + (ev.shiftKey ? -1 : 1) + ENGINES.length) % ENGINES.length];
    state.engine = next.id;
    save(true);
    renderEngines();
    pinEngines(1100);   // 键盘切换也让三个按钮浮出来，看得见选中态变化
  });

  /* ================= 外观设置 ================= */
  blurRange.addEventListener("input", () => {
    state.blur = Number(blurRange.value);
    blurVal.textContent = state.blur;
    document.documentElement.style.setProperty("--blur", state.blur + "px");
    save();
  });

  dimRange.addEventListener("input", () => {
    state.dim = Number(dimRange.value);
    state.dimTouched = true;
    dimVal.textContent = state.dim;
    dimLayer.style.background = dimStyle();
    save();
  });

  uiRange.addEventListener("input", () => {
    state.uiOpacity = Number(uiRange.value);
    uiVal.textContent = state.uiOpacity;
    document.documentElement.style.setProperty("--ui-o", state.uiOpacity / 100);
    save();
  });

  clockSwitch.addEventListener("click", () => {
    state.showClock = !state.showClock;
    clockBlock.classList.toggle("hidden", !state.showClock);
    clockSwitch.classList.toggle("on", state.showClock);
    save();
  });

  $("reset").addEventListener("click", () => {
    // 备忘文本、已看过的引导、分组折叠习惯都不该被「恢复默认」抹掉
    const keep = {
      memo: state.memo,
      guided: state.guided,
      groups: Object.assign({}, state.groups),
      blockedSites: Array.from(state.blockedSites || [])
    };
    state = Object.assign({}, DEFAULTS, keep);
    save();
    applyBackground();
    applyLook();
    renderEngines();
    renderPresets();
    renderAutoUI();
    renderMemo();
    renderSites();
    if (state.autoTheme) applyAuto();
    else applyTheme(presetAt(state.preset).theme);
    input.focus();
    showToast("已恢复默认设置");
  });

  /* ---- 图片读入 + 压缩（同时采样亮度，中心加权，自动决定文字明暗） ---- */
  function averageLuminance(img) {
    const s = document.createElement("canvas");
    s.width = 24;
    s.height = 24;
    const sctx = s.getContext("2d", { willReadFrequently: true });
    sctx.drawImage(img, 0, 0, 24, 24);
    const d = sctx.getImageData(0, 0, 24, 24).data;
    let full = 0, center = 0, cn = 0;
    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 24; x++) {
        const i = (y * 24 + x) * 4;
        const l = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
        full += l;
        // 中央竖带（时钟/搜索框所在区域）权重更高，文字可读性由这里决定
        if (x >= 6 && x < 18 && y >= 4 && y < 20) { center += l; cn++; }
      }
    }
    full /= 576;
    center /= cn;
    return full * 0.4 + center * 0.6;
  }

  function setImageFromFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const MAX = 2560;
        const ratio = Math.min(1, MAX / Math.max(img.width, img.height));
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        state.image = c.toDataURL("image/jpeg", 0.88);
        state.useImage = true;

        // 亮图用墨色文字，暗图用米白文字；中间调图靠加强投影 + 自动纱层兜底
        const lum = averageLuminance(img);
        applyTheme(lum > 0.56 ? "light" : "dark");
        state.imageTheme = state.theme;
        if (!state.dimTouched) state.dim = state.theme === "dark" ? 34 : 22;

        save();
        applyBackground();
        applyLook();
        renderPresets();
        showToast("已设为背景");
        // 这块 canvas 最大 2560px（约 26MB 位图），不等 GC，主动清零释放
        c.width = 0;
        c.height = 0;
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  $("upload").addEventListener("click", () => fileInput.click());
  useImageBtn.addEventListener("click", useImageBackground);
  clearImageBtn.addEventListener("click", () => {
    state.image = null;
    state.useImage = false;
    state.imageTheme = null;
    save();
    applyBackground();
    renderPresets();
    showToast("已清除图片背景");
  });
  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files[0]) setImageFromFile(fileInput.files[0]);
    fileInput.value = "";
  });

  /* ---- 拖拽图片换背景 ---- */
  let dragDepth = 0;
  window.addEventListener("dragenter", (ev) => {
    ev.preventDefault();
    dragDepth++;
    if (dragDepth === 1) dropHint.classList.add("show");
  });
  window.addEventListener("dragover", (ev) => ev.preventDefault());
  window.addEventListener("dragleave", () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) dropHint.classList.remove("show");
  });
  window.addEventListener("drop", (ev) => {
    ev.preventDefault();
    dragDepth = 0;
    dropHint.classList.remove("show");
    const f = ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files[0];
    if (f) setImageFromFile(f);
  });

  /* ================= 启动 ================= */
  tick();
  scheduleTick();

  (async function boot() {
    await load();
    if (state.autoTheme) applyAuto();
    else applyTheme(state.image && state.useImage ? state.theme : presetAt(state.preset).theme);
    applyBackground();
    applyLook();
    renderEngines();
    renderPresets();
    renderAutoUI();
    renderMemo();
    renderGroups();
    renderSites();
    // 拉站点数据是异步的，不阻塞启动与首次引导
    refreshSites();

    window.addEventListener("load", () => input.focus());
    setTimeout(() => input.focus(), 60);

    // 首次运行一次性引导：默认收起的引擎按钮容易被忽略，开屏展开约 2.2 秒再收回。
    // 带任何调试锚点时跳过，避免引导的定时收回覆盖 #peek 的常驻展开。
    if (!state.guided && !location.hash) {
      state.guided = true;
      save(true);
      setTimeout(() => pinEngines(2200), 700);
    }

    // #panel 锚点：带参数打开时直接展开设置面板
    if (location.hash === "#panel") setTimeout(() => togglePanel(true), 120);

    // #peek 调试锚点：强制保持引擎展开态（模拟 hover，不落盘），用于截图核对
    if (location.hash.includes("#peek")) pinEngines(0);

    // #preset:N 调试锚点：直接切到第 N 个背景预设
    const pm = location.hash.match(/^#preset:(\d+)$/);
    if (pm) applyPreset(Number(pm[1]));

    // #auto 调试锚点：临时开启"跟随系统"并展开面板（不落盘），便于核对 UI
    if (location.hash.includes("#auto")) {
      state.autoTheme = true;
      renderAutoUI();
      setTimeout(() => togglePanel(true), 120);
    }

    // #memo 调试锚点：临时开启备忘并填示例文字（不落盘），便于截图核对
    if (location.hash.includes("#memo")) {
      state.showMemo = true;
      if (!state.memo) state.memo = "把 spec 写完，再跑一遍回归";
      if (location.hash.includes("light")) applyPreset(4);
      renderMemo();
    }

    // #toast 调试锚点：显示一条示例反馈，便于截图核对
    if (location.hash.includes("#toast")) setTimeout(() => showToast("已清除图片背景"), 250);

    // 斑驳高对比度测试图：模拟真实照片，纯渐变测不出图标/胶囊的可读性
    function makeTestImage(light) {
      const c = document.createElement("canvas");
      c.width = 480;
      c.height = 300;
      const g = c.getContext("2d");
      const grad = g.createLinearGradient(0, 0, 480, 300);
      grad.addColorStop(0, light ? "#efe7d6" : "#6b7c90");
      grad.addColorStop(1, light ? "#cddbe4" : "#28303d");
      g.fillStyle = grad;
      g.fillRect(0, 0, 480, 300);
      const blobs = [
        [90, 60, 130, "rgba(222,88,51,.8)"],
        [390, 80, 150, "rgba(99,187,208,.75)"],
        [240, 220, 160, light ? "rgba(255,255,255,.95)" : "rgba(10,10,14,.85)"],
        [440, 260, 120, "rgba(188,132,168,.75)"],
        [30, 260, 100, light ? "rgba(30,26,20,.6)" : "rgba(245,242,234,.8)"]
      ];
      blobs.forEach(([x, y, r, col]) => {
        const rg = g.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, col);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = rg;
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2);
        g.fill();
      });
      return c.toDataURL("image/jpeg", 0.9);
    }

    // #sites 调试锚点：注入 10 个模拟站点（显示前 8），并强制保持浮出态，不落盘
    // 可选参数：:light 切宣纸、:img 叠加斑驳图片背景、:plain 不强制浮出（验证真 hover）
    const sm = location.hash.match(/^#sites((?::(?:light|img|plain))*)$/);
    if (sm) {
      const o = sm[1];
      state.showSites = true;
      siteList = [
        "https://github.com/", "https://www.google.com/", "https://www.bilibili.com/",
        "https://stackoverflow.com/", "https://www.notion.so/", "https://developer.chrome.com/",
        "https://www.zhihu.com/", "https://mail.google.com/",
        "https://www.figma.com/", "https://news.ycombinator.com/"
      ].map((url) => ({ url: url, title: hostOf(url) }));
      if (o.includes("light")) applyPreset(4);
      if (o.includes("img")) {
        state.image = makeTestImage(o.includes("light"));
        state.imageTheme = o.includes("light") ? "light" : "dark";
        state.useImage = true;
        applyTheme(state.imageTheme);
        if (!state.dimTouched) state.dim = state.imageTheme === "dark" ? 34 : 22;
        applyBackground();
        applyLook();
        renderPresets();
      }
      renderSites();
      if (!o.includes("plain")) sitesZone.classList.add("peek");
    }

    // #img 调试锚点：模拟已上传图片（不落盘），用斑驳高对比度图压测图标可读性
    // 可选参数：#img:light 亮图、#img:nopanel 不展开面板、#img:off 模拟已切到色块、
    //           #img:peek 保持引擎展开态。组合如 #img:light:nopanel:off:peek
    const im = location.hash.match(/^#img((?::(?:light|nopanel|off|peek))*)$/);
    if (im) {
      const opts = im[1];
      const light = opts.includes("light");
      const off = opts.includes("off");
      state.image = makeTestImage(light);
      state.imageTheme = light ? "light" : "dark";
      state.useImage = !off;
      applyTheme(off ? presetAt(state.preset).theme : state.imageTheme);
      if (!state.dimTouched) state.dim = off ? 28 : (light ? 22 : 34);
      applyBackground();
      applyLook();
      renderPresets();
      if (opts.includes("peek")) pinEngines(0);
      if (!opts.includes("nopanel")) setTimeout(() => togglePanel(true), 120);
    }
  })();
})();
