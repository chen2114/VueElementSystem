<template>
  <div class="line-chart">
    <el-row :gutter="40">
      <el-col
        v-for="(item, index) in gridList"
        :key="index"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <div class="grid-content">
          <ch-svg
            :icon-class="item.icon"
            :size="50"
            :color="item.color"
          />
          <div class="hidden-500-only">
            <h3>{{ item.title }}</h3>
            <count-to
              class="card-panel-num"
              :start-val="0"
              :end-val="item.count"
              :duration="3600"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <ch-chart
      width="100%"
      height="366px"
      :option="option"
    />
  </div>
</template>
<script>
export default {
  name: 'LineChart',
  data () {
    return {
      gridList: [
        {
          icon: 'peoples',
          color: '#40c9c6',
          title: 'New Visits',
          count: 13600
        },
        {
          icon: 'message',
          color: '#36a3f7',
          title: 'Messages',
          count: 13600
        },
        {
          icon: 'money',
          color: '#f4516c',
          title: 'Purchases',
          count: 13600
        },
        {
          icon: 'shopping',
          color: '#34bfa3',
          title: 'Shoppings',
          count: 13600
        }
      ],
      option: {}
    }
  },
  created () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.option = {
        backgroundColor: '#424956',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['移动', '电信', '联通'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#292f39'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35']
        }],
        yAxis: [{
          type: 'value',
          name: '单位（%）',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [
          {
            name: '移动',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(16,97,204, 0.3)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(17,235,210, 0)'
                  }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(16,97,204,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(17,235,210,1)'
                  }
                ])
              },
              emphasis: {
                color: 'rgb(0,196,132)',
                borderColor: 'rgba(0,196,132,0.2)',
                extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                borderWidth: 10
              }
            },
            data: [220, 182, 191, 134, 150, 120, 110, 125]
          },
          {
            name: '电信',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(205,52,42, 0.5)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(235,235,21, 0)'
                  }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(205,52,42,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(235,235,21,1)'
                  }])
              },
              emphasis: {
                color: 'rgb(99,250,235)',
                borderColor: 'rgba(99,250,235,0.2)',
                extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                borderWidth: 10
              }
            },
            data: [120, 110, 125, 145, 122, 165, 122, 220]
          }
        ]
      }
    }
  }
}
</script>
<style lang="less">
.line-chart {
  .grid-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 108px;
    padding: 20px;
    background-color: #fff;
    margin-bottom: 20px;
    cursor: pointer;
    h3 {
      margin-top: 0;
      opacity: 0.5;
    }
    .card-panel-num {
      font-weight: bold;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    .grid-content {
      justify-content: center;
      .hidden-500-only {
        display: none;
      }
    }
  }
}
</style>
