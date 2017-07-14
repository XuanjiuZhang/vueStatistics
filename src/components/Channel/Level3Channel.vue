<style lang="less">
  .custom-channel {
    border-radius: 50%;
    background: #ccc;
    color: #fff;
    padding: 0 3px 3px;
    &.active {
      background: #fe5656;
    }
  }

  .info-circle {
    fill: #ccc;
    &.active {
      fill: #fe5656
    }
  }
  .info-text {
    font-size: 12px;
    fill: #4A4A4A;
    &.active {
      fill: #fff;
    }
  }
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
        <!--非自定义渠道-->
        <img v-if="!canDelete" v-show="l3.selected" :src="l3.ligting_icon_channel" alt="">
        <img v-if="!canDelete" v-show="!l3.selected" :src="l3.ligtingoff_icon_channel" alt="">
        <!--非自定义渠道-->

        <!--自定义渠道-->
        <div ref="custom" v-if="canDelete" style="float: left"></div>
        <!--<span v-if="canDelete" class="custom-channel" :class="{'active': l3.selected}">{{l3.name.charAt(0)}}</span>-->
        <!--自定义渠道-->

        <span class="text" :class="{active: l3.selected}">{{l3.name}}</span>
      </div>
    </el-tooltip>
    <el-popover
      v-if="canDelete" 
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
    <el-tooltip v-if="canDelete" class="item" effect="dark" content="删除" placement="top">
      <div v-popover:popoverDelete class="closeBtn"><span class="el-icon-circle-cross"></span></div> 
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
      if(this.canDelete) {
        let size = 38
        let d3 = window.d3
        let svg = d3.select(this.$refs.custom).append('svg')
        let info = this.l3.name.charAt(0)
        let dx = this.checkChinese(info) ? -6 : -4
        svg.attr('width', size).attr('height', size)
        svg.append('circle').attr('class', 'info-circle').classed('active', this.l3.selected)
          .attr('cx', size / 3).attr('cy', size / 2).attr('r', size / 3)
        svg.append('text').attr('class', 'info-text').classed('active', this.l3.selected)
          .attr('x', size / 3).attr('y', size / 2).attr('dx', dx).attr('dy', 4).html(info)
        this.$watch('l3.selected', (selected) => {
          svg.select('.info-circle').classed('active', this.l3.selected)
          svg.select('.info-text').classed('active', this.l3.selected)
        })
      }
    },
    methods: {
      ...mapActions(['initChannelData']),
      ...mapMutations(['changeSelectedCount']),
      hideTip() {
        this.showTip = false
      },
      confirmTip() {
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
          this.statisticApi.channel.selectChannel(this.sid, data).then(res => res.json()).then(data => {
            console.log(data);
            this.Notification({
              // title: '成功',
              type: 'success',
              message: '成功添加该渠道',
              duration: 1000,
              offset: 200
            })
            this.l3.selected = true
            this.changeSelectedCount({selectedCount: this.selectedCount + 1})
          });
        }else{
          let data = {
            id: this.l3.id
          }
          console.log(data);
          this.statisticApi.channel.unselectChannel(this.sid, data).then(res => res.json()).then(data => {
            console.log(data);
            this.l3.selected = false
            this.Notification({
              // title: '成功',
              type: 'success',
              message: '操作成功',
              duration: 1000,
              offset: 100
            })
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
          this.Notification({
            // title: '成功',
            type: 'success',
            message: '操作成功',
            duration: 1000,
            offset: 100
          })
          this.initChannelData()
        });
      },
      checkChinese(val) {
        const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
        return reg.test(val)     
      }
    },
    computed: {
      ...mapState(['statisticApi', 'selectedCount', 'sid', 'Notification']),
      canDelete() {
        return this.l3.hasOwnProperty('sid')
      }
    },
  }

</script>