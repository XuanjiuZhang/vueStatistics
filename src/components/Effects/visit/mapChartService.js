function getSeries(data, currentPosition) {
  const seriesData = data.map(d => {
    const total = d.pv.reduce((count, pv) => {
      return count + pv[1]
    }, 0)
    return {
      name: d.name,
      value: total
    }
  }).sort((s1, s2) => {
    return s1.value < s2.value
  })
  console.log('mapSeriesData:', seriesData);
  return {
      name: '访问用户',
      type: 'map',
      map: currentPosition,
      layoutCenter: ['50%', '50%'], 
      // 不超过区域
      layoutSize: 510,
      roam: false,
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: seriesData
    }
}


function parseData(data, currentPosition) {
  const series = getSeries(data, currentPosition)
  const option = {
    backgroundColor: '#fff',
    title: {
      text: '地域分布统计',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      orient : 'vertical',
      // 表示 visualMap-continuous 本身的视觉样式。
      inRange: {
        color: ['#d4d3ef', '#d4d3ef', '#531172']
      },
      min: 0,
      max: 100,
      top: '65%',
      left: '5%',
      itemHeight  : '140%',
      text: ['高', '低'],           // 文本，默认为数值文本
      calculable: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      show: false,
      data: []
    },
    yAxis: {
      type: 'value',
      show: false,
      boundaryGap: [0, '100%']
    },
    /*dataZoom: [{
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
        // indexChange(value);
        return valueStr;
      }
    }],*/
    series
  }
  console.log('option', option);
  return option
}

export { parseData }