<template>
  <div class="container-fluid">
    <div class="row">
      <div class="content-wrapper col-sm-4 col-md-3 col-lg-2">
        <div class="title">
          <span><b>消费者行为模型</b></span>
          <img :src="'/build/img/question.png'" >
        </div>
        <div class="center">
          <img class="full-width bottom-margin" src="/build/img/left.png">
        </div>
      </div>

      <div class="col-sm-8 col-md-9 col-lg-10">
        <div class="content-wrapper right-channel">
          <div class="title">
            <span><b>渠道选择</b></span>
            <img src="/build/img/question02.png">
            <router-link class="right disabled" tag="div" to="channelList">已选择渠道</router-link>
            <p class="tip">
              <span>1</span>
            </p>
          </div>
          <div class="center choose-container">
            <div class="container-fluid">
              <div class="row row-border" v-for="cData in channelData" :key="cData.id">
                <div class="level-1">
                  {{cData.name}}
                  <!--品牌展示-->
                </div>
                <div class="level-2">
                  <div class="two-scroll">
                      <div v-for="l2 in cData.children" :key="l2.id" @click="l2Clicked(l2, cData)"
                       :class="{active: l2._show}">
                        <img v-show="l2.selected" :src="l2.ligting_icon_channel" alt="">
                        <img v-show="!l2.selected" :src="l2.ligtingoff_icon_channel" alt="">
                        <span>{{l2.name}}</span>
                      </div>
                      <!--<div><img :src="'/build/img/dsp.png'" alt=""> <span>DSP (3)</span></div>
                      <div><img :src="'/build/img/new.png'" alt=""> <span>新媒体</span></div>
                      <div><img :src="'/build/img/poster.png'" alt=""> <span>户外广告</span></div>
                      <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>-->
                  </div>
                </div>
                <div class="level-3">
                  <Level3 :cData="cData"></Level3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import Level3 from './Level3';
  import Vue from 'Vue';
  export default {
    data() {
      return {
        channelData: []
      } 
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
      },
      parseChannelData(channelData) {
        console.log(channelData);
        channelData.forEach(level1 => {
          level1.children.forEach((level2, l2Index) => {
            Vue.set(level2, '_show', l2Index === 0)
          })
        });
      },
      l2Clicked(l2, cData) {
        cData.children.forEach(level2 => {
          if(level2.id === l2.id){
            l2._show = !l2._show
          }else{
            level2._show = false
          }
        })
      }
    },
    // props: ['eleData', 'finalScale'],
    mounted() {
      this.statisticApi.channel.getAllChannel(this.$route.params.id).then(res => {
        return res.json()
      }).then(data => {
        console.log(data);
        this.parseChannelData(data.data);
        this.channelData = data.data;
      });
    },
    computed: {
      ...mapState(['statisticApi']),
    },
    components: { Level3 }
  }

</script>

<style lang="less">
  .right-channel {
    margin-left: 1%;
    padding-bottom: 20px;
    .disabled{
      background:#bfcbdd;
    }
    .right {
      font-family:"微软雅黑";
      text-align: center;
      font-size:14px;
      line-height:35px;
      margin-top:10px;
      margin-right:37px;
      border-radius:16px;
      width:100px;
      height:35px;
      background-image:-webkit-linear-gradient(0deg, rgb(84,212,253), rgb(8,184,241));
      float:right;
      color:#fff;
      cursor: pointer;
      /*a {
        color:#fff;
      }
      a:hover {
        text-decoration:none;
      }*/
      &:hover{
        background:#54d4fe;
      }
      &:active{
        background:#22afdd;
      }
    }
    .tip{
      position:absolute;
      right:35px;
      top:24px;
      width:20px;
      height:20px;
      background:red;
      border-radius:50%;
      font-size:14px;
      color:#fff;
      span{
        position: absolute;
        top: -16px;
        left: 6px;
        margin-left: 0 !important;
      }
    }
  }
  .full-width {
    width: 100%
  }
  .bottom-margin {
    margin-bottom: 20px;
  }
  .choose-container {
    @height: 205px;
    width: 90%;
    .row-border {
      border: 1px solid #ccc;
      margin-bottom: 20px;
      border-radius: 3px;
    }
    .closeBtn{
      @btn-height:  14px;
      width: @btn-height;
      height: @btn-height;
      background: red;
      border-radius: 56%;
      overflow: hidden;
      position: absolute;
      color: #fff;
      top: 12px;
      right:5px;
      line-height:@btn-height;
    }
    .level-1 {
      float: left;
      width: 11%;
      background:#f7f7fd;
      float:left;
      line-height:@height;
      height:@height;
      border-right:1px solid #ccc;
      font-family:"微软雅黑";
      text-align: center;
      font-size:16px;
      font-weight:bold;
    }
    .level-2 {
      float: left;
      border-right:1px solid #ccc;
      height:@height;
      overflow-x:hidden;
      overflow-y:auto;
      width: 20%;
      .two-scroll{
        div{
          font-family:"微软雅黑";
          font-size:16px;
          line-height:50px;
          /*padding-left:25px;*/
          padding-left:10%;          
          text-align:left;
          margin-bottom:1px;
          /*width:185px;*/
          height:50px;
          background:#fdfdff;
          color:#8398b2;
          &:hover{
            font-family:"Adobe 黑体";
            color:#92a4bc;
            background:#e1eaf8;
          }
          &:active{
              color:#fff;
              background:#46befc;
          }
          &.active{
              color:#fff;
              background:#46befc;
          }
        }
        
      }
    }
    .level-3 {
      @l3Height: 38px;
      float: left;
      width: 69%;
      background:#fdfdff;
      padding: 10px 0;
      height:@height;
      .level3-wrapper{
        color:#ccc;
        background:#fdfdff;  
        position:relative;
        height:@l3Height;
        line-height:@l3Height;
        .item {
          text-align: center;
        }
        .text{
          margin-left: 10px;
        }
        .add-custom-channel{
          text-align: center;
          width:80%;
          margin: 0 auto;
          border:1px solid #CCC;
          border-radius:3px;
          &:hover{
            border:1px solid #46befc;
            color:#46befc;
          }
        }
        .add-custom-channel-second {
          /*width:185px;*/
          .inp{
            width:60%;
            height:@l3Height;
            border:1px solid #46befc;
            margin-right:5px;
            border-radius:3px;
            padding-left:3px;
          }
          .btn{
            /*width:43px;*/
            height:@l3Height;
            border:1px solid #46befc;
            color:#46befc;
            background:#fff;
            display:inline-block;
          }
        }
      }
      .changeSelect{
        color:#46befc;
      }
    }
  }
</style>
