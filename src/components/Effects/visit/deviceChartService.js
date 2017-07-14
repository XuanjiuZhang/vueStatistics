function dataParser(data, dom) {
  const totalCount = data.reduce((count, d) => {
    return count + 　d.value
  }, 0)

  const otherItemStyle = {
    normal: {
      color: 'rgb(225, 231, 240)'
    },
    emphasis: {
      color: 'rgb(225, 231, 240)'
    }
  };

  const colorList = ['#2a9dff', '#28c97f', '#ffc400', '#fe5656']

  const series = data.map((d, index) => {
    const dataArr = []
    dataArr.push({value: d.value, name: d.name})
    dataArr.push({value: totalCount - d.value, name: '其他', itemStyle: otherItemStyle})
    return {
      name: d.name,
      itemStyle: {
        normal: {
          color: colorList[index]
        }
      },
      type: 'pie',
      radius: ['40%', '60%'],
      center: [15 + 23 * index + '%' , '40%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: true,
          formatter: function (item) {
            if (item.name == d.name) {
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
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: dataArr
    }
    return dataArr
  })
  
  const legend = data.map(d => d.name)

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: "{b}"
    },
    legend: {
      left: '12%',
      top: '80%',
      itemGap: dom.offsetWidth * .23 - 50,
      data: legend
    },
    series
  }

  console.log('deviceOption', option);
  return option;
}

export { dataParser }