<template>
  <div class="singer player-playlist">
    <!-- <div class="wrap" ref="wrap">
			<ul class="list">
				<li class="list-cell"
					v-for="n in 100"
					:key="n"
				>{{n}}</li>
			</ul>
		</div> -->
    <div class="wrap" ref="listWrap" @click="fn">
      <ul class="list">
        <!-- <li class="list-cell"
                    v-for="song in sequenceList"
                    :key="song.id"
                >
                    <div class="content">
                        <i class="icon-play"></i>
                        <p class="info van-ellipsis">{{song.name}} {{song.singer}}</p>
                        <i class="icon-delete"></i>
                    </div>
                </li> -->
        <li class="list-cell" v-for="n in 100" :key="n">{{ n }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BScroll from 'better-scroll'

export default {
  // components: {
  // },
  // methods: {
  // 	_initScroll() {
  // 		this.scroll = new BScroll(this.$refs.wrap, {})
  // 	}
  // },
  // mounted() {
  // 	this._initScroll()
  // },
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    fn() {
      console.log('fn')
    },
    _initScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.listWrap, {})
      })
      // this.$once('hook:update', this._initScroll)
    }
  },
  mounted() {
    this._initScroll()
  }
}
</script>

<style lang="less" scoped>
// .singer {
// 	// height: 80%;
// 	position: relative;
// 	// top: 0;
// 	// bottom: 100px;
// 	background-color: pink;
// 	.wrap {
// 		position: absolute;
// 		top: 0;
// 		bottom: 0;
// 		width: 100%;
// 		overflow: hidden;
// 		.list {
// 			background-color: #fff;
// 			&-cell {
// 				text-align: center;
// 				line-height: 40px;
// 			}
// 		}
// 	}
// }
@import '~assets/less/variable';

.player-playlist {
  padding: 0 @pd-base;
  height: 100%;
  overflow: hidden;
  position: relative;
  position: fixed;
  width: 100%;
  top: 200px;
  // z-index: 3000;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left,
    &-right {
      display: flex;
      align-items: center;
      height: 60px;
    }

    &-left {
      .text {
        margin-left: 10px;
      }
    }

    &-right {
      .text {
        margin-right: 10px;
      }
    }

    .icon {
      font-size: 18px;
      color: @cl-assist-l;
    }
  }

  .wrap {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;

    .list {
      &-cell {
        height: 40px;
        height: 140px;
        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }
      }
    }
  }
}
</style>
