---
title: valaxy博客全局美化教程（九）
excerpt: 新增相册页面，支持使用webdav作为相册
date: 2026-06-05
updated: 2026-06-05
categories: 美化
tags:
  - 美化
  - 博客
  - 教程
cover: https://r2tc.20030327.xyz/file/博客/文章/1780936835609_1780936759223.png
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
- ***[*valaxy博客全局美化教程（九）*](valaxy-9)：新增相册页面，支持使用webdav作为相册***
- [valaxy博客全局美化教程（十）](valaxy-10)：修复构建结束的时候会卡住

### 效果展示
![](https://r2tc.20030327.xyz/file/博客/文章/1780936835609_1780936759223.png)
![](https://r2tc.20030327.xyz/file/博客/文章/1780936837068_1780936789803.png)
支持图床相册或者webdav网盘相册，均支持加密，支持时间轴显示（图床需要自己设置时间，webdav没测试时间轴），图片预览界面和之前的预览界面一样的，安装本美化之前请先安装`valaxy博客全局美化教程（四）`，否则可能会出奇奇怪怪的问题

### 开始美化
由于相册功能改动十分大，有涉及到三四十个新建文件，如果让你们一个个添加的话，那也太累了，所以我将所有新建文件全部打包，按照项目根目录路径打包，解压之后可以直接覆盖导入，不放心的话可以一个个导入，**注意，修改相册之前记得备份一份博客文件，由于本次美化设计文件过多，一个个回退不太现实，万一出问题造成后果自己负责哦**，

#### 环境变量
说明一下，由于要使用webdav相册，需要在部署到托管时增加环境变量，以下是环境变量名称
```
WEBDAV_PASSWORD
```
值是你的webdav访问密码，记得类型选择秘钥类型哦~

#### 修改文件
以下全部是修改文件的操作
##### 文件`valaxy.config.ts`增加
```
import { albumWebdavConfigPlugin } from './plugins/album-webdav-config'
import { albumWebdavProxy } from './plugins/album-webdav-proxy'
```
```
      {
        text: '相册',
        link: '/gallery',
      },
```
```
export default defineValaxyConfig({

  vite: {
    plugins: [vaFoucLoader({
      avatar: siteConfig.author?.avatar,
      title: siteConfig.title,
      subtitle: siteConfig.subtitle,
      primary: '#E9CCCC',
    }), albumWebdavConfigPlugin(), albumWebdavProxy()],
  },
 })
```
一共增加三段代码，第一段头部引入，第二段增加页面入口，第三段启用相册效果，请对应位置哦，第三段是完整代码哦~

##### 文件`.gitignore`增加
```
!.env.example
```

##### 文件`netlify.toml`增加
```
[[redirects]]
from = "/api/album-webdav/*"
to = "/.netlify/functions/album-webdav/:splat"
status = 200
```

##### 修改`vercel.json`
```
{
  "cleanUrls": true,
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "functions": {
    "api/**/*.ts": {
      "includeFiles": "server/**,types/**,utils/**"
    }
  }
}
```

#### 导入文件
修改部分上面结束了，现在进行新建文件部分，这里给出文件下载地址
[点我跳转下载链接](https://aiovtue.lanzoum.com/io6Zz3rg6iof)

解压后文件夹里面长这样
![](https://r2tc.20030327.xyz/file/博客/文章/1780937517134_1780937485602.png)
里面有一个`readme.md`文件，里面写了怎么使用，可以看看，也可以看我这里写的，解压之后将文件覆盖进你的项目就行了，这里的文件包含了页面文件，这里和你们讲一下`index.md`代码使用方法
`pages\gallery`文件夹就是相册页面文件夹，这个文件夹内的`index.md`写的是相册
```
---
layout: gallery
title: 相册
icon: i-ri-gallery-line
cover: https://你的图床.png
comment: false
albums:
  - bizhi
  - web-jiami
  - jiamio
  - web-kaif
---
```
例如这样，下面的albums下方的四个就是相册，和这个目录下的文件夹名称要一样，每一个文件夹对应一个相册
这里以bizhi举例，`pages\gallery\bizhi`文件夹就是bizhi相册，在这个文件夹内有一个`index.md`文件，这是该相册的索引文件，在里面设置照片这些
```
---
layout: gallery-album
title: 一些壁纸
date: 2025-08-18
cover: https://你的图床.png
desc: 觉得好看的一些壁纸，喜欢的可以下载哦~
location: 重庆
tags:
  - 壁纸
comment: false
encrypted: false
source: local
photos:
  - url: https://你的图床.png
    date: 2026-6-1
  - url: https://你的图床.png
    date: 2026-6-1
---

```

注意，所有部分都需要写，少一个都会报错（虽然日期那一行没啥用，但是我懒得改了），`encrypted`是设置是否启用密码的选项，如果选择启用的话还要增加一个:
```
password: "你的密码"
```
即使不设密码也需要`encrypted: false`字段哦
好啦，到这里就结束啦~


