<script setup lang="ts">
import { useAppStore } from 'valaxy'
import { computed } from 'vue'
import { useThemeConfig } from '../node_modules/valaxy-theme-sakura/composables'

const props = defineProps<{
  darkIcon?: string
  lightIcon?: string
}>()

const themeConfig = useThemeConfig()
const appStore = useAppStore()

const darkIcon = computed(() => props.darkIcon || themeConfig.value.ui.toggleDarkButton?.darkIcon)
const lightIcon = computed(() => props.lightIcon || themeConfig.value.ui.toggleDarkButton?.lightIcon)
</script>

<template>
  <button class="sakura-icon-btn sakura-toggle-dark select-none" type="button" aria-label="Toggle Color Scheme" @click="appStore.toggleDarkWithTransition">
    <ClientOnly>
      <div :class="appStore.isDark ? darkIcon : lightIcon" />
      <template #fallback>
        <div :class="lightIcon" />
      </template>
    </ClientOnly>
  </button>
</template>
