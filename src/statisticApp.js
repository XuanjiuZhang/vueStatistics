import Vue from 'vue'
import _lodash from 'lodash';
import initStore from './vuex/statisticStore';
/*import ChannelBanner from './components/ChannelBanner';
import LineChart from './components/LineChart';*/
import FunnelChart from './components/FunnelChart/FunnelChart';

const statisticStore = initStore();

const instance = new Vue({
  store: statisticStore, // 注入到所有子组件1
  components: { FunnelChart }
});
instance.$mount('#' + 'root');