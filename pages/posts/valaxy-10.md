---
title: valaxy博客全局美化教程（十）
excerpt: 修复构建结束的时候会卡住
date: 2026-06-06
updated: 2026-06-06
categories: 美化
tags:
  - 美化
  - 教程
  - 博客
cover: https://r2tc.20030327.xyz/file/博客/主题/1780908654959_edfgredxcv.png
---
### 本系列教程共十篇
- [valaxy博客全局美化教程（一）](valaxy-1)：分类、标签、归档三个页面的美化教程
- [valaxy博客全局美化教程（二）](valaxy-2)：首页公告栏美化，新增随机文章展示板块
- [valaxy博客全局美化教程（三）](valaxy-3)：给网页增加加载动画
- [valaxy博客全局美化教程（四）](valaxy-4)：增加图片预览功能
- [valaxy博客全局美化教程（五）](valaxy-5)：友链页面美化，修改了友链样式以及增加留言板
- [valaxy博客全局美化教程（六）](valaxy-6)：留言页面增加信封展开效果
- [valaxy博客全局美化教程（七）](valaxy-7)：新增网址导航页面
- [valaxy博客全局美化教程（八）](valaxy-8)：页脚倒计时、搜索问题修复
- [valaxy博客全局美化教程（九）](valaxy-9)：新增相册页面，支持使用webdav作为相册
- ***[*valaxy博客全局美化教程（十）*](valaxy-10)：修复构建结束的时候会卡住***

### 覆盖文件
覆盖文件的意思就是，这个文件已存在，删除原本全部内容，替换为下方内容，不过删之前建议备份哦
##### 覆盖`scripts\build-ssg.mjs`
```
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const BUILD_DONE_MARKERS = [
  '[HOOK] build:after done',
  'RSS Feed Files',
]
const GRACE_MS = 800
const HEARTBEAT_MS = 45_000
const MAX_MS = 20 * 60 * 1000

const require = createRequire(import.meta.url)
const valaxyBin = require.resolve('valaxy/bin/valaxy.mjs')
const distIndex = resolve(process.cwd(), 'dist/index.html')

const child = spawn(process.execPath, [valaxyBin, 'build', '--ssg'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: process.env,
  windowsHide: true,
})

let finished = false
let successTimer
let outputBuffer = ''

function killChildTree() {
  if (!child.pid)
    return

  if (process.platform === 'win32') {
    spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], {
      stdio: 'ignore',
      windowsHide: true,
    })
    return
  }

  try {
    child.kill('SIGKILL')
  }
  catch {}
}

function finishSuccess() {
  if (finished)
    return
  finished = true
  clearTimeout(maxTimer)
  clearTimeout(successTimer)
  clearInterval(heartbeatTimer)

  if (!existsSync(distIndex)) {
    console.error('\n构建流程已结束，但未找到 dist/index.html，请检查构建日志。\n')
    killChildTree()
    process.exit(1)
    return
  }

  console.log('\n✓ 构建已完成，正在结束进程…\n')
  killChildTree()
  setTimeout(() => process.exit(0), 200)
}

function finishError(code) {
  if (finished)
    return
  finished = true
  clearTimeout(maxTimer)
  clearTimeout(successTimer)
  clearInterval(heartbeatTimer)
  process.exit(code ?? 1)
}

function scheduleSuccess() {
  clearTimeout(successTimer)
  successTimer = setTimeout(finishSuccess, GRACE_MS)
}

function inspectOutput(text) {
  outputBuffer += text
  if (outputBuffer.length > 8192)
    outputBuffer = outputBuffer.slice(-8192)

  if (BUILD_DONE_MARKERS.some(marker => outputBuffer.includes(marker)))
    scheduleSuccess()
}

const heartbeatTimer = setInterval(() => {
  if (finished)
    return
  console.log('\n⏳ 仍在构建中（SSG 预渲染可能较慢，请稍候）…\n')
}, HEARTBEAT_MS)

const maxTimer = setTimeout(() => {
  if (finished)
    return
  console.error('\nSSG 构建超时（20 分钟）。\n')
  killChildTree()
  finishError(1)
}, MAX_MS)

child.stdout.on('data', (chunk) => {
  const text = chunk.toString()
  process.stdout.write(text)
  inspectOutput(text)
})

child.stderr.on('data', (chunk) => {
  const text = chunk.toString()
  process.stderr.write(text)
  inspectOutput(text)
})

child.on('error', (error) => {
  console.error(error)
  finishError(1)
})

child.on('close', (code) => {
  if (finished)
    return
  if (code === 0 || existsSync(distIndex))
    finishSuccess()
  else
    finishError(code)
})

```

### 修改文件
##### 修改`package.json`
替换原本`"build:ssg": "valaxy build --ssg",`为
```
    "build:ssg": "node scripts/build-ssg.mjs",
    "build:ssg:raw": "valaxy build --ssg",
```

替换原本`"build": "npm run build:ssg",`为
```
   "build": "node scripts/build-ssg.mjs",
```

好啦到此修复完成啦，综上全部的美化教程就到此结束啦，感谢观看哦~