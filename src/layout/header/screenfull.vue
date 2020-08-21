<template>
  <div @click="handleFullscreen">
    <ch-svg
      class="m-r20 cursor"
      color="#5a5e66"
      :icon-class="isFullscreen?'exitFullscreen':'fullscreen'"
      :size="20"
    />
  </div>
</template>
<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    // 全屏
    handleFullscreen () {
      // 如果不允许进入全屏，发出不允许提示
      if (!screenfull.isEnabled) {
        this.$message({
          message: '您的浏览器无法全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy () {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>
