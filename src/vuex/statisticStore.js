import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import statisticApi from '../api/statisticApi';
import echarts from '../components/echarts/echartsRegister';

const initStore = () => {
  const state = {
    sid: '',
    statisticApi,
    echarts,
    channelData: [],
    selectedCount: 0,
    selectedChannelData: [],
  };

  const store = new Vuex.Store({
    state,
    mutations: {
      /*changeChannelTree(state, payload) {
        state.sceneChannelTree = payload.tree;
      },
      changeCurrentShowChannel(state, payload) {
        state.currentShowChannel = payload.currentShowChannel;
      }*/
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
          return res.json()
        }).then(data => {
          console.log(data);
          data.data.forEach(level1 => {
            level1.children.forEach((level2, l2Index) => {
              level2._show = l2Index === 0
            })
          })
          context.commit('changeChannelData', { channelData: data.data });
          context.commit('changeSelectedCount', { selectedCount: data.count });
        });

        /*statisticApi.getSceneChannelTree(payload.sceneId).then(res => {
          if (res.ok) {
            return res.json();
          }
          return [];
        }).then(data => {
          context.commit('changeChannelTree', { tree: data });
          context.commit('changeCurrentShowChannel', { currentShowChannel: data });
        });*/
      },

      initChannelSelectedData(context, payload = { keyword: '' }) {
        statisticApi.channel.querySelectedChannel(context.state.sid, payload.keyword).then(res => {
          return res.json()
        }).then(data => {
          console.log(data);
          context.commit('changeSelectedChannelData', { selectedChannelData: data });
        });
      }

      /*getSceneChannelTree(context, payload) {
        statisticApi.getSceneChannelTree(payload.sceneId).then(res => {
          if (res.ok) {
            return res.json();
          }
          return [];
        }).then(data => {
          context.commit('changeChannelTree', { tree: data });
          context.commit('changeCurrentShowChannel', { currentShowChannel: data });
        });
      }*/
    }
  });

  return store;
};

export default initStore;