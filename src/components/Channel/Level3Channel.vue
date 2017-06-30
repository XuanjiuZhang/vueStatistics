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
        <span class="text">{{l3.name}}</span>
      </div>
    </el-tooltip>
    <el-popover
        ref="popoverDelete"
        placement="right"
        width="160"
        v-model="showDelTip">
        <p>删除该渠道?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="hideDelTip">取消</el-button>
          <el-button type="primary" size="mini" @click="confirmDelTip">确定</el-button>
        </div>
      </el-popover>
    <el-tooltip class="item" effect="dark" content="删除" placement="top">
      <div v-popover:popoverDelete>
        <span v-if="canDelete" class="closeBtn">x</span> 
      </div>
    </el-tooltip>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'Vuex';
  export default {
    data() {
      return {
        showTip: false,
        showDelTip: false,
      }
    },
    props: ['l3', 'showedL2', 'cData'],
    mounted() {
      console.log(this.l3);
    },
    methods: {
      ...mapActions(['initChannelData']),
      ...mapMutations(['changeSelectedCount']),
      hideTip() {
        this.showTip = false
      },
      confirmTip() {
        console.log('confirmTip!');
        this.hideTip()
        console.log(this.cData);
        console.log(this.showedL2);
        if(!this.l3.selected){
          let data = {
            channelid: this.l3.id,
            name: `${this.cData.name}-${this.showedL2.name}-${this.l3.name}`,
            first_channelid: this.cData.id,
            second_channelid: this.showedL2.id
          }
          console.log(data);
          this.statisticApi.channel.selectChannel(this.$route.params.id, data).then(res => res.json()).then(data => {
            console.log(data);
            this.l3.selected = true
            this.changeSelectedCount({selectedCount: this.selectedCount + 1})
          });
        }else{
          let data = {
            id: this.l3.id
          }
          console.log(data);
          this.statisticApi.channel.unselectChannel(this.$route.params.id, data).then(res => res.json()).then(data => {
            console.log(data);
            this.l3.selected = false
            this.changeSelectedCount({selectedCount: this.selectedCount - 1})
          });
        }
      },
      hideDelTip() {
        this.showDelTip = false
      },
      confirmDelTip() {
        console.log('confirmTip!');
        this.hideDelTip()
        this.statisticApi.channel.delCustomChannel(this.l3.id).then(res => res.json()).then(data => {
          console.log(data);
          this.initChannelData()
        });
      }
    },
    computed: {
      ...mapState(['statisticApi', 'selectedCount']),
      canDelete() {
        return this.l3.hasOwnProperty('sid')
      }
    },
  }

</script>