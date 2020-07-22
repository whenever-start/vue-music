<template>
  <div class="search-input">
    <van-icon
      v-show="results.length > 0"
      name="arrow-left"
      class="search-input-back"
      @click="back"
    />
    <div class="input-box">
      <i class="icon-search input-icon"></i>
      <input
        ref="input"
        type="text"
        class="input"
        :placeholder="placeholder"
        :value="query"
        @input="onInput"
        @keyup.enter="onChange"
        @compositionstart="onComposition"
        @compositionend="onComposition"
        @compositionupdate="onComposition"
      />
      <i class="icon-dismiss input-icon" @click.stop="clear" v-show="query"></i>
    </div>
    <!-- 搜索建议 -->
    <div class="search-suggest" v-show="show">
      <p class="search-suggest-head">搜索{{ `\"${query}\"` }}</p>
      <ul class="suggest-list">
        <li
          class="suggest-list-item"
          v-for="(item, index) in suggests"
          :key="index"
          @click="selectQuery(item.keyword)"
        >
          {{ item.keyword }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { searchMixin } from 'assets/js/mixin'
export default {
  mixins: [searchMixin],
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOnComposition: false,
      show: false
    }
  },
  methods: {
    onComposition(e) {
      if (e.type === 'compositionstart') {
        this.isOnComposition = true
      } else if (e.type === 'compositionend') {
        this.isOnComposition = false
        this.onInput(e)
      }
    },
    onInput(e) {
      if (this.isOnComposition) return
      let value = e.target.value

      this.show = value.trim() !== '' ? true : false

      this.$emit('input', value.trim())
    },
    onChange(e) {
      this.show = false
      this.$emit('change', e)
    },
    clear() {
      this.show = false
      this.$emit('input', '')
    },
    back() {
      if (this.results.length > 0) {
        this.$emit('back')
      }
    },
    selectQuery(query) {
      console.log('select query: ', query)
      this.show = false
      const e = { target: { value: query } }
      this.$emit('input', query)
      this.$emit('change', e)
    }
  }
}
</script>
