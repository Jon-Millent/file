<template>
  <div>
    <transition name="m-cover-fade">
      <div class="m-cover" v-if="myShow" @click="clickClose"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  // <Mcover @close="close" ></Mcover>

  export default{
    data () {
      return {
        myShow: false
      }
    },
    methods: {
      open () {
        this.myShow = true;
      },
      close () {
        this.myShow = false;
      },

      clickClose () {
        this.$emit('close');
        this.close();
      }
    }
  }
</script>

<style type="text/sass" lang="sass">
.m-cover
  position: fixed
  z-index: 100
  left: 0
  right: 0
  bottom: 0
  top: 0
  background-color: #000
  opacity: 0.7

.m-cover-fade-enter-active, .m-cover-fade-leave-active
  opacity: 0
  transition: all 1s ease

.m-cover-fade-enter, .m-cover-fade-enter-to
  opacity: .7



/*.m-cover-fade-leave, .m-cover-fade-enter-active*/
  /*opacity: 0.6*/
</style>
