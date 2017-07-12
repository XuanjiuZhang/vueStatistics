<style lang="less">
</style>

<template>
  <div ref="child">
    <Channel-bar @channelChanged="channelChanged" @timeChanged="timeChanged"></Channel-bar>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import ChannelBar from './ChannelBar'

  export default {
    data() {
      return {
        channel: undefined,
        timeData: {
          timePeroid: -1,
          timeType: 'day'
        }
      }
    },
    mounted() {
      this.getLineData()
    },
    computed: {
      ...mapState(['statisticApi', 'sid'])
    },
    methods: {
      getLineData() {
        this.statisticApi.effects.getLineTendency(this.sid, {
          channelid: this.channel ? this.channel.id : undefined,
          day: this.timeData.timePeroid === -1 ? undefined : this.timeData.timePeroid
        }).then(res => res.json()).then(data => {
          console.log(data);
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