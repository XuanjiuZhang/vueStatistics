<style lang="less">
  .source-contaner {
    background: #FAFBFC
  }
  .content-wrapper {
    margin-top: 20px;
    margin-bottom: 40px;
    background: #fff;
    box-shadow: 0 0 8px #cbd3de;
    .title {
      height: 55px;
      border-bottom:solid #EAEFF5 1px;
      line-height: 55px;
      span {
        margin-left: 20px;
        font-size: 16px;
      }
    }
    .center {
      margin: 30px auto 0;
      /*padding: 0 0 20px 0;*/
    }
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
    beforeMount() {
      console.log('changeSid');
      this.changeSid({sid: this.$route.params.id})
    },
    methods: {
      ...mapMutations(['changeSid'])
    },
    computed: {
      // ...mapGetters(['statisticApi', 'currentShowChannel', 'echarts'])
    },
    components: {
      NavHeader
    }
  }

</script>
