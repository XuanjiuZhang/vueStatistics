function getLineFn(p1, p2) {
  const a = (p1[1] - p2[1]) / (p1[0] - p2[0]) 
  const b = p1[1] - a * p1[0]
  return {a, b}
}

function getPolygons(pLeftTop, pRightTop, pBottom, polygonNumber, polygonGap) {
  if(polygonNumber === 0) {
    return []
  }
  if(polygonNumber === 1) {
    return [[pLeftTop, pBottom], [pRightTop, pBottom]]
  }
  const perX = (pBottom[0] - pLeftTop[0]) / polygonNumber
  const perY = (pBottom[1] - pLeftTop[1]) / polygonNumber
  const leftLinePoints = []
  const rightLinePoints = []

  const p1Fn = getLineFn(pBottom, pLeftTop)
  const p2Fn = getLineFn(pBottom, pRightTop)

  leftLinePoints.push(pLeftTop)
  rightLinePoints.push(pRightTop)

  for(let i = 1; i < polygonNumber; i++) {
    let leftX1 = pLeftTop[0] + perX * i - polygonGap
    let leftY1 = p1Fn.a * leftX1 + p1Fn.b
    let leftX2 = pLeftTop[0] + perX * i + polygonGap
    let leftY2 = p1Fn.a * leftX2 + p1Fn.b

    let rightX1 = pRightTop[0] - perX * i + polygonGap
    let rightY1 = p2Fn.a * rightX1 + p2Fn.b
    let rightX2 = pRightTop[0] - perX * i - polygonGap
    let rightY2 = p2Fn.a * rightX2 + p2Fn.b
    leftLinePoints.push([leftX1, leftY1])
    leftLinePoints.push([leftX2, leftY2])
    rightLinePoints.push([rightX1, rightY1])
    rightLinePoints.push([rightX2, rightY2])
  }
  leftLinePoints.push(pBottom)
  rightLinePoints.push(pBottom)
  
  const polygons = _lodash.zip(_lodash.chunk(leftLinePoints, 2), _lodash.chunk(rightLinePoints, 2))
  return polygons
}

function drawPolygons(update, className, callBack) {
  update.enter().append('polygon').attr('class', className).attr('points', function(d) {
    const points = [d.lines[0][0], d.lines[1][0], d.lines[1][1], d.lines[0][1]]
    console.log('points', points);
    return points.reduce((pointsStr, nextPoint) => {
      return pointsStr + ' ' + nextPoint.join();
    }, '');
  }).on('mouseover', function(d, index){
    if(!d.active){
      return
    }
    this.style.fill = d.hoverColor
  }).on('mouseleave', function(d, index){
    if(!d.active){
      return
    }
    this.style.fill = d.color
  }).on('click', function(d, index) {
    d.active = !d.active
    this.style.fill = d.active ? d.color : d.disabledColor
    callBack(d)
  }).style('fill', function(d, index){
    return d.active ? d.color : d.disabledColor
  })

  update.exit().remove()

  update.attr('points', function(d) {
    const points = [d.lines[0][0], d.lines[1][0], d.lines[0][1], d.lines[1][1]]
    return points.reduce((pointsStr, nextPoint) => {
      return pointsStr + ' ' + nextPoint.join();
    }, '');
  }).style('fill', function(d, index){
    return d.active ? d.color : d.disabledColor
  })
}

function drawPolygonsText(update, className) {
  update.enter().append('text').attr('class', className).attr('x', function(d){
    return (d.lines[0][0][0] + d.lines[1][0][0]) / 2
  }).attr('y', function(d){
    return (d.lines[0][0][1] + d.lines[0][1][1]) / 2
  }).attr('dx', function(d){
    return -d.label.length * 6
  }).style('fill', function(){ return '#fff' })
  .html(function(d, index){
    return d.label
  })

  update.exit().remove()

  update.attr('x', function(d){
    return (d[0][0][0] + d[1][0][0]) / 2
  }).attr('y', function(d){
    return (d[0][0][0] + d[0][0][1]) / 2
  }).attr('dx', function(d){
    return -d.label.length * 6
  }).style('fill', function(){ return '#fff' })
  .html(function(d, index){
    return d.label
  })
}

function getCenterPoint(p1, p2) {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]
}

function getPolygonRightLinks (polygonsWithData, rightPosition) {
  const linkPoints = polygonsWithData.filter(polygon => polygon.active).map(polygon => {
    return {
      point: getCenterPoint(polygon.lines[1][0], polygon.lines[1][1]),
      data: polygon.data
    }
  })
  console.log('linkPoints', linkPoints);
  const linePaths = []
  for(let i = 0; i < linkPoints.length - 1; i++) {
    let points = [linkPoints[i].point, [rightPosition, linkPoints[i].point[1]],
     [rightPosition, linkPoints[i + 1].point[1]], linkPoints[i + 1].point]
    let ratio = linkPoints[i].data / linkPoints[i + 1].data
    linePaths.push({points, ratio})
  }
  console.log('linePaths', linePaths);
  return linePaths
}

function drawPolygonsRightLinks(update, className) {
  const linePath = d3.line()
  update.enter().append('path').attr('class', className)
  .attr('d', function(d){
    return linePath(d.points)
  }).attr('fill', '#fff').attr('stroke', '#ccc').attr('stroke-width', 1)

  update.exit().remove()

  update.attr('d', function(d){
    return linePath(d.points)
  }).attr('fill', '#fff').attr('stroke', '#ccc').attr('stroke-width', 1)
}

function drawMarkers(svg) {
  const circleMaker = svg.append('defs').append('marker').attr('id','left-line-circle')
    .attr('markerUnits', 'strokeWidth').attr('markerWidth', 24).attr('markerHeight', 24)
    .attr('viewBox', '0 0 24 24').attr('refX', 12).attr('refY', 12).attr('orient', 'auto')
  
  circleMaker.append('circle').attr('cx', 12).attr('cy', 12).attr('r', 4).attr('fill', '#000')
}

function drawPolygonsLeftLinks(update, className) {
  const linePath = d3.line()
  update.enter().append('path').attr('class', className)
  .attr('d', function(d){
    const lineFn = getLineFn(d.lines[0][0], d.lines[0][1])
    const center = getCenterPoint(d.lines[0][0], d.lines[0][1])
    const p1 = [center[0] + 10, lineFn.a * (center[0] + 10) + lineFn.b]
    const p2 = [p1[0] - 15, p1[1]]
    const p3 = [center[0] - 18, center[1]]
    const p4 = [p3[0] - 120, center[1]]
    const line = [p1, p2, p3, p4]
    return linePath(line)
  }).attr('fill', '#fff').attr('stroke', function(d) {
    return d.color
  }).attr('stroke-width', 1)
    .attr('marker-end', 'url(#left-line-circle)')
  
  update.exit().remove()

  update.attr('d', function(d){
    const lineFn = getLineFn(d.lines[0][0], d.lines[0][1])
    const center = getCenterPoint(d.lines[0][0], d.lines[0][1])
    const p1 = [center[0] + 10, lineFn.a * (center[0] + 10) + lineFn.b]
    const p2 = [p1[0] - 15, p1[1]]
    const p3 = [center[0] - 18, center[1]]
    const p4 = [p3[0] - 120, center[1]]
    const line = [p1, p2, p3, p4]
    return linePath(line)
  }).attr('fill', '#fff').attr('stroke', function(d) {
    return d.color
  }).attr('stroke-width', 1)
    .attr('marker-end', 'url(#left-line-circle)')
}

function drawLeftLinkNumber(update, className) {
  update.enter().append('text').attr('class', className)
  .attr('x', function(d){
    const center = getCenterPoint(d.lines[0][0], d.lines[0][1])
    return center[0] - 95
  }).attr('y', function(d){
    const center = getCenterPoint(d.lines[0][0], d.lines[0][1])
    return center[1]
  }).attr('dy', function(d){
    return -5
  }).html(function(d){
    return d.data
  })
  
  update.exit().remove()

  update.attr('x', function(d){
    const center = getCenterPoint(d.lines[0][0], d.lines[0][1])
    return center[0] - 95
  }).attr('y', function(d){
    const center = getCenterPoint(d.lines[0][0], d.lines[0][1])
    return center[1]
  }).attr('dy', function(d){
    return -5
  }).html(function(d){
    return d.data
  })
}

function drawLinkRightLabel(update, className) {
  const width = 120
  const height = 30
  const appendG = update.enter().append('g').attr('class', className)

  appendG.append('rect').attr('class', 'rect1').attr('x', function(d){
      return getCenterPoint(d.points[1], d.points[2])[0] - width
    }).attr('y', function(d){
      return getCenterPoint(d.points[1], d.points[2])[1] - 20
    }).attr('width', function(d){
      return width * d.ratio
    }).attr('height', function(d){
      return height
    }).attr('fill', '#4cd3ff')

  appendG.append('rect').attr('class', 'rect2').attr('x', function(d){
      return getCenterPoint(d.points[1], d.points[2])[0] - width * (1 - d.ratio)
    }).attr('y', function(d){
      return getCenterPoint(d.points[1], d.points[2])[1] - 20
    }).attr('width', function(d){
      return width * (1 - d.ratio)
    }).attr('height', function(d){
      return height
    }).attr('fill', '#6784e3')

  appendG.append('text').attr('class', 'rect-label-info').attr('x', function(d){
      return getCenterPoint(d.points[1], d.points[2])[0] - width + 15
    }).attr('y', function(d){
      return getCenterPoint(d.points[1], d.points[2])[1]
    }).html(function(d, index){
      return `转化率:  ${Number(d.ratio * 100).toFixed(2)}%`
    }).attr('fill', '#fff')
  
  update.exit().remove()

  console.log('update', update);
  update.select('.rect1').attr('x', function(d){
    console.log('ddd', d);
      return getCenterPoint(d.points[1], d.points[2])[0] - width
    }).attr('y', function(d){
      return getCenterPoint(d.points[1], d.points[2])[1] - 20
    }).attr('width', function(d){
      return width * d.ratio
    }).attr('height', function(d){
      return height
    }).attr('fill', '#4cd3ff')

  update.select('.rect2').attr('x', function(d){
      return getCenterPoint(d.points[1], d.points[2])[0] - width * (1 - d.ratio)
    }).attr('y', function(d){
      return getCenterPoint(d.points[1], d.points[2])[1] - 20
    }).attr('width', function(d){
      return width * (1 - d.ratio)
    }).attr('height', function(d){
      return height
    }).attr('fill', '#6784e3')

  update.select('.rect-label-info').attr('x', function(d){
      return getCenterPoint(d.points[1], d.points[2])[0] - width + 15
    }).attr('y', function(d){
      return getCenterPoint(d.points[1], d.points[2])[1] 
    }).html(function(d, index){
      return `转化率:  ${Number(d.ratio * 100).toFixed(2)}%`
    }).attr('fill', '#fff')
}


function drawPolygonLabel(update, className, startX, startY, polygonItems, callBack) {
  const width = 50
  const height = 30
  const gap = 110
  const linePath = d3.line()
  const appendG = update.enter().append('g').attr('class', className)
  appendG.append('path').attr('class', 'label-rect').attr('d', function(d, index){
    let currentX = startX + index * gap
    const points = [[currentX, startY], [currentX + width, startY], [currentX + width, startY + height], [currentX, startY + height]]
    return linePath(points) + 'Z'
  }).style('fill', function(d, index){ 
    console.log('disabledColor', d);
    return d.active ? d.color : d.disabledColor
  }).on('mouseenter', function(d, index){
    if(!d.active){
      return
    }
    this.style.fill = d.hoverColor
    polygonItems._groups[0][index].style.fill = this.style.fill
  }).on('mouseleave', function(d, index){
    if(!d.active){
      return
    }
    this.style.fill = d.color
    polygonItems._groups[0][index].style.fill = this.style.fill
  }).on('click', function(d, index) {
    d.active = !d.active
    callBack(d)
    if(d.active) {
      polygonItems._groups[0][index].style.fill = d.color
    } else {
      polygonItems._groups[0][index].style.fill = d.disabledColor
    }
  }).style('stroke', function() { return '#000' })
  
  appendG.append('text').attr('class', 'label-rect-text').attr('x', function(d, index){
    let currentX = startX + index * gap
    return currentX + 10
  }).attr('y', function(d){
    return startY + 50
  }).html(function(d){
    return d.label
  }).attr('fill', '#ccc')

  update.exit().remove()

  const updateG = update.selectAll('class', className)

  update.select('.label-rect').attr('d', function(d, index){
    let currentX = startX + index * gap
    const points = [[currentX, startY], [currentX + width, startY], [currentX + width, startY + height], [currentX, startY + height]]
    return linePath(points) + 'Z'
  }).style('fill', function(d, index){ 
    return d.active ? d.color : d.disabledColor
  }).style('stroke', function() { return '#000' })

}


const funnelService = { getPolygons, drawPolygons, drawPolygonsText, getPolygonRightLinks,
   drawPolygonsRightLinks, drawPolygonsLeftLinks, drawMarkers, drawLeftLinkNumber, drawLinkRightLabel, drawPolygonLabel }

export default funnelService