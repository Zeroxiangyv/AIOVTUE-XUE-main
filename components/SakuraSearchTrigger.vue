<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import { useSiteConfig } from 'valaxy'
import { useSakuraAppStore } from '../node_modules/valaxy-theme-sakura/stores'

const sakura = useSakuraAppStore()
const siteConfig = useSiteConfig()

// 优先检查 search.provider（valaxy 标准字段），回退到 search.type
const searchProvider = computed(() =>
  siteConfig.value.search?.provider || siteConfig.value.search?.type
)
const isAlgolia = computed(() => searchProvider.value === 'algolia')
const isFuse = computed(() => searchProvider.value === 'fuse' || searchProvider.value === 'local')

const SakuraAlgoliaSearch = defineAsyncComponent({
  loader: () => import('../node_modules/valaxy-theme-sakura/components/plugins/SakuraAlgoliaSearch.vue'),
  errorComponent: () => import('./SakuraSearch.vue'),
})
</script>

<template>
  <div flex="center">
    <button
      v-if="!isAlgolia"
      class="sakura-icon-btn sakura-search-btn"
      :title="'搜索'"
      @click="sakura.search.isOpen ? sakura.search.close() : sakura.search.open()"
    >
      <div v-if="!sakura.search.isOpen" i-mdi-search />
      <div v-else text="!2xl" i-mdi-close />
    </button>

    <SakuraAlgoliaSearch v-if="isAlgolia" :open="sakura.search.isOpen" @close="sakura.search.close" />
    <SakuraSearch v-else-if="isFuse" :open="sakura.search.isOpen" @close="sakura.search.close" />
  </div>
</template>

<style lang="scss" scoped>
.sakura-search-btn {
  z-index: 200;
}
</style>