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
            <router-link class="right disabled" tag="div" to="channelList"><a>已选择渠道</a></router-link>
            <p class="tip">
              <span>1</span>
            </p>
          </div>
          <div class="center choose-container">
            <div class="container-fluid">
              <div class="row">
                <div class="level-1">
                  品牌展示
                </div>
                <div class="level-2">
                  <div class="two-scroll">
                      <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                      <div><img :src="'/build/img/dsp.png'" alt=""> <span>DSP (3)</span></div>
                      <div><img :src="'/build/img/new.png'" alt=""> <span>新媒体</span></div>
                      <div><img :src="'/build/img/poster.png'" alt=""> <span>户外广告</span></div>
                      <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                  </div>
                </div>
                <div class="level-3">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <div class="level3-wrapper">
                          <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
                            <div v-popover:popover5><img :src="'/build/img/baidu.png'" alt=""><span class="text">百度网盟</span></div>
                          </el-tooltip>
                        </div>
                      </div>
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <div class="level3-wrapper">
                          <div class="add-custom-channel">
                            <span class="el-icon-plus"></span><span class="text">自定义渠道 </span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <div class="level3-wrapper">
                          <div class="add-custom-channel-second">
                            <input type="text" class="inp" placeholder="请输入渠道名称"><button class="el-icon-check btn"></button>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <div class="level3-wrapper">
                          <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
                            <div v-popover:popover5><img :src="'/build/img/baidu.png'" alt="">
                              <span class="text">百度网盟</span><span class="closeBtn">x</span>
                            </div>
                          </el-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
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
  import { mapGetters } from 'Vuex';
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        input2:'',
        input:'',
        visible2: false,
        visible3:false,
        visible4:false,
        visible5:false,
        visible6:false,
        visible7:false
      } 
    },
      methods: {
      handleIconClick(ev) {
        console.log(ev);
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
      a {
        color:#fff;
      }
      a:hover {
        text-decoration:none;
      }
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
    border: 1px solid #ccc;
    .closeBtn{
      @btn-height:  14px;
      width: @btn-height;
      height: @btn-height;
      background: red;
      border-radius: 56%;
      overflow: hidden;
      position: absolute;
      color: #fff;
      top: 0;
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
