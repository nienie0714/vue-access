import Vue from 'vue';
import Vuex from 'vuex';
import { serialize, getLoc, setLoc, getSen, setSen } from '../utils';
import { xhr, api } from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
  state: {
    cacheData: getSen('cacheData') || {}
  },
  getters: {
    getCacheData: state => serialize(state.cacheData)
  },
  mutations: {
    setCacheData(state, data) {
      state.cacheData = { ...state.cacheData, ...data };
      setSen('cacheData', state.cacheData);
    }
  },
  actions: {
    ajax(state, data) {
      let name = data.name;
      let cacheData = state.state.cacheData;

      if (data instanceof Array) {
        return xhr(data);
      } else {
        return new Promise((resolve, reject) => {
          if (api[name].cache && cacheData[name]) {
            return resolve(serialize(cacheData[name]));
          }
          xhr(data)
            .then(res => {
              state.commit('setCacheData', {
                [name]: serialize(res)
              });
              resolve(res);
            })
            .catch(res => reject(res));
        });
      }
    }
  }
});
