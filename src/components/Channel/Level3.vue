<style lang="less">
  .row-data {
    margin-bottom: 15px;
  }
</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3 col-md-3 col-lg-3 row-data" v-for="l3 in showedL2.children" :key="l3.id">
        <Level3-channel :l3="l3" :showedL2="showedL2" :cData="cData"></Level3-channel>
        <!--<div class="level3-wrapper">
          <el-popover
              ref="popoverSelect"
              placement="top"
              width="160"
              v-model="visible2">
              <p>您确定要取消该渠道的选择？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
              </div>
            </el-popover>
          <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
            <div v-popover:popoverSelect><img :src="'/build/img/baidu.png'" alt=""><span class="text">百度网盟</span></div>
          </el-tooltip>
        </div>-->
      </div>
      <div class="col-sm-3 col-md-3 col-lg-3 row-data">
        <div class="level3-wrapper">
          <div class="add-custom-channel" v-show="!inAddCustomChannel" @click="toggleAddCustom">
            <span class="el-icon-plus"></span><span class="text">自定义渠道 </span>
          </div>
          <div class="add-custom-channel-second" v-show="inAddCustomChannel">
            <input type="text" class="inp" v-model="customChannelName" placeholder="请输入渠道名称" @blur="inputBlur">
            <button class="el-icon-check btn" @click="confirmAddCustom"></button>
          </div>
        </div>
      </div>
      <!--<div class="col-sm-3 col-md-3 col-lg-3 row-data">
        <div class="level3-wrapper">
          
        </div>
      </div>-->
      <!--<div class="col-sm-3 col-md-3 col-lg-3">
        <div class="level3-wrapper">
          <el-tooltip class="item" effect="dark" content="点击选择" placement="top">
                              <div v-popover:popover5><img :src="'/build/img/baidu.png'" alt="">
                                <span class="text">百度网盟</span><span class="closeBtn">x</span>
                              </div>
                            </el-tooltip>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'Vuex';
  import Level3Channel from './Level3Channel';
  export default {
    data() {
      return {
        inAddCustomChannel: false,
        customChannelName: '',
      }
    },
    props: ['cData'],
    mounted() {
      console.log(this.cData);
    },
    methods: {
      ...mapActions(['initChannelData']),
      toggleAddCustom() {
        this.inAddCustomChannel = !this.inAddCustomChannel
      },
      confirmAddCustom() {
        this.inAddCustomChannel = false
        if(this.customChannelName === ''){
          return
        }
        const send = {
          sort: this.showedL2.children.length + 1,
          id: this.showedL2.id,
          sid: this.$route.params.id,
          name: this.customChannelName
        }
        this.statisticApi.channel.addCustomChannel(send).then(res => res.json()).then(data => {
          console.log(data);
          this.Notification({
            // title: '成功',
            type: 'success',
            message: '成功添加自定义渠道: ' + this.customChannelName,
            duration: 1000,
            offset: 100
          })
          this.initChannelData()
        })
        console.log('confirmAddCustom');
      },
      inputBlur() {
        console.log('inputBlur');
        setTimeout(() => {
          this.inAddCustomChannel = false
        }, 500);
      }
    },
    computed: {
      ...mapState(['statisticApi', 'Notification']),
      showedL2() {
        return this.cData.children.find(level2 => {
          return level2._show;
        })
      }
    },
    components: { Level3Channel }
  }

</script>