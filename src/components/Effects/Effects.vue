<style lang="less">
  .content-wrapper {
    margin-top: 20px;
    margin-bottom: 40px;
    background: #fff;
    box-shadow: 0 0 8px #cbd3de;
    .title {
      height: 55px;
      border-bottom:solid #EAEFF5 1px;
      line-height: 55px;
      span {
        margin-left: 20px;
        font-size: 16px;
      }
    }
    .center {
      margin: 30px auto 0
    }
  }
  .funnel-chart {
    width: 650px;
    height: 550px;
  }
  .composed-table-wrapper {
    width: 90%;
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
        <D3-funnel2></D3-funnel2>
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
