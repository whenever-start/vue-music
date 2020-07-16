<template>
  <div class="singer-list">
    <div class="anchor" :class="index === anchorIndex ? 'anchor--fixed' : ''">
      {{ item.title }}
    </div>
    <ul class="list">
      <li
        class="list-cell"
        v-for="singer in item.items"
        :key="singer.id"
        @click="selectItem(singer, index)"
      >
        <div class="avatar">
          <img :src="singer.avatar" alt="" />
        </div>
        <p class="name">{{ singer.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    anchorIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    selectItem(singer, index) {
      this.$emit('select', { singer, index })
    }
  }
}
</script>
