<style>
  .el-echart-funnel {
    width:100%;
    height:100%;
    min-width:300px;
    min-height:600px;
  }
</style>

<template>
    <div class="el-echart-funnel" :id="id"></div>
</template>
<script>
    // import echarts from 'echarts'
    import { mapState } from 'Vuex';
    export default {
      name: 'ElEchartFunnel',
      data: function () {
        return {
          echart: {}
        }
      },
      props: {
        data: {},
        id: {
          default: 'echart-funnel'
        },
        option: {
          default () {
            return {
              blendMode: 'lighter',
              /*title: {
                text: '营销漏斗',
                left: 'left'
              }*/
            }
          }
        }
      },
      methods: {
        // 绘图
        drawFunnel: function (id) {
          this.echart = this.echartsLib.init(document.getElementById(id))
          // 处理原数据，计算出最大值,并加入画图时所需要的维度数据
          var maxValue = 0
          this.data.forEach(function (item) {
            maxValue = Math.max(maxValue, item[0])
          })
          var list = this.data.sort(function (item1, item2) {
            return (item2[0] - item1[0])
          }).map(function (item, index) {
            return [item[0], item[1], item[2], maxValue] // [value,color,label,maxValue] 四个维度
          })

          function renderItem (params, api) {
            var value = api.value(0)
            // var color = api.value(1)
            var label = api.value(2)
            // var maxValue = api.value(3)
            var centerX = api.getWidth() / 2
            var shapes = []
            var series = api.currentSeriesIndices()
            var seriesIndex = series.indexOf(params.seriesIndex)

            var aleph = Math.PI * (55 / 180)
            var clientHeight = api.getHeight() - 60
            var height = clientHeight / series.length
            var centerY = api.getHeight() - height * (series.length - seriesIndex - 0.5) - 20
            var twidth = height * (series.length - seriesIndex) * Math.tan(aleph)
            var bwidth = height * (series.length - seriesIndex - 1) * Math.tan(aleph)
            var width = (twidth + bwidth) / 2
            shapes.push({
              type: 'polygon',
              id: 'range' + label,
              invisible: true,
              shape: {
                points: [
                          [centerX - twidth / 2, centerY - height / 2],
                          [centerX + twidth / 2, centerY - height / 2],
                          [centerX + bwidth / 2, centerY + height / 2],
                          [centerX - bwidth / 2, centerY + height / 2]
                ]
              },
              style: api.style(),
              onclick: function () { 
                console.log('onclick!!');
              }  
            })
            shapes.push({
              type: 'text',
              silent: true,
              style: {
                text: label,
                x: centerX,
                y: centerY,
                font: '14px cursive ',
                textAlign: 'center',
                textVerticalAlign: 'bottom',
                stroke: '#808080',
                fill: '#FFFFFF'
              }

            })
          // 画标注线
            shapes.push({
              type: 'polyline',
              style: {
                stroke: '#808080',
                lineWidth: 1,
                fill: null
              },
              silent: true,
              shape: {
                points: [
                          [centerX - width / 2, centerY],
                          [centerX - width / 2 - 60, centerY] // ,
                          // [centerX-width/2-85,centerY-10]
                ]
              }
            })
          // 画标注文字
            shapes.push({
              type: 'text',
              silent: true,
              style: {
                text: value,
                x: centerX - width / 2 - 30,
                y: centerY,
                font: '12px cursive ',
                textAlign: 'right',
                textVerticalAlign: 'bottom',
                fill: '#a0a0a0'
              }

            })
            var zr = api.getZr()
            var preBox = zr.preBox ? zr.preBox : null // 上一个盒子的数据
          //  console.log(label,series.length);
          // 转化率
            if (preBox !== null) {
                  // 标记的横坐标
              var signLeft = centerX + (clientHeight) * Math.tan(aleph) / 2 + 10
              shapes.push({
                type: 'polyline',
                id: 'markline' + label,
                style: {
                  stroke: '#808080',
                  lineWidth: 1,
                  fill: null
                },
                silent: true,
                shape: {
                  points: [
                    [preBox.x - Math.tan(aleph) * 2, preBox.y + 5],
                    [signLeft, preBox.y + 5],
                    [signLeft, centerY - 5],
                    [centerX + width / 2 + Math.tan(aleph) * 2, centerY - 5]
                  ]
                }
              })
              // 转化率文字
              shapes.push({
                type: 'text',
                id: 'marktxt' + label,
                silent: true,
                style: {
                  text: /* series.length+ */ label + '转化率' + (100 * value / preBox.value).toFixed(2) + '%',
                  x: signLeft,
                  y: preBox.y + height / 2,
                  font: 'italic bolder 16px cursive ',
                  textAlign: 'left',
                  textVerticalAlign: 'middle',
                  fill: '#000000'
                }
              })
            } else { // 清除
              shapes.push({
                type: 'polyline',
                id: 'markline' + label,
                shape: {
                  points: []
                }
              })
              shapes.push({
                type: 'text',
                id: 'marktext' + label,
                style: {
                  text: ''
                }

              })
            }

            zr.preBox = seriesIndex === series.length - 1 ? null : {
              value: value,
              x: centerX + width / 2,
              y: centerY
            }

            var res = {
              type: 'group',
              children: shapes
            }
            return res
          }
          let optionSet = {
            xAxis: {
              min: 0,
              max: 2 * maxValue,
              scale: true,
              show: false
            },
            yAxis: {
              show: false,
              data: list.map(function (c) {
                return c[1]
              })
            },
            legend: {
              show: true,
              icon: 'rect',
              data: list.map(function (item) {
                return item[2]
              })
            },
            backgroundColor: 'rgb(255,255,255)',
            series: list.map(function (item) {
              return {
                type: 'custom',
                name: item[2],
                encode: {
                  tooltip: [0],
                  x: [0],
                  y: 0
                },
                itemStyle: {
                  normal: {
                    color: item[1]
                  }
                },
                renderItem: renderItem,
                data: [item]
              }
            })}
          this.echart.setOption(Object.assign({}, this.option, optionSet))
          this.echart.on('click',function(params){
            console.log(params)
          })
        }
      },
      mounted: function () {
        this.$nextTick(function () {
          this.drawFunnel(this.id)
        })
      },
      /*beforeUpdated: function () {
        this.$nextTick(function () {
          console.log(123)
          this.drawFunnel(this.id)
        })
      },*/
      computed: {
        ...mapState({
          echartsLib: state => state.echarts
        })
      }
    }
</script> 
