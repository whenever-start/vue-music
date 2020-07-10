<template>
  <!-- 使用时需要 v-if="数据非空" -->
  <ul class="list" ref="list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    col: {
      type: Number,
      default: 2
    },
    xGap: {
      type: Number,
      default: 10
    },
    yGap: {
      type: Number,
      default: 10
    }
  },
  mounted() {
    this._initItemStyle()
  },
  methods: {
    _initItemStyle() {
      const items = this.$refs.list.children
      // li宽度 = (ul宽度-总间隔长度) / 总列数
      let width =
        (this.$refs.list.offsetWidth - (this.col - 1) * this.xGap) / this.col

      items.forEach((item, index) => {
        item.classList.add('list-item')
        item.style.width = width + 'px'
        item.style.marginLeft = this.xGap + 'px'
        item.style.marginTop = this.yGap + 'px'

        // 第一列
        if ((index + 1) % this.col === 1) {
          item.style.marginLeft = 0
        }
        // 第一行
        if (index < this.col) {
          item.style.marginTop = 0
        }
      })

      this.$once('hook:updated', this._initItemStyle)

      window.addEventListener('resize', this.handleResize)
      this.$once('hook:destroyed', () => {
        window.removeEventListener('resize', this.handleResize)
      })
    },
    handleResize() {
      const items = this.$refs.list.children
      let width =
        (this.$refs.list.offsetWidth - (this.col - 1) * this.xGap) / this.col

      items.forEach((item) => {
        item.style.width = width + 'px'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/mixin';
.list {
  .clearfix();

  &-item {
    float: left;
  }
}
</style>
