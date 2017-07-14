<style lang="less">
  .device-table {
    width: 50%;
    float: left;
    padding: 20px;
    font-size: 16px;
  }
  .table {
    td {
      padding: 15px;
    }
    th {
      padding: 10px;
    }
  }
</style>

<template>
  <div>
    <div ref="child" class="center" style="width: 1200px; height: 400px;"></div>
    <div>
      <div class="device-table">
        <el-tabs v-model="deviceTabsValue" type="card">
          <el-tab-pane
            v-for="(item, index) in deviceTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <table class="table" v-show="deviceTabsValue === 'android'">
          <tr>
            <th>排名</th>
            <th>系统</th>
            <th>百分比</th>
          </tr>
          <tr v-for="(android, index) in androidArr" :key="android.name">
            <td>{{index + 1}}</td>
            <td>{{android.name}}</td>
            <td>{{android.ratio}}</td>
          </tr>
        </table>
        <table class="table" v-show="deviceTabsValue === 'ios'">
          <tr>
            <th>排名</th>
            <th>系统</th>
            <th>百分比</th>
          </tr>
          <tr v-for="(ios, index) in iosArr" :key="ios.name">
            <td>{{index + 1}}</td>
            <td>{{ios.name}}</td>
            <td>{{ios.ratio}}</td>
          </tr>
        </table>
      </div>
      <div class="device-table">
        <el-tabs v-model="brandTabsValue" type="card">
          <el-tab-pane
            v-for="(item, index) in brandTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <table class="table">
          <tr>
            <th>排名</th>
            <th>品牌</th>
            <th>百分比</th>
          </tr>
          <tr v-for="(model, index) in deviceModelArr" :key="model.name">
            <td>{{index + 1}}</td>
            <td>{{model.name}}</td>
            <td>{{model.ratio}}</td>
          </tr>
        </table>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import { dataParser } from './deviceChartService';

  export default {
    data() {
      return {
        backData: undefined,
        mobileModels: undefined,
        mobileSystem: undefined,
        deviceTabsValue: 'android',
        deviceTabs: [{
          title: 'android',
          name: 'android',
        }, {
          title: 'ios',
          name: 'ios',
        }],
        brandTabsValue: 'brand',
        brandTabs: [{
          title: '品牌',
          name: 'brand',
        }]
      }
    },
    mounted() {
      this.echartDom = this.echarts.init(this.$refs.child);
      this.statisticApi.effects.getDeviceData(this.sid).then(res => res.json()).then(data => {
        console.log(data);
        this.backData = data
        const opt = dataParser(data)
        this.echartDom.setOption(opt, true)
      })
      this.statisticApi.effects.getMobileModels(this.sid).then(res => res.json()).then(data => {
        data.sort((d1, d2) => {
          return d1.value < d2.value
        })
        this.mobileModels = data
        console.log(this.mobileModels);
      })
      this.statisticApi.effects.getMobileSystem(this.sid).then(res => res.json()).then(data => {
        console.log(data);
        data.Android.sort((d1, d2) => {
          return d1.value < d2.value
        })
        data.IOS.sort((d1, d2) => {
          return d1.value < d2.value
        })
        this.mobileSystem = data
      })
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'echarts']),
      deviceModelArr() {
        if(!this.mobileModels) {
          return []
        }
        const total = this.mobileModels.reduce((total, model) => {
          return total + model.value
        }, 0)
        return this.mobileModels.map(model => {
          const ratio = (model.value / total * 100).toFixed(2) + '%'
          return Object.assign({ratio}, model)
        })
      },
      androidArr() {
        if(!this.mobileSystem) {
          return []
        }
        const total = this.mobileSystem.Android.reduce((total, os) => {
          return total + os.value
        }, 0)
        return this.mobileSystem.Android.map(os => {
          const ratio = (os.value / total * 100).toFixed(2) + '%'
          return Object.assign({ratio}, os)
        })
      },
      iosArr() {
        if(!this.mobileSystem) {
          return []
        }
        const total = this.mobileSystem.IOS.reduce((total, os) => {
          return total + os.value
        }, 0)
        return this.mobileSystem.IOS.map(os => {
          const ratio = (os.value / total * 100).toFixed(2) + '%'
          return Object.assign({ratio}, os)
        })
      }
    }
  }

</script>