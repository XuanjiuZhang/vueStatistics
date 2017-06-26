<style lang="less">
  .content-wrapper {
    margin-top: 20px;
  }
  .content-wrapper-center {
    margin: 0 auto
  }
  .funnel-chart {
    width: 600px;
    height: 550px;
  }
</style>

<template>
  <div>
    <div class="content-wrapper">
      <div>
        <span>营销漏斗</span>
      </div>
      <div class="funnel-chart content-wrapper-center">
        <!--<Funnel-chart></Funnel-chart>-->
        <D3-funnel2></D3-funnel2>
      </div>
    </div>
    <div class="content-wrapper">
      <div>
        <span>渠道访问明细</span>
      </div>
      <div class="composed-table content-wrapper-center">
        <Composed-table></Composed-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'Vuex'
  import FunnelChart from './FunnelChart/FunnelChart'
  import D3Funnel from './D3Chart/D3Funnel'
  import D3Funnel2 from './D3Chart/D3Funnel2'
  import ComposedTable from './Table/ComposedTable'
  export default {
    data() {
      return {
      } 
    },
    // props: ['eleData', 'finalScale'],
    mounted() {
    },
    computed: {
      // ...mapGetters(['statisticApi', 'currentShowChannel', 'echarts'])
    },
    components: {
      FunnelChart,
      ComposedTable,
      D3Funnel,
      D3Funnel2
    }
  }

</script>
