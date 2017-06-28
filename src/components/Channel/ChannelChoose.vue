<style lang="less">
</style>

<template>
<div class="bigChannel">
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

  <div class="selectChannel">
    <div class="selectChannel-top">
      <p class="select-text">已选渠道</p>
      <div class="inp-bottom">
        <el-input
          placeholder="请输入渠道和参数名称"
          icon="search"
          v-model="input2"
          :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <div class="select-bottom">
        <el-select v-model="value" placeholder="批量下载">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="selectChannel-bottom">
      <div class="each-channel">
        <tr>
          <td class="one">
            <img :src="'/build/img/baidu.png'" class="img"><span class="text">展示-网盟-领科特广告联盟</span>
          </td>
          <td class="two">
            <span class="el-icon-plus first"></span>
            <span class="second"><i class="icon iconfont icon-piliangdaoru"></i></span>
            <span class="el-icon-delete2 third"></span>
          </td>
          <td class="three">
          <span class="inp">
             <el-input v-model="input" placeholder="请输入参数"></el-input>
          </span>
          <el-popover
              ref="popover5"
              placement="top"
              width="160"
              v-model="visible7">
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible7 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible7 = false">确定</el-button>
              </div>
            </el-popover>
            <span class="el-icon-delete2" v-popover:popover5></span>
          </td>
          <td class="four">
            <div>
              <span class="erweima"></span><span class="lianjie">1212312312312312312312313123</span>
            </div>
          </td>
          <td class="five">1</td>
          <td class="six">1</td>
        </tr>
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
.bigChannel{
    text-align:-webkit-center;
  
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

.selectChannel{
    width:1335px;
    margin-top: 20px;
    text-align: center;
    background: #fafbfc;
    text-align: -webkit-center;
    border:1px solid #ccc;
    box-shadow: 0 0 10px #ccc;
    .selectChannel-top{
      padding-right:35px;
      line-height:55px;
      height:55px;
      border-bottom:1px solid #ccc;
      .select-text{
        float:left;
        margin-left:20px;
        font-family:"微软雅黑";
        font-size:16px;
        font-weight:bold;
      }
      .inp-bottom{
        width:265px;
        float:right;
      }
      .select-bottom{
        float:right;
        width:120px;
        margin-right:15px;
      }
      
    }
    .selectChannel-bottom{
      padding:30px 35px 0 40px;
      .each-channel{
        border:1px solid #ccc;
        padding:10px 20px 10px 30px;
        td{
          line-height:90px;
          height:90px;
        }
        .one{
          width:228px;
          .img{
            vertical-align: sub;
            margin-right:5px;
          }
          .text{
            font-size:16px;
            font-family:"微软雅黑";
          }
        }
        .two{
          width:165px;
          border-right:1px dashed #c0ccde;
          .first{
            width:25px;
            height:25px;
            border:1px solid #46befc;
            background:#46befc;
            color:#fff;
            line-height:25px;
            text-align:center;
          }
          .second{
            width:25px;
            height:25px;
            border:1px solid #c0ccde;
            display:inline-block;
            background:#fff;
            color:#c0ccde;
            line-height:25px;
            text-align:center;
          }
          .third{
            width:25px;
            height:25px;
            border:1px solid #c0ccde;
            background:#c0ccde;
            color:#fff;
            line-height:25px;
            text-align:center;
          }
        }
        .three{
          width:220px;
          .inp{
            margin-left:30px;
            margin-right:12px;
            display:inline-block;
            width:145px;
          }
        }
        .four{
          width:300px;
          .erweima{
            display:inline-block;
            width:70px;
            height:70px;
          }
        }
        .five{
          width:157px;
        }
        .six{
          width:127px;
        }
      }
    }
}
}  

</style>
