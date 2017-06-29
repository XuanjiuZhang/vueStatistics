<style lang="less">
  .channel-top {
    /*display: inline-block,
    : left;*/
    height: 60px;
    > .channel-content {
      float: right;
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
          border-left:1px dashed #c0ccde;
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
</style>

<template>
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
</template>

<script>
  import { mapGetters } from 'Vuex'
  import ChannelItem from './ChannelItem'
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
      ChannelItem
    }
  }

</script>
