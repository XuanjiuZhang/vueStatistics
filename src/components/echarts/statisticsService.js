/*eslint-disable */
/**
 * 统计数据服务
 */
'use strict';

var angular = window.angular;

angular.module('app.common')
  .factory('commonStatisticsService', ['$timeout', '$document', function ($timeout, $document) {
    var cache = {
      generalTransData: {},
      generalChannelTransData: {},
      singleGeneralTransData: {},
      mapTransData: [],
      mapProTransData: []
    };
    function randomData() {
      return Math.round(Math.random() * 255);
    }

    function transferGeneralData(sceneShow, dataCollection) {
      var date = [];
      var echartsDataCollectList = [];
      var echartsSceneShowList = [];

      angular.forEach(sceneShow.count, function (cItem) {
        var nowCol = new Date(cItem.time);
        date.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/'));
        echartsSceneShowList.push(cItem.value);
      });

      echartsSceneShowList.map(function () {
        echartsDataCollectList.push(0);
      });

      angular.forEach(dataCollection.count, function (dItem) {
        sceneShow.count.find(function (ss, index) {
          if (ss.time === dItem.time) {
            echartsDataCollectList[index] = dItem.value;
          }
          return ss.time === dItem.time;
        });
      });

      return {
        dateList: date,
        dataCollectList: echartsDataCollectList,
        sceneShowList: echartsSceneShowList
      }
    }

    function transferSingleGeneralData(sceneShow, dataCollection, timeType) {
      var date = [];
      var echartsDataCollectList = [];
      var echartsSceneShowList = [];

      angular.forEach(sceneShow.count, function (cItem) {
        var nowCol = new Date(cItem.time);
        if(timeType === 'day'){
          date.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/'));
        }else if(timeType === 'hour'){
          date.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/')
            + ' ' + nowCol.getHours() + ':00');
        }
        echartsSceneShowList.push(cItem.value);
      });

      echartsSceneShowList.map(function () {
        echartsDataCollectList.push(0);
      });

      angular.forEach(dataCollection.count, function (dItem) {
        sceneShow.count.find(function (ss, index) {
          if (ss.time === dItem.time) {
            echartsDataCollectList[index] = dItem.value;
          }
          return ss.time === dItem.time;
        });
      });

      return {
        dateList: date,
        dataCollectList: echartsDataCollectList,
        sceneShowList: echartsSceneShowList
      }
    }

    function transferChannelGeneralData(channelData, echarts, timeType, scope){
      var dateList = [];
      var legendData = [];
      var echartsSeries = [];
      var viewCount = 0;
      var dataCount = 0;
      var allData = [];
      console.log(scope.channelNav);
      if(scope.channelNav.info.length === 1){
        var showData = [];
        var searchData = [];
        var socialData = [];
        var offLineData = [];
        angular.forEach(scope.treeData, function (tree) {
          switch (tree.name){
          case '展示':
            legendData.push('展示');
            echartsSeries.push({
              name: '展示',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: scope.legendColorList[0].colorStr
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: scope.legendColorList[0].colorGradientStrStart
                  }, {
                    offset: 1,
                    color: scope.legendColorList[0].colorGradientStrEnd
                  }])
                }
              },
              data: showData
            });
            break;
          case '搜索':
            legendData.push('搜索');
            echartsSeries.push({
              name: '搜索',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: scope.legendColorList[1].colorStr
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: scope.legendColorList[1].colorGradientStrStart
                  }, {
                    offset: 1,
                    color: scope.legendColorList[1].colorGradientStrEnd
                  }])
                }
              },
              data: searchData
            });
            break;
          case '社交':
            legendData.push('社交');
            echartsSeries.push({
              name: '社交',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: scope.legendColorList[2].colorStr
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: scope.legendColorList[2].colorGradientStrStart
                  }, {
                    offset: 1,
                    color: scope.legendColorList[2].colorGradientStrEnd
                  }])
                }
              },
              data: socialData
            });
            break;
          case '线下':
            legendData.push('线下');
            echartsSeries.push({
              name: '线下',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: scope.legendColorList[3].colorStr
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: scope.legendColorList[3].colorGradientStrStart
                  }, {
                    offset: 1,
                    color: scope.legendColorList[3].colorGradientStrEnd
                  }])
                }
              },
              data: offLineData
            });
            break;
          }
        });
      }

      echartsSeries.push({
        name: '全部',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: 'rgb(114, 102, 186)'
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(114, 102, 186, .2)'
            }, {
              offset: 1,
              color: 'rgba(114, 102, 186, 1)'
            }])
          }
        },
        data: allData
      });
      legendData.push('全部');
      angular.forEach(channelData, function (channel, cIndex) {
        var startColorIndex = scope.channelNav.info.length === 1 ? cIndex + 4 : cIndex;
        var singleData = [];
        if(scope.channelNav.info.length != 1){
          legendData.push(channel.name);
          echartsSeries.push({
            name: channel.name,
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: scope.legendColorList[startColorIndex].colorStr
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: scope.legendColorList[startColorIndex].colorGradientStrStart
                }, {
                  offset: 1,
                  color: scope.legendColorList[startColorIndex].colorGradientStrEnd
                }])
              }
            },
            data: singleData
          });
        }

        angular.forEach(channel.count, function (detail, countIndex) {
          if(cIndex === 0){
            var nowCol = new Date(detail.time);
            if(timeType === 'day'){
              dateList.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/'));
            }else{
              dateList.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/')
                + ' ' + nowCol.getHours() + ':00');
            }
          }
          singleData.push(detail.value);
          if(!allData[countIndex]){
            allData[countIndex] = 0;
            allData[countIndex] += detail.value;
          }else{
            allData[countIndex] += detail.value;
          }
          if(scope.channelNav.info.length === 1){
            var typeName = channel.name.slice(0, 2);
            switch (typeName){
              case '展示':
                if(!showData[countIndex]){
                  showData[countIndex] = 0;
                  showData[countIndex] += detail.value;
                }else{
                  showData[countIndex] += detail.value;
                }
                break;
              case '搜索':
                if(!searchData[countIndex]){
                  searchData[countIndex] = 0;
                  searchData[countIndex] += detail.value;
                }else{
                  searchData[countIndex] += detail.value;
                }
                break;
              case '社交':
                if(!socialData[countIndex]){
                  socialData[countIndex] = 0;
                  socialData[countIndex] += detail.value;
                }else{
                  socialData[countIndex] += detail.value;
                }
                break;
              case '线下':
                if(!offLineData[countIndex]){
                  offLineData[countIndex] = 0;
                  offLineData[countIndex] += detail.value;
                }else{
                  offLineData[countIndex] += detail.value;
                }
                break;
            }
          }
          if(channel.type === 'view'){
            viewCount += detail.value;
          }else if(channel.type === 'count'){
            dataCount += detail.value;
          }
        });
      });

      return {
        dateList: dateList,
        legendData: legendData,
        echartsSeries: echartsSeries,
        viewCount: viewCount,
        dataCount: dataCount
      }
    }

    function transferChannelGeneralDataV2(channelData, echarts, timeType, scope){
      var dateList = [];
      var legendData = [];
      var echartsSeries = [];
      var viewCount = 0;
      var dataCount = 0;
      var allDataView = [];
      var allDataCollect = [];
      echartsSeries.push({
        name: '全部_场景展示',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: 'rgb(254, 86, 86)'
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(254, 86, 86, 0)'
            }, {
              offset: 1,
              color: 'rgba(254, 86, 86, .1)'
            }])
          }
        },
        data: allDataView
      });
      legendData.push('全部_场景展示');
      echartsSeries.push({
        name: '全部_数据收集',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: 'rgb(254, 86, 86)'
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(254, 86, 86, 0)'
            }, {
              offset: 1,
              color: 'rgba(254, 86, 86, .5)'
            }])
          }
        },
        data: allDataCollect
      });
      legendData.push('全部_数据收集');

      var startUnixTime = 9999995301334;
      var endUnixTime = 0;
      var perHour = 1000 * 3600;
      var perDay = perHour * 24;

      // 计算出最大最小时间
      angular.forEach(channelData, function (channel) {
        angular.forEach(channel.count, function (detail) {
          startUnixTime = Math.min(startUnixTime, detail.time);
          endUnixTime = Math.max(endUnixTime, detail.time);
        });
      });

      console.log(startUnixTime);
      console.log(endUnixTime);
      if(endUnixTime != 0){
        if(timeType === 'day'){
          endUnixTime++;
          let dayLength = Math.max(Math.ceil((endUnixTime - startUnixTime) / perDay), 1);
          for(let i = 0; i < dayLength; i++){
            let nowCol = new Date(startUnixTime + i * perDay);
            dateList.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/'));
          }
        }else{
          let hourLength = Math.max(Math.ceil((endUnixTime - startUnixTime) / perHour), 1);
          for(let i = 0; i < hourLength; i++){
            let nowCol = new Date(startUnixTime + i * perHour);
            dateList.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/')
              + ' ' + nowCol.getHours() + ':00');
          }
        }
      }

      var dateLength = dateList.length;
      for(let i = 0; i < dateLength; i++){
        allDataView.push(0);
        allDataCollect.push(0);
      }

      angular.forEach(channelData, function (channel, cIndex) {
        var singleData = [];
        for(let i = 0; i < dateLength; i++){
          singleData.push(0);
        }
        legendData.push(channel.name);
        var innerIndex = Math.floor(cIndex / 2);
        var isOdd = cIndex % 2 != 0;
        echartsSeries.push({
          name: channel.name,
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color:  scope.legendColorList[innerIndex].colorStr
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: scope.legendColorList[innerIndex].colorGradientStrStart
              }, {
                offset: 1,
                color: isOdd ? scope.legendColorList[innerIndex].colorGradientStrEnd
                  : scope.legendColorList[innerIndex].colorGradientStrEndVersion2
              }])
            }
          },
          data: singleData
        });

        angular.forEach(channel.count, function (detail) {
          if(channel.type === 'view'){
            viewCount += detail.value;
            let nowCol = new Date(detail.time);
            let dateItem;
            if(timeType === 'day'){
              dateItem = [nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/');
            }else{
              dateItem = [nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/')
              + ' ' + nowCol.getHours() + ':00';
            }
            dateList.find(function (ldate, index) {
              if(ldate === dateItem){
                allDataView[index] += detail.value;
                singleData[index] = detail.value;
              }
              return ldate === dateItem;
            });
          }else if(channel.type === 'data'){
            dataCount += detail.value;
            let nowCol = new Date(detail.time);
            let dateItem;
            if(timeType === 'day'){
              dateItem = [nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/');
            }else{
              dateItem = [nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/')
                + ' ' + nowCol.getHours() + ':00';
            }
            dateList.find(function (ldate, index) {
              if(ldate === dateItem){
                allDataCollect[index] += detail.value;
                singleData[index] = detail.value;
              }
              return ldate === dateItem;
            });
          }
        });
      });

      return {
        dateList: dateList,
        legendData: legendData,
        echartsSeries: echartsSeries,
        viewCount: viewCount,
        dataCount: dataCount
      }
    }

    function transferGeneralHourData(channelData, echarts){
      var dateList = [];
      var legendData = [];
      var echartsSeries = [];
      var viewCount = 0;
      var dataCount = 0;
      angular.forEach(channelData, function (channel, cIndex) {
        var singleData = [];
        legendData.push(channel.name);
        var colorData = {
          colorStr: '',
          colorGradientStrStart: '',
          colorGradientStrEnd: ''
        };
        if(channel.type === 'view' || channel.name === '场景展示'){
          echartsSeries.push({
            name: channel.name,
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: 'rgb(236, 64, 122)'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(236, 64, 122, .2)'
                }, {
                  offset: 1,
                  color: 'rgba(236, 64, 122, 1)'
                }])
              }
            },
            data: singleData
          });
        }else if(channel.type === 'data' || channel.name === '数据收集'){
          echartsSeries.push({
            name: channel.name,
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: 'rgb(58, 146, 238)'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(58, 146, 238, 0.2)'
                }, {
                  offset: 1,
                  color: 'rgba(58, 146, 238, 1)'
                }])
              }
            },
            data: singleData
          });
        }

        var minIndex = 0;
        if(channel.time){
          channel.count.some(function (detail, index) {
            if(detail.time >= channel.time){
              minIndex = index;
            }
            return detail.time >= channel.time;
          });
        }
        if(minIndex != 0){
          channel.count.splice(0, minIndex - 1);
        }

        var currentDateList = [];
        angular.forEach(channel.count, function (detail) {
          var nowCol = new Date(detail.time);
          currentDateList.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/')
            + ' ' + nowCol.getHours() + ':00');
          singleData.push(detail.value);
          if(channel.type === 'view'){
            viewCount += detail.value;
          }else if(channel.type === 'count'){
            dataCount += detail.value;
          }
        });
        if(currentDateList.length >= dateList){
          dateList = currentDateList;
        }
      });

      return {
        dateList: dateList,
        legendData: legendData,
        echartsSeries: echartsSeries,
        viewCount: viewCount,
        dataCount: dataCount
      }
    }

    function getRGBAColor(i){
      let randomR;
      let randomB;
      let randomG;
      switch (i){
      case 0:
        randomR = 114;
        randomG = 102;
        randomB = 186;
        break;
      case 1:
        randomR = 41;
        randomG = 155;
        randomB = 255;
        break;
      case 2:
        randomR = 255;
        randomG = 196;
        randomB = 0;
        break;
      case 3:
        randomR = 40;
        randomG = 201;
        randomB = 127;
        break;
      case 4:
        randomR = 254;
        randomG = 86;
        randomB = 86;
        break;
      default:
        randomR = randomData();
        randomB = randomData();
        randomG = randomData();
        break;
      }
      return `rgb(${randomR}, ${randomG}, ${randomB})`;
    }

    return {
      getGeneralOption: function (sceneShow, dataCollection, echarts) {
        var transData = transferGeneralData(sceneShow, dataCollection);
        angular.copy(transData, cache.generalTransData);
        console.log(transData);
        return {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          /*title: {
           left: '10%',
           text: '时段内场景展示共 2048 次  数据收集 1024 个'
           },*/
          legend: {
            top: '0',
            left: '40%',
            data: ['场景展示', '数据收集']
          },
          toolbox: {
            left: '10%',
            feature: {
              /*dataZoom: {
               yAxisIndex: 'none'
               },
               restore: {},*/
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: transData.dateList
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            /*{
            type: 'inside',
            start: 0,
            end: 100
            }, */
            {
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '90%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          series: [
            {
              name: '场景展示',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: 'rgb(236, 64, 122)'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(236, 64, 122, .2)'
                  }, {
                    offset: 1,
                    color: 'rgba(236, 64, 122, 1)'
                  }])
                }
              },
              data: transData.sceneShowList
            },
            {
              name: '数据收集',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: 'rgb(58, 146, 238)'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(58, 146, 238, 0.2)'
                  }, {
                    offset: 1,
                    color: 'rgba(58, 146, 238, 1)'
                  }])
                }
              },
              data: transData.dataCollectList
            }
          ]
        };
      },

      getSingleGeneralOption: function (sceneShow, dataCollection, echarts, timeType) {
        var transData = transferSingleGeneralData(sceneShow, dataCollection, timeType);
        return {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          legend: {
            top: '0',
            left: '40%',
            data: ['场景展示', '数据收集']
          },
          toolbox: {
            left: '10%',
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: transData.dateList
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            {
              start: 0,
              end: 100,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '90%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }],
          series: [
            {
              name: '场景展示',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: 'rgb(236, 64, 122)'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(236, 64, 122, .2)'
                  }, {
                    offset: 1,
                    color: 'rgba(236, 64, 122, 1)'
                  }])
                }
              },
              data: transData.sceneShowList
            },
            {
              name: '数据收集',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: 'rgb(58, 146, 238)'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(58, 146, 238, 0.2)'
                  }, {
                    offset: 1,
                    color: 'rgba(58, 146, 238, 1)'
                  }])
                }
              },
              data: transData.dataCollectList
            }
          ]
        };
      },

      getChannelGeneralOption: function (channelData, echarts, timeType, scope) {
        var transData = transferChannelGeneralDataV2(channelData, echarts, timeType, scope);
        console.log(transData);
        var result = {
          option: {
            tooltip: {
              trigger: 'axis',
              position: function (pt) {
                return [pt[0], '10%'];
              }
            },
            /*title: {
             left: '10%',
             text: '时段内场景展示共 2048 次  数据收集 1024 个'
             },*/
            legend: {
              top: '-100%',
              left: '-100%',
              data: transData.legendData
            },
            toolbox: {
              right: '5%',
              feature: {
                /*dataZoom: {
                 yAxisIndex: 'none'
                 },
                 restore: {},*/
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: transData.dateList
            },
            yAxis: {
              type: 'value',
              boundaryGap: [0, '100%']
            },
            dataZoom: [
              /*{
               type: 'inside',
               start: 0,
               end: 100
               }, */
              {
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '90%',
                handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
                }
              }],
            series: transData.echartsSeries
          },
          viewCount: transData.viewCount,
          dataCount: transData.dataCount
        };
        return result;
      },

      getGeneralHourOption: function (channelData, echarts) {
        var transData = transferGeneralHourData(channelData, echarts);
        var result = {
          option: {
            tooltip: {
              trigger: 'axis',
              position: function (pt) {
                return [pt[0], '10%'];
              }
            },
            /*title: {
             left: '10%',
             text: '时段内场景展示共 2048 次  数据收集 1024 个'
             },*/
            legend: {
              top: '0',
              left: '40%',
              data: transData.legendData
            },
            toolbox: {
              left: '10%',
              feature: {
                /*dataZoom: {
                 yAxisIndex: 'none'
                 },
                 restore: {},*/
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: transData.dateList
            },
            yAxis: {
              type: 'value',
              boundaryGap: [0, '100%']
            },
            dataZoom: [
              /*{
               type: 'inside',
               start: 0,
               end: 100
               }, */
              {
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '90%',
                handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
                }
              }],
            series: transData.echartsSeries
          },
          viewCount: transData.viewCount,
          dataCount: transData.dataCount
        };
        return result;
      },

      filterGeneralOption: function(day){
        var length = cache.generalTransData.dateList.length;
        var filterData = {};
        var dataZoom = [];
        switch (day){
        case 0:
          if(length === 1){
            filterData = cache.generalTransData;
          }else{
            filterData.dateList = cache.generalTransData.dateList.slice(-2, -1);
            filterData.dataCollectList = cache.generalTransData.dataCollectList.slice(-2, -1);
            filterData.sceneShowList = cache.generalTransData.sceneShowList.slice(-2, -1);
          }
          dataZoom = [
            {
              startValue: length - 1,
              endValue: length - 1
            }];
          break;

        case 1:
          if(length < 2){
            filterData = cache.generalTransData;
            dataZoom = [
              {
                startValue: 0,
                endValue: 0
              }];
          }else{
            filterData.dateList = cache.generalTransData.dateList.slice(-3, -2);
            filterData.dataCollectList = cache.generalTransData.dataCollectList.slice(-3, -2);
            filterData.sceneShowList = cache.generalTransData.sceneShowList.slice(-3, -2);
            dataZoom = [
              {
                startValue: length - 2,
                endValue: length - 2
              }];
          }
          break;

        case 7:
          if(length <= 7){
            filterData = cache.generalTransData;
            dataZoom = [
              {
                startValue: 0,
                endValue: length - 1
              }];
          }else{
            filterData.dateList = cache.generalTransData.dateList.slice(-7, -1);
            filterData.dataCollectList = cache.generalTransData.dataCollectList.slice(-7, -1);
            filterData.sceneShowList = cache.generalTransData.sceneShowList.slice(-7, -1);
            dataZoom = [
              {
                startValue: length - 7,
                endValue: length - 1
              }];
          }
          break;

        case 30:
          if(length <= 30){
            filterData = cache.generalTransData;
            dataZoom = [
              {
                startValue: 0,
                endValue: length - 1
              }];
          }else{
            filterData.dateList = cache.generalTransData.dateList.slice(-30, -1);
            filterData.dataCollectList = cache.generalTransData.dataCollectList.slice(-30, -1);
            filterData.sceneShowList = cache.generalTransData.sceneShowList.slice(-30, -1);
            dataZoom = [
              {
                startValue: length - 30,
                endValue: length - 1
              }];
          }
          break;

        case -1:
          filterData = cache.generalTransData;
          dataZoom = [
            {
              startValue: 0,
              endValue: length - 1
            }];
          break;
        }

        return {
          dataZoom: dataZoom,
          filterData: filterData
        };
      },

      getMobileVisitOption: function (data) {
        var legend = [];
        angular.forEach(data, function(mv, index){
          legend.push(mv.name);
          mv.itemStyle = {
            normal: {
              color: getRGBAColor(index)
            }
          }
        });

        return {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            /*orient: 'vertical',*/
            /*x: 'left',*/
            left: '25%',
            top: '75%',
            itemGap: 25,
            data: legend
            /*data: ['微信朋友', '微信朋友圈', '微信群', '微信公众号', '其他']*/
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '80%'],
              center: ['50%', '40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  formatter: '{b} \n {c} ',
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data
              /*data: [
                {value: 335, name: '微信朋友'},
                {value: 310, name: '微信朋友圈'},
                {value: 234, name: '微信群'},
                {value: 135, name: '微信公众号'},
                {value: 1548, name: '其他'}
              ]*/
            }
          ]
        };
      },

      getDeviceOption: function (data, domEle) {
        var iosData = {
          array: [],
          otherCount: 0
        };
        var androidData = {
          array: [],
          otherCount: 0
        };
        var PCData = {
          array: [],
          otherCount: 0
        };
        var otherData = {
          array: [],
          otherCount: 0
        };
        var legend = ['IOS', 'Android', 'PC', '其它'];
        angular.forEach(data, function(device){
          if(device.name == 'IOS'){
            iosData.array.push(device);
          }else{
            iosData.otherCount += device.value;
          }

          if(device.name == 'Android'){
            androidData.array.push(device);
          }else{
            androidData.otherCount += device.value;
          }

          if(device.name == 'PC'){
            PCData.array.push(device);
          }else{
            PCData.otherCount += device.value;
          }

          if(device.name == '其它'){
            otherData.array.push(device);
          }else{
            otherData.otherCount += device.value;
          }

        });

        const otherItemStyle = {
          normal: {
            color: 'rgb(225, 231, 240)'
          },
          emphasis: {
            color: 'rgb(225, 231, 240)'
          }
        };
        iosData.array.push({value: iosData.otherCount, name: '其他', itemStyle: otherItemStyle});
        androidData.array.push({value: androidData.otherCount, name: '其他', itemStyle: otherItemStyle});
        PCData.array.push({value: PCData.otherCount, name: '其他', itemStyle: otherItemStyle});
        otherData.array.push({value: otherData.otherCount, name: '其他', itemStyle: otherItemStyle});

        var domWidth = domEle.offsetWidth;
        return {
          tooltip: {
            trigger: 'item',
            formatter: "{b}"
          },
          legend: {
            /*orient: 'vertical',*/
            /*x: 'left',*/
            left: '12%',
            top: '80%',
            itemGap: Math.ceil(domWidth * .215),
            data: legend
          },
          series: [
            {
              name: 'IOSPie',
              itemStyle: {
                normal: {
                  color: '#2a9dff'
                }
              },
              type: 'pie',
              radius: ['40%', '60%'],
              center: ['15%', '40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter: function (item) {
                    if (item.name == 'IOS') {
                      return item.percent + '%';
                    } else {
                      return '';
                    }
                  },
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  },
                  position: 'center'
                }
                /*emphasis: {
                 show: true,
                 formatter: "{d}%",
                 textStyle: {
                 fontSize: '20',
                 fontWeight: 'bold'
                 }
                 }*/
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: iosData.array
            },
            {
              name: 'AndroidPie',
              itemStyle: {
                normal: {
                  color: '#28c97f'
                }
              },
              type: 'pie',
              radius: ['40%', '60%'],
              center: ['40%', '40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter: function (item) {
                    if (item.name == 'Android') {
                      return item.percent + '%';
                    } else {
                      return '';
                    }
                  },
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  },
                  position: 'center'
                }
                /*emphasis: {
                 show: true,
                 formatter: '{b} \n {c} ',
                 textStyle: {
                 fontSize: '20',
                 fontWeight: 'bold'
                 }
                 }*/
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: androidData.array
            },
            {
              name: 'PCPie',
              itemStyle: {
                normal: {
                  color: '#ffc400'
                }
              },
              type: 'pie',
              radius: ['40%', '60%'],
              center: ['65%', '40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter: function (item) {
                    if (item.name == 'PC') {
                      return item.percent + '%';
                    } else {
                      return '';
                    }
                  },
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  },
                  position: 'center'
                }
                /*emphasis: {
                 show: true,
                 formatter: '{b} \n {c} ',
                 textStyle: {
                 fontSize: '20',
                 fontWeight: 'bold'
                 }
                 }*/
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: PCData.array
            },
            {
              name: '其它Pie',
              itemStyle: {
                normal: {
                  color: '#fe5656'
                }
              },
              type: 'pie',
              radius: ['40%', '60%'],
              center: ['90%', '40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter: function (item) {
                    if (item.name == '其它') {
                      return item.percent + '%';
                    } else {
                      return '';
                    }
                  },
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  },
                  position: 'center'
                }
                /*emphasis: {
                 show: true,
                 formatter: '{b} \n {c} ',
                 textStyle: {
                 fontSize: '20',
                 fontWeight: 'bold'
                 }
                 }*/
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: otherData.array
            }
          ]
        };
      },

      getChinaMapOption: function (data, mapChart, $scope) {

        if(data.length === 0){
          return {
            backgroundColor: '#fff',
            title: {
              text: '地域分布统计',
              subtext: '',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            /*legend: {
              orient: 'vertical',
              left: 'left',
              data: ['访问用户']
            },*/
            visualMap: {
              orient : 'vertical',
              // 表示 visualMap-continuous 本身的视觉样式。
              inRange: {
                color: ['#d4d3ef', '#d4d3ef', '#531172']
              },
              min: 0,
              max: 100,
              top: '60%',
              left: '10%',
              itemHeight  : '140%',
              text: ['高', '低'],           // 文本，默认为数值文本
              calculable: true
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              top: 'center',
              right: '5%',
              feature: {
                dataView: {
                  readOnly: true,
                  optionToContent: function(opt) {
                    var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                      + '<td>省 / 市</td>'
                      + '<td>访问量</td>'
                      + '</tr>';
                    for (var i = 0; i < opt.series[0].data.length; i++) {
                      if(opt.series[0].data[i].value == undefined){
                        continue;
                      }
                      table += '<tr>'
                        + '<td>' + opt.series[0].data[i].name + '</td>'
                        + '<td>' + opt.series[0].data[i].value + '</td>'
                        + '</tr>';
                    }
                    table += '</tbody></table>';
                    return table;
                  }
                },
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
            },
            yAxis: {
              type: 'value',
              show: false,
              /*offset: '100',
               show: false,*/
              boundaryGap: [0, '100%']
            },
            dataZoom: [{
              start: 0,
              end: 100,
              type: 'slider',
              realTime: false,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '90%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              },
              labelFormatter: function (value, valueStr) {
                /*indexChange(value);*/
                return valueStr;
              }
            }],
            series: [
              {
                name: '访问用户',
                type: 'map',
                mapType: 'china',
                layoutCenter: ['50%', '40%'],
                // 不超过 500 的区域
                layoutSize: 500,
                roam: false,
                itemStyle: {
                  normal: {
                    areaColor: '#d4d3ef'
                  }
                },
                label: {
                  normal: {
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                data: []
              },
              {
                name: '日期跨度选择',
                type: 'line',
                smooth: false,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                  normal: {
                    color: 'rgb(33, 33, 33)'
                  }
                },
                data: []
              }
            ]
          }
        }

        // 一天全国的访问量
        var daysChinaTotalData = [];
        // 一段日期的统计数据
        var chinaMapData = [];

        if(data.length != 0){
          var base = data[0].pv[0][0];
          var today = +new Date();
          var date = [];
          var oneDay = 24 * 3600 * 1000;
          var dateLength = Math.ceil((today - base) / oneDay);

          transferRawData(data);
          console.log(data);
          angular.copy(data, cache.mapTransData);
          for (var m = 0; m < dateLength; m++) {
            var nowCol = new Date(base += oneDay);
            date.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/'));
            var oneDaySum = 0;
            angular.forEach(data, function(province){
              oneDaySum += province.pvList[m];
            });
            daysChinaTotalData.push(oneDaySum);
          }
        }

        var barStatus = {
          isStartIndex: -1,
          isMoving: false,
          mouseUpUpdate: false,
          startIndex: 0,
          endIndex: 0,
          lastStartIndex: 0,
          lastEndIndex: 0,
          firstShow: true
        };

        function indexChange(index){
          barStatus.isStartIndex = -barStatus.isStartIndex;
          barStatus.lastStartIndex = barStatus.startIndex;
          barStatus.lastEndIndex = barStatus.endIndex;
          if(barStatus.isStartIndex > 0){
            barStatus.startIndex = index;
          }else{
            barStatus.endIndex = index;
          }

          if(barStatus.startIndex === barStatus.lastStartIndex
            && barStatus.endIndex === barStatus.lastEndIndex){
            return true;
          }

          if(barStatus.firstShow){
            barStatus.firstShow = false;
            chinaMapData = calculateDaysData();
            $timeout(function(){
              var newOpt = {
                series: [{data: chinaMapData}]
              };
              mapChart.setOption(newOpt);
            });
            return true;
          }

          if(!barStatus.isMoving){
            barStatus.isMoving = true;
            barStatus.mouseUpUpdate = false;
            $document.one('mouseup', function(){
              barStatus.isMoving = false;
              if(!barStatus.mouseUpUpdate){
                barStatus.mouseUpUpdate = true;
                chinaMapData = calculateDaysData();
                $timeout(function(){
                  var newOpt = {
                    series: [{data: chinaMapData}]
                  };
                  mapChart.setOption(newOpt);
                });
              }
            });
          }
        }

        function calculateDaysData(){
          angular.forEach(data, function(province){
            province.value = 0;
            for(let s = barStatus.startIndex; s <= barStatus.endIndex; s++){
              province.value += province.pvList[s];
            }
          });
          data.sort(function(a, b){
            if(a.value < b.value){
              return 1;
            }else{
              return -1;
            }
          });
          $scope.top1 = data[0].value;
          $scope.rankData = data;
          console.log(data);
          return data;
        }

        function transferRawData(rawData){
          angular.forEach(rawData, function(province){
            var pvList = [];
            angular.forEach(province.pv, function(pv, index){
              if(index === 0){
                province.base = pv[0];
              }
              pvList.push(pv[1]);
            });
            province.pvList = pvList;
          });
        }

        var option = {
          backgroundColor: '#fff',
          title: {
            text: '访问用户-地域分布',
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: '1000',
            data: [{
              name: '访问用户'
            }]
          },
          visualMap: {
            orient : 'vertical',
            // 表示 visualMap-continuous 本身的视觉样式。
            inRange: {
              color: ['#d4d3ef', '#d4d3ef', '#531172']
            },
            min: 0,
            max: 100,
            top: '60%',
            left: '10%',
            itemHeight  : '140%',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            top: 'center',
            right: '5%',
            feature: {
              dataView: {
                readOnly: true,
                optionToContent: function(opt) {
                  var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                    + '<td>省 / 市</td>'
                    + '<td>访问量</td>'
                    + '</tr>';
                  for (var i = 0; i < opt.series[0].data.length; i++) {
                    if(opt.series[0].data[i].value == undefined){
                      continue;
                    }
                    table += '<tr>'
                      + '<td>' + opt.series[0].data[i].name + '</td>'
                      + '<td>' + opt.series[0].data[i].value + '</td>'
                      + '</tr>';
                  }
                  table += '</tbody></table>';
                  return table;
                }
              },
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
          },
          yAxis: {
            type: 'value',
            show: false,
            /*offset: '100',
            show: false,*/
            boundaryGap: [0, '100%']
          },
          dataZoom: [{
            start: 0,
            end: 100,
            type: 'slider',
            realTime: false,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '90%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            labelFormatter: function (value, valueStr) {
              indexChange(value);
              return valueStr;
            }
          }],
          series: [
            {
              name: '访问用户',
              itemStyle: {
                normal: {
                  areaColor: '#d4d3ef',
                  color: 'rgb(255, 196, 0)'
                }
              },
              type: 'map',
              mapType: 'china',
              layoutCenter: ['50%', '40%'],
              // 不超过 500 的区域
              layoutSize: 500,
              roam: false,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data: chinaMapData
            },
            {
              name: '日期跨度选择',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: 'rgb(33, 33, 33)'
                }
              },
              lineStyle: {
                normal: {
                  color: 'rgba(33, 33, 33, 0)'
                }
              },
              data: daysChinaTotalData
            }
          ]
        };

        return option;
      },

      filterMapOption: function(day, $scope, isProvince){
        var cacheData;
        if(isProvince){
          cacheData = cache.mapProTransData;
        }else{
          cacheData = cache.mapTransData;
        }
        console.log(cacheData);
        if(cacheData.length === 0){
          return {};
        }
        var length = cacheData[0].pvList.length;
        var filterData = {};
        switch (day){
        case 0:
          if(length === 1){
            filterData = {
              dataZoom: [{
                startValue: 0,
                endValue: length - 1
              }]
            }
          }else{
            filterData = {
              dataZoom: [{
                startValue: length - 2,
                endValue: length - 1
              }]
            }
          }
          break;
        case 1:
          if(length < 2){
            filterData = {
              dataZoom: [{
                startValue: 0,
                endValue: length - 1
              }]
            }
          }else{
            filterData = {
              dataZoom: [{
                startValue: length - 3,
                endValue: length - 2
              }]
            }
          }
          break;
        case 7:
          if(length <= 7){
            filterData = {
              dataZoom: [{
                startValue: 0,
                endValue: length - 1
              }]
            }
          }else{
            filterData = {
              dataZoom: [{
                startValue: length - 8,
                endValue: length - 1
              }]
            }
          }
          break;
        case 30:
          if(length <= 30){
            filterData = {
              dataZoom: [{
                startValue: 0,
                endValue: length - 1
              }]
            }
          }else{
            filterData = {
              dataZoom: [{
                startValue: length - 31,
                endValue: length - 1
              }]
            }
          }
          break;
        case -1:
          filterData = {
            dataZoom: [{
              startValue: 0,
              endValue: length - 1
            }]
          };
          break;
        }

        angular.forEach(cacheData, function(province){
          province.value = 0;
          for(var s = filterData.dataZoom[0].startValue; s <= filterData.dataZoom[0].endValue; s++){
            province.value += province.pvList[s];
          }
        });
        cacheData.sort(function(a, b){
          if(a.value < b.value){
            return 1;
          }else{
            return -1;
          }
        });
        $scope.top1 = cacheData[0].value;
        $scope.rankData = cacheData;
        var newOpt = {
          series: [{data: $scope.rankData}]
        };
        angular.merge(filterData, newOpt);
        return filterData;
      },

      getProvinceMapOption: function (data, mapChart, $scope, province) {
        // 一天的访问量
        var daysProTotalData = [];
        // 一段日期的统计数据
        var chinaMapData = [];

        var barStatus = {
          isStartIndex: -1,
          isMoving: false,
          mouseUpUpdate: false,
          startIndex: 0,
          endIndex: 0,
          lastStartIndex: 0,
          lastEndIndex: 0,
          firstShow: true
        };

        if(data.length != 0){
          var base = data[0].pv[0][0];
          var today = +new Date();
          var date = [];
          var oneDay = 24 * 3600 * 1000;
          var dateLength = Math.ceil((today - base) / oneDay);

          transferRawData(data);
          console.log(data);
          angular.copy(data, cache.mapProTransData);
          for (var m = 0; m < dateLength; m++) {
            var nowCol = new Date(base += oneDay);
            date.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/'));
            var oneDaySum = 0;
            angular.forEach(data, function(province){
              oneDaySum += province.pvList[m];
            });
            daysProTotalData.push(oneDaySum);
          }
        }else{
          $scope.rankData = [];
          daysProTotalData.push(0);
        }

        function indexChange(index){
          barStatus.isStartIndex = -barStatus.isStartIndex;
          barStatus.lastStartIndex = barStatus.startIndex;
          barStatus.lastEndIndex = barStatus.endIndex;
          if(barStatus.isStartIndex > 0){
            barStatus.startIndex = index;
          }else{
            barStatus.endIndex = index;
          }

          if(barStatus.startIndex === barStatus.lastStartIndex
            && barStatus.endIndex === barStatus.lastEndIndex){
            return true;
          }

          if(barStatus.firstShow){
            barStatus.firstShow = false;
            chinaMapData = calculateDaysData();
            $timeout(function(){
              var newOpt = {
                series: [{data: chinaMapData}]
              };
              mapChart.setOption(newOpt);
            });
            return true;
          }

          if(!barStatus.isMoving){
            barStatus.isMoving = true;
            barStatus.mouseUpUpdate = false;
            $document.one('mouseup', function(){
              barStatus.isMoving = false;
              if(!barStatus.mouseUpUpdate){
                barStatus.mouseUpUpdate = true;
                chinaMapData = calculateDaysData();
                $timeout(function(){
                  var newOpt = {
                    series: [{data: chinaMapData}]
                  };
                  mapChart.setOption(newOpt);
                });
              }
            });
          }
        }

        function calculateDaysData(){
          angular.forEach(data, function(province){
            province.value = 0;
            for(var s = barStatus.startIndex; s <= barStatus.endIndex; s++){
              province.value += province.pvList[s];
            }
          });
          data.sort(function(a, b){
            if(a.value < b.value){
              return 1;
            }else{
              return -1;
            }
          });
          $scope.top1 = data[0].value;
          $scope.rankData = data;
          return data;
        }

        function transferRawData(rawData){
          angular.forEach(rawData, function(province){
            var pvList = [];
            angular.forEach(province.pv, function(pv, index){
              if(index === 0){
                province.base = pv[0];
              }
              pvList.push(pv[1]);
            });
            province.pvList = pvList;
          });
        }

        var option = {
          dataZoom: [{
            labelFormatter: function (value, valueStr) {
              indexChange(value);
              return valueStr;
            }
          }],
          series: [
            {
              name: '访问用户',
              type: 'map',
              mapType: province,
              layoutCenter: ['50%', '40%'],
              // 不超过 500 的区域
              layoutSize: 500,
              roam: false,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data: chinaMapData
            },
            {
              name: '日期跨度选择',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: 'rgb(33, 33, 33)'
                }
              },
              lineStyle: {
                normal: {
                  color: 'rgba(33, 33, 33, 0)'
                }
              },
              data: daysProTotalData
            }
          ]
        };

        return option;
      }

    };

  }]);