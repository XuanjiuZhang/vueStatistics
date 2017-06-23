<style lang="less">
  @base: #f938ab;
  .headertop {
    background: #fff;
    min-height: 88px;
    padding-top: 23px;
    color: #000;
  }
  .header-row {
    min-height: 60px;
  }
</style>

<template>
  <header class="headertop block">
    <div class="row header-row">
      <div class="col-sm-3 col-md-2 col-lg-1">
        <span>溯源logo</span>
      </div>
      <div class="col-sm-3 col-md-2 col-lg-1 col-sm-offset-6 col-md-offset-8 col-lg-offset-10">
        <span>用户昵称</span>
      </div>
    </div>
    <div class="row header-row">
      <div class="col-sm-3 col-md-2 col-lg-1">
        <button>返回</button>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2 col-md-offset-2 col-lg-offset-4">
        <router-link tag="button" to="/channelChoose">选择渠道</router-link>
        <router-link tag="button" to="/effects">效果统计</router-link>
        <!--<button>选择渠道</button>
        <button>效果统计</button>-->
      </div>
      <div class="col-sm-3 col-md-2 col-lg-1 col-md-offset-2 col-lg-offset-4">
        <!--<button>数据详情</button>-->
        <router-link tag="button" to="/channelList">渠道列表</router-link>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'Vuex';
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
  }

</script>
