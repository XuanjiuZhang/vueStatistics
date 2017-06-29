
const genReq = (appConfig) => {
  return {
    getAllChannel(sid) {
      const url = `${appConfig.h5Service}/channel/list?sid=${sid}`;
      return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
    }
  };
};

export default genReq;
