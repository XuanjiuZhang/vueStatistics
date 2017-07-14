<style lang="less">
  /*.funnel-chart {
    width: 650px;
    height: 550px;
  }*/
  .funnel-chart {
    width: 100%;
    height: 550px;
  }
  .composed-table-wrapper {
    width: 80%;
  }
  .line-chart {
    width: 80%;
    height: 800px;
  }
  .device-chart {
    width: 80%;
    /*height: 450px;*/
  }
  .map-chart {
    width: 80%;
    /*height: 450px;*/
  }
  .mb-20 {
    margin-bottom: 20px;
  }
</style>

<template>
  <div>
    <div class="content-wrapper">
      <div class="title">
        <span><b>营销漏斗</b></span>
      </div>
      <div class="funnel-chart center">
        <!--<Funnel-chart></Funnel-chart>-->
        <!--<D3-funnel2></D3-funnel2>-->
        <echart-funnel v-if="echartFunnelData.length" :data="echartFunnelData"></echart-funnel>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="title">
        <span><b>渠道明细</b></span>
      </div>
      <div class="composed-table-wrapper center">
        <Composed-table></Composed-table>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="title">
        <span><b>访问趋势</b></span>
      </div>
      <div class="line-chart center">
        <Line-chart></Line-chart>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="title">
        <span><b>设备机型</b></span>
      </div>
      <div class="device-chart center">
        <Device-chart></Device-chart>
      </div>
    </div>

    <div class="content-wrapper mb-20">
      <div class="title">
        <span><b>地域统计</b></span>
      </div>
      <div class="map-chart center">
        <Map-chart></Map-chart>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapState } from 'Vuex'
  import FunnelChart from './FunnelChart/FunnelChart'
  import echartFunnel from './FunnelChart/ElEchartFunnel'
  /*import D3Funnel from './D3Chart/D3Funnel'
  import D3Funnel2 from './D3Chart/D3Funnel2'*/
  import ComposedTable from './Table/ComposedTable'
  import LineChart from './visit/LineChart'
  import DeviceChart from './visit/DeviceChart'
  import MapChart from './visit/MapChart'
  export default {
    data() {
      return {
        echartFunnelData: []
      } 
    },
    mounted() {
      this.statisticApi.effects.getFunnelData(this.$route.params.id).then(res => {
        if(res.ok){
          return res.json()
        }
        return 'error'
      }).then(resData => {
        if(resData === 'error'){
          return 
        }
        const newArr = []
        console.log(resData);
        const { visit, hits, data, business, order } = resData
        const rawData = [
              [visit, '#61A0A8', '访问量'],
              [hits, '#2F4554', '点击量'],
              [data, '#C23531', '线索'],
              [business, '#D48265', '商机'],
              [order, '#91C7AE', '订单']
          ]
        this.echartFunnelData = rawData.filter(d => {
          return d[0] != 0
        })
      }) 
    },
    computed: {
      ...mapState(['statisticApi']),
    },
    components: {
      FunnelChart,
      ComposedTable,
      // D3Funnel,
      // D3Funnel2,
      echartFunnel,
      LineChart,
      DeviceChart,
      MapChart
    }
  }

</script>
