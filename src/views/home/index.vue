<template>
  <div class="home">
    <line-chart />
  </div>
</template>
<script>
import lineChart from './lineChart'
export default {
  name: 'Home',
  components: {
    lineChart
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less">
.home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f0f2f5;
}
</style>
