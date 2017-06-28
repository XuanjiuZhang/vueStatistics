<style lang="less">
</style>

<template>
  <div>
    channelChoose
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'Vuex';
  export default {
    data() {
      return {
      } 
    },
    // props: ['eleData', 'finalScale'],
    mounted() {
      if(this.$route.params.id) { 
        this.setId({id: this.$route.params.id}) 
      }
    },
    methods: {
      ...mapMutations(['setId'])
    },
    computed: {
      // ...mapGetters(['statisticApi', 'currentShowChannel', 'echarts'])
    },
  }

</script>
