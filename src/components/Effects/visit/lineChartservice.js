function randomData() {
  return Math.round(Math.random() * 255);
}

const colorMap = new Map();

const getColorByIndex = (i, name) => {
  let randomR;
  let randomB;
  let randomG;
  switch (i) {
    case 0:
      randomR = 255;
      randomG = 196;
      randomB = 0;
      break;
    case 1:
      randomR = 41;
      randomG = 155;
      randomB = 255;
      break;
    case 2:
      randomR = 40;
      randomG = 201;
      randomB = 127;
      break;
    case 3:
      randomR = 114;
      randomG = 102;
      randomB = 186;
      break;
    default:
      randomR = randomData();
      randomB = randomData();
      randomG = randomData();
      break;
  }
  const colorStr = `rgb(${randomR}, ${randomG}, ${randomB})`;
  const result = {
    colorStr,
    randomR,
    randomG,
    randomB
  }
  // 保存颜色的对应值
  if (name) {
    colorMap.set(name, result)
  }
  return result
}

function getDateData(type, base, peroid) {
  console.log(type);
  console.log(base);
  console.log(peroid);
  const date = []
  const oneDay = 24 * 3600 * 1000;
  const oneHour = 1000 * 3600;
  if (type === 'day') {
    for (let i = 0; i < peroid; i++) {
      let ctime = base + i * oneDay
      let nowCol = new Date(ctime)
      date.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/'));
    }
  } else {
    for (let i = 0; i < peroid * 24; i++) {
      let ctime = base + i * oneHour
      let nowCol = new Date(ctime)
      date.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/')
        + ' ' + nowCol.getHours() + ':00');
    }
  }
  return date
}

function getEchartsLineXAxis(lineData, timeData) {
  var date
  const today = +new Date()
  const oneDay = 24 * 3600 * 1000;

  // 寻找时间跨度
  const timeArr = lineData.reduce((timeData, nextLine) => {
    return timeData.concat(nextLine.data)
  }, [])
  timeArr.sort((t1, t2) => {
    return t1.time > t2.time
  })
  const start = timeArr.length ? timeArr[0].time : 0
  const end = timeArr.length ? timeArr[timeArr.length - 1].time : 0
  console.log(start);
  console.log('end?');
  console.log(end);
  const dateLength = Math.ceil((end - start) / oneDay);

  // 构建固定的时间跨度
  let peroid = 1
  let base
  switch (timeData.timePeroid) {
    case 0:
      base = today
      break;
    case 1:
      base = today - oneDay
      break;
    default:
      peroid = timeData.timePeroid
      base = today - (peroid - 1) * oneDay;
      break;
  }

  if (timeData.timePeroid === -1) {
    if (timeData.timeType === 'day') {
      date = getDateData(timeData.timeType, start, dateLength)
    } else {
      date = getDateData(timeData.timeType, start, dateLength)
    }
  } else if (timeData.timeType === 'day') {
    date = getDateData(timeData.timeType, base, peroid)
  } else {
    date = getDateData(timeData.timeType, base, peroid)
  }
  console.log(date);
  return {
    type: 'category',
    boundaryGap: false,
    data: date
  }
}

function getEchartsLineSeries(lineData, timeData, xAxisData) {
  const eseries = []
  const eseriesDataArr = []
  lineData.forEach(line => {
    const colorObj = colorMap.get(line.channel)
    const { randomR, randomG, randomB, colorStr } = colorObj
    const colorGradientStrStart = `rgba(${randomR}, ${randomG}, ${randomB}, 0)`;
    const colorGradientStrEnd = `rgba(${randomR}, ${randomG}, ${randomB}, 1)`;

    const lineArr = line.data.map(d => {
      const nowCol = new Date(d.time)
      if (timeData.timeType === 'day') {
        return {
          time: [nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/'),
          value: d.value
        }
      } else {
        return {
          time: [nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/')
          + ' ' + nowCol.getHours() + ':00',
          value: d.value
        }
      }
    })

    const showData = new Array(xAxisData.data.length)
    showData.fill(0)
    lineArr.forEach((d, i) => {
      const index = xAxisData.data.findIndex(x => {
        return x === d.time
      })
      if (index != -1) {
        showData[i] = d.value
      }
    })

    eseriesDataArr.push(showData)
    eseries.push({
      name: line.channel,
      type: 'line',
      smooth: true,
      symbol: 'none',
      sampling: 'average',
      itemStyle: {
        normal: {
          color: colorStr
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: colorGradientStrStart
          }, {
            offset: 1,
            color: colorGradientStrEnd
          }])
        }
      },
      data: showData
    })
  })

  const AllData = _lodash.zip(...eseriesDataArr).map(pointArr => {
    return pointArr.reduce((p1, p2) => {
      return p1 + p2
    }, 0)
  })
  console.log('AllData!');
  console.log(AllData);

  // 所有数据统计在一起的值
  eseries.push({
    name: '全部',
    type: 'line',
    smooth: true,
    symbol: 'none',
    sampling: 'average',
    itemStyle: {
      normal: {
        color: 'rgb(175,238,238)'
      }
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(175,238,238, 0)'
        }, {
          offset: 1,
          color: 'rgba(175,238,238, 1)'
        }])
      }
    },
    data: AllData
  })

  return eseries
}

const echartsLineDataParser = (lineData, timeData) => {
  console.log('lineData');
  console.log(lineData);
  const xAxisData = getEchartsLineXAxis(lineData, timeData)
  console.log(xAxisData);
  const eseries = getEchartsLineSeries(lineData, timeData, xAxisData)
  console.log(eseries);

  const legend = eseries.map(s => s.name)
  legend.push('全部')

  const option = {
    title: {
      text: '访问趋势图',
      left: '5%'
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
      top: '-10000%',
      left: '-10000%',
      data: legend
    },
    /*toolbox: {
      feature: {
        saveAsImage: {}
      }
    },*/
    grid: {
      left: '5%',
      right: '5%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: [xAxisData],
    yAxis: [
      {
        type: 'value'
      }
    ],
    dataZoom: [
      {
        start: 0,
        end: 100,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
    series: eseries
  };

  return option
}

export { getColorByIndex, echartsLineDataParser } 