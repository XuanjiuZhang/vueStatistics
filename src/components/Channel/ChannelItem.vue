<style lang="less">
  .channel-item {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>

<template>
  <div class="channel-item">
    <table class="table">
      <Item-params v-if="linkData.params.length != 0" v-for="(num, index) in linkData.params" :key="index" :linkData="linkData" :index="index"></Item-params>
      <Item-no-params v-if="linkData.params.length === 0" :linkData="linkData"></Item-no-params>
    </table>
  </div>
</template>

<script>
  import { mapGetters } from 'Vuex';
  import ItemParams from './ItemParams'
  import ItemNoParams from './ItemNoParams'
  export default {
    data() {
      return {
        linkData: {
          params: [1, 2, 3],
          name: 'test',
          url: 'url!!'
        }
      } 
    },
    // props: ['eleData', 'finalScale'],
    mounted() {
    },
    computed: {
      // ...mapGetters(['statisticApi', 'currentShowChannel', 'echarts'])
    },
    components: {
      ItemParams,
      ItemNoParams
    }
  }

</script>
