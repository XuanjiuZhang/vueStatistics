<style lang="less">
  @channelHeight: 122px;
  .channel-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
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
      .first{
        width:25px;
        height:25px;
        border:1px solid #c0ccde;
        background:#fff;
        color:#c0ccde;
        &:hover {
          background:#46befc;
          border:1px solid #46befc;
          color:#fff;
        }
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
        &:hover {
          background:#46befc;
          border:1px solid #46befc;
          color:#fff;
        }
      }
      .third{
        width:25px;
        height:25px;
        border:1px solid #c0ccde;
        background:#fff;
        color:#c0ccde;
        line-height:25px;
        text-align:center;
        &:hover {
          background:#fe5656;
          border:1px solid #fe5656;
          color:#fff;
        }
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
  }
  .params-link {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: @channelHeight * .8;
    margin-left: -15px;
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
    cursor: pointer;
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
  .part-left {
    float: left;
  }
  .part-right {
    float: right;
    line-height: @channelHeight;
    > span {
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="channel-item">
    <div class="container-fluid">
      <div class="row channel-row">
        <div class="channel-info col-sm-4 col-md-4 col-lg-4 clearfix">
          <div class="part-left">
            <img :src="cData.icon" class="img">
            <span class="text">{{cData.name}}</span>
          </div>
          <div class="part-right">
            <el-tooltip class="item" effect="dark" content="添加参数" placement="top">
              <span class="el-icon-plus first" @click="addParam"></span>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="批量导入" placement="top">
              <span class="second"><i class="icon iconfont icon-piliangdaoru"></i></span>
            </el-tooltip>

            <!--<span class="el-icon-plus first" @click="addParam"></span>
            <span class="second"><i class="icon iconfont icon-piliangdaoru"></i></span>-->

            <el-popover
                ref="popoverDelete"
                placement="top"
                width="160"
                v-model="showDelTip">
                <p>删除该渠道和参数?</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="hideDelTip">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteChannel">确定</el-button>
                </div>
              </el-popover>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <span v-popover:popoverDelete class="el-icon-delete2 third"></span>
            </el-tooltip>
          </div>

        </div>
        <div class="channel-params col-sm-8 col-md-8 col-lg-8">
          <div class="container-fluid">
            <Item-params v-for="param in cData.params" :key="param.id" :pData="param" :cData="cData"></Item-params>
            <Item0-params v-if="is0params" :cData="cData"></Item0-params>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'Vuex';
  import ItemParams from './ItemParams'
  import Item0Params from './ItemNoParams'
  export default {
    data() {
      return {
        showDelTip: false
      } 
    },
    props: ['cData'],
    mounted() {
      console.log(this.cData);
    },
    methods: {
      ...mapActions(['initChannelSelectedData', 'changeSelectedCount']),
      hideDelTip() {
        this.showDelTip = false
      },
      deleteChannel() {
        this.hideDelTip()
        const data = {
          id: this.cData.channelid
        }
        const selectedCount = this.selectedCount - 1
        this.statisticApi.channel.unselectChannel(this.sid, data).then(res => res.json()).then(data => {
          this.changeSelectedCount({selectedCount})
          this.initChannelSelectedData()
        });
      },
      addParam() {
        console.log(this.cData);
        if(this.is0params){
          let data = [{name: Math.round(Math.random() * 1000000) + '', sort: 1}]
          let send = {
            id: this.cData._id,
            data
          }
          this.statisticApi.channel.modChannelParam(this.sid, send).then(res => res.json()).then(result => {
            console.log(result);
            this.Notification({
              // title: '成功',
              type: 'success',
              message: '添加成功',
              duration: 1000,
              offset: 100
            })
            this.initChannelSelectedData()
          })
        }else{
          let maxSort = 0
          console.log(this.cData.params);
          this.cData.params.forEach(p => {
            maxSort = Math.max(maxSort, p.sort)
          })
          let newParam = {name: Math.round(Math.random() * 1000000) + '', sort: maxSort + 1}
          this.cData.params.push(newParam)

          let send = {
            id: this.cData._id,
            data: this.cData.params
          }
          this.statisticApi.channel.modChannelParam(this.sid, send).then(res => res.json()).then(result => {
            this.Notification({
              // title: '成功',
              type: 'success',
              message: '添加成功',
              duration: 1000,
              offset: 100
            })
          })
        }
        
      }
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'selectedCount', 'Notification']),
      is0params() {
        return !this.cData.hasOwnProperty('params')
      }
    },
    components: {
      ItemParams,
      Item0Params
    }
  }

</script>
