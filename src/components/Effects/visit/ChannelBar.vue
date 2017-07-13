<style lang="less">
  .c-nav {
    margin-top: 20px;
    li {
      font-weight: 600;
      display: inline;
      list-style: none;
      color: #666;
      cursor: pointer;
    }
  }
  .c-current {
    .channel {
      float: left;
      li {
        margin-right: 15px;
        display: inline;
        list-style: none;
      }
    }
    
  }
  .el-icon-information {
    cursor: pointer;
  }
  .mt-4 {
    margin-top: -4px;
  }
  .c-time {
    float: right;
    .time-type {
      float: right;
    }
    li {
      border-radius: 5px;
      cursor: pointer;
      width: 80px;
      border: 1px solid #ddd;
      display: inline-block;
      text-align: center;
      padding: 2px 8px;
      list-style: none;
      &.active {
        color: #fff;
        background-color: #7266ba;
        border-color: #7266ba;
      }
    }
  }

  .clear{clear:both;height:0;overflow:hidden;}
</style>

<template>
  <div ref="child">
    <ul class="c-nav">
      <li @click="handleShowStack(-1)">全部渠道</li>
      <li v-for="(stack, index) in showDataStack" :key="index" @click="handleShowStack(index, stack)">> &nbsp&nbsp {{stack.name}} &nbsp&nbsp</li>
    </ul>
    <div class="c-current">
      <ul class="channel">
        <li>
          <el-checkbox v-model="showAll" :color="allColor" @change="changeShowAll">
            <span>全部</span>
          </el-checkbox>
        </li>
        <li v-for="(ch, index) in showData" :key="ch.id">
          <el-checkbox v-model="ch._checked" :color="ch._color" @change="changeCheck(ch)">
            <span>{{ch.name}}</span>
          </el-checkbox>
          <span class="el-icon-information" v-if="showChDetail(ch)" @click.stop="chDetail(ch)"></span>
        </li>
      </ul>
      <div class="c-time">
        <ul class="peroid mt-4">
          <li :class="{active: timePeroid === 0}" @click="changeTimePeroid(0)">今天</li>
          <li :class="{active: timePeroid === 1}" @click="changeTimePeroid(1)">昨天</li>
          <li :class="{active: timePeroid === 7}" @click="changeTimePeroid(7)">近七天</li>
          <li :class="{active: timePeroid === 30}" @click="changeTimePeroid(30)">近三十天</li>
          <li :class="{active: timePeroid === -1}" @click="changeTimePeroid(-1)">全部</li>
        </ul>
        <ul class="time-type">
          <li :class="{active: timeType === 'day'}" @click="changeTimeType('day')">天</li>
          <li :class="{active: timeType === 'hour'}" @click="changeTimeType('hour')">小时</li>
        </ul>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex';
  import { getColorByIndex } from './lineChartService'

  export default {
    data() {
      return {
        cData: undefined,
        showData: [],
        showDataStack: [],
        timePeroid: -1,
        timeType: 'day',
        showAll: true,
        allColor: 'rgb(175,238,238)'
      }
    },
    props: ['echartDom'],
    mounted() {
      this.statisticApi.effects.getVisitTree(this.sid).then(res => res.json()).then(data => {
        console.log(data);
        this.initCdata(data)
        this.cData = data
        this.showData = this.cData
        this.$emit('getVisitTree')
      })
      this.VueEventBus.$on('echartDomInited', () => {
        this.initCdata(this.cData)
      })
    },
    methods: {
      changeShowAll() {
        this.echartDom.dispatchAction({
          type: this.showAll ? 'legendSelect' : 'legendUnSelect',
          // 图例名称
          name: '全部'
        })
      },
      changeCheck(ch) {
        const checked = ch._checked
        this.echartDom.dispatchAction({
          type: checked ? 'legendSelect' : 'legendUnSelect',
          // 图例名称
          name: ch.name
        })
      },
      showChDetail(ch) {
        return ch.hasOwnProperty('children')
      },
      chDetail(ch) {
        this.showData = ch.children
        this.showDataStack.push(ch)
        this.$emit('channelChanged', ch)
      },
      handleShowStack(index) {
        if(index === -1 && this.showDataStack.length) {
          this.showDataStack.length = 0
          this.showData = this.cData
          this.showData.forEach(show => show._checked = true)
          this.$emit('channelChanged')
          return 
        }
        this.showDataStack = window._lodash.take(this.showDataStack, index + 1)
        this.showData = this.showDataStack[this.showDataStack.length - 1].children
        this.showData.forEach(show => show._checked = true)
        this.$emit('channelChanged', this.showDataStack[this.showDataStack.length - 1])
      },
      initCdata(data) {
        console.log(data)
        data.forEach((show, index) => {
          const colorObj = getColorByIndex(index, show.name)
          show._checked = true
          show._color = colorObj.colorStr
          if(show.hasOwnProperty('children')) {
            this.initCdata(show.children)
          }
        })
      },
      initCheck(data) {
        data.forEach(show => {
          if(this.echartDom) { this.changeCheck(show) }
          if(show.hasOwnProperty('children')) {
            this.initCheck(show.children)
          }
        })
      },
      changeTimePeroid (type) {
        this.timePeroid = type
        this.$emit('timeChanged', {
          timePeroid: this.timePeroid,
          timeType: this.timeType
        })
      },
      changeTimeType(type) {
        this.timeType = type
        this.$emit('timeChanged', {
          timePeroid: this.timePeroid,
          timeType: this.timeType
        })
      }
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'VueEventBus']),
    }
  }

</script>