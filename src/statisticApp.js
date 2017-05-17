import Vue from 'vue'
import _lodash from 'lodash';
import initStore from './vuex/statisticStore';
import ChannelBanner from './components/ChannelBanner';
import LineChart from './components/LineChart';

const statisticStore = initStore();

const instance = new Vue({
  store: statisticStore, // 注入到所有子组件1
  components: { LineChart, ChannelBanner }
});
instance.$mount('#' + 'root');