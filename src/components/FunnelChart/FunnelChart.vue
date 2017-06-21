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
  const drawExtraInfo = function() {
    const ctx = this.canvasDom.getContext('2d');
    ctx.strokeRect(0, 0, 100, 100);
  }

  export default {
    data() {
      return {
        chartInstance: undefined,
        canvasDom: undefined,
      }
    },
    mounted() {
      this.chartInstance = this.echarts.init(this.$refs.child);
      this.chartInstance.setOption(parseData({}, drawExtraInfo.bind(this)));
      this.canvasDom = this.$refs.child.childNodes[0].childNodes[0];
    },
    computed: {
      ...mapState({
        echarts: state => state.echarts
      })
    }
  }

</script>