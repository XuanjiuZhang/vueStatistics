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
      margin-left: 10px;
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
          <img :src="cData.icon" class="img">
          <span class="text">{{cData.name}}</span>

          <span class="el-icon-plus first" @click="addParam"></span>
          <span class="second"><i class="icon iconfont icon-piliangdaoru"></i></span>
          <span class="el-icon-delete2 third" @click="deleteChannel"></span>
        </div>
        <div class="channel-params col-sm-9 col-md-9 col-lg-9">
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
      } 
    },
    props: ['cData'],
    mounted() {
      console.log(this.cData);
    },
    methods: {
      ...mapActions(['initChannelSelectedData', 'changeSelectedCount']),
      deleteChannel() {
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
            console.log(result);
            // this.initChannelSelectedData()
          })
        }
        
      }
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'selectedCount']),
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
