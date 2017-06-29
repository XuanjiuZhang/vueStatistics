import 'whatwg-fetch';
import URLSearchParams from 'url-search-params';
global.URLSearchParams = URLSearchParams;
import queryString from 'query-string';
global.queryString = queryString;
import appConfig from './appconfig';
import genEffectsReq from './effects'
import genChannelReq from './channel'

const api = {
  effects: genEffectsReq(appConfig),
  channel: genChannelReq(appConfig)
};

export default api;
