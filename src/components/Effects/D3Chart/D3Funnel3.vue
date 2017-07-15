<style lang="less">
</style>

<template>
  <div class="center" :style="chartStyle" ref="chart">
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import funnelService from './d3Funnel3Service'
  export default { 
    data() {
      const funnelPadding = [0.15, 0.25]
      const polygonGap = 8
      return {
        funnelPadding,
        polygonGap,
        svg: undefined,
        gPolygonClassName: 'g-polygon',
        gPolygonItemClassName: 'g-polygon-item',
      }
    },
    props: {
      data: {
        type: Array,
        default: function() {
          return [10, 26, 45, 33]
        }
      },
      labelInfo: {
        type: Array,
        default: function() {
          return ['访问', '线索', '商机', '订单']
        }
      },
      width: {
        type: Number,
        default: 1300
      },
      height: {
        type: Number,
        default: 700
      },
    },
    methods: {
      ascFn(a, b) {
        return a - b;
      },
      descFn(a, b) {
        return b - a;
      },
      drawPolygons() {
        const update = this.svg.select(`.${this.gPolygonClassName}`)
          .selectAll(`.${this.gPolygonItemClassName}`).data(this.polygons)
        funnelService.drawPolygons(update)
      },
      drawPolygonsText() {
        const update = this.svg.select('.polygon-text')
          .selectAll(`.${this.gPolygonItemClassName}`).data(this.polygons)
        funnelService.drawPolygonsText(update)
      }
    },
    computed: {
      ...mapState(['statisticApi']),
      chartStyle() {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        }
      },
      polygons() {
        const pLeftTop = [this.width * this.funnelPadding[1], this.height * this.funnelPadding[0]]
        const pRightTop = [this.width * (1 - this.funnelPadding[1]), this.height * this.funnelPadding[0]]
        const pBottom = [this.width * .5, this.height * (1 - this.funnelPadding[0])]
        const polygonNumber = this.data.length
        const polygons = funnelService.getPolygons(pLeftTop, pRightTop, pBottom, polygonNumber, this.polygonGap)
        console.log('polygons', polygons);
        return polygons
      }
    },
    mounted() {
      this.svg = d3.select(this.$refs.chart).append('svg')
      this.svg.attr('width', '100%').attr('height', '100%')
      this.svg.append('g').attr('class', this.gPolygonClassName)
      this.svg.append('g').attr('class', 'polygon-text')
      this.drawPolygons()
      // this.drawPolygonsText()
    }
  }

</script>