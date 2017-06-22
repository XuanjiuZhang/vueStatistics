import Vue from 'vue'
import _lodash from 'lodash';
window._lodash = _lodash;
import initStore from './vuex/statisticStore';
/*import ChannelBanner from './components/ChannelBanner';
import LineChart from './components/LineChart';*/
import FunnelChart from './components/FunnelChart/FunnelChart';
import D3Funnel from './components/D3Chart/D3Funnel';

const statisticStore = initStore();

const instance = new Vue({
  store: statisticStore, // 注入到所有子组件1
  components: { FunnelChart, D3Funnel }
});
instance.$mount('#' + 'root');