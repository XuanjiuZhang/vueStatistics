<style lang="less">
  .map-layout {
    padding: 20px 0;
  }
  .map-canvas {
    float: left;
    width: 50%;
    height: 700px;
  }
  .map-static {
    float: right;
    width: 50%;
  }
  .map-table {
    text-align: right;
    margin-top: 60px;
    th {
      text-align: right;
    }
  }
  .close-btn {
    position: absolute;
    padding: 30px;
    span {
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="map-layout">
    <div ref="child" class="map-canvas"></div>
    <div class="close-btn"><span @click="escProvince({keyCode: 27})" class="el-icon-d-arrow-left" v-show="currentPosition != 'china'"></span></div>
    <div class="map-static">
      <div class="c-time">
        <ul class="peroid">
          <li :class="{active: timePeroid === 0}" @click="changeTimePeroid(0)">今天</li>
          <li :class="{active: timePeroid === 1}" @click="changeTimePeroid(1)">昨天</li>
          <li :class="{active: timePeroid === 7}" @click="changeTimePeroid(7)">近七天</li>
          <li :class="{active: timePeroid === 30}" @click="changeTimePeroid(30)">近三十天</li>
          <li :class="{active: timePeroid === -1}" @click="changeTimePeroid(-1)">全部</li>
        </ul>
      </div>
      <table class="table map-table">
        <tr>
          <th>排名</th>
          <th>访问来源</th>
          <th>浏览次数</th>
        </tr>
        <tr v-for="(s, index) in opt.series.data" :key="s.name">
          <td>{{index + 1}}</td>
          <td>{{s.name}}</td>
          <td>{{s.value}}</td>
        </tr>
      </table>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import { parseData } from './mapChartService'

  export default {
    data() {
      return {
        currentPosition: 'china',
        timePeroid: -1,
        inited: false,
        initedProvince: [],
        opt: {series: {}}
      }
    },
    mounted() {
      this.getCountryVisits()
    },
    methods: {
      changeTimePeroid(peroid) {
        this.timePeroid = peroid
        if(this.currentPosition === 'china') {
          this.getCountryVisits()
        } else {
          this.getProvinceVisits()
        }
      },
      getCountryVisits() {
        this.statisticApi.effects.getCountryVisit(this.sid, this.dayQueryObj).then(res => res.json()).then(data => {
          this.opt = parseData(data, this.currentPosition)
          console.log('setOption', this.opt);
          if(this.inited) {
            this.echartDom.setOption(this.opt, true)
            return 
          }
          this.statisticApi.effects.getChinaMap().then(res => res.json()).then(data => {
            console.log('getChinaMap', data);
            this.echarts.registerMap(this.currentPosition, data[0]);

            this.echartDom = this.echarts.init(this.$refs.child);
            this.echartDom.on('click', (params) => {
              console.log(params);
              console.log(this.currentPosition);
              if (this.currentPosition != 'china') {
                return 
              }
              this.currentPosition = params.name
              document.addEventListener('keydown', this.escProvince)
              this.getProvinceVisits()
            });

            this.echartDom.setOption(this.opt, true)
            this.inited = true
          })
        })
      },
      getProvinceVisits() {
        const send = Object.assign({province: this.currentPosition}, this.dayQueryObj)
        this.statisticApi.effects.getProvinceVisit(this.sid, send).then(res => res.json()).then(data => {
          console.log(data);
          this.opt = parseData(data, this.currentPosition)
          const reg = this.initedProvince.some(pro => {
            return pro === this.currentPosition
          })
          if(reg) {
            console.log('setOption', this.opt);
            this.echartDom.setOption(this.opt, true)
          } else {
            let param = { province: this.currentPosition }
            this.getMapData(param).then(data => {
              this.echarts.registerMap(this.currentPosition, data[0]);
              console.log('setOption', this.opt);
              this.echartDom.setOption(this.opt, true)
            })
          }

        })
      },
      getMapData(param) {
        return this.statisticApi.effects.getMapData(param).then(res => res.json())
      },
      escProvince(e) {
        if (e.keyCode === 27) {
          this.currentPosition = 'china'
          document.removeEventListener('keydown', this.escProvince)
          this.getCountryVisits()
        }
      }
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'echarts']),
      dayQueryObj() {
        return this.timePeroid === -1 ? {} : { day: this.timePeroid }
      }
    }
  }

</script>