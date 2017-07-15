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
        gPolygonRightLinkClassName: 'g-polygon-right-link',
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
        console.log('this.polygonsWithData', this.polygonsWithData);
        const update = this.svg.select(`.${this.gPolygonClassName}`)
          .selectAll(`.${this.gPolygonItemClassName}`).data(this.polygonsWithData)
        funnelService.drawPolygons(update)
      },
      drawPolygonsText() {
        const update = this.svg.select('.polygon-text')
          .selectAll(`.${this.gPolygonItemClassName}`).data(this.polygonsWithData)
        funnelService.drawPolygonsText(update)
      },
      drawPolygonRightLinks() {
        const linePaths = funnelService.getPolygonRightLinks(this.polygonsWithData, this.width * .9)
        const update = this.svg.select('.polygon-link-right')
          .selectAll(`.${this.gPolygonRightLinkClassName}`).data(linePaths)
        funnelService.drawPolygonsRightLinks(update)
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
      },
      polygonsWithData() {
        return this.polygons.map((poly, index) => {
          return {
            lines: poly,
            label: this.labelInfo[index],
            active: true,
            data: this.data[index]
          }
        })
      }
    },
    mounted() {
      this.svg = d3.select(this.$refs.chart).append('svg')
      this.svg.attr('width', '100%').attr('height', '100%')
      this.svg.append('g').attr('class', this.gPolygonClassName)
      this.svg.append('g').attr('class', 'polygon-text')
      this.svg.append('g').attr('class', 'polygon-link-right')
      this.drawPolygons()
      this.drawPolygonsText()
      this.drawPolygonRightLinks()
    }
  }

</script>