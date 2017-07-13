
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
    getFunnelData(sid) {
      const url = `${appConfig.h5Service}/statistics/${sid}/marketingfunnel`;
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

    getVisitTree (sid) {
      const url = `${appConfig.h5Service}/statistics/${sid}/channels`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    },

    getLineTendency (sid, data) {
      var param = queryString.stringify(data);
      const url = `${appConfig.h5Service}/statistics/${sid}/tendency?${param}`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    },

    getDeviceData (sid) {
      const url = `${appConfig.h5Service}/statistics/${sid}/device`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    },

    getMobileModels (sid) {
      const url = `${appConfig.h5Service}/statistics/${sid}/mobilemodels`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    },

    getMobileSystem (sid) {
      const url = `${appConfig.h5Service}/statistics/${sid}/os`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    },

    getCountryVisit (sid, data) {
      var param = queryString.stringify(data);
      const url = `${appConfig.h5Service}/statistics/${sid}/address?${param}`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    },

    getProvinceVisit (sid, data) {
      var param = queryString.stringify(data);
      const url = `${appConfig.h5Service}/statistics/${sid}/address/province?${param}`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    },

    getMapData (data) {
      var param = queryString.stringify(data);
      const url = `${appConfig.h5Service}/map?${param}`;
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
