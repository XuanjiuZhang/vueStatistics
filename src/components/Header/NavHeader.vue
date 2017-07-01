<template>
  <header class="headertop block">
    <div class="row header-row">
      <div class="col-sm-4 col-md-3 col-lg-2">
        <!--<span>溯源logo</span>-->
        <img class="header-img" :src="'/build/img/logo-circle.png'" alt="">
        <img class="header-img" :src="'/build/img/logo-text.png'" alt="">
      </div>
      <div class="col-sm-4 col-md-4 col-lg-4">
        <ul class="header-nav header-nav-tabs">
          <router-link tag="li" to="channelChoose"><a>渠道分发</a></router-link>
          <router-link tag="li" class="margin-left-40" to="effects"><a>效果统计</a></router-link>
          <!--<li class="active"><a href="">渠道分发</a></li>
          <li class="margin-left-40"><a href="">效果统计</a></li>-->
        </ul>
      </div>
      <div class="col-sm-4 col-md-3 col-lg-2 col-md-offset-1 col-lg-offset-4">
        <div class="user-name-wrapper">
          <img class="user-avatar" :src="'/build/img/user-avatar.jpg'" alt="">
          <span class="user-name">用户昵称</span>
        </div>
      </div>
    </div>
    <!--<div class="row header-row">
      <div class="col-sm-3 col-md-2 col-lg-1">
        <button>返回</button>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2 col-md-offset-2 col-lg-offset-4">
        <router-link tag="button" to="/channelChoose">选择渠道</router-link>
        <router-link tag="button" to="/effects">效果统计</router-link>
      </div>
      <div class="col-sm-3 col-md-2 col-lg-1 col-md-offset-2 col-lg-offset-4">
        <router-link tag="button" to="/channelList">渠道列表</router-link>
      </div>
    </div>-->
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


<style lang="less">
  @base: #f938ab;
  .headertop {
    background: #fff;
    min-height: 88px;
    padding-top: 23px;
    color: #000;
    border-bottom:solid #EAEFF5 1px;
  }
  .header-row {
    min-height: 50px;
  }
  .margin-left-40 {
    margin-left: 40px
  }
  .header-img {
    margin-left: 12px;
  }
  .header-nav {
    list-style: none;
    height: 50px;
    &.header-nav-tabs {
      height: 50px;
      > li {
        display: block;
        float: left;
        font-size: 16px;
        border-bottom: 3px solid transparent;
        margin-bottom: -2px;
        margin-right: 5px;
        > a {
          height: 50px;
          line-height: 40px;
          padding: 0 10px 10px;
          text-decoration-line: none;
          color: #000;
        }
        &.router-link-active {
          border-bottom-color: #05B7F1;
          > a {
            color: #97A8BD;
          }
        }
        &.router-link-exact-active {
          border-bottom-color: #05B7F1;
          > a {
            color: #97A8BD;
          }
        }
      }
    }
  }
  .user-name-wrapper {
    float: right;
    margin-right: 15px;
  }
  .user-avatar {
    height: 38px;
    width: 38px;
    border-radius: 38px;
  }
  .user-name {
    margin-left: 10px;
  }
</style>