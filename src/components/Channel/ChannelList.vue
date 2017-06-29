<template>
  <div class="content-wrapper channel-wrapper">
    <div class="title channel-title">
      <span><b>已选渠道</b></span>
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
    <div class="center channel-container">
      <Channel-item></Channel-item>
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
