import axios from 'axios';
import { Loading } from 'element-ui';
import { serialize } from './utils';

let loading;
let timer = null;
let loadingInstance;

////添加请求拦截器
axios.interceptors.request.use(
  config => {
    loading = true;
    return config;
  },
  error => {
    loading = false;
    return Promise.reject(error);
  }
);

//添加响应拦截
axios.interceptors.response.use(
  response => {
    loading = false;
    if (loadingInstance) {
      loadingInstance.close;
    }
    return response;
  },
  error => {
    Loading = false;
    if (loadingInstance) {
      loadingInstance.close;
    }
    return Promise.resolve(error.response);
  }
);

export default {
  get(url, data) {
    if (loading) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        loadingInstance = Loading.service(options);
      }, 2000);
    }

    return axios({
      method: 'get',
      baseURL: process.env.NODE_ENV === 'development' ? '' : window.apihost,
      url: url,
      params: data,
      timeout: 10000
    })
      .then(response => {
        return checkStatus(response);
      })
      .then(res => {
        return checkCode(res);
      });
  }
};
