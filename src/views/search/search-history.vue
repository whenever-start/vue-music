<template>
  <div class="search-history">
    <div class="search-history-head">
      <span class="txt">历史记录</span>
      <i class="icon-clear icon" @click="clear"></i>
    </div>
    <ul class="search-history-list" v-if="histories.length > 0">
      <li
        class="list-item"
        v-for="(query, index) in histories"
        :key="index"
        @click="onClick(query)"
      >
        {{ query }}
      </li>
    </ul>
    <p class="search-history-none" v-else>暂无搜索记录</p>
  </div>
</template>

<script>
export default {
  props: {
    histories: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onClick(query) {
      this.$emit('search', query)
    },
    clear() {
      this.$emit('clear')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/variable';
.search-history {
  margin-top: 10px;

  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .txt {
      font-weight: bold;
    }

    .icon {
      font-size: 20px;
      color: @cl-assist-l;
    }
  }

  &-list {
    margin-top: 15px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    .list-item {
      padding: 8px 16px;
      border-radius: 999px;
      background-color: #f6f6f6;
      color: #000;
      margin-left: 8px;
      flex: none;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  &-none {
    line-height: 2.4em;
    text-align: center;
    color: @cl-assist;
  }
}
</style>
