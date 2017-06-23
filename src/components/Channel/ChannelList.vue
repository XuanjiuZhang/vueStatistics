<style lang="less">
  .channel-top {
    /*display: inline-block,
    : left;*/
    height: 60px;
    > .channel-content {
      float: right;
    }
  }
</style>

<template>
  <div>
    <div class="channel-top">
      <div class="channel-content">
        channel-content
      </div>
    </div>
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
