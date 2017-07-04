<style lang="less">
  .row-data {
    margin-bottom: 15px;
    height: 38px;
  }
  .height-150 {
    height: 150px;
    overflow-y: auto;
  }
</style>

<template>
  <div class="container-fluid">
    <div class="row height-150">
      <div class="col-sm-3 col-md-3 col-lg-3 row-data" v-for="l3 in showedL2.children" :key="l3.id">
        <Level3-channel :l3="l3" :showedL2="showedL2" :cData="cData"></Level3-channel>
      </div>
      <div class="col-sm-3 col-md-3 col-lg-3 row-data">
        <div class="level3-wrapper">
          <div class="add-custom-channel" v-show="!inAddCustomChannel" @click="toggleAddCustom">
            <span class="el-icon-plus"></span><label class="text" :for="custonInp">自定义渠道 </label>
          </div>
          <div class="add-custom-channel-second" v-show="inAddCustomChannel">
            <input type="text" class="inp" :id="custonInp" v-model="customChannelName" placeholder="请输入渠道名称" @blur="inputBlur">
            <button class="el-icon-check btn" @click="confirmAddCustom"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'Vuex';
  import Level3Channel from './Level3Channel';
  export default {
    data() {
      const custonInp = 'custonInp' + Math.round(Math.random() * 1000000)
      return {
        inAddCustomChannel: false,
        customChannelName: '',
        custonInp: custonInp
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
        if(this.cData.children) {
          return this.cData.children.find(level2 => {
            return level2._show;
          })
        }else {
          return {}
        }
      }
    },
    components: { Level3Channel }
  }

</script>