<style lang="less">
</style>

<template>
  <div>
    channelList
    <Channel-item></Channel-item>
  </div>
</template>

<script>
  import { mapGetters } from 'Vuex'
  import ChannelItem from './ChannelItem'
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
      ChannelItem
    }
  }

</script>
