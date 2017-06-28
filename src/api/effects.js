
const genReq = (appConfig) => {
  return {
    getChannelDetail(sid) {
      const url = `${appConfig.h5Service}/statistics/${sid}/channel/detail`;
      return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
    },  
    getGeneralStatistics (sceneId) {
      const url = `${appConfig.h5Service}/scene/${sceneId}/stat/overall`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    },

    getSceneChannelTree (sceneId) {
      const url = `${appConfig.h5Service}/scene/${sceneId}/channels_diaolog`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    },
    
  };
};

export default genReq;
