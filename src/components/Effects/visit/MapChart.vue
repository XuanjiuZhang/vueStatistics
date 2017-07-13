<style lang="less">
</style>

<template>
  <div>
    <div ref="child"></div>
    <div class="c-time">
      <ul class="peroid">
        <li :class="{active: timePeroid === 0}" @click="changeTimePeroid(0)">今天</li>
        <li :class="{active: timePeroid === 1}" @click="changeTimePeroid(1)">昨天</li>
        <li :class="{active: timePeroid === 7}" @click="changeTimePeroid(7)">近七天</li>
        <li :class="{active: timePeroid === 30}" @click="changeTimePeroid(30)">近三十天</li>
        <li :class="{active: timePeroid === -1}" @click="changeTimePeroid(-1)">全部</li>
      </ul>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import { parseData } from './mapChartService'

  export default {
    data() {
      return {
        isCountryMap: true,
        currentPosition: 'country',
        timePeroid: -1,
      }
    },
    mounted() {
      this.echartDom = this.echarts.init(this.$refs.child);
      this.echartDom.on('click', function (params) {
        if (!this.isCountryMap) {
          return 
        }
        this.isCountryMap = false;
        echartsRegister.registerProvince(params.name)
          .then(function (result) {
            sceneApiService.getProvinceVisitChannel(sceneId, function (data) {
              var proOption =
                commonStatisticsService.getProvinceMapOption(data, mapChart, scope, params.name);
              mapChart.setOption(proOption);
              $document.on('keydown', escProvince);
            }, params.name, channelId);
          }, function (reason) {
            console.log(reason);
          });
      });
      this.getCountryVisits()
    },
    methods: {
      changeTimePeroid(peroid) {
        this.timePeroid = peroid
      },
      getCountryVisits() {
        this.statisticApi.effects.getCountryVisit(this.sid).then(res => res.json()).then(data => {
          console.log(data);
          const opt = parseData(data, this.isCountryMap)
          console.log(opt);
          // this.echartDom.setOption(opt, true)
        })
      },
      getProvinceVisits() {
        const send = {province: '湖南'}
        this.statisticApi.effects.getProvinceVisit(this.sid, send).then(res => res.json()).then(data => {
          console.log(data);
        })
      }
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'echarts'])
    }
  }

</script>