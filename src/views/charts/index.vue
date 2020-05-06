<template>
  <div class="echarts">
    <div class="echarts-container">
    </div>
  </div>
</template>
<script>
import chartData from './chartData.json'

export default {
  name: 'Charts',
  data () {
    return {
      chartData
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      const colorList = [
        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
        '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
        '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5',
        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
        '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
        '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0',
        '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
        '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51',
        '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe',
        '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
      ]
      this.chartData = this.chartData.map((item, index) => {
        const tmp = { ...item }
        tmp.itemStyle.normal.shadowColor = colorList[index]
        tmp.itemStyle.normal.color = colorList[index]
        return tmp
      })
      const myChart = this.$echarts.init(document.querySelector('.echarts-container'))
      myChart.setOption({
        // 图表标题
        title: {
          show: true, // 显示策略，默认值true,可选为：true（显示）| false（隐藏）
          text: '微博热搜榜话题图谱', // 主标题文本，'\n'指定换行
          x: 'center', // 水平安放位置，默认为左对齐，可选为：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          y: 'bottom', // 垂直安放位置，默认为全图顶端，可选为：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          // textAlign: null, // 水平对齐方式，默认根据x设置自动调整
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc', // 标题边框颜色
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          padding: 5, // 标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
          itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: '#333' // 主标题文字颜色
          },
          subtextStyle: {
            color: '#aaa' // 副标题文字颜色
          }
        },
        backgroundColor: '#fff',
        tooltip: {},
        animationDurationUpdate: (idx) => {
          return idx * 100 // 越往后的数据延迟越大
        },
        animationEasingUpdate: 'bounceIn',
        color: ['#fff', '#fff', '#fff'],
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 250,
            edgeLength: 10
          },
          roam: true,
          label: {
            normal: {
              show: true
            }
          },
          data: this.chartData
        }]
      })
      myChart.on('click', (params) => {
        console.log(params)
      })
    }
  }
}
</script>
<style lang="less">
.echarts {
  width: 100%;
  height: 100%;
  &-container {
    width: 100%;
    height: 100%;
  }
}
</style>
