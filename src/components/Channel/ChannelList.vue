<template>
  <div class="content-wrapper channel-wrapper">
    <div class="title channel-title">
      <span><b>已选渠道</b></span>
      <div class="inp-bottom">
        <el-input
          placeholder="请输入渠道和参数名称"
          icon="search"
          v-model="keyword"
          :on-icon-click="queryChannel">
        </el-input>
      </div>
      <div class="select-bottom">
        <el-select placeholder="批量下载" v-model="downValue" @change="downSelect">
          <el-option
            v-for="item in downOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="center channel-container">
      <Channel-item v-for="cData in selectedChannelData" :key="cData._id" :cData="cData"></Channel-item>
    </div>
  </div>

</template>

<script>
  import { mapState, mapActions } from 'Vuex'
  import ChannelItem from './ChannelItem'
  export default {
    data() {
      return {
        keyword: '',
        downValue: '',
        downOptions: [
          {value: 'qrc', label: '下载二维码'},
          {value: 'link', label: '下载链接'}
        ],
        // channelListData: []
      } 
    },
    // props: ['eleData', 'finalScale'],
    methods: {
      ...mapActions(['initChannelSelectedData']),
      queryChannel() {
        this.initChannelSelectedData({keyword: this.keyword})
      },
      downSelect(type) {
        this.downValue = '';
        console.log(type);
      }
    },
    activated() {
      this.initChannelSelectedData()
    },
    deactivated() {
    },
    mounted() {
      this.initChannelSelectedData()
    },
    computed: {
      ...mapState(['selectedChannelData'])
    },
    components: {
      ChannelItem
    }
  }

</script>

<style lang="less">
  .channel-wrapper{
    padding-bottom: 20px;
  }
  .channel-title{
    padding-right: 35px;
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

  .channel-container {
    width: 90%;
  }


</style>
