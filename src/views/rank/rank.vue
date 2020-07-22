<template>
  <div class="rank">
    <section class="rank-content">
      <!-- <rank-list :ranks="ranks" /> -->
      <rank-list :ranks="ranks"></rank-list>
    </section>
  </div>
</template>

<script>
import RankList from './rank-list'
import { CODE_OK } from 'request/config'
import { createRank } from 'assets/js/rank'

export default {
  components: {
    RankList
  },
  data() {
    return {
      ranks: []
    }
  },
  methods: {
    _getRanks() {
      this.$services.rank().then((res) => {
        if (res.code === CODE_OK) {
          console.log(res)
          this.ranks = this.formatRanks(res.list)
          console.log(this.ranks)
        }
      })
    },
    formatRanks(list) {
      let _list = []
      list.forEach((item) => {
        _list.push(createRank(item))
      })
      return _list
    }
  },
  created() {
    this._getRanks()
  }
}
</script>
