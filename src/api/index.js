import axios from 'axios';
import { Loading, Message } from 'element-ui';
import store from '../store';
import api from './api';

let loading;
let timer = null;
let loadingInstance;

axios.defaults.timeout = 5000;

////添加请求拦截器
axios.interceptors.request.use(
  config => {
    loading = true;
    return config;
  },
  error => {
    loading = false;
    loadingInstance.close;
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
    loading = false;
    if (loadingInstance) {
      loadingInstance.close;
    }
    return Promise.resolve(error.response);
  }
);

// 检查接口请求状态
function checkStatus(resolve, reject, response) {
  if (response && response.status === 200) {
    if (response.data.errorCode === 1) {
      resolve(response.data.data);
    } else {
      Message(response.errorMsg);
      reject(response.errorMsg);
    }
  } else {
    Message(response.errorMsg);
    reject(response.errorMsg);
  }
}

let xhr = config => {
  //加载动画
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (loading) {
      loadingInstance = Loading.service();
    }
  }, 2000);

  if (config instanceof Array) {
    return axios.all(config);
  } else {
    let method = config.method || 'post';
    let name = config.name;
    let data = config.data || {};

    switch (method) {
      case 'get':
        return new Promise((resolve, reject) => {
          axios
            .get(api[name].url, {
              params: data,
              headers: {}
            })
            .then(res => {
              checkStatus(resolve, reject, res);
            })
            .catch(res => {
              reject(res);
            });
        });
      case 'post':
        return new Promise((resolve, reject) => {
          axios
            .post(api[name].url, JSON.stringify(data), {
              headers: {
                'Content-Type': 'application/json; charset=UTF-8'
              }
            })
            .then(res => {
              checkStatus(resolve, reject, res);
            })
            .catch(res => {
              reject(res);
            });
        });
      default:
    }
  }
};

export { xhr, api };
