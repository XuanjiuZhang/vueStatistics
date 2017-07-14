<style lang="less">
  .line-canvas {
    width: 93%;
    height: 650px;
  }
</style>

<template>
  <div>
    <Channel-bar
      @channelChanged="channelChanged"
      @timeChanged="timeChanged"
      @getVisitTree="onGetVisitTree"
      :echartDom="echartDom"></Channel-bar>
    <div ref="child" class="center line-canvas"></div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import ChannelBar from './ChannelBar'
  import { echartsLineDataParser } from './lineChartService'

  export default {
    data() {
      return {
        channel: undefined,
        timeData: {
          timePeroid: -1,
          timeType: 'day'
        },
        lineData: undefined,
        echartsOpt: undefined,
        echartDom: undefined,
      }
    },
    mounted() {
      window.echarts = this.echarts
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'echarts', 'VueEventBus']),
    },
    methods: {
      onGetVisitTree() {
        this.getLineData()
        this.echartDom = this.echarts.init(this.$refs.child);
      },
      getLineData() {
        this.statisticApi.effects.getLineTendency(this.sid, {
          channelid: this.channel ? this.channel.id : undefined,
          day: this.timeData.timePeroid === -1 ? undefined : this.timeData.timePeroid
        }).then(res => res.json()).then(data => {
          console.log(data);
          this.lineData = data
          this.echartsOpt = echartsLineDataParser(this.lineData, this.timeData)
          this.echartDom.setOption(this.echartsOpt, true)
          this.VueEventBus.$emit('echartDomInited')
        })
      },
      channelChanged(channel) {
        console.log(channel);
        this.channel = channel
        this.getLineData()
      },
      timeChanged(time) {
        console.log(time);
        this.timeData = time
        this.getLineData()
      }
    },
    components: {
      ChannelBar
    }
  }

</script>