---
title: valaxy博客全局美化教程（四）
excerpt: 增加图片预览功能
date: 2026-05-31
updated: 2026-05-31
categories: 美化
tags:
  - 美化
  - 教程
  - 博客
cover: https://r2tc.20030327.xyz/file/博客/文章/1780931408729_1780931382565.png
---
### 本系列教程共十篇
- [valaxy博客全局美化教程（一）](valaxy-1)：分类、标签、归档三个页面的美化教程
- [valaxy博客全局美化教程（二）](valaxy-2)：首页公告栏美化，新增随机文章展示板块
- [valaxy博客全局美化教程（三）](valaxy-3)：给网页增加加载动画
- ***[*valaxy博客全局美化教程（四）*](valaxy-4)：增加图片预览功能***
- [valaxy博客全局美化教程（五）](valaxy-5)：友链页面美化，修改了友链样式以及增加留言板
- [valaxy博客全局美化教程（六）](valaxy-6)：留言页面增加信封展开效果
- [valaxy博客全局美化教程（七）](valaxy-7)：新增网址导航页面
- [valaxy博客全局美化教程（八）](valaxy-8)：页脚倒计时、搜索问题修复
- [valaxy博客全局美化教程（九）](valaxy-9)：新增相册页面，支持使用webdav作为相册
- [valaxy博客全局美化教程（十）](valaxy-10)：修复构建结束的时候会卡住

### 效果预览
![](https://r2tc.20030327.xyz/file/博客/文章/1780931408729_1780931382565.png)
简单介绍一下，我用的时候这个博客没有图片预览，就加了一个，大概效果是这样的，底部有预览栏，可以点击切换，移动端可以滑动切换，支持图片缩放，效果还是不错的，对了，后续有一个相册页面，如果想要加入相册页面的话，这个部分必须得加哦，否则可能会出小问题，因为这两个东西是一起写的，虽然二者的图片预览是单独分开的，但是说不好哦~

### 开始美化
#### 修改文件
修改文件部分共`2`个文件需要修改
下面这个是`css`文件，控制组件特效的，默认文件时空的，直接新增即可
##### 在`styles\index.scss`文件增加以下代码
```
/* 文章图片点击放大 */
.markdown-body img,
.prose img {
  cursor: zoom-in;
}

html.image-gallery-open {
  overflow: hidden;
}
```
下面也是修改哦，下面给的是纯净代码，记得格式哦~
##### 文件`site.config.ts`的`export default defineSiteConfig({})`内增加以下代码
```
  // 关闭自带的图片预览
  mediumZoom: {
    enable: false,
  },
```
解释一下，官方说自带了一个预览功能，我也没怎么研究，因为说的是很基本，不如自己加~这里就是给他关掉，放置两个一起生效（虽然压根就没开，其实大概不加这个也行）


#### 新增文件
下面是新增文件部分啦，本部分共新增`5`个文件，有点长哦，别漏啦
##### 新增`App.vue`
```
<script setup lang="ts">
import { onMounted } from 'vue'
import ImageGalleryViewer from './components/ImageGalleryViewer.vue'
import { initImageGallery } from './utils/imageGallery'

onMounted(() => {
  initImageGallery()
})
</script>

<template>
  <ImageGalleryViewer />
</template>

```
第二个文件~
##### 新增`utils\imageGallery.ts`
```
import { ref, shallowRef } from 'vue'

export interface GalleryImage {
  src: string
  alt: string
}

export const galleryVisible = ref(false)
export const galleryImages = shallowRef<GalleryImage[]>([])
export const galleryIndex = ref(0)

function getImageSrc(img: HTMLImageElement) {
  return img.currentSrc || img.src || img.getAttribute('data-src') || ''
}

function isGalleryImage(img: HTMLImageElement) {
  if (!img.closest('.markdown-body'))
    return false

  if (img.closest('pre, code, .sakura-comment, .twikoo, nav, header, footer, .sakura-navbar, .sakura-post-nav'))
    return false

  const src = getImageSrc(img)
  if (!src || src.startsWith('data:'))
    return false

  return true
}

function collectImages(container: Element) {
  return Array.from(container.querySelectorAll<HTMLImageElement>('img'))
    .filter(isGalleryImage)
    .map(el => ({
      el,
      src: getImageSrc(el),
      alt: el.alt || '',
    }))
}

export function openGallery(images: GalleryImage[], index: number) {
  if (!images.length)
    return

  galleryImages.value = images
  galleryIndex.value = Math.min(Math.max(index, 0), images.length - 1)
  galleryVisible.value = true
  document.body.style.overflow = 'hidden'
}

export function closeGallery() {
  galleryVisible.value = false
  document.body.style.overflow = ''
}

export function prevImage() {
  if (galleryIndex.value > 0)
    galleryIndex.value -= 1
}

export function nextImage() {
  if (galleryIndex.value < galleryImages.value.length - 1)
    galleryIndex.value += 1
}

export function goToImage(index: number) {
  if (index < 0 || index >= galleryImages.value.length)
    return

  galleryIndex.value = index
}

function handleImageClick(event: Event) {
  if (!(event.target instanceof Element))
    return

  const img = event.target.closest('img')
  if (!(img instanceof HTMLImageElement))
    return

  if (!isGalleryImage(img))
    return

  const article = img.closest('.markdown-body')
  if (!article)
    return

  const list = collectImages(article)
  const index = list.findIndex(item => item.el === img)
  if (index === -1)
    return

  event.preventDefault()
  event.stopPropagation()

  openGallery(
    list.map(item => ({ src: item.src, alt: item.alt })),
    index,
  )
}

let initialized = false

export function initImageGallery() {
  if (initialized || typeof document === 'undefined')
    return

  initialized = true
  document.addEventListener('click', handleImageClick, true)
}
```

第三个咯~
 ##### 新增`components\ImageGalleryViewer.vue`
```
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  closeGallery,
  galleryImages,
  galleryIndex,
  galleryVisible,
  goToImage,
  nextImage,
  prevImage,
} from '../utils/imageGallery'
import { createLightboxSwipeHandlers } from '../utils/useLightboxSwipe'
import { useLightboxZoom } from '../utils/useLightboxZoom'

const thumbsContainerRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const thumbWidth = ref(72)
const thumbStep = ref(82)

const {
  isZoomed,
  isDragging,
  isPinching,
  imageTransformStyle,
  resetZoomState,
  onImageDblClick,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onWheel,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
} = useLightboxZoom(imageRef)

const current = computed(() => galleryImages.value[galleryIndex.value])
const hasPrev = computed(() => galleryIndex.value > 0)
const hasNext = computed(() => galleryIndex.value < galleryImages.value.length - 1)
const showThumbs = computed(() => galleryImages.value.length > 1)
const counter = computed(() => {
  if (galleryImages.value.length <= 1)
    return ''

  return `${galleryIndex.value + 1} / ${galleryImages.value.length}`
})

const trackOffset = computed(() => {
  const containerWidth = thumbsContainerRef.value?.clientWidth ?? 0
  if (!containerWidth)
    return 0

  return containerWidth / 2 - thumbWidth.value / 2 - galleryIndex.value * thumbStep.value
})

const swipeHandlers = createLightboxSwipeHandlers({
  enabled: () => galleryVisible.value && galleryImages.value.length > 1,
  shouldIgnore: () => isZoomed.value || isDragging.value || isPinching.value,
  onPrev: prevImage,
  onNext: nextImage,
})

function updateThumbMetrics() {
  const container = thumbsContainerRef.value
  const thumb = container?.querySelector<HTMLElement>('.image-gallery__thumb')
  const track = container?.querySelector<HTMLElement>('.image-gallery__thumbs-track')

  if (!container || !thumb || !track)
    return

  thumbWidth.value = thumb.offsetWidth

  const gapValue = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0')
  thumbStep.value = thumbWidth.value + (Number.isFinite(gapValue) ? gapValue : 0)
}

async function syncThumbTrack() {
  await nextTick()
  updateThumbMetrics()
}

function onKeydown(event: KeyboardEvent) {
  if (!galleryVisible.value)
    return

  if (event.key === 'Escape') {
    closeGallery()
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    prevImage()
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    nextImage()
  }
}

function onMobileBackdropClose() {
  if (!window.matchMedia('(max-width: 640px)').matches)
    return

  closeGallery()
}

watch(galleryVisible, (visible) => {
  if (visible) {
    document.documentElement.classList.add('image-gallery-open')
    syncThumbTrack()
  }
  else {
    document.documentElement.classList.remove('image-gallery-open')
    resetZoomState()
  }
})

watch(galleryIndex, () => {
  resetZoomState()
  if (galleryVisible.value)
    syncThumbTrack()
})

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', updateThumbMetrics)

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      updateThumbMetrics()
    })
  }
})

watch(thumbsContainerRef, (container, _, onCleanup) => {
  if (resizeObserver && container)
    resizeObserver.observe(container)

  onCleanup(() => {
    if (resizeObserver && container)
      resizeObserver.unobserve(container)
  })
}, { flush: 'post' })

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', updateThumbMetrics)
  resizeObserver?.disconnect()
  document.documentElement.classList.remove('image-gallery-open')
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="image-gallery-fade">
      <div
        v-if="galleryVisible && current"
        class="image-gallery"
        role="dialog"
        aria-modal="true"
        :aria-label="current.alt || '图片预览'"
        @click.self="closeGallery"
      >
        <div
          class="image-gallery__main"
          @click.self="onMobileBackdropClose"
        >
          <button
            type="button"
            class="image-gallery__close"
            aria-label="关闭预览"
            @click="closeGallery"
          >
            ×
          </button>

          <button
            v-if="hasPrev"
            type="button"
            class="image-gallery__nav image-gallery__nav--prev"
            aria-label="上一张"
            @click.stop="prevImage"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.5 6.5 9 12l5.5 5.5" />
            </svg>
          </button>

          <button
            v-if="hasNext"
            type="button"
            class="image-gallery__nav image-gallery__nav--next"
            aria-label="下一张"
            @click.stop="nextImage"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9.5 6.5 15 12l-5.5 5.5" />
            </svg>
          </button>

          <div
            class="image-gallery__stage"
            :class="{ 'is-zoomed': isZoomed || isPinching }"
            @click.self="onMobileBackdropClose"
            @touchstart.passive="swipeHandlers.onTouchStart"
            @touchend.passive="swipeHandlers.onTouchEnd"
            @touchcancel="swipeHandlers.onTouchCancel"
          >
            <div
              class="image-gallery__viewport"
              :class="{
                'is-zoomed': isZoomed || isPinching,
                'is-dragging': isDragging,
                'is-pinching': isPinching,
              }"
              @click.self="onMobileBackdropClose"
              @pointerdown="onPointerDown"
              @pointermove="onPointerMove"
              @pointerup="onPointerUp"
              @pointercancel="onPointerUp"
              @wheel.prevent="onWheel"
              @touchstart="onTouchStart"
              @touchmove.prevent="onTouchMove"
              @touchend="onTouchEnd"
              @touchcancel="onTouchCancel"
            >
              <img
                ref="imageRef"
                :key="current.src"
                class="image-gallery__img"
                :class="{ 'is-zoomed': isZoomed }"
                :style="imageTransformStyle"
                :src="current.src"
                :alt="current.alt"
                draggable="false"
                @dblclick.stop="onImageDblClick"
              >
            </div>

            <p v-if="current.alt" class="image-gallery__caption">
              {{ current.alt }}
            </p>

            <span v-if="counter" class="image-gallery__counter">
              {{ counter }}
            </span>
          </div>
        </div>

        <div
          v-if="showThumbs"
          ref="thumbsContainerRef"
          class="image-gallery__thumbs"
          @click.stop
        >
          <div class="image-gallery__thumbs-indicator" aria-hidden="true" />

          <div
            class="image-gallery__thumbs-track"
            :style="{ transform: `translateX(${trackOffset}px)` }"
          >
            <button
              v-for="(image, index) in galleryImages"
              :key="`${image.src}-${index}`"
              type="button"
              class="image-gallery__thumb"
              :aria-label="`查看第 ${index + 1} 张图片`"
              :aria-current="index === galleryIndex ? 'true' : undefined"
              @click="goToImage(index)"
            >
              <img
                class="image-gallery__thumb-img"
                :src="image.src"
                :alt="image.alt || `缩略图 ${index + 1}`"
                loading="lazy"
                decoding="async"
              >
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.image-gallery {
  position: fixed;
  inset: 0;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: rgb(0 0 0 / 82%);
  backdrop-filter: blur(4px);
}

.image-gallery__main {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 56px 72px 20px;
  box-sizing: border-box;
}

.image-gallery__stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: min(96vw, 1200px);
  max-height: 100%;
  overflow: hidden;
  touch-action: pan-y pinch-zoom;

  &.is-zoomed {
    touch-action: none;
  }
}

.image-gallery__viewport {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: calc(100vh - 220px);
  overflow: hidden;

  &.is-zoomed,
  &.is-pinching {
    touch-action: none;
  }

  &.is-zoomed {
    cursor: grab;
    width: 100%;
    height: calc(100vh - 220px);

    &.is-dragging {
      cursor: grabbing;
    }
  }
}

.image-gallery__img {
  display: block;
  max-width: 100%;
  max-height: calc(100vh - 220px);
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 12px 40px rgb(0 0 0 / 35%);
  user-select: none;
  cursor: zoom-in;
  -webkit-user-drag: none;

  &.is-zoomed {
    cursor: zoom-out;
  }
}

.image-gallery__caption {
  margin: 14px 0 0;
  max-width: 100%;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
  color: rgb(255 255 255 / 88%);
}

.image-gallery__counter {
  position: absolute;
  top: -36px;
  right: 0;
  font-size: 0.82rem;
  color: rgb(255 255 255 / 72%);
  font-variant-numeric: tabular-nums;
}

.image-gallery__thumbs {
  position: relative;
  width: 100%;
  padding: 12px 0 calc(14px + env(safe-area-inset-bottom, 0px));
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(to top, rgb(0 0 0 / 55%), rgb(0 0 0 / 18%));
  border-top: 1px solid rgb(255 255 255 / 10%);
}

.image-gallery__thumbs-indicator {
  position: absolute;
  top: 12px;
  left: 50%;
  z-index: 2;
  width: 72px;
  height: 54px;
  border: 2px solid var(--sakura-color-primary, #fe9500);
  border-radius: 8px;
  pointer-events: none;
  transform: translateX(-50%);
  box-shadow: 0 0 0 1px rgb(254 149 0 / 35%);
}

.image-gallery__thumbs-track {
  display: flex;
  gap: 10px;
  align-items: center;
  width: max-content;
  transition: transform 0.28s ease;
  will-change: transform;
}

.image-gallery__thumb {
  position: relative;
  flex: 0 0 auto;
  width: 72px;
  height: 54px;
  padding: 0;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: rgb(255 255 255 / 8%);
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: 0.72;

  &:hover {
    opacity: 0.95;
    transform: translateY(-2px);
  }

  &[aria-current='true'] {
    opacity: 1;
  }
}

.image-gallery__thumb-img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  user-select: none;
  pointer-events: none;
}

.image-gallery__close,
.image-gallery__nav {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  cursor: pointer;
  color: #fff;
  background: rgb(0 0 0 / 42%);
  transition: background 0.2s ease;

  &:hover {
    background: rgb(0 0 0 / 62%);
  }
}

.image-gallery__close {
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 1;
  font-family: system-ui, sans-serif;
}

.image-gallery__nav {
  top: 50%;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  transform: translateY(-50%);

  svg {
    display: block;
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2.25;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &--prev {
    left: 16px;
  }

  &--next {
    right: 16px;
  }
}

.image-gallery-fade-enter-active,
.image-gallery-fade-leave-active {
  transition: opacity 0.2s ease;
}

.image-gallery-fade-enter-from,
.image-gallery-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .image-gallery__main {
    padding: 48px 12px 12px;
  }

  .image-gallery__nav {
    display: none;
  }

  .image-gallery__img {
    max-height: calc(100vh - 200px);
  }

  .image-gallery__thumb,
  .image-gallery__thumbs-indicator {
    width: 60px;
    height: 45px;
  }

  .image-gallery__thumbs {
    padding-inline: 0;
  }
}
</style>

```

第四第四~
##### 新增`utils\useLightboxSwipe.ts`
```
export interface LightboxSwipeHandlers {
  onTouchStart: (event: TouchEvent) => void
  onTouchEnd: (event: TouchEvent) => void
  onTouchCancel: () => void
}

export function createLightboxSwipeHandlers(options: {
  enabled: () => boolean
  onPrev: () => void
  onNext: () => void
  shouldIgnore?: () => boolean
  threshold?: number
}): LightboxSwipeHandlers {
  const threshold = options.threshold ?? 48

  let touchStartX = 0
  let touchStartY = 0
  let tracking = false

  function reset() {
    tracking = false
  }

  function onTouchStart(event: TouchEvent) {
    if (!options.enabled() || options.shouldIgnore?.())
      return

    if (event.touches.length !== 1)
      return

    touchStartX = event.touches[0].clientX
    touchStartY = event.touches[0].clientY
    tracking = true
  }

  function onTouchEnd(event: TouchEvent) {
    if (!tracking)
      return

    tracking = false

    if (!options.enabled() || options.shouldIgnore?.())
      return

    const touch = event.changedTouches[0]
    if (!touch)
      return

    const deltaX = touch.clientX - touchStartX
    const deltaY = touch.clientY - touchStartY

    if (Math.abs(deltaX) < threshold)
      return

    if (Math.abs(deltaY) > Math.abs(deltaX))
      return

    if (deltaX > 0)
      options.onPrev()
    else
      options.onNext()
  }

  return {
    onTouchStart,
    onTouchEnd,
    onTouchCancel: reset,
  }
}
```

最后一个啦
 ##### 新增`utils\useLightboxZoom.ts`
```
import { computed, ref, type Ref } from 'vue'

const MIN_SCALE = 1
const MAX_SCALE = 4
const DOUBLE_TAP_SCALE = 2
const DBLCLICK_TOUCH_GUARD_MS = 700
const DRAG_START_THRESHOLD = 6
const WHEEL_ZOOM_INTENSITY = 0.002

function getTouchDistance(touches: TouchList) {
  if (touches.length < 2)
    return 0

  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY
  return Math.hypot(dx, dy)
}

function getTouchMidpoint(touches: TouchList) {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  }
}

export function useLightboxZoom(imageRef: Ref<HTMLImageElement | null>) {
  const currentScale = ref(MIN_SCALE)
  const isDragging = ref(false)
  const isPinching = ref(false)
  const isWheelZooming = ref(false)
  const panOffset = ref({ x: 0, y: 0 })

  const isZoomed = computed(() => currentScale.value > MIN_SCALE + 0.01)

  let dragStartX = 0
  let dragStartY = 0
  let startPanX = 0
  let startPanY = 0
  let pendingDrag = false
  let activePointerId: number | null = null
  let dragCaptureTarget: HTMLElement | null = null

  let pinchStartDistance = 0
  let pinchStartScale = MIN_SCALE
  let pinchStartPan = { x: 0, y: 0 }
  let pinchStartFocal = { x: 0, y: 0 }
  let pinchLayoutCenter = { x: 0, y: 0 }
  let suppressDblClickUntil = 0
  let wheelZoomEndTimer: ReturnType<typeof setTimeout> | undefined

  function markTouchGesture() {
    suppressDblClickUntil = Date.now() + DBLCLICK_TOUCH_GUARD_MS
  }

  const imageTransformStyle = computed(() => {
    if (currentScale.value <= MIN_SCALE && panOffset.value.x === 0 && panOffset.value.y === 0)
      return {}

    const interacting = isDragging.value || isPinching.value || isWheelZooming.value

    return {
      transform: `translate(${panOffset.value.x}px, ${panOffset.value.y}px) scale(${currentScale.value})`,
      transformOrigin: 'center center',
      transition: interacting ? 'none' : 'transform 0.25s ease',
    }
  })

  function getLayoutCenter() {
    const img = imageRef.value
    if (!img)
      return null

    const rect = img.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0)
      return null

    return {
      x: rect.left + rect.width / 2 - panOffset.value.x,
      y: rect.top + rect.height / 2 - panOffset.value.y,
    }
  }

  function adjustPanForScaleChange(
    focalX: number,
    focalY: number,
    oldScale: number,
    newScale: number,
  ) {
    const center = getLayoutCenter()
    if (!center)
      return

    panOffset.value = {
      x: focalX - center.x - (focalX - center.x - panOffset.value.x) * (newScale / oldScale),
      y: focalY - center.y - (focalY - center.y - panOffset.value.y) * (newScale / oldScale),
    }
  }

  function setScaleAt(focalX: number, focalY: number, newScale: number) {
    const oldScale = currentScale.value
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale))

    if (Math.abs(clamped - oldScale) < 0.001)
      return

    adjustPanForScaleChange(focalX, focalY, oldScale, clamped)
    currentScale.value = clamped
  }

  function resetZoomState() {
    currentScale.value = MIN_SCALE
    isDragging.value = false
    isPinching.value = false
    isWheelZooming.value = false
    pendingDrag = false
    activePointerId = null
    dragCaptureTarget = null
    panOffset.value = { x: 0, y: 0 }
    pinchStartDistance = 0
  }

  function releasePointerCapture() {
    if (dragCaptureTarget && activePointerId !== null) {
      try {
        dragCaptureTarget.releasePointerCapture(activePointerId)
      }
      catch {
        // pointer may already be released
      }
    }

    activePointerId = null
    dragCaptureTarget = null
  }

  function zoomImageAt(clientX: number, clientY: number) {
    if (isZoomed.value) {
      resetZoomState()
      return
    }

    const img = imageRef.value
    if (!img)
      return

    const rect = img.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0)
      return

    setScaleAt(clientX, clientY, DOUBLE_TAP_SCALE)
  }

  function onImageDblClick(event: MouseEvent) {
    if (Date.now() < suppressDblClickUntil) {
      event.preventDefault()
      return
    }

    pendingDrag = false
    isDragging.value = false
    releasePointerCapture()

    zoomImageAt(event.clientX, event.clientY)
  }

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === 'touch')
      markTouchGesture()

    if (!isZoomed.value || isPinching.value || event.button !== 0)
      return

    pendingDrag = true
    activePointerId = event.pointerId
    dragCaptureTarget = event.currentTarget as HTMLElement
    dragStartX = event.clientX
    dragStartY = event.clientY
    startPanX = panOffset.value.x
    startPanY = panOffset.value.y
  }

  function onPointerMove(event: PointerEvent) {
    if (!pendingDrag && !isDragging.value)
      return

    if (activePointerId !== null && event.pointerId !== activePointerId)
      return

    if (pendingDrag && !isDragging.value) {
      const dx = event.clientX - dragStartX
      const dy = event.clientY - dragStartY

      if (Math.hypot(dx, dy) < DRAG_START_THRESHOLD)
        return

      isDragging.value = true
      pendingDrag = false

      if (dragCaptureTarget)
        dragCaptureTarget.setPointerCapture(event.pointerId)
    }

    panOffset.value = {
      x: startPanX + event.clientX - dragStartX,
      y: startPanY + event.clientY - dragStartY,
    }
  }

  function onPointerUp(event: PointerEvent) {
    if (activePointerId !== null && event.pointerId !== activePointerId)
      return

    pendingDrag = false
    isDragging.value = false
    releasePointerCapture()
  }

  function onWheel(event: WheelEvent) {
    event.preventDefault()

    isWheelZooming.value = true
    clearTimeout(wheelZoomEndTimer)
    wheelZoomEndTimer = setTimeout(() => {
      isWheelZooming.value = false
    }, 120)

    const newScale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, currentScale.value * Math.exp(-event.deltaY * WHEEL_ZOOM_INTENSITY)),
    )

    if (newScale <= MIN_SCALE + 0.02) {
      resetZoomState()
      return
    }

    setScaleAt(event.clientX, event.clientY, newScale)
  }

  function onTouchStart(event: TouchEvent) {
    markTouchGesture()

    if (event.touches.length !== 2)
      return

    isPinching.value = true
    isDragging.value = false
    pendingDrag = false
    releasePointerCapture()

    pinchStartDistance = getTouchDistance(event.touches)
    pinchStartScale = currentScale.value
    pinchStartPan = { ...panOffset.value }
    pinchStartFocal = getTouchMidpoint(event.touches)

    const center = getLayoutCenter()
    if (center)
      pinchLayoutCenter = { ...center }

    event.preventDefault()
  }

  function onTouchMove(event: TouchEvent) {
    if (event.touches.length === 2 && isPinching.value) {
      const distance = getTouchDistance(event.touches)
      if (pinchStartDistance <= 0)
        return

      const focal = getTouchMidpoint(event.touches)
      const newScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, pinchStartScale * (distance / pinchStartDistance)),
      )

      const ratio = newScale / pinchStartScale
      panOffset.value = {
        x: focal.x - pinchLayoutCenter.x
          - (pinchStartFocal.x - pinchLayoutCenter.x - pinchStartPan.x) * ratio
          + (focal.x - pinchStartFocal.x),
        y: focal.y - pinchLayoutCenter.y
          - (pinchStartFocal.y - pinchLayoutCenter.y - pinchStartPan.y) * ratio
          + (focal.y - pinchStartFocal.y),
      }

      currentScale.value = newScale
      event.preventDefault()
    }
  }

  function onTouchEnd(event: TouchEvent) {
    markTouchGesture()

    if (!isPinching.value || event.touches.length >= 2)
      return

    isPinching.value = false
    pinchStartDistance = 0

    if (currentScale.value <= MIN_SCALE + 0.02)
      resetZoomState()
  }

  function onTouchCancel() {
    markTouchGesture()

    if (isPinching.value) {
      isPinching.value = false
      pinchStartDistance = 0

      if (currentScale.value <= MIN_SCALE + 0.02)
        resetZoomState()
    }
  }

  return {
    isZoomed,
    isDragging,
    isPinching,
    imageTransformStyle,
    resetZoomState,
    onImageDblClick,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onWheel,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
  }
}
```

说一嘴，上面这个一行一个空格，其实本来不这样，但是复制过来自己加上了，但是不影响，就是有点不雅观~好啦到此结束咯~

