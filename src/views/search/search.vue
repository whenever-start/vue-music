<template>
  <div class="page-search">
    <search-input
      class="page-search-head"
      :placeholder="placeholder"
      @back="back"
      @change="onSearch(query)"
      @input="onInput"
    />

    <div class="page-search-main">
      <div v-show="showContent === 'default'">
        <search-history
          :histories="histories"
          @search="onSearch"
          @clear="clear"
        ></search-history>

        <search-hot :hots="hots" @search="onSearch"></search-hot>
      </div>

      <search-result
        v-show="showContent === 'search'"
        :results="results"
        :loading="resultLoading"
        @selectSong="selectSong"
      />
    </div>
  </div>
</template>

<script>
import SearchInput from './search-input'
import SearchHot from './search-hot'
import SearchHistory from './search-history'
import SearchResult from './search-result'
import { CODE_OK } from 'request/config'
import { searchMixin, playerMixin } from 'assets/js/mixin'
import { createSong } from 'assets/js/song'

export default {
  mixins: [searchMixin, playerMixin],
  components: {
    SearchInput,
    SearchHistory,
    SearchHot,
    SearchResult
  },
  data() {
    return {
      placeholder: '查询歌曲',
      limit: 30,
      offset: 0,
      /**
       * 取值: default, search
       * onSearch() => search
       * back() => default
       */
      showContent: 'default',
      resultLoading: false
    }
  },
  methods: {
    onSearch(query) {
      if (query === '') return
      this.showContent = 'search'
      this.resultLoading = true
      this.setQuery(query)
      this.$services
        .search({
          params: {
            limit: this.limit,
            offset: this.offset,
            keywords: query
          }
        })
        .then((res) => {
          if (res.code === CODE_OK) {
            this.setHistories(query)
            this.setResults(res.result.songs)
            this.resultLoading = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.resultLoading = false
        })
    },
    selectSong(song) {
      this.$services
        .songDetail({
          params: { ids: song.id }
        })
        .then((res) => {
          if (res.code === CODE_OK) {
            let list = [createSong(res.songs[0])]
            this.selectPlay({
              list,
              index: 0
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onInput(query) {
      this.setQuery(query)
    },
    clear() {
      this.clearHistories()
    },
    back() {
      this.showContent = 'default'
      this.setQuery('')
      this.setResults([])
    },
    _getSuggest() {
      if (this.query === '') return
      this.$services
        .searchSuggest({
          params: { keywords: this.query, type: 'mobile' }
        })
        .then((res) => {
          if (res.code === CODE_OK) {
            this.setSuggests(res.result.allMatch)
          }
        })
    },
    _getHots() {
      this.$services.searchHotDetail().then((res) => {
        if (res.code === CODE_OK) {
          this.setHots(res.data)
        }
      })
    }
  },
  created() {
    this._getHots()
  },
  watch: {
    query(newVal) {
      if (newVal === '') {
        this.setSuggests([])
      }
      this._getSuggest()
    }
  }
}
</script>

<style lang="less" scoped></style>
