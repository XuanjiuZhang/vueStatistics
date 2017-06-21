import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import statisticApi from '../api/statisticApi';
import echarts from '../components/echarts/echartsRegister';

/*const getRGBAColor = i => {
  var randomR;
  var randomB;
  var randomG;
  switch (i) {
    case 0:
      randomR = 255;
      randomG = 196;
      randomB = 0;
      break;
    case 1:
      randomR = 41;
      randomG = 155;
      randomB = 255;
      break;
    case 2:
      randomR = 40;
      randomG = 201;
      randomB = 127;
      break;
    case 3:
      randomR = 114;
      randomG = 102;
      randomB = 186;
      break;
    default:
      randomR = Math.round(Math.random() * 255);
      randomB = Math.round(Math.random() * 255);
      randomG = Math.round(Math.random() * 255);
      break;
  }
  var colorStr = `rgb(${randomR}, ${randomG}, ${randomB})`;
  var colorGradientStrStart = `rgba(${randomR}, ${randomG}, ${randomB}, 0)`;
  var colorGradientStrEnd = `rgba(${randomR}, ${randomG}, ${randomB}, 1)`;
  var colorGradientStrEndVersion2 = `rgba(${randomR}, ${randomG}, ${randomB}, .5)`;
  return {
    colorStr,
    colorGradientStrStart,
    colorGradientStrEnd,
    colorGradientStrEndVersion2,
    outStyle: {
      backgroundColor: colorStr,
      borderColor: colorStr
    },
    inStyle: {
      color: colorStr
    }
  }
}

const initLegendColorList = (count) => {
  const legendColorList = [];
  for (let i = 0; i < count; i++) {
    legendColorList.push(getRGBAColor(i));
  };
  return legendColorList;
};*/

const initStore = () => {
  const state = {
    // sceneId: '463c9e00356b11e7947badc1235072ab',
    statisticApi,
    echarts
    /*legendColorList: initLegendColorList(2000),
    sceneChannelTree: undefined,
    currentShowChannel: undefined,*/
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
    },
    getters: {
    },
    actions: {
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