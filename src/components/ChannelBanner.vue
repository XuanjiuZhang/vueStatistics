<style lang="less">

</style>

<template>
  <div class="chart-header clearfix">
    <ul class="effects-breadcrumb">
      <li v-for="(nav, index) in channelNav">
        <a href @click="channelNavClicked(nav, index)">{{nav.name}}
              <span v-show="channelNav.length > 1">&gt;</span></a>
      </li>
    </ul>
    <div class="effects-sel-list" style="position: fixed;top: 66px;    margin-left: -57px;">
      <div class="chart-checkbox">
        <label class="b-checkbox checkbox-colorful" :class="{'checked': currentChannelAllChecked}" @click="toggleShowAll">
              <span class="checkbox-nav" :style="checkBoxAllStyle">
                <i class="checked-icon b-icon b-checked"></i>
              </span>
              <span class="chart-checkbox-name" :style="checkBoxAllStyle">全部</span>
            </label>
      </div>
      <div class="chart-checkbox" v-for="(sc, index) in currentShowChannel">
        <label class="b-checkbox checkbox-colorful" :class="{checked: sc.__checked}" @click="toggleShowChannel(sc)">
              <span class="checkbox-nav" :style="legendColorList[index].outStyle">
                <i class="checked-icon b-icon b-checked"></i>
              </span>
              <span class="chart-checkbox-name" :style="legendColorList[index].inStyle">{{sc.name}}</span>
            </label>
        <i v-show="sc.hasChildren" class="b-icon b-next-step" @click="showNextClass(sc)"></i>
        <!--<i v-show="sc.hasOwnProperty('children')" class="b-icon b-next-step" @click="showNextClass(sc)"></i>-->
      </div>
    </div>

    <p class="size-lg">&nbsp;&nbsp;场景展示共&nbsp;
      <span class="text-danger">{{showCount}}</span>&nbsp;次&nbsp;&nbsp;&nbsp;&nbsp; 数据收集共
      <span class="text-primary">{{dataCollectionCount}}</span>个
    </p>
    <div class="chart-sel-opt">
      <div class="b-nav sm-nav">
        <ul class="nav">
          <li :class="{active: recent === 0}"><a href @click.prevent="genRecent(0)">今天</a></li>
          <li :class="{active: recent === 1}"><a href @click.prevent="genRecent(1)">昨天</a></li>
          <li :class="{active: recent === 7}"><a href @click.prevent="genRecent(7)" >近7天</a></li>
          <li :class="{active: recent === 30}"><a href @click.prevent="genRecent(30)">近30天</a></li>
          <li :class="{active: recent === 'all'}"><a href @click.prevent="genRecent('all')">全部</a></li>
        </ul>
      </div>
      <div class="b-nav sm-nav round mt15 pull-right">
        <ul class="nav">
          <li :class="{active: timeType === 'day'}"><a href @click.prevent="changeChannelTime('day')">天</a></li>
          <li :class="{active: timeType === 'hour'}"><a href @click.prevent="changeChannelTime('hour')">小时</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'Vuex';
  export default {
    data() {
      return {
        checkBoxAllStyle: {
          'background-color': '#fe5656',
          'border-color': '#fe5656'
        },
        recent: 'all',
        timeType: 'day',
      }
    },
    mounted() {
      this.getSceneChannelTree({sceneId: this.sceneId});
    },
    watch: {
    },
    computed: {
      ...mapGetters(['statisticApi', 'sceneChannelTree', 'currentShowChannel', 'legendColorList', 'sceneId']),
      showCount() {
        return 1;
      },
      dataCollectionCount() {
        return 2;
      },
      channelNav() {
        return [];
      },
    },
    methods: {
      ...mapActions(['getSceneChannelTree']),
      genRecent(day) {
        console.log(day);
      },
      changeChannelTime(type) {
        this.timeType = type
      },
      channelNavClicked(nav, index) {
        console.log(nav);
        console.log(index);
      },
      currentChannelAllChecked() {
        return false;
      },
      toggleShowAllCurrentChannel() {
        
      },
      toggleShowChannel(sc) {

      },
      showNextClass() {

      },
      toggleShowAll() {

      }
    }
  }

</script>