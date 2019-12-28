<template>
  <div class="home">
    <div ref="myChart" class="echarts"></div>
      <div ref="myChart1" class="echarts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    let myChart = echarts.init(this.$refs.myChart)
    let myChart1 = echarts.init(this.$refs.myChart1)
    var xAxisData = []
    var data1 = []
    var data2 = []
    var data3 = []
    var data4 = []

    for (var i = 0; i < 10; i++) {
      xAxisData.push('Class' + i)
      data1.push((Math.random() * 2).toFixed(2))
      data2.push(-Math.random().toFixed(2))
      data3.push((Math.random() * 5).toFixed(2))
      data4.push((Math.random() + 0.3).toFixed(2))
    }
    var itemStyle = {
      normal: {
      },
      emphasis: {
        barBorderWidth: 1,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.5)'
      }
    }
    myChart1.setOption({
      backgroundColor: '#eee',
      legend: {
        data: ['bar', 'bar2', 'bar3', 'bar4'],
        align: 'left',
        left: 10
      },
      brush: {
        toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
        xAxisIndex: 0
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          },
          dataView: {}
        }
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        name: 'X Axis',
        silent: false,
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {
        inverse: true,
        splitArea: { show: false }
      },
      grid: {
        left: 100
      },
      visualMap: {
        type: 'continuous',
        dimension: 1,
        text: ['High', 'Low'],
        inverse: true,
        itemHeight: 200,
        calculable: true,
        min: -2,
        max: 6,
        top: 60,
        left: 10,
        inRange: {
          colorLightness: [0.4, 0.8]
        },
        outOfRange: {
          color: '#bbb'
        },
        controller: {
          inRange: {
            color: '#2f4554'
          }
        }
      },
      series: [
        {
          name: 'bar',
          type: 'bar',
          stack: 'one',
          itemStyle: itemStyle,
          data: data1
        },
        {
          name: 'bar2',
          type: 'bar',
          stack: 'one',
          itemStyle: itemStyle,
          data: data2
        },
        {
          name: 'bar3',
          type: 'bar',
          stack: 'two',
          itemStyle: itemStyle,
          data: data3
        },
        {
          name: 'bar4',
          type: 'bar',
          stack: 'two',
          itemStyle: itemStyle,
          data: data4
        }
      ]
    })

    myChart.setOption({
      title: {
        text: '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    })
  }
}

</script>

<style lang='less' scoped>
.home {
  height: 100vh;
  background-size: cover;
  .echarts {
    width: 600px;
    height: 400px;
  }
}
</style>
