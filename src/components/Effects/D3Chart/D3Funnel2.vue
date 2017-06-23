<style lang="less">
</style>

<template>
  <div class="funnel-chart" :id="chartId">
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  export default {
    data() {
      const chartId = '_funnel' +　Math.floor(Math.random() * 10000);
      return {
        chartId,
        chartHeight: 400,
        chartWidth: 600,
        leftLinePos: 50,
        rightLinePos: 580,
        ploygonMargin: 6,
        funnelTopWidthRatio: 0.8,
        level: 5,
        ploygonArr: [],
        linkPolygonArr: [],
        svg: undefined
      }
    },
    methods: {
      linkPolygon(top, bottom){
        const pointLeftTop = top.rightLineDownPoint
        const pointLeftBottom = bottom.rightLineUpPoint
        const pointRightTop = {
          x: this.leftLinePos,
          y: pointLeftTop.y
        }
        const pointRightBottom = {
          x: this.leftLinePos,
          y: pointLeftBottom.y
        }
        const textPoint = {
          x: this.rightLinePos - 60,
          y: (pointRightTop.y + pointRightBottom.y) / 2 + 6
        }
        const ploygon = {
          pointLeftTop,
          pointRightTop,
          pointLeftBottom,
          pointRightBottom,
          textPoint
        }
        this.linkPolygonArr.push(ploygon)
        this.drawLinkPolygon();
      },
      drawLinkPolygon() {
        /*const d = `M153 334
          C153 334 151 334 151 334
          C151 339 153 344 156 344
          C164 344 171 339 171 334
          C171 322 164 314 156 314
          C142 314 131 322 131 334
          C131 350 142 364 156 364
          C175 364 191 350 191 334
          C191 311 175 294 156 294
          C131 294 111 311 111 334
          C111 361 131 384 156 384
          C186 384 211 361 211 334
          C211 300 186 274 156 274`*/
        const linked = this.svg.selectAll('link-line-right').data(this.linkPolygonArr);
        const linkedText = this.svg.selectAll('link-line-right-text').data(this.linkPolygonArr);
        linked.exit().remove();
        linkedText.exit().remove();
        
        const rightPos = this.rightLinePos;
        linked.enter().append('path').attr('class', 'link-line-right').attr('d', function(d){
          const polygonHeight = d.pointLeftBottom.y - d.pointLeftTop.y
          var str = `M${d.pointLeftTop.x} ${d.pointLeftTop.y} H ${rightPos} v ${polygonHeight/4} m 0,${polygonHeight/2} V ${d.pointRightBottom.y} H ${d.pointLeftBottom.x}`
          return str
        }).style('fill', 'white').style('stroke', 'rgb(99,99,99)').style('stroke-width', '2');

        linkedText.enter().append('text').attr('class', 'link-line-right-text').attr('x', function(d){
          return d.textPoint.x
        }).attr('y', function(d){
          return d.textPoint.y
        }).html(function(d){
          return '转化率: 50%'
        });
      }
    },
    mounted() {
      console.log(this.chartId);
      const ascFn = (a, b) => {
        return a - b;
      };

      const descFn = (a, b) => {
        return b - a;
      }

      var data = [20, 40, 60, 70, 100].sort(ascFn);

      const funnelTopWidth = this.chartWidth * this.funnelTopWidthRatio;
      const tubeHeight = this.chartHeight / this.level;

      this.svg = window.d3.select('#' + this.chartId)
            .append('svg');
      this.svg.attr('width', '100%').attr('height', '100%');

      var x = d3.scaleLinear().domain([0, d3.max(data)]).range([0, funnelTopWidth]);

      const widthArr = data.map(d => Math.floor(x(d)));
      console.log(widthArr);

      const Lines = widthArr.sort(descFn).map((width, index) => {
        let pointLeft = {x: this.chartWidth / 2 - width / 2, y: index * tubeHeight};
        let pointRight = {x: this.chartWidth / 2 + width / 2, y: index * tubeHeight};
        return {pointLeft, pointRight};
      });

      // const ploygonArr = [];

      Lines.forEach((line, index) => {
        var bottomLine;
        if(index === Lines.length - 1){
          let bottomPoints = {
            x: this.chartWidth / 2,
            y: this.chartHeight
          };
          bottomLine = {
            pointLeft: bottomPoints,
            pointRight: bottomPoints
          }
        }else{
          bottomLine = {
            pointLeft: Object.assign({}, Lines[index + 1].pointLeft),
            pointRight: Object.assign({}, Lines[index + 1].pointRight)
          }
        }
        bottomLine.pointLeft.y -= this.ploygonMargin;
        bottomLine.pointRight.y -= this.ploygonMargin;

        const rightLineRatio = (bottomLine.pointRight.y - line.pointRight.y) / (bottomLine.pointRight.x - line.pointRight.x)
        const B = line.pointRight.y - rightLineRatio * line.pointRight.x

        const fnY2X = y => {
          return (y - B) / rightLineRatio
        }
        const leftLineCenterPoint = {
          x: (line.pointLeft.x + bottomLine.pointLeft.x) / 2,
          y: (line.pointLeft.y + bottomLine.pointLeft.y) / 2
        }
        const rightLineUpPoint = {
          x: fnY2X((line.pointRight.y + bottomLine.pointRight.y) / 2 - 10),
          y: (line.pointRight.y + bottomLine.pointRight.y) / 2 - 10
        }
        const rightLineDownPoint = {
          x: fnY2X((line.pointRight.y + bottomLine.pointRight.y) / 2 + 10),
          y: (line.pointRight.y + bottomLine.pointRight.y) / 2 + 10
        }
        const ploygon = {
          pointLeftTop: line.pointLeft,
          pointRightTop: line.pointRight,
          pointLeftBottom: bottomLine.pointLeft,
          pointRightBottom: bottomLine.pointRight,
          color: '#' + Math.floor(Math.random() * 1000000),
          hoverColor: '#' + Math.floor(Math.random() * 1000000),
          leftLineCenterPoint,
          rightLineUpPoint,
          rightLineDownPoint
        }
        this.ploygonArr.push(ploygon)
      });

      console.log(this.ploygonArr);

      this.svg.selectAll('polygon').data(this.ploygonArr).enter().append('polygon').attr('points', function(d) {

        const points = [[d.pointLeftTop.x, d.pointLeftTop.y],
        [d.pointRightTop.x, d.pointRightTop.y], 
        [d.pointRightBottom.x, d.pointRightBottom.y],
        [d.pointLeftBottom.x, d.pointLeftBottom.y]]

        return points.reduce((pointsStr, nextPoint) => {
          return pointsStr + ' ' + nextPoint.join();
        }, '');
      }).style('fill', function(d){
        return d.color;
      }).on('mouseover', function(d){
        this.style.fill = d.hoverColor
      }).on('mouseleave', function(d){
        this.style.fill = d.color
      });

      const leftLinePos = this.leftLinePos;

      this.svg.selectAll('.left-line').data(this.ploygonArr).enter()
      .append('line').attr('class', 'left-line')
      .attr('x1', function(d) {
        return d.leftLineCenterPoint.x
      }).attr('y1', function(d) {
        return d.leftLineCenterPoint.y
      }).attr('x2', function(d) {
        // return d.leftLineCenterPoint.x - 50
        return leftLinePos
      }).attr('y2', function(d) {
        return d.leftLineCenterPoint.y
      }).style('stroke', function(){
        return 'rgb(99,99,99)'
      }).style('stroke-width', function(){
        return '2'
      });

      this.linkPolygon(this.ploygonArr[0], this.ploygonArr[1]);
      this.linkPolygon(this.ploygonArr[1], this.ploygonArr[2]);
      this.linkPolygon(this.ploygonArr[2], this.ploygonArr[3]);
      this.linkPolygon(this.ploygonArr[3], this.ploygonArr[4]);

      /*const points = widthArr.sort(descFn).map((width, index) => {
        let pointLeft = [this.chartWidth / 2 - width / 2, index * tubeHeight];
        let pointRight = [this.chartWidth / 2 + width / 2, index * tubeHeight];
        return [pointLeft, pointRight];
      });
      const bottomPoints = [[this.chartWidth / 2, this.chartHeight]];
      points.push(bottomPoints);
      console.log(points);

      const rightPoints = points.map(po => {
        return po[1] || po[0];
      });
      console.log(rightPoints);
      const LinkLinePoints = [];

      for(var n = 0; n <= rightPoints.length - 2; n++){
        let x = (rightPoints[n][0] + rightPoints[n + 1][0]) / 2
        let y = (rightPoints[n][1] + rightPoints[n + 1][1]) / 2
        LinkLinePoints.push([x, y])
      }
      console.log(LinkLinePoints);

      svg.selectAll('line').data(LinkLinePoints).enter().append('line').attr('x1', function(d) {
        return d[0]
      }).attr('y1', function(d) {
        return d[1]
      }).attr('x2', function(d) {
        return d[0] + 50
      }).attr('y2', function(d) {
        return d[1]
      }).style('stroke', function(){
        return 'rgb(99,99,99)'
      }).style('stroke-width', function(){
        return '2'
      });

      const ploygonArr = [];

      for(var i = 0; i <= points.length - 2; i++){
        let temp = [];
        if(points[i + 1].length > 1){
          temp = [points[i + 1][1], points[i + 1][0]];
        }else{
          temp = points[i + 1];
        }
        let ploygon = points[i].concat(temp);
        ploygon._extra = {
          color: '#' + Math.floor(Math.random() * 1000000),
          hoverColor: '#' + Math.floor(Math.random() * 1000000)
        };
        ploygonArr.push(ploygon);
      }
      console.log(ploygonArr);

      svg.selectAll('polygon').data(ploygonArr).enter().append('polygon').attr('points', function(d) {
        return d.reduce((pointsStr, nextPoint) => {
          return pointsStr + ' ' + nextPoint.join();
        }, '');
      }).style('fill', function(d){
        return d._extra.color;
      }).on('mouseover', function(d){
        console.log('mouseover');
        this.style.fill = d._extra.hoverColor

        svg.selectAll('line').data(LinkLinePoints).attr('x1', function(d) {
          return d[0]
        }).attr('y1', function(d) {
          return d[1]
        }).attr('x2', function(d) {
          return d[0] + 50
        }).attr('y2', function(d) {
          return d[1]
        }).style('stroke', function(){
          return 'rgb(228,228,228)'
        }).style('stroke-width', function(){
          return '2'
        });

      }).on('mouseleave', function(d){
        console.log('mouseleave');
        this.style.fill = d._extra.color

        svg.selectAll('line').data(LinkLinePoints).attr('x1', function(d) {
          return d[0]
        }).attr('y1', function(d) {
          return d[1]
        }).attr('x2', function(d) {
          return d[0] + 50
        }).attr('y2', function(d) {
          return d[1]
        }).style('stroke', function(){
          return 'rgb(99,99,99)'
        }).style('stroke-width', function(){
          return '2'
        });
      });*/

    }
  }

</script>