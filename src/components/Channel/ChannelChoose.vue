<template>
  <div class="container-fluid">
    <div class="row">
      <div class="content-wrapper col-sm-4 col-md-3 col-lg-3 left-channel">
        <div class="title">
          <span><b>消费者行为模型</b></span>
          <img class="question-mark" :src="'/build/img/question.png'">
        </div>
        <div class="center left-img-wrapper">
          <div class="left-img-div">
            <img src="/build/img/left.png">
          </div>
        </div>
      </div>

      <div class="col-sm-8 col-md-9 col-lg-9">
        <div class="content-wrapper right-channel">
          <div class="title">
            <span><b>渠道选择</b></span>
            <img class="question-mark" :src="'/build/img/question02.png'">
            <router-link class="right disabled" tag="div" to="channelList">已选择渠道</router-link>
            <div class="selected-count">
              <span>{{selectedCount}}</span>
            </div>
          </div>
          <div class="center choose-container">
            <div class="container-fluid">
              <div class="row row-border" v-for="cData in channelData" :key="cData.id">
                <div class="level-1">
                  {{cData.name}}
                </div>
                <div class="level-2">
                  <div class="two-scroll">
                      <div v-for="l2 in cData.children" :key="l2.id" @click="l2Clicked(l2, cData)"
                       :class="{active: l2._show}">
                        <img v-show="l2.selected" :src="l2.ligting_icon_channel" alt="">
                        <img v-show="!l2.selected" :src="l2.ligtingoff_icon_channel" alt="">
                        <span>{{l2.name}}</span>
                      </div>
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
  import { mapState, mapActions } from 'Vuex';
  import Level3 from './Level3';
  import Vue from 'Vue';
  export default {
    data() {
      return {
      } 
    },
    methods: {
      ...mapActions(['initChannelData']),
      l2Clicked(l2, cData) {
        cData.children.forEach(level2 => {
          level2._show = level2.id === l2.id
        })
      }
    },
    // props: ['eleData', 'finalScale'],
    mounted() {
      console.log('initChannelData!');
      this.initChannelData()
    },
    computed: {
      ...mapState(['channelData', 'selectedCount']),
    },
    components: { Level3 }
  }

</script>

<style lang="less">
  .left-channel {
    height: 825px;
    .left-img-wrapper {
      overflow: hidden;
    }
    .left-img-div {
      width: 298px;
      margin: 0 auto;
    }
  }
  .question-mark {
    vertical-align: text-top;
  }
  .right-channel {
    margin-left: 1%;
    padding-bottom: 20px;
    .el-tooltip {
      white-space: nowrap;
    }
    .disabled{
      background:#bfcbdd;
    }
    .selected-count {
      position: absolute;
      top: 3px;
      right: 33px;
      span {
        padding: 2px 4px;
        color: #fff;
        background: #fe5656;
        border-radius: 5px;
      }
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
    @height: 163px;
    width: 90%;
    .row-border {
      border: 1px solid #ccc;
      margin-bottom: 20px;
      border-radius: 3px;
    }
    .closeBtn {
      margin-left: 15px;
      /*border-radius: 50%;*/
      position: absolute;
      top: 0;
      right: 0;
      color: #fe5656;
      span {
        cursor: pointer;
      }
    }
    /*.closeBtn{
      @btn-height:  14px;
      width: @btn-height;
      height: @btn-height;
      text-align: center;
      cursor: pointer;
      background: red;
      border-radius: 56%;
      overflow: hidden;
      position: absolute;
      color: #fff;
      top: 12px;
      right:0;
      line-height:@btn-height;
    }*/
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
          /*text-align: center;*/
          float: left;
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 80%;
        }
        .text{
          margin-bottom: 0;
          white-space: nowrap;
          &.active {
            color: #46befc;
          }
        }
        .add-custom-channel{
          height: @l3Height;
          float: left;
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
          color:#000;
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
