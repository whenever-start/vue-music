<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{ 'dot--active': curPageIndex === index }"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      slider: null,
      dots: 0,
      curPageIndex: 0,
      timer: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this._setSliderWidth()
    this._initDots()
    this._initSlider()
    this.autoGoNext()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.slider.destroy()
  },
  methods: {
    autoGoNext() {
      clearInterval(this.timer)
      if (this.autoplay) {
        this.timer = setInterval(() => {
          this.slider.next()
        }, this.interval)
      }
    },
    HandleResize() {
      clearInterval(this.timer)

      const items = this.$refs.sliderGroup.children
      let sliderWidth = this.$el.clientWidth
      let width = sliderWidth * items.length
      this.$refs.sliderGroup.style.width = width + 'px'
      items.forEach((item) => {
        item.style.width = sliderWidth + 'px'
      })

      this.autoGoNext()
      this.slider.refresh()
    },
    _setSliderWidth() {
      const items = this.$refs.sliderGroup.children
      let sliderWidth = this.$el.clientWidth
      let width = sliderWidth * items.length

      items.forEach((item) => {
        item.classList.add('slider-item')
        item.style.width = sliderWidth + 'px'
      })

      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'

      window.addEventListener('resize', this.HandleResize)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.HandleResize)
      })
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        click: true,
        snap: {
          loop: this.loop,
          threshold: 100
        },
        momentum: false, // 如果为 true, 一下可以滚动好几个页面
        bounce: false, // 滚动过量后回弹
        stopPropagation: true, // 多用在 嵌套 scroll 场景
        probeType: 2
      })

      this.slider.on('scrollStart', () => {
        clearInterval(this.timer)
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.curPageIndex = pageIndex

        this.autoGoNext()
      })
    },
    _initDots() {
      this.dots = this.$refs.sliderGroup.children.length
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/variable.less';
@import '../../assets//less/mixin.less';

.slider {
  position: relative;

  .slider-group {
    .clearfix();
    .slider-item {
      float: left;
    }
  }

  .dots {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);

    .dot {
      float: left;
      margin-left: 4px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px #ccc solid;

      &:first-child {
        margin-left: 0;
      }

      &--active {
        background-color: @cl-text-ll;
      }
    }
  }
}
</style>
