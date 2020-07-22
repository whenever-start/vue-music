<template>
  <div class="rank-list">
    <rank-list-item
      v-for="item in ranks"
      :key="item.id"
      :data="item"
    ></rank-list-item>
  </div>
</template>

<script>
import RankListItem from './rank-list-item'
export default {
  components: {
    RankListItem
  },
  props: {
    ranks: {
      type: Array,
      default: () => []
    }
  }
}
</script>
