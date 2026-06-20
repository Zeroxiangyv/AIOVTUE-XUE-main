---
title: valaxy博客全局美化教程（三）
excerpt: 给网页增加加载动画
date: 2026-05-30
updated: 2026-05-30
categories: 美化
tags:
  - 教程
  - 美化
  - 博客
cover: https://r2tc.20030327.xyz/file/博客/主题/1780909061608_wallhaven-wyzxvr.jpg
---
### 本系列教程共十篇
- [valaxy博客全局美化教程（一）](valaxy-1)：分类、标签、归档三个页面的美化教程
- [valaxy博客全局美化教程（二）](valaxy-2)：首页公告栏美化，新增随机文章展示板块
- ***[*valaxy博客全局美化教程（三）*](valaxy-3)：给网页增加加载动画***
- [valaxy博客全局美化教程（四）](valaxy-4)：增加图片预览功能
- [valaxy博客全局美化教程（五）](valaxy-5)：友链页面美化，修改了友链样式以及增加留言板
- [valaxy博客全局美化教程（六）](valaxy-6)：留言页面增加信封展开效果
- [valaxy博客全局美化教程（七）](valaxy-7)：新增网址导航页面
- [valaxy博客全局美化教程（八）](valaxy-8)：页脚倒计时、搜索问题修复
- [valaxy博客全局美化教程（九）](valaxy-9)：新增相册页面，支持使用webdav作为相册
- [valaxy博客全局美化教程（十）](valaxy-10)：修复构建结束的时候会卡住

### 效果预览
老规矩，先看效果
<video width="600" height="400" controls>
    <source src="https://r2tc.20030327.xyz/file/博客/文章/1780930394021_6月8日_compressed.mp4" type="video/mp4">
</video>

### 前置步骤
本效果基于valaxy内置的`foucGuard`服务，需要先开启，全名叫FOUC（Flash of Unstyled Content）防护配置。效果是，通过在 `<head>` 中内联 `body { opacity: 0 !important }` 隐藏页面，并通过 JS 监测所有样式表加载完成后，移除该隐藏样式标签以显示页面，防止首屏样式闪烁和样式分批渲染的问题。
简单来说就是在你的页面加载完成之前一直白屏，以防加载出乱码来，但是白屏不太美观，所以我加入了加载动画
先开启服务：
这是控制该组件的代码
- `enabled`（默认 `true`）：是否启用 FOUC 防护
- `maxDuration`（默认 `5000`）：最大等待时间（毫秒），作为 CSS 加载失败时的安全兜底。设为 `0` 可禁用超时兜底

启用方式如下：
修改`valaxy.config.ts`文件，在其中`export default defineValaxyConfig({})`部分增加以下代码：
```
  build: {
    ssgForPagination: false,
    foucGuard: {
      enabled: true,
      maxDuration: 5000,
    },
  },
```
最终的效果是这样的，别加错了：
```
import { defineValaxyConfig } from 'valaxy'

export default defineValaxyConfig({
   //...
   
  build: {
    ssgForPagination: false,
    foucGuard: {
      enabled: true,
      maxDuration: 5000,
    },
  },
  
   //...
})
```

好啦，到这里服务就已经开起来，现在重启服务，刷新页面就能看到白屏了

### 开始美化
#### 修改文件
以下部分是修改文件，不是新增哦~
文件`valaxy.config.ts`增加以下代码，下面是最终效果，注意这增加了两部分哦
```
import { vaFoucLoader } from './plugins/va-fouc-loader'
import siteConfig from './site.config'
```
上面是第一部分，下面是第二部分，都要添加哦，而且给出的是完整代码，注意不要重复哦
```
export default defineValaxyConfig({
   
     //....

  vite: {
    plugins: [vaFoucLoader({
      avatar: siteConfig.author?.avatar,
      title: siteConfig.title,
      subtitle: siteConfig.subtitle,
      primary: '#E9CCCC',
    })],

  },
  
   //.....
  
  })
```

#### 新增文件
下面是新增文件部分，一共新增`1`个文件~

新增文件`plugins\va-fouc-loader.ts`
```
import type { Plugin } from 'vite'

export interface VaFoucLoaderOptions {
  avatar?: string
  title?: string
  subtitle?: string
  primary?: string
}

function buildSiteName(options: VaFoucLoaderOptions) {
  const title = options.title?.trim()
  const subtitle = options.subtitle?.trim()

  if (title && subtitle)
    return `${title}-${subtitle}`

  return title || subtitle || ''
}

const FOUC_STYLE = '<style id="valaxy-fouc">body{opacity:0!important}</style>'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildLoaderStyle(primary = '#E9CCCC') {
  const safePrimary = escapeHtml(primary)

  return `<style id="va-fouc-loader-style">
#va-fouc-loader {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background: #fff;
  transition: opacity 0.28s ease, visibility 0.28s ease;
}

html.dark #va-fouc-loader {
  background: #000;
}

#va-fouc-loader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

#va-fouc-loader__spinner {
  position: relative;
  width: 108px;
  height: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#va-fouc-loader__ring {
  position: absolute;
  inset: 0;
  border: 4px solid color-mix(in srgb, ${safePrimary} 22%, transparent);
  border-top-color: ${safePrimary};
  border-radius: 50%;
  animation: va-fouc-spin 0.75s linear infinite;
}

#va-fouc-loader__avatar {
  position: relative;
  z-index: 1;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  object-fit: cover;
  background: color-mix(in srgb, ${safePrimary} 12%, transparent);
}

#va-fouc-loader__dots {
  display: flex;
  gap: 6px;
  align-items: center;
  height: 8px;
}

#va-fouc-loader__dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${safePrimary};
  opacity: 0.35;
  animation: va-fouc-bounce 1.1s ease-in-out infinite;
}

#va-fouc-loader__dots span:nth-child(2) {
  animation-delay: 0.15s;
}

#va-fouc-loader__dots span:nth-child(3) {
  animation-delay: 0.3s;
}

#va-fouc-loader__text {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 14px;
  letter-spacing: 0.08em;
  color: color-mix(in srgb, ${safePrimary} 88%, #666);
  user-select: none;
}

@keyframes va-fouc-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes va-fouc-bounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.35;
  }

  40% {
    transform: translateY(-5px);
    opacity: 1;
  }
}
</style>`
}

function buildLoaderMarkup(options: VaFoucLoaderOptions) {
  const avatar = options.avatar
    ? `<img id="va-fouc-loader__avatar" src="${escapeHtml(options.avatar)}" alt="">`
    : ''

  const text = escapeHtml(buildSiteName(options))

  return `<div id="va-fouc-loader" aria-hidden="true">
<div id="va-fouc-loader__spinner">
<div id="va-fouc-loader__ring"></div>
${avatar}
</div>
<div id="va-fouc-loader__dots"><span></span><span></span><span></span></div>
<div id="va-fouc-loader__text">${text}</div>
</div>`
}

const LOADER_SCRIPT = `<script>
;(function () {
  var HIDE_CLS = 'is-hidden'
  var LOADER_ID = 'va-fouc-loader'
  var hidden = false

  function hideLoader() {
    if (hidden) return

    hidden = true

    var loader = document.getElementById(LOADER_ID)

    if (!loader) return

    loader.classList.add(HIDE_CLS)

    setTimeout(function () {
      loader.remove()

      var style = document.getElementById('va-fouc-loader-style')

      if (style)
        style.remove()
    }, 300)
  }

  function appReady() {
    var app = document.getElementById('app')
    return !!(app && app.childElementCount > 0)
  }

  function tryHide() {
    if (document.readyState === 'complete' && appReady())
      hideLoader()
  }

  window.addEventListener('load', function () {
    tryHide()

    if (!hidden) {
      var tries = 0

      var timer = setInterval(function () {
        tries++
        tryHide()

        if (hidden || tries >= 120)
          clearInterval(timer)
      }, 50)
    }
  })

  setTimeout(hideLoader, 8000)
})()
<\/script>`

export function vaFoucLoader(options: VaFoucLoaderOptions = {}): Plugin {
  const loaderStyle = buildLoaderStyle(options.primary)
  const loaderMarkup = buildLoaderMarkup(options)
  const loaderHead = `${loaderStyle}${LOADER_SCRIPT}`

  return {
    name: 'va-fouc-loader',

    transformIndexHtml: {
      order: 'post',

      handler(html) {
        if (html.includes('id="va-fouc-loader"'))
          return html

        let next = html

        if (next.includes(FOUC_STYLE))
          next = next.replace(FOUC_STYLE, `${FOUC_STYLE}${loaderHead}`)
        else
          next = next.replace('<head>', `<head>${loaderHead}`)

        return next.replace('<body>', `<body>${loaderMarkup}`)
      },
    },
  }
}
```

好啦，本次教程又结束啦
