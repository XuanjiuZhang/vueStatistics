<style lang="less">
  .funnel-chart {
    display: inline-block;
    width: 600px;
    height: 500px;
  }
</style>

<template>
  <div ref="child" class="funnel-chart">
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import parseData from './funnelService';
  export default {
    data() {
      return {
        chartInstance: undefined,
      }
    },
    mounted() {
      console.log(this.$refs.child);

      this.chartInstance = this.echarts.init(this.$refs.child);
      this.chartInstance.setOption(parseData());
    },
    computed: {
      ...mapState({
        echarts: state => state.echarts
      })
    }
  }

</script>