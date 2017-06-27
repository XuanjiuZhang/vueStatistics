import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import _lodash from 'lodash';
window._lodash = _lodash;
import initStore from './vuex/statisticStore';
import SourceContainer from './components/SourceContainer';
import routes from './components/SourceRouter';
import { Pagination, Table, TableColumn } from './lib/elementLib/element-ui.common'
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)

const statisticStore = initStore();

const router = new VueRouter({
  routes // short for `routes: routes`
})

const instance = new Vue({
  router,
  store: statisticStore, // 注入到所有子组件1
  components: { SourceContainer }
});
instance.$mount('#' + 'root'); 