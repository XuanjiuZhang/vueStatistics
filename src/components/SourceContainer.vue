<style lang="less">
</style>

<template>
  <div class="container-fluid">
    <Nav-header></Nav-header>
    <div class="container-fluid">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'Vuex';
  import NavHeader from './Header/NavHeader';
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
      NavHeader
    }
  }

</script>
