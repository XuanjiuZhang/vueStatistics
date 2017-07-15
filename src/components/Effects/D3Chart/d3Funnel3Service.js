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

  const a1 = (pBottom[1] - pLeftTop[1]) / (pBottom[0] - pLeftTop[0]) 
  const b1 = pBottom[1] - a1 * pBottom[0]

  const a2 = (pBottom[1] - pRightTop[1]) / (pBottom[0] - pRightTop[0])
  const b2 = pBottom[1] - a2 * pBottom[0]

  leftLinePoints.push(pLeftTop)
  rightLinePoints.push(pRightTop)

  for(let i = 1; i < polygonNumber; i++) {
    let leftX1 = pLeftTop[0] + perX * i - polygonGap
    let leftY1 = a1 * leftX1 + b1
    let leftX2 = pLeftTop[0] + perX * i + polygonGap
    let leftY2 = a1 * leftX2 + b1

    let rightX1 = pRightTop[0] - perX * i + polygonGap
    let rightY1 = a2 * rightX1 + b2
    let rightX2 = pRightTop[0] - perX * i - polygonGap
    let rightY2 = a2 * rightX2 + b2
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

function drawPolygons(update) {
  update.enter().append('polygon').attr('points', function(d) {
    const points = [d.lines[0][0], d.lines[1][0], d.lines[1][1], d.lines[0][1]]
    console.log('points', points);
    return points.reduce((pointsStr, nextPoint) => {
      return pointsStr + ' ' + nextPoint.join();
    }, '');
  }).style('fill', function(d, index){
    return 'grey'
  })

  update.exit().remove()

  update.attr('points', function(d) {
    const points = [d.lines[0][0], d.lines[1][0], d.lines[0][1], d.lines[1][1]]
    return points.reduce((pointsStr, nextPoint) => {
      return pointsStr + ' ' + nextPoint.join();
    }, '');
  }).style('fill', function(d, index){
    return 'grey'
  })
}

function drawPolygonsText(update) {
  update.enter().append('text').attr('class', 'polygon-center-text').attr('x', function(d){
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

function getPolygonRightLinks (polygonsWithData, rightPosition) {
  const linkPoints = polygonsWithData.map(polygon => {
    return [(polygon.lines[1][0][0] + polygon.lines[1][1][0]) / 2,
     (polygon.lines[1][0][1] + polygon.lines[1][1][1]) / 2]
  })
  console.log('linkPoints', linkPoints);
  const linePaths = []
  for(let i = 0; i < linkPoints.length - 1; i++) {
    let points = [linkPoints[i], [linkPoints[i][0], rightPosition],
     [linkPoints[i + 1][0], rightPosition], linkPoints[i + 1]]
    linePaths.push(points)
  }
  console.log('linePaths', linePaths);
  return linePaths
}

function drawPolygonsRightLinks(update) {
  const linePath = d3.line()
  update.enter().append('path').attr('class', 'g-polygon-right-link')
  .attr('d', function(d){
    return linePath(d)
  })

  update.exit().remove()

  update.attr('d', function(d){
    return linePath(d)
  })
}

const funnelService = { getPolygons, drawPolygons, drawPolygonsText, getPolygonRightLinks, drawPolygonsRightLinks }

export default funnelService