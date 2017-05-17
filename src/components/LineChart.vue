<style lang="less">
  .line-chart {
    display: inline-block;
    width: 600px;
    height: 500px;
  }
</style>

<template>
  <div id="line-chart" class="line-chart">
    <!--此区域为图表区 仅放此图以查看效果-->
  </div>
</template>

<script>
  import { mapGetters } from 'Vuex';
  export default {
    data() {
      return {
        day: 'all',
        timeType: 'day'
      } 
    },
    // props: ['eleData', 'finalScale'],
    mounted() {
      // console.log(this.statisticApi);
      // this.statisticApi.getGeneralStatistics('108d5e20307011e7a79fdb2f45488c7f');
    },
    watch: {
      'currentShowChannel' (newVal){
        console.log(newVal);
      }
    },
    computed: {
      ...mapGetters(['statisticApi', 'currentShowChannel', 'echarts'])
    },
  }

</script>
