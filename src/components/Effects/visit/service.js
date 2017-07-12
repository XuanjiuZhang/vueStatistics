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
  if(name) {
    colorMap.set(name, result)
  }
  return result
}

function colorMapGetter() {
  return colorMap
}

function getDateData(type, base, peroid) {
  const date = []
  const oneDay = 24 * 3600 * 1000;
  const oneHour = 1000 * 3600;
  if(type === 'day') {
    for(let i = 0; i < peroid; i++) {
      let ctime = base + i * oneDay
      let nowCol = new Date(ctime)
      date.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/'));
    }
  } else {

  }
  return date
}

function getEchartsLineXAxis(lineData, timeData) {
  /*lineData.forEach(line => {
    const colorObj = colorMap.get(line.channel)
    console.log(colorObj);
  })*/

  var date
  const today = +new Date()
  const oneDay = 24 * 3600 * 1000;
  const oneHour = 1000 * 3600;

  if(timeData.timeType === 'day') {
    if(timeData.timePeroid === -1) {
      // 寻找时间跨度
      const timeArr = lineData.reduce((timeData, nextLine) => {
        return timeData.concat(nextLine.data)
      }, [])
      timeArr.sort((t1, t2) => {
        return t1.time > t2.time
      })
      const start = timeArr[0].time
      const end = timeArr[timeArr.length - 1].time
      const dateLength = Math.ceil((end - start) / oneDay);
      date = getDateData(timeData.timeType, start, dateLength)
    } else {
      // 构建固定的时间跨度
      let peroid = 1
      let base
      switch(timeData.timePeroid) {
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
      date = getDateData(timeData.timeType, base, peroid)
    }

  } else {
    // date.push([nowCol.getFullYear(), nowCol.getMonth() + 1, nowCol.getDate()].join('/')
    //         + ' ' + nowCol.getHours() + ':00');
  }
  console.log(date);
  return {
    type : 'category',
    boundaryGap : false,
    data : date
  }
}

const echartsLineDataParser = (lineData, timeData) => {
  const xAxisData = getEchartsLineXAxis(lineData, timeData)
  console.log(xAxisData);
}

export { getColorByIndex, echartsLineDataParser, colorMapGetter } 