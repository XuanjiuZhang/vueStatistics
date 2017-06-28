<style lang="less">
</style>

<template>
<div class="outChannel">
  <div class="channel">
    <div class="channelLeft">
      <div class="top">
        <span>消费者行为模型</span>
        <img :src="'/build/img/question.png'" >
      </div>
      <div class="bottom">
        <img :src="'/build/img/left.png'">
      </div>
    </div>
    <div class="channelRight">
      <div class="top">
        <div class="left"><span>渠道选择</span><img :src="'/build/img/question02.png'"></div>
        <div class="right disabled">已选择渠道</div>
        <p class="tip">
          <span>1</span>
        </p>
      </div>
      <div class="bottom">
        <ul>
          <li class="bottom-li clearfix">
            <ul>
              <li class="one">品牌展示</li>
              <li class="two">
                <div class="two-scroll">
                    <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                    <div><img :src="'/build/img/dsp.png'" alt=""> <span>DSP (3)</span></div>
                    <div><img :src="'/build/img/new.png'" alt=""> <span>新媒体</span></div>
                    <div><img :src="'/build/img/poster.png'" alt=""> <span>户外广告</span></div>
                    <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                </div>
              </li>
              <li class="three">
                <ul>

                  <li>
                    <el-popover
                        ref="popover5"
                        placement="top"
                        width="160"
                        v-model="visible2">
                        <p>您确定要取消该渠道的选择？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                          <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                        </div>
                      </el-popover>
                      <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
                        <div v-popover:popover5><img :src="'/build/img/baidu.png'" alt=""><span class="text">百度网盟</span></div>
                      </el-tooltip>
                  </li>
                  <li class="definit">
                    <div class="first">
                      <span class="el-icon-plus"></span><span class="text">自定义渠道 </span>
                    </div>
                    <div class="second">
                      <input type="text" class="inp" placeholder="请输入渠道名称"><button class="el-icon-check btn"></button>
                    </div>
                  </li>

                </ul>
              </li>
            </ul>
          </li>


           <li class="bottom-li clearfix">
            <ul>
              <li class="one">精准搜索</li>
              <li class="two">
                <div class="two-scroll">
                    <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                    <div><img :src="'/build/img/dsp.png'" alt=""> <span>DSP (3)</span></div>
                    <div><img :src="'/build/img/new.png'" alt=""> <span>新媒体</span></div>
                    <div><img :src="'/build/img/poster.png'" alt=""> <span>户外广告</span></div>
                    <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                </div>
              </li>
              <li class="three">
                <ul>
                  <li>
                    <el-popover
                        ref="popover5"
                        placement="top"
                        width="160"
                        v-model="visible3">
                        <p>您确定要取消该渠道的选择？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="visible3 = false">取消</el-button>
                          <el-button type="primary" size="mini" @click="visible3 = false">确定</el-button>
                        </div>
                    </el-popover>
                    <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
                        <div v-popover:popover5><img :src="'/build/img/baidu.png'" alt=""><span class="text">百度网盟</span></div>
                    </el-tooltip>
                  </li>
                   <li>
                    <el-popover
                        ref="popover5"
                        placement="top"
                        width="160"
                        v-model="visible6">
                        <p>您确定要取消该渠道的选择？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="visible6 = false">取消</el-button>
                          <el-button type="primary" size="mini" @click="visible6 = false">确定</el-button>
                        </div>
                    </el-popover>
                    <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
                        <div v-popover:popover5 class="changeSelect"><img :src="'/build/img/sel.png'" alt=""><span class="text">销售部</span><span class="closeBtn">x</span></div>
                    </el-tooltip>
                    
                  </li>
                  <li class="definit">
                    <div class="first">
                      <span class="el-icon-plus"></span><span class="text">自定义渠道 </span>
                    </div>
                    <div class="second">
                      <input type="text" class="inp" placeholder="请输入渠道名称"><button class="el-icon-check btn"></button>
                    </div>
                  </li>

                </ul>
              </li>
            </ul>
          </li>

          <li class="bottom-li clearfix">
            <ul>
              <li class="one">垂直转化</li>
              <li class="two">
                <div class="two-scroll">
                    <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                    <div><img :src="'/build/img/dsp.png'" alt=""> <span>DSP (3)</span></div>
                    <div><img :src="'/build/img/new.png'" alt=""> <span>新媒体</span></div>
                    <div><img :src="'/build/img/poster.png'" alt=""> <span>户外广告</span></div>
                    <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                </div>
              </li>
              <li class="three">
                <ul>
                  <li>
                    <el-popover
                        ref="popover5"
                        placement="top"
                        width="160"
                        v-model="visible4">
                        <p>您确定要取消该渠道的选择？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="visible4 = false">取消</el-button>
                          <el-button type="primary" size="mini" @click="visible4 = false">确定</el-button>
                        </div>
                      </el-popover>
                      <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
                        <div v-popover:popover5><img :src="'/build/img/baidu.png'" alt=""><span class="text">百度网盟</span></div>
                      </el-tooltip>
                  </li>
                  <li class="definit">
                    <div class="first">
                      <span class="el-icon-plus"></span><span class="text">自定义渠道 </span>
                    </div>
                    <div class="second">
                      <input type="text" class="inp" placeholder="请输入渠道名称"><button class="el-icon-check btn"></button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>



           <li class="bottom-li clearfix">
            <ul>
              <li class="one">社交传播</li>
              <li class="two">
                <div class="two-scroll">
                    <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                    <div><img :src="'/build/img/dsp.png'" alt=""> <span>DSP (3)</span></div>
                    <div><img :src="'/build/img/new.png'" alt=""> <span>新媒体</span></div>
                    <div><img :src="'/build/img/poster.png'" alt=""> <span>户外广告</span></div>
                    <div><img :src="'/build/img/wm.png'" alt=""> <span>网盟 (5)</span></div>
                </div>
              </li>
              <li class="three">
                <ul>
                  <li>
                    <el-popover
                        ref="popover5"
                        placement="top"
                        width="160"
                        v-model="visible5">
                        <p>您确定要取消该渠道的选择？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="visible5 = false">取消</el-button>
                          <el-button type="primary" size="mini" @click="visible5 = false">确定</el-button>
                        </div>
                      </el-popover>
                      <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
                        <div v-popover:popover5><img :src="'/build/img/baidu.png'" alt=""><span class="text">百度网盟</span></div>
                      </el-tooltip>
                  </li>
                  <li class="definit">
                    <div class="first">
                      <span class="el-icon-plus"></span><span class="text">自定义渠道 </span>
                    </div>
                    <div class="second">
                      <input type="text" class="inp" placeholder="请输入渠道名称"><button class="el-icon-check btn"></button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
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
        visible2: false,
        visible3:false,
        visible4:false,
        visible6:false
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
ul, li{
  list-style:none;
}
.clearfix:after{
  display:block;
  clear:both;
  content:"";
  visibility:hidden;
  height:0
  } 
.clearfix{
  zoom:1
  } 
.outChannel{
  margin-top:20px;
  text-align:center;
  background:rgb(250,251,252);
  text-align: -webkit-center;
  .channel{
    width:1335px;
    height:805px;
    .channelLeft{
      width:325px;
      height:805px;
      float:left;
      background:#fff;
      box-shadow:0 0 10px #ccc;
      .top{
        padding-left:24px;
        font-family:"微软雅黑";
        font-size:16px;
        font-weight:bold;
        line-height:54px;
        text-align:left;
        height:54px;
        border-bottom:1px solid #ccc;
        img{
          vertical-align: initial;
        }
      }
      .bottom{
        margin-top:20px;
      }
     
    }
    .channelRight{
      background:#fff;
      box-shadow:0 0 10px #ccc;
      width:1000px;
      height:805px;
      float:right;
      .top{
        position:relative;
        height:54px;
        line-height:54px;
        border-bottom:1px solid #ccc;
        padding-left:24px;
        font-family:"微软雅黑";
        font-size:16px;
        font-weight:bold;
        .left{
          float:left;
          img{
            vertical-align: initial;
          }
        }
        .tip{
          position:absolute;
          right:2%;
          top:8%;
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
          }
        }
        .right{
          font-family:"微软雅黑";
          font-size:14px;
          color:#fff;
          line-height:35px;
          margin-top:10px;
          margin-right:37px;
          border-radius:16px;
          width:100px;
          height:35px;
          background-image:-webkit-linear-gradient(0deg, rgb(84,212,253), rgb(8,184,241));
          float:right;
          &:hover{
            background:#54d4fe;
          }
          &:active{
            background:#22afdd;
          }
        }
        .disabled{
          background:#bfcbdd;
        }
      }
      .bottom{
        text-align:center;
        .bottom-li{
          border:1px solid #ccc;
          border-radius:2px;
          margin-top:10px;
          width:925px;
          // height:200px;
          // background:yellow;
          ul{
            padding-left:0;
            .one{
              background:#f7f7fd;
              float:left;
              line-height:205px;
              height:205px;
              border-right:1px solid #ccc;
              width:105px;
              font-family:"微软雅黑";
              font-size:16px;
              font-weight:bold;
            }
            .two{
              float:left;
              height:205px;
              overflow-x:hidden;
              overflow-y:auto;
              border-right: 1px solid #ccc;
              .two-scroll{
                div{
                  font-family:"微软雅黑";
                  font-size:16px;
                  line-height:50px;
                  padding-left:25px;
                  text-align:left;
                  margin-bottom:1px;
                  width:185px;
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
            .three{
              background:#fdfdff;
              .definit{
                .first{
                  width:140px;
                  border:1px solid #CCC;
                  border-radius:3px;
                  &:hover{
                    border:1px solid #46befc;
                    color:#46befc;
                  }
                }
                .second{
                  width:185px;
                  .inp{
                    width:120px;
                    height:38px;
                    border:1px solid #46befc;
                    margin-right:5px;
                    border-radius:3px;
                    padding-left:3px;
                  }
                  .btn{
                    width:43px;
                    height:38px;
                    border:1px solid #46befc;
                    color:#46befc;
                    background:#fff;
                    display:inline-block;
                  }
                }
              }
              li{
                color:#ccc;
                position:relative;
                float:left;
                width:144px;
                height:38px;
                background:#fdfdff;  
                margin-left:8px;
                margin-top:10px;
                line-height:38px;
                border-radius:3px;
                .text{
                  margin-left:10px;
                }
                .closeBtn{
                  width: 14px;
                  height: 14px;
                  background: red;
                  border-radius: 56%;
                  overflow: hidden;
                  position: absolute;
                  color: #fff;
                  top: 10%;
                  right:10%;
                  line-height:14px;
                }
                .box{
                  width:70px;
                  height:22px;
                  background:#333;
                  color:#fff;
                  line-height:22px;
                  font-size:12px;
                  position:absolute;
                  top: -63%;
                  left: 50%;
                  transform: translateX(-50%);
                  border-radius:3px;
                }
              }
              .changeSelect{
                color:#46befc;
              }
            }
          }
          &:nth-child(2){
            height:157px;
            .one{
              height:155px;
              line-height:155px;
            }
            .two{
              height:155px;
            }
          }
          &:nth-child(3){
            height:157px;
            .one{
              height:155px;
              line-height:155px;
            }
            .two{
              height:155px;
            }
          }
           &:nth-child(4){
            height:157px;
            .one{
              height:155px;
              line-height:155px;
            }
            .two{
              height:155px;
            }
          }
        } 
      }
    }
  }
}
  

</style>
