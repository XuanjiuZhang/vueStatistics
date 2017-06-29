<style lang="less">
</style>

<template>
  <div class="level3-wrapper">
    <el-popover
        ref="popoverSelect"
        placement="top"
        width="160"
        v-model="showTip">
        <p v-show="l3.selected">您确定要取消该渠道的选择？</p>
        <p v-show="!l3.selected">选择该渠道?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="hideTip">取消</el-button>
          <el-button type="primary" size="mini" @click="confirmTip">确定</el-button>
        </div>
      </el-popover>
    <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
      <div v-popover:popoverSelect>
        <img v-show="l3.selected" :src="l3.ligting_icon_channel" alt="">
        <img v-show="!l3.selected" :src="l3.ligtingoff_icon_channel" alt="">
        <span class="text">百度网盟</span><span v-show="l3.selected" class="closeBtn">x</span> 
      </div>
    </el-tooltip>
  </div>
</template>

<script>
  import { mapGetters } from 'Vuex';
  export default {
    data() {
      return {
        showTip: false
      }
    },
    props: ['l3'],
    mounted() {
      console.log(this.l3);
    },
    methods: {
      hideTip() {
        this.showTip = false
      },
      confirmTip() {
        console.log('confirmTip!');
        this.hideTip()
      }
    },
    computed: {
    },
  }

</script>