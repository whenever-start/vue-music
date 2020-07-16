<template>
  <nav class="tab">
    <router-link
      class="tab-item"
      v-for="item in tabs"
      :key="item.path"
      :to="item.path"
      active-class="tab-item--active"
    >
      <span class="tab-label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { label: '推荐', path: '/recommend' },
        { label: '歌手', path: '/singer' },
        { label: '排行榜', path: '/rank' },
        { label: '搜索', path: '/search' }
      ]
    }
  }
}
</script>
