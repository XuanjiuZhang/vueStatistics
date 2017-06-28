import 'whatwg-fetch';
import URLSearchParams from 'url-search-params';
global.URLSearchParams = URLSearchParams;
import appConfig from './appconfig';
import queryString from 'query-string';
import genEffectsReq from './effects'

const api = {
  effects: genEffectsReq(appConfig)
};

export default api;
