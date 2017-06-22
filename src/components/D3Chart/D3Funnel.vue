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
        chartHeight: 500,
        chartWidth: 600,
        funnelTopWidthRatio: 0.8,
        level: 5
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

      var data = [20, 30, 40, 80, 100].sort(ascFn);

      const funnelTopWidth = this.chartWidth * this.funnelTopWidthRatio;
      const tubeHeight = this.chartHeight / this.level;
      console.log(funnelTopWidth);
      console.log(tubeHeight);

      var svg = window.d3.select('#' + this.chartId)
            .append('svg');
      svg.attr('width', '100%').attr('height', '100%');

      var x = d3.scaleLinear().domain([0, d3.max(data)]).range([0, funnelTopWidth]);
      /*svg.selectAll('div').data(data).enter().append('div').style('width', function(d) {
        console.log(d);
        return x(d) + 'px';
      }).text(function(d) {return d});*/

      const widthArr = data.map(d => Math.floor(x(d)));
      console.log(widthArr);
      const points = widthArr.sort(descFn).map((width, index) => {
        let pointLeft = [this.chartWidth / 2 - width / 2, index * tubeHeight];
        let pointRight = [this.chartWidth / 2 + width / 2, index * tubeHeight];
        return [pointLeft, pointRight];
      });
      const bottomPoints = [[this.chartWidth / 2, this.chartHeight]];
      points.push(bottomPoints);
      console.log(points);

      const linkLinePoints = points.map(po => {
        return po[1];
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
        this.style.fill = d._extra.hoverColor
      }).on('mouseleave', function(d){
        this.style.fill = d._extra.color
      });

    }
  }

</script>