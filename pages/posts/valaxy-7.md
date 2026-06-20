---
title: valaxy博客全局美化教程（七）
excerpt: 新增网址导航页面
date: 2026-06-03
updated: 2026-06-03
categories: 美化
tags:
  - 美化
  - 博客
  - 教程
cover: https://r2tc.20030327.xyz/file/博客/文章/1780934727393_1780934695511.png
---
### 本系列教程共十篇
- [valaxy博客全局美化教程（一）](valaxy-1)：分类、标签、归档三个页面的美化教程
- [valaxy博客全局美化教程（二）](valaxy-2)：首页公告栏美化，新增随机文章展示板块
- [valaxy博客全局美化教程（三）](valaxy-3)：给网页增加加载动画
- [valaxy博客全局美化教程（四）](valaxy-4)：增加图片预览功能
- [valaxy博客全局美化教程（五）](valaxy-5)：友链页面美化，修改了友链样式以及增加留言板
- [valaxy博客全局美化教程（六）](valaxy-6)：留言页面增加信封展开效果
- ***[*valaxy博客全局美化教程（七）*](valaxy-7)：新增网址导航页面***
- [valaxy博客全局美化教程（八）](valaxy-8)：页脚倒计时、搜索问题修复
- [valaxy博客全局美化教程（九）](valaxy-9)：新增相册页面，支持使用webdav作为相册
- [valaxy博客全局美化教程（十）](valaxy-10)：修复构建结束的时候会卡住

### 效果演示
这个页面效果有点多，其中有一个随机网站抽卡界面，大家最好还是亲自体验一下比较好
[前往体验](/navigation)
![](https://r2tc.20030327.xyz/file/博客/文章/1780934727393_1780934695511.png)
站长的小巧思，点击到处转转按钮有惊喜哦~

### 文件修改
以下是文件修改部分，共`1`个修改文件
注意这里给的完整代码哦
文件`valaxy.config.ts`增加
```
  themeConfig: {
  //...
  
     // 导航页「随机网站跳转」抽卡视频：weight 越大越容易抽到
    navigation: {
      randomDrawVideos: [
        {
          url: 'https://img.naixiai.cn/2026/06/09/_compressed.mp4',
          weight: 1,
        },
        {
          url: 'https://img.naixiai.cn/2026/06/09/_compresseddbc6ff3507fddbf4.mp4',
          weight: 2,
        },
        {
          url: 'https://img.naixiai.cn/2026/06/09/_compressedf1fc8ccd127613ac.fr.jpeg',
          weight: 3,
        },
      ],
    },
    
  //...
  }
```
上面这个解释一下，三个`url`链接是点击随机跳转按钮后的抽卡视频，最好自己准备哦，下面的是概率，挺好玩的
上下两部分都需要添加，下面这部分就是给你的网页增加导航页面按钮，具体放置位置可以看看官方文档的顶栏按钮怎么写的，[点我去看看](https://sakura.valaxy.site/guide/theme-config/nav)
```
      {
        text: '导航',
        link: '/navigation',
      },
```

### 新建文件
以下部分是新建文件哦，共`7`个文件，别漏了哦
这是第一个文件，也是导航页面的索引文件，导航页面所有导航都写在里面，这里写了几个示例，可以自己按格式新增
##### 新增`pages\navigation\index.md`
```
---
layout: navigation
title: 导航
icon: i-ri-compass-3-line
comment: false
cover: https://你的图床.png
# 抽卡视频与概率见 valaxy.config.ts → themeConfig.navigation.randomDrawVideos
navGroups:
  - name: 软件资源
    desc: 绿色软件、应用下载与资源分享
    sites:
      - name: 果核剥壳
        url: https://www.ghxi.com
        desc: 精品软件分享与绿色资源下载站
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=ghxi
        color: "#e67e22"

      - name: ZAPRO 杂铺
        url: https://tmioe.com
        desc: 软件资源整理与工具分享博客
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=tmioe
        color: "#3498db"

      - name: 易破解
        url: https://www.ypojie.com
        desc: 软件破解教程与资源下载社区
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=ypojie
        color: "#9b59b6"

      - name: MEFCL
        url: https://www.mefcl.com
        desc: 软件绿标资源与下载分享站
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=mefcl
        color: "#1abc9c"

      - name: 绿库吧
        url: https://www.lkuba.com
        desc: 绿色软件与驱动程序下载
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=lkuba
        color: "#27ae60"

      - name: 优盟盒子
        url: https://www.umsbox.com
        desc: 软件资源聚合与下载导航
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=umsbox
        color: "#2980b9"

      - name: 狗破解
        url: https://www.gopojie.com
        desc: 破解软件与实用工具分享
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=gopojie
        color: "#8e44ad"

      - name: 小众软件
        url: https://www.appinn.com
        desc: 发现有趣、实用的小众软件
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=appinn
        color: "#16a085"

      - name: 吾爱破解
        url: https://www.52pojie.cn
        desc: 国内知名的软件安全与破解交流论坛
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=52pojie
        color: "#c0392b"

      - name: 异星软件
        url: https://www.yxssp.com
        desc: 软件下载与绿色资源分享站
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=yxssp
        color: "#2ecc71"

      - name: 翻应用
        url: https://www.iapps.me
        desc: 应用推荐、评测与下载资源
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=iapps
        color: "#e74c3c"

      - name: 软仓
        url: https://www.ruancang.net
        desc: 在线软件库与一键下载服务
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=ruancang
        color: "#34495e"

      - name: 异次元软件站
        url: https://www.iplaysoft.com
        desc: 软件推荐、评测与使用技巧
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=iplaysoft
        color: "#f39c12"

      - name: 天机阁
        url: https://www.tianjige.xyz
        desc: 软件资源分享与下载汇总
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=tianjige
        color: "#7f8c8d"

      - name: 绿软部落
        url: https://www.ludown.com
        desc: 绿色软件下载与资源整理
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=ludown
        color: "#2ecc71"

      - name: 天机阁资源
        url: https://tianjg.com
        desc: 软件下载与资源合集站点
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=tianjg
        color: "#95a5a6"

      - name: Mac 毒
        url: https://www.macdo.cn
        desc: macOS 软件分享与下载推荐
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=macdo
        color: "#636e72"

      - name: 海阔天空
        url: https://haikuoshijie.cn
        desc: 软件教程、资源汇总与使用指南
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=haikuoshijie
        color: "#00b894"

      - name: 小黑资源库
        url: https://xhzyku.com
        desc: 软件与各类资源合集分享
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=xhzyku
        color: "#2d3436"

      - name: 乐享网
        url: https://www.lxapk.com
        desc: 软件与 APK 资源下载分享
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=lxapk
        color: "#fdcb6e"

  - name: 网络工具
    desc: 测速、调试与网络诊断
    sites:
      - name: ADB 在线执行
        url: https://adb.http.gs
        desc: 在浏览器中执行 ADB 命令调试安卓设备
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=adb
        color: "#0984e3"

      - name: 大市伐谋测速
        url: https://zhale.me
        desc: 多线路网站访问速度与延迟检测
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=zhale
        color: "#6c5ce7"

      - name: UA 检测
        url: https://ua.233996.xyz
        desc: 查看当前 HTTP 请求的 User-Agent
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=ua233996
        color: "#a29bfe"

      - name: IPv6 测试（CH）
        url: https://ipv6-test.ch
        desc: 检测网络 IPv6 连通性与配置状态
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=ipv6ch
        color: "#00cec9"

      - name: IPv6 测试
        url: https://test-ipv6.com
        desc: 全面的 IPv6 连接与双栈测试
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=testipv6
        color: "#00b894"

      - name: ITDog
        url: https://www.itdog.cn
        desc: 在线 Ping、测速与网络诊断工具集
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=itdog
        color: "#e17055"

      - name: ZoomEye
        url: https://www.zoomeye.org
        desc: 网络空间资产搜索与探测引擎
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=zoomeye
        color: "#d63031"

      - name: 路由管理入口
        url: https://tplogin.cn
        desc: 常见家用路由器本地管理登录页
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=tplogin
        color: "#636e72"

  - name: 在线工具
    desc: 格式转换、查询与趣味实用服务
    sites:
      - name: FUUN.FUN
        url: https://fuun.fun
        desc: 奇趣网站收藏与发现导航
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=fuun
        color: "#fd79a8"

      - name: AllToAll
        url: https://www.alltoall.net
        desc: 文档与文件格式在线转换
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=alltoall
        color: "#74b9ff"

      - name: 美国地址生成
        url: https://www.meiguodizhi.com
        desc: 生成用于测试的美国虚拟地址
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=meiguodizhi
        color: "#55efc4"

      - name: Shields.io
        url: https://shields.io
        desc: 为开源项目生成状态徽章与标签
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=shields
        color: "#2d3436"

      - name: OnlineConvert
        url: https://www.online-convert.com
        desc: 支持多种格式的文件在线转换
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=onlineconvert
        color: "#e84393"

      - name: SimilarSites
        url: https://www.similarsites.com
        desc: 发现与当前网站相似的服务
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=similarsites
        color: "#0984e3"

      - name: 免费网络电话
        url: https://www.freeonlinephone.org
        desc: 在线拨打虚拟号码进行测试
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=freeonlinephone
        color: "#00b894"

      - name: Versus
        url: https://versus.com
        desc: 手机、电脑等数码产品参数对比
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=versus
        color: "#6c5ce7"

      - name: PikPak 接口
        url: https://pik.bilivo.top
        desc: PikPak 云盘相关登录接口服务
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=pikbilivo
        color: "#a29bfe"

      - name: 音乐解析
        url: https://music.zhuolin.wang
        desc: 在线音乐链接解析与播放
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=zhuolin
        color: "#fdcb6e"

      - name: Brie.fi
        url: https://brie.fi
        desc: 在线视频播放与分享工具
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=briefi
        color: "#e17055"

      - name: 草料二维码
        url: https://cli.im
        desc: 将文件与内容快速生成二维码
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=cliim
        color: "#00cec9"

      - name: CodeBox
        url: https://www.codebox.club
        desc: 可爱风格的二维码生成工具
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=codebox
        color: "#ff7675"

  - name: 图床服务
    desc: 图片上传托管与外链
    sites:
      - name: 聚合图床
        url: https://www.superbed.cn
        desc: 多后端聚合的图片上传托管服务
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=superbed
        color: "#6c5ce7"

      - name: Postimages
        url: https://postimages.org
        desc: 免费图床，支持图片上传与外链
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=postimages
        color: "#0984e3"

      - name: 图床 APICUI
        url: https://picui.cn
        desc: 稳定高速的图片托管与 CDN 服务
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=picui
        color: "#00b894"

  - name: 设计绘画
    desc: 灵感采集、素材管理与绘画参考
    sites:
      - name: 花瓣网
        url: https://huaban.com
        desc: 设计灵感采集与素材分享社区
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=huaban
        color: "#e84393"

      - name: MuseDAM
        url: https://musedam.cc
        desc: 设计素材管理与团队协作平台
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=musedam
        color: "#6c5ce7"

      - name: Billfish
        url: https://www.billfish.vip
        desc: 设计素材云管理与本地整理工具
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=billfish
        color: "#0984e3"

      - name: Pixcall
        url: https://pixcall.com
        desc: 图片素材采集同步与分类管理
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=pixcall
        color: "#00cec9"

      - name: Bodies in Motion
        url: https://www.bodiesinmotion.photo
        desc: 人体动态姿势与动作参考图库
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=bodiesinmotion
        color: "#636e72"

      - name: Line of Action
        url: https://line-of-action.com
        desc: 速写练习与姿势参考计时工具
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=lineofaction
        color: "#e17055"

      - name: POSEMANIACS
        url: https://www.posemaniacs.com
        desc: 3D 人体肌肉与姿势参考模型
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=posemaniacs
        color: "#d63031"

      - name: Magma 绘画
        url: https://magma.com
        desc: 多人协作在线绘画白板
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=magma
        color: "#fd79a8"

  - name: 配色工具
    desc: 调色板生成与设计配色灵感
    sites:
      - name: 设计达人配色
        url: https://www.shejidaren.com
        desc: 设计师分享的标准配色方案参考
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=shejidaren
        color: "#e84393"

      - name: Colourcode
        url: https://www.toptal.com
        desc: 可视化调色与配色板在线生成
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=toptal
        color: "#204ecf"

      - name: Coolors
        url: https://coolors.co
        desc: 流行配色方案生成与浏览
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=coolors
        color: "#00cec9"

      - name: UI Gradients
        url: https://uigradients.com
        desc: 精选 UI 界面渐变色搭配资源
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=uigradients
        color: "#6c5ce7"

      - name: Color Hunt
        url: https://colorhunt.co
        desc: 设计师社区分享的调色板合集
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=colorhunt
        color: "#fd79a8"

      - name: Color Drop
        url: https://colordrop.io
        desc: 简洁优雅的配色灵感收集站
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=colordrop
        color: "#a29bfe"

      - name: Adobe Color
        url: https://color.adobe.com
        desc: Adobe 官方色轮与配色方案工具
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=adobecolor
        color: "#ff0000"

  - name: 文档笔记
    desc: 写作、笔记与知识管理
    sites:
      - name: ONLYOFFICE
        url: https://docspace-ztghdm.onlyoffice.com
        desc: 在线协作文档与办公套件空间
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=onlyoffice
        color: "#ff6f3d"

      - name: 秘塔写作猫
        url: https://xiezuocat.com
        desc: AI 辅助写作、润色与文本优化
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=xiezuocat
        color: "#0984e3"

      - name: Notion
        url: https://www.notion.so
        desc: 全能笔记、知识库与团队协作
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=notion
        color: "#2d3436"

      - name: flomo
        url: https://flomoapp.com
        desc: 轻量卡片式灵感笔记与备忘
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=flomo
        color: "#00b894"

      - name: Pinbox
        url: https://withpinbox.com
        desc: 网页收藏夹与稍后读管理工具
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=pinbox
        color: "#e17055"

      - name: Cubox
        url: https://cubox.pro
        desc: 智能书签阅读与知识收集助手
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=cubox
        color: "#6c5ce7"

      - name: Excalidraw
        url: https://excalidraw.com
        desc: 手绘风格白板与流程图绘制
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=excalidraw
        color: "#636e72"

      - name: 白描 OCR
        url: https://baimiaoapp.com
        desc: 在线图片文字识别与提取
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=baimiao
        color: "#00cec9"

      - name: 智能翻译
        url: https://www.fanyi1234.com
        desc: 多语言在线翻译与文本转换
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=fanyi1234
        color: "#74b9ff"

      - name: 燃烧词汇
        url: https://burningvocabulary.cn
        desc: 英语四六级真题与词汇学习
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=burningvocabulary
        color: "#fdcb6e"

  - name: 图片处理
    desc: 压缩、放大、抠图与修图
    sites:
      - name: Docsmall
        url: https://docsmall.com
        desc: 免费在线图片压缩与 PDF 处理
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=docsmall
        color: "#0984e3"

      - name: Recompressor
        url: https://recompressor.com
        desc: 智能图像压缩与体积优化
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=recompressor
        color: "#00b894"

      - name: BigJPG
        url: https://bigjpg.com
        desc: AI 驱动的图片无损放大
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=bigjpg
        color: "#6c5ce7"

      - name: Vector Magic
        url: https://vectormagic.com
        desc: 位图一键转换为矢量图
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=vectormagic
        color: "#e17055"

      - name: Clipping Magic
        url: https://clippingmagic.com
        desc: 在线智能去除图片背景
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=clippingmagic
        color: "#00cec9"

      - name: Inpaint
        url: https://theinpaint.com
        desc: 在线去除水印与画面杂物修复
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=theinpaint
        color: "#a29bfe"

      - name: 美图秀秀 Web
        url: https://meitu.com
        desc: 在线图片美化、滤镜与编辑
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=meitu
        color: "#fd79a8"

      - name: 清图
        url: https://qingtu.cn
        desc: 图片清晰化与画质增强工具
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=qingtu
        color: "#2d3436"
---

```

第二个文件
##### 新增`components\NavigationSiteList.vue`
```
<script lang="ts" setup>
import { computed } from 'vue'
import type { NavSiteGroup, NavSiteItem } from '~/types/navigation'

const props = defineProps<{
  navGroups?: NavSiteGroup[]
}>()

const previewFallback = 'https://r2tc.20030327.xyz/file/博客/主题/1780643226230_wallhaven-9d1yjk.png'

function normalizeSite(site: NavSiteItem) {
  return {
    ...site,
    desc: site.desc || '',
    color: site.color || '#0078e7',
    avatar: site.avatar || previewFallback,
  }
}

const groupList = computed(() => {
  if (!Array.isArray(props.navGroups) || !props.navGroups.length)
    return []

  return props.navGroups.map(group => ({
    name: group.name || '',
    desc: group.desc || '',
    sites: (group.sites || []).map(normalizeSite),
  }))
})

</script>

<template>
  <div class="nav-site-list">
    <section
      v-for="(group, groupIndex) in groupList"
      :key="groupIndex"
      class="nav-site-list__group"
    >
      <header
        v-if="group.name"
        class="nav-site-list__header"
      >
        <h2 class="nav-site-list__title">
          <span class="nav-site-list__pin" aria-hidden="true">📌</span>
          {{ group.name }}
        </h2>
        <p
          v-if="group.desc"
          class="nav-site-list__desc"
        >
          {{ group.desc }}
        </p>
      </header>

      <ul class="nav-site-list__grid">
        <li
          v-for="(site, siteIndex) in group.sites"
          :key="`${groupIndex}-${siteIndex}`"
          class="nav-site-list__item"
          :style="{ '--site-color': site.color }"
        >
          <a
            class="nav-site-list__card"
            :href="site.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="nav-site-list__info">
              <img
                class="nav-site-list__avatar"
                :src="site.avatar"
                :alt="site.name"
                loading="lazy"
              >
              <div class="nav-site-list__meta">
                <h3 class="nav-site-list__name">
                  {{ site.name }}
                </h3>
                <p class="nav-site-list__text">
                  {{ site.desc }}
                </p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.nav-site-list {
  &__group + &__group {
    margin-top: 36px;
  }

  &__header {
    margin-bottom: 18px;
    text-align: center;
  }

  &__title {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--sakura-color-text-deep, inherit);
  }

  &__pin {
    margin-right: 6px;
  }

  &__desc {
    margin: 8px 0 0;
    font-size: 0.92rem;
    color: var(--sakura-color-text-muted, #888);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__card {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.85);
    background: var(--sakura-card-bg, var(--sakura-post-card-bg));
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      border-color: var(--site-color, var(--sakura-color-primary));
      box-shadow: 0 10px 24px color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 18%, transparent);
    }
  }

  &__info {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 14px 16px;
  }

  &__avatar {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 35%, transparent);
  }

  &__meta {
    min-width: 0;
  }

  &__name {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--sakura-color-text-deep, inherit);
  }

  &__text {
    margin: 4px 0 0;
    font-size: 0.82rem;
    line-height: 1.45;
    color: var(--sakura-color-text-muted, #888);
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

html.dark .nav-site-list__card {
  border-color: var(--sakura-color-divider, rgb(255 255 255 / 20%));
}
</style>

```

第三
##### 新增`components\layouts\SakuraNavigationLayout.vue`
```
<script setup lang="ts">
import type { NavDrawVideo, NavSiteGroup, NavSiteItem } from '~/types/navigation'
import { parseNavDrawVideos } from '../../utils/parseNavDrawVideos'
import { useConfig, useFrontmatter } from 'valaxy'
import { computed } from 'vue'

const config = useConfig()
const frontmatter = useFrontmatter()

const coverSrc = computed(() => {
  const cover = frontmatter.value?.cover
  return typeof cover === 'string' ? cover : ''
})

const navGroups = computed(() => {
  const groups = frontmatter.value?.navGroups as NavSiteGroup[] | undefined
  return Array.isArray(groups) ? groups : []
})

const allSites = computed(() => {
  const list: NavSiteItem[] = []
  for (const group of navGroups.value) {
    if (Array.isArray(group.sites))
      list.push(...group.sites)
  }
  return list
})

const themeNavigation = computed(() => {
  return (config.value?.themeConfig as { navigation?: { randomDrawVideos?: unknown } } | undefined)?.navigation
})

const randomDrawVideos = computed<NavDrawVideo[]>(() => {
  const fromPage = parseNavDrawVideos(frontmatter.value?.randomDrawVideos)
  if (fromPage.length)
    return fromPage

  const single = frontmatter.value?.randomDrawVideo
  if (typeof single === 'string' && single.length > 0)
    return parseNavDrawVideos([single])

  return parseNavDrawVideos(themeNavigation.value?.randomDrawVideos)
})
</script>

<template>
  <article class="sakura-page sakura-navigation-page">
    <header
      class="navigation-page-header sakura-page-header"
      :class="{ 'has-cover': coverSrc }"
    >
      <img
        v-if="coverSrc"
        class="navigation-page-header__cover"
        :src="coverSrc"
        :alt="frontmatter.title || '导航页头图'"
        loading="eager"
        decoding="async"
      >

      <div class="navigation-page-header__inner sakura-safe-padding">
        <div class="sakura-header-title" flex="~">
          <SakuraTitle :fm="frontmatter" />
        </div>
      </div>
    </header>

    <div class="sakura-navigation-main">
      <div class="content sakura-page-content">
        <RouterView v-slot="{ Component }">
          <component :is="Component">
            <template #main-content>
              <NavigationRandomDraw
                :sites="allSites"
                :draw-videos="randomDrawVideos"
              />

              <NavigationSiteList :nav-groups="navGroups" />
            </template>
          </component>
        </RouterView>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
.sakura-navigation-page {
  --navigation-page-outer: max(40px, 3vw, env(safe-area-inset-left, 0px));
  --navigation-page-inner: 24px;
  --navigation-page-header-gap: 28px;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .navigation-page-header {
    margin-top: var(--sakura-navbar-height);
    width: 100%;
    position: relative;

    .sakura-header-title {
      justify-content: center;
    }

    &:not(.has-cover) {
      margin-top: var(--sakura-navbar-spacing);
    }

    &.has-cover {
      height: 320px;
      margin-bottom: var(--navigation-page-header-gap);
      overflow: hidden;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    &__cover {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: 0;
      pointer-events: none;
    }

    &__inner {
      position: relative;
      z-index: 1;
      width: 100%;
      padding-bottom: 25px;
      color: #fff;
      text-align: center;
    }
  }

  .sakura-navigation-main {
    width: 100%;
    padding-inline: var(--navigation-page-outer);
    box-sizing: border-box;
  }

  .sakura-page-content {
    width: 100%;
    max-width: none;
    box-sizing: border-box;
    padding-inline: var(--navigation-page-inner) !important;
    padding-top: var(--navigation-page-header-gap);
    padding-bottom: 32px;
    background: var(--sakura-color-background);
    border-radius: var(--sakura-radius);
  }

  @media (max-width: 768px) {
    --navigation-page-outer: 0px;
    --navigation-page-inner: 8px;
    --navigation-page-header-gap: 20px;

    .sakura-page-content {
      padding-inline: max(8px, env(safe-area-inset-left, 0px)) max(8px, env(safe-area-inset-right, 0px)) !important;
      border-radius: 0;
    }
  }
}
</style>

<style lang="scss">
.sakura-navigation-page .navigation-page-header.has-cover .sakura-title {
  color: inherit;
  text-shadow: 2px 2px 10px black;
}
</style>

```

第四
##### 新增`layouts\navigation.vue`
```
<template>
  <SakuraNavigationLayout />
</template>

```

第五
##### 新增`types\navigation.ts`
```
export interface NavDrawVideo {
  url: string
  /** 抽取权重，数值越大出现概率越高 */
  weight: number
}

  
export interface NavSiteItem {
  name: string
  url: string
  desc?: string
  avatar?: string
  color?: string
  siteshot?: string
}

  
export interface NavSiteGroup {
  name?: string
  desc?: string
  sites: NavSiteItem[]
}
```

第六
##### 新增`utils\parseNavDrawVideos.ts`
```
import type { NavDrawVideo } from '../types/navigation'
  

export function parseNavDrawVideos(input: unknown): NavDrawVideo[] {
  if (!Array.isArray(input))
    return []
  

  const result: NavDrawVideo[] = []
  

  for (const item of input) {
    if (typeof item === 'string' && item.length > 0) {
      result.push({ url: item, weight: 1 })
      continue
    }

  
    if (!item || typeof item !== 'object')
      continue

  
    const record = item as { url?: unknown, weight?: unknown }
    if (typeof record.url !== 'string' || !record.url.length)
      continue
  

    const weight = typeof record.weight === 'number' && record.weight > 0
      ? record.weight
      : 1
  

    result.push({ url: record.url, weight })
  }

  
  return result
}
```

第七
##### 新增`components\NavigationRandomDraw.vue`
```
<script lang="ts" setup>
import type { NavDrawVideo, NavSiteItem } from '~/types/navigation'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useSiteConfig } from 'valaxy'

type DrawPhase = 'idle' | 'video' | 'silhouette' | 'reveal'

const props = defineProps<{
  sites: NavSiteItem[]
  drawVideos: NavDrawVideo[]
}>()

const phase = ref<DrawPhase>('idle')
const selectedSite = ref<NavSiteItem | null>(null)
const currentVideoUrl = ref('')
const videoRef = ref<HTMLVideoElement | null>(null)
const videoStageRef = ref<HTMLDivElement | null>(null)
const videoCacheRef = ref<HTMLDivElement | null>(null)
const isBusy = computed(() => phase.value !== 'idle' && phase.value !== 'reveal')

const SILHOUETTE_DROP_MS = 880
const SILHOUETTE_REVEAL_DELAY_MS = 100

let autoRevealTimer: ReturnType<typeof setTimeout> | null = null

const previewFallback = 'https://r2tc.20030327.xyz/file/博客/主题/1780643226230_wallhaven-9d1yjk.png'
const triggerLabel = '点我到处转转吧'
const siteConfig = useSiteConfig()
const triggerAvatar = computed(() => siteConfig.value.author?.avatar || previewFallback)
const MARQUEE_ROW_COUNT = 3
const MARQUEE_DURATIONS = [52, 64, 46]

function getAvatar(site: NavSiteItem) {
  return site.avatar || previewFallback
}

interface MarqueeSite extends NavSiteItem {
  avatar: string
  color: string
}

const marqueeRows = computed(() => {
  if (!props.sites.length)
    return []

  const normalized: MarqueeSite[] = props.sites.map(site => ({
    ...site,
    avatar: getAvatar(site),
    color: site.color || '#df9193',
  }))

  const rows: MarqueeSite[][] = Array.from({ length: MARQUEE_ROW_COUNT }, () => [])
  normalized.forEach((site, index) => {
    rows[index % MARQUEE_ROW_COUNT].push(site)
  })

  return rows
    .filter(row => row.length > 0)
    .map((sites, index) => ({
      id: index,
      sites,
      duration: MARQUEE_DURATIONS[index % MARQUEE_DURATIONS.length],
    }))
})

const centerRowId = computed(() => {
  if (!marqueeRows.value.length)
    return -1
  return Math.floor(marqueeRows.value.length / 2)
})

function pickRandomSite() {
  if (!props.sites.length)
    return null
  const index = Math.floor(Math.random() * props.sites.length)
  return props.sites[index]
}

function pickRandomVideo() {
  const videos = props.drawVideos.filter(video => video.url && video.weight > 0)
  if (!videos.length)
    return ''

  const total = videos.reduce((sum, video) => sum + video.weight, 0)
  let roll = Math.random() * total

  for (const video of videos) {
    roll -= video.weight
    if (roll < 0)
      return video.url
  }

  return videos[videos.length - 1].url
}

function clearSilhouetteTimers() {
  if (autoRevealTimer) {
    clearTimeout(autoRevealTimer)
    autoRevealTimer = null
  }
}

function scheduleAutoReveal() {
  clearSilhouetteTimers()
  autoRevealTimer = setTimeout(() => {
    if (phase.value === 'silhouette')
      openReveal()
    autoRevealTimer = null
  }, SILHOUETTE_REVEAL_DELAY_MS)
}

function onSilhouetteAnimationEnd(e: AnimationEvent) {
  if (e.target !== e.currentTarget)
    return
  if (e.animationName !== 'nav-silhouette-drop' || phase.value !== 'silhouette')
    return
  scheduleAutoReveal()
}

function resetDraw() {
  clearSilhouetteTimers()
  phase.value = 'idle'
  selectedSite.value = null
  document.documentElement.classList.remove('nav-random-draw-open')
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
}

function preloadVideo() {
  const video = videoRef.value
  if (!video)
    return
  video.preload = 'auto'
  video.load()
}

async function skipVideo() {
  if (phase.value !== 'video')
    return
  videoRef.value?.pause()
  clearSilhouetteTimers()
  phase.value = 'silhouette'
}

async function startDraw() {
  if (!props.sites.length || isBusy.value)
    return

  const site = pickRandomSite()
  if (!site)
    return

  selectedSite.value = site
  currentVideoUrl.value = pickRandomVideo()
  phase.value = 'video'
  document.documentElement.classList.add('nav-random-draw-open')

  await nextTick()
  const video = videoRef.value
  if (!video || !currentVideoUrl.value)
    return

  video.load()
  video.currentTime = 0

  try {
    await video.play()
  }
  catch {
    await skipVideo()
  }
}

async function onVideoEnded() {
  await skipVideo()
}

async function onVideoError() {
  await skipVideo()
}

function openReveal() {
  if (phase.value === 'silhouette')
    phase.value = 'reveal'
}

function confirmJump() {
  if (!selectedSite.value?.url)
    return
  window.open(selectedSite.value.url, '_blank', 'noopener,noreferrer')
  resetDraw()
}

function getMarqueeSiteKey(rowId: number, setIndex: number, siteIndex: number, url: string) {
  return `${rowId}-${setIndex}-${siteIndex}-${url}`
}

function onVideoKeydown(e: KeyboardEvent) {
  if (phase.value !== 'video')
    return
  if (e.key === 'Escape') {
    skipVideo()
    return
  }
  e.preventDefault()
}

function preloadAllVideos() {
  document.querySelectorAll('link.nav-draw-video-preload').forEach(el => el.remove())
  for (const video of props.drawVideos) {
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'video'
    preloadLink.href = video.url
    preloadLink.className = 'nav-draw-video-preload'
    document.head.appendChild(preloadLink)
  }
  if (props.drawVideos.length)
    currentVideoUrl.value = props.drawVideos[0].url
  nextTick(() => {
    preloadVideo()
    videoCacheRef.value?.querySelectorAll('video').forEach((el) => {
      const video = el as HTMLVideoElement
      video.preload = 'auto'
      video.load()
    })
  })
}

onMounted(() => {
  preloadAllVideos()
  document.addEventListener('keydown', onVideoKeydown)
})

onUnmounted(() => {
  document.querySelectorAll('link.nav-draw-video-preload').forEach(el => el.remove())
  document.removeEventListener('keydown', onVideoKeydown)
  resetDraw()
})

watch(phase, (value) => {
  if (value !== 'silhouette')
    return
  clearSilhouetteTimers()
  autoRevealTimer = setTimeout(() => {
    if (phase.value === 'silhouette')
      openReveal()
    autoRevealTimer = null
  }, SILHOUETTE_DROP_MS + SILHOUETTE_REVEAL_DELAY_MS + 120)
})

watch(() => props.drawVideos, () => {
  preloadAllVideos()
}, { deep: true })
</script>

<template>
  <section class="nav-random-draw">
    <div
      v-if="marqueeRows.length"
      class="nav-random-draw__marquee"
    >
      <div
        v-for="row in marqueeRows"
        :key="row.id"
        class="nav-random-draw__marquee-row"
        :class="{ 'is-center-row': row.id === centerRowId }"
      >
        <div class="nav-random-draw__marquee-viewport">
          <div
            class="nav-random-draw__marquee-track"
            :class="{ 'is-paused': isBusy }"
            :style="{ '--marquee-duration': `${row.duration}s` }"
          >
            <div
              v-for="setIndex in 2"
              :key="setIndex"
              class="nav-random-draw__marquee-set"
            >
              <a
                v-for="(site, siteIndex) in row.sites"
                :key="getMarqueeSiteKey(row.id, setIndex, siteIndex, site.url)"
                class="nav-random-draw__marquee-card"
                :href="site.url"
                target="_blank"
                rel="noopener noreferrer"
                :title="site.name"
                :style="{ '--site-color': site.color }"
              >
                <img
                  class="nav-random-draw__marquee-avatar"
                  :src="site.avatar"
                  :alt="site.name"
                  loading="lazy"
                >
                <span class="nav-random-draw__marquee-name">{{ site.name }}</span>
              </a>
            </div>
          </div>
        </div>

        <button
          v-if="row.id === centerRowId"
          type="button"
          class="nav-random-draw__trigger"
          :disabled="!sites.length || !drawVideos.length || isBusy"
          :aria-label="triggerLabel"
          @click="startDraw"
        >
          <img
            class="nav-random-draw__marquee-avatar"
            :src="triggerAvatar"
            alt=""
            loading="lazy"
            aria-hidden="true"
          >
          <span class="nav-random-draw__marquee-name">{{ triggerLabel }}</span>
        </button>
      </div>
    </div>

    <button
      v-else
      type="button"
      class="nav-random-draw__trigger nav-random-draw__trigger--standalone"
      :disabled="!sites.length || !drawVideos.length || isBusy"
      :aria-label="triggerLabel"
      @click="startDraw"
    >
      <img
        class="nav-random-draw__marquee-avatar"
        :src="triggerAvatar"
        alt=""
        loading="lazy"
        aria-hidden="true"
      >
      <span class="nav-random-draw__marquee-name">{{ triggerLabel }}</span>
      <span class="nav-random-draw__hint">从本页全部导航中随机抽取</span>
    </button>

    <Teleport to="body">
      <div
        v-if="drawVideos.length"
        ref="videoCacheRef"
        class="nav-random-draw__video-cache"
        aria-hidden="true"
      >
        <video
          v-for="item in drawVideos"
          :key="`cache-${item.url}`"
          :src="item.url"
          preload="auto"
          muted
          playsinline
        />
      </div>

      <div
        ref="videoStageRef"
        class="nav-random-draw__video-stage"
        :class="{ 'is-active': phase === 'video' }"
      >
        <video
          ref="videoRef"
          class="nav-random-draw__video"
          :src="currentVideoUrl"
          preload="auto"
          playsinline
          disablepictureinpicture
          disableremoteplayback
          controlslist="nodownload nofullscreen noplaybackrate"
          @ended="onVideoEnded"
          @error="onVideoError"
          @contextmenu.prevent
        />
        <button
          v-if="phase === 'video'"
          type="button"
          class="nav-random-draw__video-skip"
          aria-label="跳过视频"
          @click="skipVideo"
        />
      </div>

      <div
        v-if="phase === 'silhouette' || phase === 'reveal'"
        class="nav-random-draw__overlay"
        :class="{ 'is-silhouette': phase === 'silhouette' }"
        role="dialog"
        aria-modal="true"
        :aria-label="phase === 'reveal' ? '网站信息确认' : '随机抽取动画'"
      >
        <div
          v-if="selectedSite"
          class="nav-random-draw__silhouette-stage"
        >
          <div
            v-if="phase === 'silhouette'"
            class="nav-random-draw__silhouette-burst"
            aria-hidden="true"
          />
          <div
            v-if="phase === 'silhouette'"
            class="nav-random-draw__silhouette-particles"
            aria-hidden="true"
          >
            <span
              v-for="i in 14"
              :key="i"
              :style="{ '--i': i }"
            />
          </div>

          <div
            class="nav-random-draw__draw-card"
            :class="{
              'is-entering': phase === 'silhouette' || phase === 'reveal',
              'is-revealed': phase === 'reveal',
            }"
            @animationend="onSilhouetteAnimationEnd"
          >
            <div class="nav-random-draw__draw-card-inner">
              <div class="nav-random-draw__draw-media">
                <div
                  v-if="phase === 'silhouette'"
                  class="nav-random-draw__silhouette-ring nav-random-draw__silhouette-ring--outer"
                />
                <div
                  v-if="phase === 'silhouette'"
                  class="nav-random-draw__silhouette-ring nav-random-draw__silhouette-ring--inner"
                />
                <img
                  class="nav-random-draw__draw-cover"
                  :src="getAvatar(selectedSite)"
                  :alt="selectedSite.name"
                >
                <div
                  v-if="phase === 'silhouette'"
                  class="nav-random-draw__silhouette-shine"
                />
              </div>

              <div class="nav-random-draw__draw-body">
                <img
                  class="nav-random-draw__draw-avatar"
                  :src="getAvatar(selectedSite)"
                  :alt="selectedSite.name"
                >
                <h3 class="nav-random-draw__draw-name">
                  {{ selectedSite.name }}
                </h3>
                <p class="nav-random-draw__draw-desc">
                  {{ selectedSite.desc || '暂无描述' }}
                </p>
                <p class="nav-random-draw__draw-url">
                  {{ selectedSite.url }}
                </p>

                <div class="nav-random-draw__actions">
                  <button
                    type="button"
                    class="nav-random-draw__btn nav-random-draw__btn--primary"
                    @click="confirmJump"
                  >
                    前往访问
                  </button>
                  <button
                    type="button"
                    class="nav-random-draw__btn nav-random-draw__btn--ghost"
                    @click="resetDraw"
                  >
                    暂不跳转
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
.nav-random-draw {
  --nav-card-size: 84px;
  --nav-card-gap: 12px;
  --nav-trigger-width: calc(var(--nav-card-size) * 2 + var(--nav-card-gap));
  --nav-trigger-half: calc(var(--nav-trigger-width) / 2);
  --nav-fade-range: 152px;
  --nav-row-gap: 12px;
  --nav-card-hover-lift: 2px;
  --nav-card-hover-pad: calc(var(--nav-card-hover-lift) * 2 + 4px);

  width: 100%;
  margin: 8px 0 32px;

  &__marquee {
    display: flex;
    flex-direction: column;
    gap: var(--nav-row-gap);
    width: 100%;
  }

  &__marquee-row {
    position: relative;
    width: 100%;
    min-height: calc(var(--nav-card-size) + var(--nav-card-hover-pad));
  }

  &__marquee-viewport {
    width: 100%;
    padding-block: calc(var(--nav-card-hover-pad) / 2);
    overflow: hidden;
    box-sizing: border-box;
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent 0%,
      #000 7%,
      #000 93%,
      transparent 100%
    );
    mask-image: linear-gradient(
      90deg,
      transparent 0%,
      #000 7%,
      #000 93%,
      transparent 100%
    );
  }

  &__marquee-row.is-center-row &__marquee-viewport {
    $edge-fade: linear-gradient(
      90deg,
      transparent 0%,
      #000 7%,
      #000 93%,
      transparent 100%
    );
    $horizontal-button-fade: linear-gradient(
      90deg,
      transparent 0%,
      #000 4%,
      #000 calc(50% - var(--nav-trigger-half) - var(--nav-fade-range)),
      rgb(0 0 0 / 82%) calc(50% - var(--nav-trigger-half) - 108px),
      rgb(0 0 0 / 58%) calc(50% - var(--nav-trigger-half) - 72px),
      rgb(0 0 0 / 32%) calc(50% - var(--nav-trigger-half) - 36px),
      transparent calc(50% - var(--nav-trigger-half)),
      transparent calc(50% + var(--nav-trigger-half)),
      rgb(0 0 0 / 32%) calc(50% + var(--nav-trigger-half) + 36px),
      rgb(0 0 0 / 58%) calc(50% + var(--nav-trigger-half) + 72px),
      rgb(0 0 0 / 82%) calc(50% + var(--nav-trigger-half) + 108px),
      #000 calc(50% + var(--nav-trigger-half) + var(--nav-fade-range)),
      #000 96%,
      transparent 100%
    );

    -webkit-mask-image: $edge-fade, $horizontal-button-fade;
    -webkit-mask-composite: source-in;
    mask-image: $edge-fade, $horizontal-button-fade;
    mask-composite: intersect;
  }

  &__marquee-track {
    display: flex;
    width: max-content;
    animation: nav-marquee-ltr var(--marquee-duration, 48s) linear infinite;

    &.is-paused {
      animation-play-state: paused;
    }
  }

  &__marquee-set {
    display: flex;
    flex-shrink: 0;
    gap: var(--nav-card-gap);
    padding-inline: 6px;
  }

  &__marquee-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: var(--nav-card-size);
    height: var(--nav-card-size);
    padding: 8px 6px 6px;
    border-radius: 12px;
    border: 1.5px solid color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 42%, var(--sakura-color-divider, rgb(0 0 0 / 12%)));
    background: color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 7%, var(--sakura-card-bg));
    box-shadow: 0 4px 14px color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 10%, transparent);
    box-sizing: border-box;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;

    &:hover {
      transform: translateY(calc(var(--nav-card-hover-lift) * -1));
      border-color: color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 65%, transparent);
      box-shadow: 0 8px 18px color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 18%, transparent);
    }
  }

  &__marquee-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    object-fit: cover;
    border: 2px solid color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 45%, transparent);
  }

  &__marquee-name {
    max-width: 100%;
    font-size: 0.68rem;
    line-height: 1.2;
    font-weight: 600;
    color: var(--sakura-color-text-deep, inherit);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__trigger {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: var(--nav-trigger-width);
    height: var(--nav-card-size);
    padding: 8px 10px 6px;
    border: 1.5px solid color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 42%, var(--sakura-color-divider, rgb(0 0 0 / 12%)));
    border-radius: 12px;
    background: color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 7%, var(--sakura-card-bg, #fff));
    color: var(--sakura-color-text-deep, inherit);
    cursor: pointer;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 10%, transparent);
    box-sizing: border-box;
    transition: box-shadow 0.16s ease, border-color 0.16s ease, opacity 0.16s ease, filter 0.16s ease;
    transform: translate(-50%, -50%);

    &:hover:not(:disabled) {
      border-color: color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 65%, transparent);
      box-shadow: 0 8px 18px color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 18%, transparent);
    }

    &:active:not(:disabled) {
      opacity: 0.88;
      filter: brightness(0.96);
    }

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    &--standalone {
      position: relative;
      left: auto;
      top: auto;
      transform: none;
      width: auto;
      min-width: 220px;
      height: auto;
      margin: 0 auto;
      padding: 20px 28px 16px;
      gap: 10px;

      &:hover:not(:disabled) {
        border-color: color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 65%, transparent);
        box-shadow: 0 8px 18px color-mix(in srgb, var(--site-color, var(--sakura-color-primary)) 18%, transparent);
      }

      &:active:not(:disabled) {
        opacity: 0.88;
        filter: brightness(0.96);
      }

      .nav-random-draw__marquee-name {
        font-size: 0.92rem;
      }
    }
  }

  &__hint {
    font-size: 0.82rem;
    color: var(--sakura-color-text-muted, #888);
  }

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(0 0 0 / 72%);
    backdrop-filter: blur(4px);
    animation: nav-overlay-in 0.35s ease;

    &.is-silhouette {
      background: rgb(0 0 0 / 88%);
      backdrop-filter: blur(8px);
    }
  }

  &__silhouette-stage {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 280px;
  }

  &__silhouette-burst {
    position: absolute;
    width: min(520px, 92vw);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--sakura-color-primary) 55%, transparent) 0%,
      color-mix(in srgb, var(--sakura-color-primary) 18%, transparent) 38%,
      transparent 72%
    );
    opacity: 0;
    transform: scale(0.35);
    filter: blur(8px);
    pointer-events: none;
    animation: nav-silhouette-burst 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  &__silhouette-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--sakura-color-primary) 85%, #fff);
      box-shadow: 0 0 10px color-mix(in srgb, var(--sakura-color-primary) 70%, transparent);
      opacity: 0;
      transform: translate(-50%, -50%) rotate(calc(var(--i) * 25.7deg)) translateY(0);
      animation: nav-silhouette-spark 1.1s ease-out calc(var(--i) * 0.03s) forwards;
    }
  }

  &__video-stage {
    position: fixed;
    inset: auto;
    z-index: 10000;
    width: 0;
    height: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    background: #000;

    &.is-active {
      inset: 0;
      width: 100%;
      height: 100%;
      min-height: 100dvh;
      opacity: 1;
      pointer-events: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__video {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    object-fit: cover;
    pointer-events: none;
    background: #000;

    &::-webkit-media-controls,
    &::-webkit-media-controls-enclosure,
    &::-webkit-media-controls-panel,
    &::-webkit-media-controls-play-button,
    &::-webkit-media-controls-start-playback-button,
    &::-webkit-media-controls-timeline,
    &::-webkit-media-controls-current-time-display,
    &::-webkit-media-controls-time-remaining-display,
    &::-webkit-media-controls-mute-button,
    &::-webkit-media-controls-volume-slider,
    &::-webkit-media-controls-fullscreen-button {
      display: none !important;
      appearance: none;
    }
  }

  &__video-skip {
    position: absolute;
    inset: 0;
    z-index: 1;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  &__silhouette {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__draw-card {
    --draw-card-width: min(360px, 82vw);

    position: relative;
    z-index: 2;
    width: var(--draw-card-width);
    aspect-ratio: 16 / 10;
    border-radius: 14px;
    overflow: visible;

    &.is-entering {
      animation: nav-silhouette-drop 0.88s cubic-bezier(0.22, 0.95, 0.28, 1) forwards;
    }
  }

  &__draw-card-inner {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    overflow: hidden;
    background: linear-gradient(
      145deg,
      rgb(12 12 12 / 98%),
      rgb(38 38 38 / 92%)
    );
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--sakura-color-primary) 55%, rgb(255 255 255 / 20%)),
      0 0 28px color-mix(in srgb, var(--sakura-color-primary) 42%, transparent),
      0 0 56px color-mix(in srgb, var(--sakura-color-primary) 22%, transparent),
      0 22px 48px rgb(0 0 0 / 55%);
    transition: background-color 0.45s ease, box-shadow 0.45s ease;

    .is-revealed & {
      background: var(--sakura-card-bg, #fff);
      box-shadow:
        0 0 0 2px color-mix(in srgb, var(--sakura-color-primary) 35%, transparent),
        0 0 32px color-mix(in srgb, var(--sakura-color-primary) 28%, transparent),
        0 20px 50px rgb(0 0 0 / 35%);
      animation: nav-draw-inner-unveil 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
  }

  &__draw-card.is-entering:not(.is-revealed) &__draw-card-inner {
    animation: nav-silhouette-card-glow 2.2s ease-in-out infinite;
  }

  &__draw-media {
    position: absolute;
    inset: 0;
    overflow: hidden;
    transition: opacity 0.42s ease;

    .is-revealed & {
      opacity: 0;
      pointer-events: none;
    }
  }

  &__draw-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0) contrast(1.15) saturate(0);
    transform: scale(1.08);
    opacity: 0.92;
    transition: filter 0.5s ease, opacity 0.35s ease, transform 0.5s ease;

    .is-revealed & {
      filter: none;
      opacity: 0;
      transform: scale(1);
    }
  }

  &__draw-body {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    opacity: 0;
    overflow: hidden;
    padding: 14px 18px 12px;
    text-align: center;
    pointer-events: none;
    transition: opacity 0.42s ease;

    .is-revealed & {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__draw-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--sakura-color-primary);
    opacity: 0;
    transform: scale(0.82);
    transition: opacity 0.4s ease 0.08s, transform 0.4s ease 0.08s;

    .is-revealed & {
      opacity: 1;
      transform: scale(1);
    }
  }

  &__draw-name {
    margin: 4px 0 0;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--sakura-color-text-deep, inherit);
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.4s ease 0.12s, transform 0.4s ease 0.12s;

    .is-revealed & {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__draw-desc {
    margin: 0;
    font-size: 0.78rem;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--sakura-color-text);
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.4s ease 0.16s, transform 0.4s ease 0.16s;

    .is-revealed & {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__draw-url {
    margin: 0;
    font-size: 0.68rem;
    color: var(--sakura-color-text-muted, #888);
    word-break: break-all;
    opacity: 0;
    transition: opacity 0.4s ease 0.2s;

    .is-revealed & {
      opacity: 1;
    }
  }

  &__draw-card.is-revealed &__actions {
    opacity: 1;
    transform: translateY(0);
  }

  &__draw-card &__actions {
    display: flex;
    gap: 8px;
    justify-content: center;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.4s ease 0.18s, transform 0.4s ease 0.18s;
    margin-top: 4px;
  }

  &__silhouette-ring {
    position: absolute;
    inset: -10px;
    border-radius: 18px;
    border: 2px solid transparent;
    pointer-events: none;

    &--outer {
      border-color: color-mix(in srgb, var(--sakura-color-primary) 35%, transparent);
      animation: nav-silhouette-ring-spin 4.5s linear infinite;
    }

    &--inner {
      inset: -4px;
      border-color: color-mix(in srgb, var(--sakura-color-primary) 55%, transparent);
      animation: nav-silhouette-ring-spin 3s linear infinite reverse;
    }
  }

  &__silhouette-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0) contrast(1.15) saturate(0);
    transform: scale(1.08);
    opacity: 0.92;
  }

  &__silhouette-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 30%,
      rgb(255 255 255 / 18%) 48%,
      transparent 66%
    );
    transform: translateX(-120%);
    animation: nav-silhouette-shine 2.8s ease-in-out infinite;
  }

  &__video-cache {
    position: fixed;
    width: 0;
    height: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;

    video {
      width: 0;
      height: 0;
    }
  }

  &__actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 22px;
  }

  &__btn {
    min-width: 112px;
    padding: 10px 18px;
    border-radius: 999px;
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s ease, opacity 0.15s ease;

    &:active {
      transform: scale(0.97);
    }

    &--primary {
      border: none;
      background: var(--sakura-color-primary);
      color: #fff;
    }

    &--ghost {
      border: 1px solid var(--sakura-color-divider, rgb(0 0 0 / 15%));
      background: transparent;
      color: var(--sakura-color-text);
    }
  }

  &__draw-card &__btn {
    min-width: 88px;
    padding: 7px 12px;
    font-size: 0.78rem;
  }
}

@keyframes nav-marquee-ltr {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes nav-overlay-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes nav-silhouette-drop {
  0% {
    opacity: 0.28;
    transform: scale(4.2) translateY(-56vh);
    filter: blur(4px);
  }

  55% {
    opacity: 1;
    transform: scale(1.06) translateY(0);
    filter: blur(0);
  }

  72% {
    transform: scale(0.95) translateY(0);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

@keyframes nav-silhouette-burst {
  0% {
    opacity: 0;
    transform: scale(0.35);
  }

  35% {
    opacity: 1;
    transform: scale(1.15);
  }

  100% {
    opacity: 0.55;
    transform: scale(1.45);
  }
}

@keyframes nav-silhouette-card-glow {
  0%,
  100% {
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--sakura-color-primary) 45%, rgb(255 255 255 / 18%)),
      0 0 24px color-mix(in srgb, var(--sakura-color-primary) 38%, transparent),
      0 0 48px color-mix(in srgb, var(--sakura-color-primary) 18%, transparent),
      0 22px 48px rgb(0 0 0 / 55%);
  }

  50% {
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--sakura-color-primary) 72%, rgb(255 255 255 / 28%)),
      0 0 36px color-mix(in srgb, var(--sakura-color-primary) 58%, transparent),
      0 0 72px color-mix(in srgb, var(--sakura-color-primary) 32%, transparent),
      0 26px 56px rgb(0 0 0 / 62%);
  }
}

@keyframes nav-silhouette-ring-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes nav-silhouette-shine {
  0%,
  72% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(120%);
  }
}

@keyframes nav-silhouette-spark {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(calc(var(--i) * 25.7deg)) translateY(0) scale(0.4);
  }

  18% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(calc(var(--i) * 25.7deg)) translateY(calc(-80px - var(--i) * 3px)) scale(0.2);
  }
}

@keyframes nav-draw-inner-unveil {
  0% {
    filter: brightness(0.72);
  }

  40% {
    filter: brightness(1.18);
  }

  100% {
    filter: brightness(1);
  }
}
</style>

<style lang="scss">
html.nav-random-draw-open {
  overflow: hidden;
}
</style>

```


真是一场酣畅淋漓的美化，不是吗~


