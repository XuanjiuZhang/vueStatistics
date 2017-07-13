<style lang="less">
</style>

<template>
  <div>
    <Channel-bar @channelChanged="channelChanged" @timeChanged="timeChanged"></Channel-bar>
    <div ref="child" style="width: 500px; height: 400px;"></div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import ChannelBar from './ChannelBar'
  import { echartsLineDataParser } from './service'

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
        echartDom: undefined
      }
    },
    mounted() {
      window.echarts = this.echarts
      this.getLineData()
      this.echartDom = this.echarts.init(this.$refs.child);
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'echarts']),
    },
    methods: {
      getLineData() {
        this.statisticApi.effects.getLineTendency(this.sid, {
          channelid: this.channel ? this.channel.id : undefined,
          day: this.timeData.timePeroid === -1 ? undefined : this.timeData.timePeroid
        }).then(res => res.json()).then(data => {
          console.log(data);
          this.lineData = data
          this.echartsOpt = echartsLineDataParser(this.lineData, this.timeData)
          this.echartDom.setOption(this.echartsOpt)
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