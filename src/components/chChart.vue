<template>
  <div
    :id="id"
    :class="className"
    :style="{height:height,width:width}"
  />
</template>
<script>
import chartResize from '@/utils/chartResize'

export default {
  name: 'ChChart',
  mixins: [chartResize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    option: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
      this.chart.on('click', (params) => {
        this.$emit('click', params)
      })
    }
  }
}
</script>
