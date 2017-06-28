import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import _lodash from 'lodash';
window._lodash = _lodash;
import initStore from './vuex/statisticStore';
// import SourceContainer from './components/SourceContainer';
import routes from './components/SourceRouter';
import { Pagination, Table, TableColumn ,Popover,Tooltip,Button,Input,Select,Option} from './lib/elementLib/element-ui.common'

Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
const statisticStore = initStore();

const router = new VueRouter({
  routes // short for `routes: routes`
})

const Root = {
  template: `
    <router-view></router-view>
  `
}

const instance = new Vue({
  router,
  store: statisticStore, // 注入到所有子组件1
  components: { Root }
});
instance.$mount('#' + 'root'); 