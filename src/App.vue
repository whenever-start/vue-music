<template>
  <div id="app">
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import Player from 'components/player/player'

export default {
  components: {
    Player
  },
  methods: {
    saveVuex() {
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem('store'))
          )
        )
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      })
    }
  },
  created() {
    this.saveVuex()
  }
}
</script>

<style lang="less">
@import '~assets/less/index.less';
@import '~assets/less/style.less';
</style>
