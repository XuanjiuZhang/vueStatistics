<style lang="less">

</style>

<template>
  <div class="row params-row">
    <div class="col-sm-3 col-md-3 col-lg-3 params-name">
      <el-input class="param-input" v-model="paramsStr" placeholder="请输入参数"></el-input>
      <el-popover ref="popoverDelete" placement="top" width="160" v-model="popoverDeleteShow">
        <p>这是一段内容这是一段内容确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="closePop">取消</el-button>
          <el-button type="primary" size="mini" @click="confirmDel">确定</el-button>
        </div>
      </el-popover>
      <span class="el-icon-delete2 param-delete" v-popover:popoverDelete></span>
    </div>
    <div class="col-sm-5 col-md-5 col-lg-5 params-qrc">
      <img class="qrcode" :src="'/build/img/user-avatar.jpg'" alt="">
      <span>http://qlelrkr.werwecodfewfewfewewffewfwem</span>
    </div>
    <div class="col-sm-2 col-md-2 col-lg-2">
      <button class="copy-btn" @click="copyLink">复制链接</button>
      <!--<div class="add-custom-channel">
        <span class="el-icon-plus"></span><span class="text">自定义渠道 </span>
      </div>-->
    </div>
    <div class="col-sm-2 col-md-2 col-lg-2">
      <el-select class="down-qrc" v-model="downInfo" placeholder="下载二维码" @change="downInfoSelect">
        <el-option v-for="item in downInfoOption" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'Vuex';
  export default {
    data() {
      return {
        paramsStr: '',
        popoverDeleteShow: false,
        downInfo: '',
        downInfoOption: [{value: '256', label: '256px'}, {value: '512', label: '512px'}, {value: '1024', label: '1024px'}]
      }
    },
    props: ['pData'],
    mounted() {
    },
    methods: {
      closePop() {
        this.popoverDeleteShow = false
      },
      confirmDel() {
        this.$emit('confirmDel')
        this.closePop()
      },
      downInfoSelect(down) {
        console.log(down);
        this.downInfo = ''
      },
      copyLink() {
        console.log('copyLink');
      },
    },
    computed: {
      // ...mapGetters(['statisticApi', 'currentShowChannel', 'echarts'])
    },
  }

</script>