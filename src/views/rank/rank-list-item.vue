<template>
  <div class="rank-list-item" @click="selectItem">
    <div class="rank-image">
      <img :src="data.image" />
      <span class="rank-image-info">{{ data.updateInfo }}</span>
    </div>

    <div class="rank-item-list">
      <ul class="list">
        <li
          class="list-item van-ellipsis"
          v-for="(item, index) in data.list"
          :key="index"
        >
          {{ item.first }} - {{ item.second }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapMutations({
      setRank: 'SET_RANK'
    }),
    selectItem() {
      this.setRank(this.data)
      this.$router.push({
        path: '/top',
        query: { id: this.data.id }
      })
    }
  }
}
</script>
