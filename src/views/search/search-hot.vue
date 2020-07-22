<template>
  <div class="search-hot">
    <div class="search-hot-head"><em class="txt">热搜榜</em></div>

    <ul class="hot-list">
      <li
        class="hot-list-item"
        v-for="(item, index) in hots"
        :key="index"
        @click="selectItem(item.searchWord)"
      >
        <span class="hot-list-index">{{ index + 1 }}</span>
        <div class="hot-list-main">
          <div class="hot-list-title">
            <span>{{ item.searchWord }}</span>
            <img class="hot-list-tag" v-if="item.iconUrl" :src="item.iconUrl" />
          </div>
          <p class="hot-list-assist">{{ item.content }}</p>
        </div>
        <span class="hot-list-score">{{ item.score }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hots: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem(query) {
      this.$emit('search', query)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/variable';
.search-hot {
  margin-top: 30px;
  &-head {
    .txt {
      font-weight: bold;
    }
  }

  .hot-list {
    margin-top: 15px;

    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 25px;

      &:first-child {
        margin-top: 0;
      }

      &:nth-child(-n + 3) {
        .hot-list-index {
          color: @cl-primary;
          font-weight: bold;
        }
      }

      .hot-list-index {
        flex: none;
        color: @cl-assist;
      }

      .hot-list-main {
        margin-left: 20px;
        flex: 1 0 0;
        overflow: hidden;

        .hot-list-title {
          display: flex;
          align-items: center;
          color: #000;
          font-weight: bold;
          font-size: @fs-x;

          .hot-list-tag {
            max-width: 28px;
            max-height: 15px;
            margin-left: 10px;
          }
        }

        .hot-list-assist {
          margin-top: 10px;
          color: @cl-assist;
        }
      }

      .hot-list-score {
        flex: none;
        color: @cl-assist;
      }
    }
  }
}
</style>
