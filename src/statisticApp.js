import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import _lodash from 'lodash';
window._lodash = _lodash;
import initStore from './vuex/statisticStore';
import SourceContainer from './components/SourceContainer';
import routes from './components/SourceRouter';
import { Pagination } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Pagination)

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