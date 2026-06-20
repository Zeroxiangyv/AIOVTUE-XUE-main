---
title: valaxy博客全局美化教程（八）
excerpt: 页脚倒计时、搜索问题修复
date: 2026-06-04
updated: 2026-06-04
categories: 美化
tags:
  - 美化
  - 博客
  - 教程
cover: https://r2tc.20030327.xyz/file/博客/主题/1780646594844_wallhaven-5geqr5.jpg
---
### 本系列教程共十篇
- [valaxy博客全局美化教程（一）](valaxy-1)：分类、标签、归档三个页面的美化教程
- [valaxy博客全局美化教程（二）](valaxy-2)：首页公告栏美化，新增随机文章展示板块
- [valaxy博客全局美化教程（三）](valaxy-3)：给网页增加加载动画
- [valaxy博客全局美化教程（四）](valaxy-4)：增加图片预览功能
- [valaxy博客全局美化教程（五）](valaxy-5)：友链页面美化，修改了友链样式以及增加留言板
- [valaxy博客全局美化教程（六）](valaxy-6)：留言页面增加信封展开效果
- [valaxy博客全局美化教程（七）](valaxy-7)：新增网址导航页面
- ***[*valaxy博客全局美化教程（八）*](valaxy-8)：页脚倒计时、搜索问题修复***
- [valaxy博客全局美化教程（九）](valaxy-9)：新增相册页面，支持使用webdav作为相册
- [valaxy博客全局美化教程（十）](valaxy-10)：修复构建结束的时候会卡住

### 页脚添加计时功能
#### 预览效果
![](https://r2tc.20030327.xyz/file/博客/文章/1780935908626_1780935876619.png)

#### 新建文件
以下是新建文件部分
- 新增`components\SakuraFooter.vue`

```
<script lang="ts" setup>
import type { Pkg } from 'valaxy'
import { useConfig } from 'valaxy'
import { isClient } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface FooterConfig {
  icp?: string
  powered?: boolean
  runtimeSince?: string
}

interface RuntimeParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const props = defineProps<{
  footer?: FooterConfig
  pkg?: Pkg
}>()

const config = useConfig()

const footer = computed(() => {
  if (props.footer)
    return props.footer

  return (config.value?.themeConfig as { footer?: FooterConfig } | undefined)?.footer ?? {}
})

const runtime = ref<RuntimeParts | null>(null)

let timer: ReturnType<typeof setInterval> | undefined

function parseStartTime(since: string) {
  const trimmed = since.trim()

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split('-').map(Number)
    return new Date(year, month - 1, day, 0, 0, 0, 0)
  }

  const start = new Date(trimmed)
  if (Number.isNaN(start.getTime()))
    return null

  return start
}

function updateRuntime() {
  const since = footer.value.runtimeSince
  if (!since) {
    runtime.value = null
    return
  }

  const start = parseStartTime(since)
  if (!start) {
    runtime.value = null
    return
  }

  let diffMs = Date.now() - start.getTime()
  if (diffMs < 0) {
    runtime.value = null
    return
  }

  const days = Math.floor(diffMs / 86_400_000)
  diffMs -= days * 86_400_000

  const hours = Math.floor(diffMs / 3_600_000)
  diffMs -= hours * 3_600_000

  const minutes = Math.floor(diffMs / 60_000)
  diffMs -= minutes * 60_000

  const seconds = Math.floor(diffMs / 1000)

  runtime.value = { days, hours, minutes, seconds }
}

function stopTimer() {
  if (timer !== undefined) {
    clearInterval(timer)
    timer = undefined
  }
}

function startTimer() {
  updateRuntime()
  stopTimer()

  if (isClient)
    timer = setInterval(updateRuntime, 1000)
}

watch(() => footer.value.runtimeSince, startTimer)

onMounted(startTimer)
onUnmounted(stopTimer)
</script>

<template>
  <footer class="sakura-footer h-$sakura-footer-height" text="center sm" style="color:var(--va-c-text-light)">
    <div v-if="footer.icp" class="icp" p="y-2" v-html="footer.icp" />

    <SakuraCopyright />

    <p v-if="runtime" class="sakura-footer-runtime">
      本站已经流畅运行
      <span class="sakura-footer-runtime__num">{{ runtime.days }}</span>天
      <span class="sakura-footer-runtime__num">{{ runtime.hours }}</span>小时
      <span class="sakura-footer-runtime__num">{{ runtime.minutes }}</span>分钟
      <span class="sakura-footer-runtime__num">{{ runtime.seconds }}</span>秒
    </p>

    <SakuraPowered v-if="footer.powered" />

    <slot />
  </footer>
</template>

<style lang="scss" scoped>
.sakura-footer-runtime {
  margin: 0;
  padding: 4px 0 8px;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--va-c-text-light);
}

.sakura-footer-runtime__num {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--sakura-color-primary, #fe9500);
}
</style>

```

#### 修改文件
以下是修改文件部分
- 在`valaxy.config.ts`文件`footer`部分（在（`themeconfig`内部）增加以下代码
```
      runtimeSince: '2026-6-01',
```
最终效果
```
  footer: {
      //...
      runtimeSince: '2026-6-01',
      //...
      },
```

这是控制计时起始时间的


### 搜索问题修复
#### 前景提要
这个没有预览图哈，不知道你们遇到没有，反正主播遇到了，我使用搜索功能的时候老搜不到东西，很奇怪，顺便说一下怎么开启搜索功能，你直接点那个按钮他是有一个空壳哈，得先新建搜索页面`pages\search`新建文件`index.md`
在里面写：
```
---
layout: search
title: 搜索
icon: i-ri-search-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

然后还要开启搜索支持：
##### 本地搜索（基于 fuse.js）
Valaxy 内置了基于 [fuse.js](https://fusejs.io/) 的离线搜索（须预先通过 `valaxy fuse` 构建生成本地缓存）。
> `valaxy fuse` 默认将 `fuse` 生成在 `public` 目录下，并在 `.gitignore` 中添加 `public/valaxy-fuse-list.json` 忽略。 在执行 `valaxy build` 之前，会自动执行 `valaxy fuse`。

如果你想要使用全文搜索，需要进行如下设置 ：
编辑`site.config.ts`文件，以下给的完整代码，注意哦
```
export default defineSiteConfig({
  search: {
    enable: true,
    type: 'fuse',
  },
  fuse: {
    /**
     * 设置搜索的文件路径
     */
    // pattern: 'pages/**/*.md',
    options: {
      keys: ['title', 'tags', 'categories', 'excerpt', 'content'],
      /**
       * @default 0.6
       * @see https://www.fusejs.io/api/options.html#threshold
       * 设置匹配阈值，越低越精确
       */
      // threshold: 0.6,
      /**
       * @default false
       * @see https://www.fusejs.io/api/options.html#ignoreLocation
       * 忽略位置
       * 这对于搜索文档全文内容有用，若无需全文搜索，则无需设置此项
       */
      ignoreLocation: true,
    },
  },
})
```

还需要在文件中设置启用搜素：
编辑`site.config.ts`文件，这里也是完整代码哦
```
import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  search: {
    enable: true,
    // 设置类型为 Fuse
    provider: 'fuse',
  },
})
```

还需要在你的 `package.json` 中添加 fuse 生成脚本
编辑`package.json`文件
主要加这两行：
```
"build": "npm run build:ssg",
"fuse": "valaxy fuse",
```
添加位置看下方完整代码
```
{
  "name": "yun-demo",
  "valaxy": {
    "theme": "yun"
  },
  "scripts": {
    "build": "npm run build:ssg",
    "build:ssg": "valaxy build --ssg",
    "fuse": "valaxy fuse",
    "rss": "valaxy rss"
  },
  "dependencies": {
    "valaxy": "latest",
    "valaxy-theme-yun": "latest"
  }
}
```

这样就算启用搜索了，但是我用起来有bug，这里给出修复方案
#### 修复方案
这里很简单，新建一个文件即可
- 新增`components\layouts\SakuraSearchLayout.vue`

```
<script lang="ts" setup>
import { useFuseSearch } from 'valaxy'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isClient } from '@vueuse/core'
import { nextTick } from 'vue'  // 新增

const input = ref('')  // 改这里，给一个空字符串默认值

const { results, fetchFuseListData } = useFuseSearch(input)
const route = useRoute()

watch(
  () => route.query.q as string,
  async (query) => {
    if (isClient) {
      await fetchFuseListData()  // 等待索引加载完成
      await nextTick()           // 等待 Vue 更新
    }

    input.value = query || ''    // 再把输入值赋进去
  },
  { immediate: true }
)
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component">
      <template #main-content>
        <slot name="content">
          <div class="sakura-search mt-20">
            <header class="page-header">
              <h1 class="page-title">
                <template v-if="results.length > 0">
                  搜索结果: {{ input }}
                </template>
                <template v-else>
                  没有找到任何东西！
                </template>
              </h1>
            </header>
            <div v-if="results.length > 0" overflow="auto" flex="~" w="full">
              <div class="sakura-search-result post post-list" flex="~ col" w="full">
                <div v-for="result in results" :key="result.item.title" class="post-entry" flex="~">
                  <AppLink :to="result.item.link">
                    <div class="feature">
                      <div class="flex-center overlay">
                        <div i-fa-file-text-o />
                      </div>
                      <SakuraImageCard :src="result.item?.cover" class="h-full rounded-full" />
                    </div>
                  </AppLink>
                  <div class="ml-9 flex-grow">
                    <div flex="~" class="items-center justify-between">
                      <h3 class="sakura-search-result-title entry-title">
                        <AppLink :to="result.item.link">
                          {{ result.item.title }}
                        </AppLink>
                      </h3>

                      <div class="p-time flex items-center">
                        <span i-mdi-access-time class="mr-1 inline-flex" />
                        发布于 {{ result.item.date }}
                      </div>
                    </div>

                    <p class="sakura-search-result-excerpt">
                      {{ result.item.excerpt }}
                    </p>

                    <div class="post-more">
                      <AppLink :to="result.item.link">
                        <SakuraDots class="float-right mt-10px" />
                      </AppLink>
                    </div>
                    <hr w="1/3" class="mx-auto mb-62px mt-69px" border="~ $sakura-color-divider">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </template>
    </component>
  </RouterView>
</template>

<style lang="scss" scoped>
.sakura-search {
  padding-top: 4rem;
  margin-top: var(--sakura-navbar-height);
  margin-right: auto;
  margin-left: auto;
  pointer-events: auto;
  transition: color 0.2s ease;
  width: 90%;
  max-width: 800px;

  &-input {
    background: transparent;
    color: var(--sakura-color-text);
    font-size: 1.5rem;
    border-radius: 3rem;
    padding: 1rem 1.5rem;
    border: 1px solid var(--sakura-color-border);
    box-sizing: border-box;
    font-weight: 900;
    text-align: center;
    transition: all 0.2s;

    &:focus {
      border-color: var(--sakura-color-primary);
    }
  }

  &-result-item {
    color: var(--sakura-color-text);
    cursor: pointer;

    &:hover {
      color: var(--sakura-color-primary);
    }
  }

  .page-header {
    position: relative;
    text-align: center;
    margin-bottom: 50px;

    .page-title {
      font-size: 20px;
      font-weight: 400;
      border: 1px dashed var(--sakura-color-divider);
      padding: 10px 15px;
      color: var(--sakura-color-text);
      margin-bottom: 30px;
    }
  }

  .entry-title {
    a {
      color: var(--sakura-color-text-deep);
      font-size: 20px;
      font-weight: 400;
      line-height: 50px;
      font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif',
        source-han-serif-sc, 'PT Serif', 'SongTi SC', 'MicroSoft Yahei',
        Georgia, serif;

      &:hover {
        color: var(--sakura-color-primary);
      }
    }
  }

  .sakura-search-result-excerpt {
    font-size: 15px;
    color: var(--sakura-color-text);
    letter-spacing: 0;
    line-height: 30px;
  }

  .p-time {
    font-size: 12px;
    color: var(--sakura-color-text);
    letter-spacing: 0;
  }

  .post-more {
    font-size: 25px;
    color: var(--sakura-color-text);
  }

  .feature {
    border-radius: 50%;
    padding: 2px;
    position: relative;
    border: 1px solid var(--sakura-color-divider);
    height: 100px;
    width: 100px;
    overflow: hidden;
  }

  .overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: orange;
    opacity: 0;
    transition: opacity 0.3s ease-out;
    pointer-events: none;

    div {
      font-size: 25px;
      color: oklch(100% 0 0);
      line-height: 94px;
    }
  }

  .feature:hover .overlay {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>

```

好啦，本次教程就到这了