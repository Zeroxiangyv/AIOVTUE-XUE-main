---
title: valaxy博客全局美化教程（六）
excerpt: 留言页面增加信封展开效果
date: 2026-06-02
updated: 2026-06-02
categories: 美化
tags:
  - 博客
  - 美化
  - 教程
cover: https://r2tc.20030327.xyz/file/博客/主题/1780647884540_1780647819384.png
---
### 本系列教程共十篇
- [valaxy博客全局美化教程（一）](valaxy-1)：分类、标签、归档三个页面的美化教程
- [valaxy博客全局美化教程（二）](valaxy-2)：首页公告栏美化，新增随机文章展示板块
- [valaxy博客全局美化教程（三）](valaxy-3)：给网页增加加载动画
- [valaxy博客全局美化教程（四）](valaxy-4)：增加图片预览功能
- [valaxy博客全局美化教程（五）](valaxy-5)：友链页面美化，修改了友链样式以及增加留言板
- ***[*valaxy博客全局美化教程（六）*](valaxy-6)：留言页面增加信封展开效果***
- [valaxy博客全局美化教程（七）](valaxy-7)：新增网址导航页面
- [valaxy博客全局美化教程（八）](valaxy-8)：页脚倒计时、搜索问题修复
- [valaxy博客全局美化教程（九）](valaxy-9)：新增相册页面，支持使用webdav作为相册
- [valaxy博客全局美化教程（十）](valaxy-10)：修复构建结束的时候会卡住

### 话不多说，先看效果
<video width="500" height="300" controls>
    <source src="https://r2tc.20030327.xyz/file/博客/文章/1780933818866_asdfewsd_compressed.mp4" type="video/mp4">
</video>
页面下滑时信封自动展开，上划自动闭合，可以自己换图片，但是尺寸要一样哈，由于涉及到图床，大家尽量只下载图片，不要直接使用站长的链接，因为站长不能保证什么时候就失效了
给出所有图片的图床链接：

```
https://pic1.imgdb.cn/item/6a26e5483c9809430d376f88.png
https://pic1.imgdb.cn/item/6a26e5483c9809430d376f87.png
https://pic1.imgdb.cn/item/6a26e5483c9809430d376f85.png
https://pic1.imgdb.cn/item/6a26e5483c9809430d376f86.png
```
从上到下分别是信纸、顶部信封、底部信封和横条，下面链接和这里一样，大家最好修改一下，测试用着可以，不要生产环境使用哦

### 新增文件
新增文件咯，只有一个文件，有点长哦
新增文件`components\layouts\SakuraCommentLayout.vue`
```
<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const siteConfig = useSiteConfig()
const authorName = computed(() => siteConfig.value.author?.name || '站长')

const isOpened = ref(false)
const formWrapRef = ref<HTMLElement>()

const envelopeConfig = {
  images: {
    cover: 'https://pic1.imgdb.cn/item/6a26e5483c9809430d376f88.png',
    line: 'https://pic1.imgdb.cn/item/6a26e5483c9809430d376f86.png',
    beforeimg: 'https://pic1.imgdb.cn/item/6a26e5483c9809430d376f85.png',
    afterimg: 'https://pic1.imgdb.cn/item/6a26e5483c9809430d376f87.png',
  },
  wrapHeight: 447,
  openHeight: 1050,
  openOffset: -200,
  /** 滚回页面顶部时闭合（px） */
  scrollCloseTop: 80,
}

const message = [
  '本站有哪些做得好或者不好的地方？',
  '或者你有什么改进的建议？',
  '又或者你有什么具体的问题需要咨询？',
  '都可以在下方评论区留言哦~~~',
]

const bottomText = '小站站长亲自为您服务！'

let scrollRaf: number | undefined

function getScrollTop() {
  return window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop
    || 0
}

function openEnvelope() {
  isOpened.value = true
}

function closeEnvelope() {
  isOpened.value = false
}

function handleEnvelopeClick() {
  if (!isOpened.value)
    openEnvelope()
}

function isEnvelopeFullyVisible() {
  if (!formWrapRef.value || isOpened.value)
    return false

  const rect = formWrapRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // 桌面信封隐藏（移动端）时不触发
  if (rect.width === 0 || rect.height === 0)
    return false

  // 信封（闭合高度）完整出现在视口内时展开
  return rect.top >= 0 && rect.bottom <= viewportHeight + 1
}

function updateEnvelopeByScroll() {
  if (isEnvelopeFullyVisible()) {
    openEnvelope()
    return
  }

  if (isOpened.value && getScrollTop() <= envelopeConfig.scrollCloseTop)
    closeEnvelope()
}

function handleScroll() {
  if (scrollRaf)
    return

  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = undefined
    updateEnvelopeByScroll()
  })
}

onMounted(() => {
  updateEnvelopeByScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (scrollRaf)
    cancelAnimationFrame(scrollRaf)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<template>
  <SakuraPage class="sakura-comment-page">
    <template #content>
      <RouterView v-slot="{ Component }">
        <component :is="Component">
          <template #main-content>
            <div id="envelope-maincontent" class="envelope-maincontent">
              <div
                id="form-wrap"
                ref="formWrapRef"
                class="form-wrap envelope-desktop"
                :class="{ opened: isOpened }"
                :style="{
                  '--wrap-height': `${envelopeConfig.wrapHeight}px`,
                  '--open-height': `${envelopeConfig.openHeight}px`,
                  '--open-offset': `${envelopeConfig.openOffset}px`,
                }"
                @click="handleEnvelopeClick"
              >
              <img
                id="beforeimg"
                class="beforeimg"
                :src="envelopeConfig.images.beforeimg"
                alt="信封背景"
                loading="lazy"
              >

              <div id="envelope" class="envelope">
                <div class="formmain">
                  <img
                    class="headerimg"
                    :src="envelopeConfig.images.cover"
                    alt="信笺封面"
                    loading="lazy"
                  >

                  <div class="comments-main">
                    <h3 class="title3">
                      ✨来自{{ authorName }}的留言:
                    </h3>

                    <div class="comments">
                      <p
                        v-for="(msg, index) in message"
                        :key="index"
                      >
                        {{ msg }}
                      </p>
                    </div>

                    <div class="bottomcontent">
                      <img
                        class="bottomimg"
                        :src="envelopeConfig.images.line"
                        alt="信笺底部装饰"
                        loading="lazy"
                      >
                    </div>

                    <p class="bottomhr">
                      {{ bottomText }}
                    </p>
                  </div>
                </div>
              </div>

              <img
                id="afterimg"
                class="afterimg"
                :src="envelopeConfig.images.afterimg"
                alt="信封前景"
                loading="lazy"
              >
            </div>

            <!-- 移动端：无信封图片，仅展示信笺 -->
            <div class="envelope-mobile">
              <div class="formmain">
                <img
                  class="headerimg"
                  :src="envelopeConfig.images.cover"
                  alt="信笺封面"
                  loading="lazy"
                >

                <div class="comments-main">
                  <h3 class="title3">
                    ✨来自{{ authorName }}的留言:
                  </h3>

                  <div class="comments">
                    <p
                      v-for="(msg, index) in message"
                      :key="index"
                    >
                      {{ msg }}
                    </p>
                  </div>

                  <div class="bottomcontent">
                    <img
                      class="bottomimg"
                      :src="envelopeConfig.images.line"
                      alt="信笺底部装饰"
                      loading="lazy"
                    >
                  </div>

                  <p class="bottomhr">
                    {{ bottomText }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #comment>
          <div class="envelope-comment-wrap">
            <SakuraComment />
          </div>
        </template>
      </component>
    </RouterView>
    </template>
  </SakuraPage>
</template>

<style lang="scss" scoped>
.envelope-maincontent {
  width: 530px;
  max-width: 100%;
  margin-inline: auto;
  margin-top: 20px;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
}

.form-wrap {
  overflow: hidden;
  width: 530px;
  max-width: 100%;
  height: var(--wrap-height, 447px);
  position: relative;
  top: 0;
  transition: all 1s ease-in-out 0.3s;
  z-index: 0;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  margin-inline: auto;
}

.form-wrap.opened {
  height: var(--open-height, 1050px);
  top: var(--open-offset, -200px);
}

.beforeimg {
  position: absolute;
  bottom: 126px;
  left: 0;
  right: 0;
  width: 100%;
  height: 317px;
  z-index: 0;
  pointer-events: none;
  display: block;
  object-fit: fill;
}

.afterimg {
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  width: 100%;
  height: 259px;
  z-index: 100;
  pointer-events: none;
  display: block;
  object-fit: fill;
}

.envelope {
  position: relative;
  overflow: visible;
  width: 500px;
  max-width: calc(100% - 30px);
  margin-inline: auto;
  padding-top: 200px;
  transition: all 1s ease-in-out 0.3s;
  z-index: 10;
  box-sizing: border-box;
}

.headerimg {
  width: 100%;
  display: block;
  overflow: hidden;
  pointer-events: none;
  object-fit: cover;
}

.formmain {
  background: #fff;
  width: 95%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.18);
  pointer-events: none;
}

.comments-main {
  padding: 5px 20px 16px;
}

.title3 {
  margin: 12px 0 8px;
  text-decoration: none;
  color: var(--sakura-color-primary, #fe9500);
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
}

.comments {
  text-align: center;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 15px 0;
  background-color: #eee;
  line-height: 2;

  p {
    margin: 0;
    font-size: 15px;
    color: #333;
  }
}

.bottomcontent {
  text-align: center;
  margin-top: 24px;
}

.bottomimg {
  width: 100%;
  margin: 5px auto;
  display: block;
  pointer-events: none;
}

.bottomhr {
  margin: 8px 0 0;
  font-size: 12px;
  text-align: center;
  color: #999;
}

.envelope-mobile {
  display: none;
}

.envelope-comment-wrap {
  position: relative;
  z-index: 20;
  width: 100%;
  max-width: 800px;
  margin-inline: auto;
  margin-top: 24px;
  margin-bottom: 40px;
  padding-inline: 10px;
  box-sizing: border-box;
}

@media screen and (max-width: 600px) {
  .envelope-desktop {
    display: none !important;
  }

  .envelope-mobile {
    display: block;
  }

  .envelope-maincontent {
    max-width: 100%;
    margin-top: 12px;
  }

  .formmain {
    width: 100%;
  }

  .comments-main {
    padding: 5px 16px 12px;
  }

  .comments p {
    font-size: 14px;
  }
}

:global(html.dark) {
  .formmain {
    background: rgb(50, 50, 50);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.45);
  }

  .title3 {
    color: rgb(246, 214, 175);
  }

  .comments {
    background: rgba(90, 90, 90, 0.8);
    border-color: rgba(255, 255, 255, 0.85);
    color: #fff;

    p {
      color: #fff;
    }
  }

  .bottomhr {
    color: #aaa;
  }
}
</style>

<style lang="scss">
.sakura-comment-page {
  width: 100%;
  overflow-x: clip;

  .sakura-one-columns,
  .sakura-triple-columns {
    width: 100%;
    max-width: 100%;
    justify-items: center;
  }

  .sakura-page-content {
    width: 100%;
    max-width: 900px;
    margin-inline: auto;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }

  .sakura-page-content > * {
    width: 100%;
    max-width: 800px;
    margin-inline: auto;
    box-sizing: border-box;
  }

  main {
    width: 100%;
    overflow: visible;
  }
}
</style>

```

### 提一句
留言页面要新建页面，`index.md`文件如下配置：
```
---
layout: comment
title: 不留下点什么吗
icon: i-ri-chat-1-line
nav: false
cover: https://你的图床.jpg
---
```

具体怎么创建页面看第一章教程末尾，顺便提一句，页面的访问方法，比如`pages`文件夹有一个`comment`文件夹，`comment`文件夹中有`index.md`文件，这就是一个页面了，在浏览器打开页面的方式就是：`https://你的域名.com/comment`。