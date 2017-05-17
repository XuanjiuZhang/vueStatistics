import 'whatwg-fetch';
import URLSearchParams from 'url-search-params';
global.URLSearchParams = URLSearchParams;
import appConfig from './appconfig';
import queryString from 'query-string';

const api = {
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

export default api;
