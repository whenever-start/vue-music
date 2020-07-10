<template>
  <div class="home">
    <m-header />
    <tab class="tab" />
    <keep-alive>
      <router-view class="view" :class="cls"></router-view>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
import mHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    mHeader,
    Tab
  },
  computed: {
    ...mapGetters(['playlist']),
    cls() {
      return this.playlist.length > 0 ? 'pd-bottom-60' : ''
    }
  }
}
</script>
