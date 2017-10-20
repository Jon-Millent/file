<template>
  <div class="m-view">
    <transition :name="transitionName">
      <router-view class="m-router"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  // 带切换动画的 路由
  export default {
    data () {
      return {
        transitionName : 'slide-go'
      }
    },
    watch: {
      '$route' (to, from) {
        if (from.query.time) {
          if (to.query.time > from.query.time) {
            this.transitionName = 'slide-go'
          } else {
            this.transitionName = 'slide-back'
          }
        } else {
          this.transitionName = 'slide-go'
        }
      }
    }
  }

</script>

<style type="text/css">

</style>
