<template>
  <header class="m-header">
    <div class="icon"></div>
    <h1 class="text">Music</h1>
    <router-link class="mine" to="/">
      <i class="music-icon icon-mine"></i>
    </router-link>
  </header>
</template>

<script>
export default {}
</script>

<style lang="less">
@import '~assets/less/variable';
@import '~assets/less/mixin';

.m-header {
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 999;
  width: 100%;
  height: 44px;
  text-align: center;
  color: @cl-primary;
  font-size: 0;
  background-color: #fff;
  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    .bg-image('./logo');
    background-size: 30px 32px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: @fs-x;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;

    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: @cl-primary;
    }
  }
}
</style>
