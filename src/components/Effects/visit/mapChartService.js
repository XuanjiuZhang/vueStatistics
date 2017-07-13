function getSeries(data, isCountryMap) {
  const seriesData = data.map(d => {
    const total = d.pv.reduce((count, pv) => {
      return count + pv[1]
    }, 0)
    return {
      name: d.name,
      value: total
    }
  })
  return {
      name: '访问用户',
      type: 'map',
      mapType: isCountryMap ? 'china' : 'province',
      layoutCenter: ['50%', '40%'],
      // 不超过 500 的区域
      layoutSize: 600,
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


function parseData(data, isCountryMap) {
  const series = getSeries(data, isCountryMap)
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
      top: '60%',
      left: '10%',
      itemHeight  : '140%',
      text: ['高', '低'],           // 文本，默认为数值文本
      calculable: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      show: false,
      boundaryGap: [0, '100%']
    },
    series
  }
  console.log('option', option);
  return option
}

export { parseData }