import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import statisticApi from '../api/statisticApi';
import echarts from '../components/echarts/echartsRegister';
import { Notification, MessageBox } from '../lib/elementLib/element-ui.common'

const initStore = () => {
  const state = {
    sid: '', // sid是目前是场景的id值 
    Notification, // elementUI 通知 调用方法 Notification(opt)
    MessageBox, // elementUI 消息框 调用方法 MessageBox(opt)
    statisticApi, // api服务对象
    echarts, // echarts
    channelData: [], // 渠道列表 树结构数据
    selectedCount: 0, // 已选择的渠道数量
    selectedChannelData: [], // 当前已选择的渠道
  };

  const store = new Vuex.Store({
    state,
    mutations: {
      changeChannelData(state, payload) {
        state.channelData = payload.channelData;
      },
      changeSelectedCount(state, payload) {
        state.selectedCount = payload.selectedCount;
      },
      changeSid(state, payload) {
        state.sid = payload.sid;
      },
      changeSelectedChannelData(state, payload) {
        state.selectedChannelData = payload.selectedChannelData;
      }
    },
    getters: {
    },
    actions: {
      initChannelData(context) {
        statisticApi.channel.getAllChannel(context.state.sid).then(res => {
          if(res.ok){
            return res.json()
          } else {
            return {data: [], count: 0}
          }
        }).then(data => {
          console.log(data);
          data.data.forEach(level1 => {
            level1.children && level1.children.forEach((level2, l2Index) => {
              level2._show = l2Index === 0
            })
          })
          context.commit('changeChannelData', { channelData: data.data });
          context.commit('changeSelectedCount', { selectedCount: data.count });
        });
      },

      initChannelSelectedData(context, payload = { keyword: '' }) {
        statisticApi.channel.querySelectedChannel(context.state.sid, payload.keyword).then(res => {
          if(res.ok) {
            return res.json()
          } else {
            return []
          }
        }).then(data => {
          console.log(data);
          // 最新添加的显示在最上方
          _lodash.reverse(data)
          context.commit('changeSelectedChannelData', { selectedChannelData: data });
        });
      }
    }
  });

  return store;
};

export default initStore;