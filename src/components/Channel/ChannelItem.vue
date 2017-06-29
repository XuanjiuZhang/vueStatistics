<style lang="less">
  @channelHeight: 122px;
  .channel-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    .channel-row {
    }
    .channel-info {
      text-align: center;
      .img {
        vertical-align: sub;
      }
      .text {
        margin-left: 10px;
        line-height: @channelHeight;
      }
    }
    .channel-params {
    }
    .params-row {
      height: @channelHeight;
    }
  }
  .params-name {
    height: @channelHeight / 3;
    margin-top: @channelHeight / 3;
  }
  .qrcode {
    @size: @channelHeight * .8;
    width: @size;
    height: @size;
    float: left;
  }
  .params-qrc {
    height: @channelHeight * .8;
    margin-top: @channelHeight * .1;
    white-space: nowrap;
    text-overflow: ellipse;
    span {
      line-height: @channelHeight * .8;
      float: left;
      width: inherit;
    }
  }
  .copy-btn {
    background: #fff;
    border: 1px solid #ccc;
    margin-top: (@channelHeight - 36) / 2;
    height: 36px;
    line-height: 32px;
    width: 100%;
    border-radius: 5px;
  }
  .down-qrc {
    margin-top: (@channelHeight - 36) / 2;
  }
  .param-input{
    width: 85%;
  }
  .param-delete {
    margin-left: 4px;
  }
</style>

<template>
  <div class="channel-item">
    <div class="container-fluid">
      <div class="row channel-row">
        <div class="channel-info col-sm-3 col-md-3 col-lg-3">
          <img :src="'/build/img/baidu.png'" class="img">
          <span class="text">展示-网盟-领科特广告联盟</span>

          <span class="el-icon-plus first"></span>
          <span class="second"><i class="icon iconfont icon-piliangdaoru"></i></span>
          <span class="el-icon-delete2 third"></span>
        </div>
        <div class="channel-params col-sm-9 col-md-9 col-lg-9">
          <div class="container-fluid">
            <div class="row params-row">
              <div class="col-sm-3 col-md-3 col-lg-3 params-name">
                <el-input class="param-input" v-model="input" placeholder="请输入参数"></el-input>
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
                <span class="el-icon-delete2 param-delete" v-popover:popover5></span>
              </div>
              <div class="col-sm-5 col-md-5 col-lg-5 params-qrc">
                <img class="qrcode" :src="'/build/img/user-avatar.jpg'" alt="">
                <span>http://qlelrkr.werwecodfewfewfewewffewfwem</span>
              </div>
              <div class="col-sm-2 col-md-2 col-lg-2">
                <button class="copy-btn">复制链接</button>
                <!--<div class="add-custom-channel">
                  <span class="el-icon-plus"></span><span class="text">自定义渠道 </span>
                </div>-->
              </div>
              <div class="col-sm-2 col-md-2 col-lg-2">
                <el-select class="down-qrc" v-model="value" placeholder="下载二维码">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <!--<table class="table">
            <tr>
              <td>
                参数-1
              </td>
              <td>
                二维码
              </td>
              <td>
                复制链接
              </td>
              <td>
                下载二维码
              </td>
            </tr>
          </table>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'Vuex';
  import ItemParams from './ItemParams'
  import ItemNoParams from './ItemNoParams'
  export default {
    data() {
      return {
        linkData: {
          params: [1, 2, 3],
          name: 'test',
          url: 'url!!'
        }
      } 
    },
    // props: ['eleData', 'finalScale'],
    mounted() {
    },
    computed: {
      // ...mapGetters(['statisticApi', 'currentShowChannel', 'echarts'])
    },
    components: {
      ItemParams,
      ItemNoParams
    }
  }

</script>
