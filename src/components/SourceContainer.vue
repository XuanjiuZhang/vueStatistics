<style lang="less">
  .source-contaner {
    background: #FAFBFC
  }
</style>

<template>
  <div class="container-fluid source-contaner">
    <Nav-header></Nav-header>
    <div class="container-fluid">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'Vuex';
  import NavHeader from './Header/NavHeader';
  export default {
    data() {
      return {
      } 
    },
    // props: ['eleData', 'finalScale'],
    mounted() {
    },
    methods: {
    },
    computed: {
      // ...mapGetters(['statisticApi', 'currentShowChannel', 'echarts'])
    },
    components: {
      NavHeader
    }
  }

</script>
