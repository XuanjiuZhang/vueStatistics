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
      const polygonGap = 8
      return {
        funnelPaddingTop: 0.1,
        funnelPaddingBottom: 0.2,
        funnelPaddingLeftRight: 0.25,
        polygonGap,
        svg: undefined,
        data: [],
        labelInfo: []
      }
    },
    props: {
      /*data: {
        type: Array,
        default: function() {
          return [10, 33, 45, 26]
        }
      },
      labelInfo: {
        type: Array,
        default: function() {
          return ['访问', '线索', '商机', '订单']
        }
      },*/
      width: {
        type: Number,
        default: 1300
      },
      height: {
        type: Number,
        default: 700
      },
      funnelColorList: {
        type: Array,
        default: function() {
          return ['#4965ac', '#54d1f5', '#ef873c', '#feca2d', '#f53234']
        }
      },
      funnelHoverColorList: {
        type: Array,
        default: function() {
          return ['rgb(100, 129, 200)', 'rgb(135, 211, 249)', 'rgb(255, 167, 103)', 'rgb(255, 222, 123)', 'rgb(255, 106, 108)']
        }
      },
      funnelDisabledColor: {
        type: String,
        default: 'rgb(191, 203, 221)'
      }
    },
    methods: {
      ascFn(a, b) {
        return a - b;
      },
      descFn(a, b) {
        return b - a;
      },
      polyClickCallBack(data) {
        console.log(data)
        this.drawPolygonRightLinks()
        this.drawLabels()
      },
      labelClickCallBack(data) {
        console.log(data)
        this.drawPolygonRightLinks()
      },
      drawPolygons() {
        console.log('this.polygonsWithData', this.polygonsWithData);
        const update = this.svg.select('.g-polygon')
          .selectAll('.polygon-item').data(this.polygonsWithData)
        funnelService.drawPolygons(update, 'polygon-item', this.polyClickCallBack)
      },
      drawPolygonsText() {
        const update = this.svg.select('.g-polygon-text')
          .selectAll('.polygon-center-text').data(this.polygonsWithData)
        funnelService.drawPolygonsText(update, 'polygon-center-text')
      },
      drawPolygonRightLinks() {
        const linePaths = funnelService.getPolygonRightLinks(this.polygonsWithData, this.width * .85)
        const update = this.svg.select('.g-polygon-link-right')
          .selectAll('.polygon-right-link').data(linePaths)
        funnelService.drawPolygonsRightLinks(update, 'polygon-right-link')
        this.drawLinkRightLabel(linePaths)
      },
      drawPolygonsLeftLinks() {
        const update = this.svg.select('.g-polygon-link-left')
          .selectAll('.polygon-link-left').data(this.polygonsWithData)
        funnelService.drawPolygonsLeftLinks(update, 'polygon-link-left')
      },
      drawMarkers() {
        funnelService.drawMarkers(this.svg)
      },
      drawPolygonsLeftLinksNumber() {
        const update = this.svg.select('.g-polygon-left-number')
          .selectAll('.polygon-left-number').data(this.polygonsWithData)
        funnelService.drawLeftLinkNumber(update, 'polygon-left-number')
      },
      drawLinkRightLabel(linePaths) {
        const update = this.svg.select('.g-polygon-link-right-label')
          .selectAll('.polygon-link-right-label').data(linePaths)
        funnelService.drawLinkRightLabel(update, 'polygon-link-right-label')
      },
      drawLabels() {
        const update = this.svg.select('.g-polygon-label')
          .selectAll('.polygon-label').data(this.polygonsWithData)
        const polygonItems = this.svg.select('.g-polygon')
          .selectAll('.polygon-item')
        funnelService.drawPolygonLabel(update, 'polygon-label', this.width * .353, this.height * .85, polygonItems, this.labelClickCallBack)
      }
    },
    computed: {
      ...mapState(['statisticApi', 'sid']),
      chartStyle() {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        }
      },
      polygons() {
        const pLeftTop = [this.width * this.funnelPaddingLeftRight, this.height * this.funnelPaddingTop]
        const pRightTop = [this.width * (1 - this.funnelPaddingLeftRight), this.height * this.funnelPaddingTop]
        const pBottom = [this.width * .5, this.height * (1 - this.funnelPaddingBottom)]
        const polygonNumber = this.data.length
        const polygons = funnelService.getPolygons(pLeftTop, pRightTop, pBottom, polygonNumber, this.polygonGap)
        console.log('polygons', polygons);
        return polygons
      },
      polygonsWithData() {
        const sortedData = [].concat(this.data).sort(this.descFn)
        console.log('sortedData', sortedData);
        return this.polygons.map((poly, index) => {
          return {
            lines: poly,
            label: this.labelInfo[index],
            active: true,
            data: sortedData[index],
            color: this.funnelColorList[index],
            hoverColor: this.funnelHoverColorList[index],
            disabledColor: this.funnelDisabledColor
          }
        })
      }
    },
    mounted() {
      this.svg = d3.select(this.$refs.chart).append('svg')
      this.svg.attr('width', '100%').attr('height', '100%')
      this.svg.append('g').attr('class', 'g-polygon')
      this.svg.append('g').attr('class', 'g-polygon-text')
      this.svg.append('g').attr('class', 'g-polygon-link-right')
      this.svg.append('g').attr('class', 'g-polygon-link-left')
      this.svg.append('g').attr('class', 'g-polygon-left-number')
      this.svg.append('g').attr('class', 'g-polygon-link-right-label')
      this.svg.append('g').attr('class', 'g-polygon-label')

      this.statisticApi.effects.getFunnelData(this.sid).then(res => {
        if(res.ok){
          return res.json()
        }
        return 'error'
      }).then(resData => {
        if(resData === 'error'){
          return 
        }
        const { visit, hits, data, business, order } = resData
        const rawData = [
              [visit, '访问量'],
              [hits, '点击量'],
              [data, '线索'],
              [business, '商机'],
              [order, '订单']
          ]
        const echartFunnelData = rawData.filter(d => {
          return d[0] != 0
        })

        const unziped = _lodash.unzip(echartFunnelData)
        this.data = unziped[0]
        this.labelInfo = unziped[1]

        this.drawMarkers()
        this.drawPolygons()
        this.drawPolygonsText()
        this.drawPolygonRightLinks()
        this.drawPolygonsLeftLinks()
        this.drawPolygonsLeftLinksNumber()
        this.drawLabels()
      }) 
      
    }
  }

</script>