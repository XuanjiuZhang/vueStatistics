import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import _lodash from 'lodash';
window._lodash = _lodash;
import initStore from './vuex/statisticStore';
import VueClipboard from 'vue-clipboard2'
import routes from './components/SourceRouter';
import { Pagination, Table, TableColumn , Popover, Tooltip, Button, Input, Select, Option, Dialog, Checkbox} from './lib/elementLib/element-ui.common'
import initFilter from './lib/ourFilter'
initFilter(Vue)

Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(VueClipboard)
Vue.use(Dialog)
Vue.use(Checkbox)
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

if(window.sid && window.sid != '<%-sid%>') {
  console.log(window.sid);
  router.push({ name: 'channelChoose', params: { id: window.sid }})
}