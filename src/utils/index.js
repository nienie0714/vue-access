import store from '../store';

//set session
export function setSen(k, val) {
  if (typeof val == 'string') {
    sessionStorage.setItem(k, val);
    return val;
  }
  sessionStorage.setItem(k, JSON.stringify(val));
  return val;
}

//get session
export function getSen(k) {
  let val = sessionStorage.getItem(k);

  try {
    if (typeof JSON.parse(val) != 'number') {
      val = JSON.parse(val);
    }
  } catch (e) {}
  return val;
}

//set local
export function setLoc(k, val) {
  if (typeof val == 'string') {
    localStorage.setItem(k, val);
    return val;
  }
  localStorage.setItem(k, JSON.stringify(val));
  return val;
}

//get local
export function getLoc(k) {
  let val = localStorage.getItem(k);

  try {
    if (typeof JSON.parse(val) != 'number') {
      val = JSON.parse(val);
    }
  } catch (e) {}
  return val;
}

//clear session
export function clearSessionKey(k) {
  if (k) {
    sessionStorage.removeItem(k);
  } else {
    sessionStorage.clear();
  }
}

//clear local
export function clearLocalKey(k) {
  if (k) {
    localStorage.removeItem(k);
  } else {
    localStorage.clear();
  }
}

//获取屏幕宽度高度
export function getClient() {
  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;

  return {
    clientWidth,
    clientHeight
  };
}

export function serialize(data) {
  if (data != null && data != '') {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      if (data instanceof Array) {
        return [];
      }
      return {};
    }
  }
  return data;
}

Array.prototype.max = function(prop) {
  let result;
  if (!this.length) {
    return null;
  }

  if (prop.length) {
    result = this[0];
    this.forEach(item => {
      if (item[prop] > result[prop]) {
        result = item;
      }
    });
  } else {
    result = this[0];
    this.forEach(item => {
      if (item > result) {
        result = item;
      }
    });
  }
  return result;
};

Array.prototype.min = function(prop) {
  let result;
  if (!this.length) {
    return null;
  }

  if (prop.length) {
    result = this[0];
    this.forEach(item => {
      if (item[prop] < result[prop]) {
        result = item;
      }
    });
  } else {
    result = this[0];
    this.forEach(item => {
      if (item < result) {
        result = item;
      }
    });
  }
  return result;
};

//重写findIndex(某些手机不支持findIndex)
Array.prototype.findIndex = function(func) {
  let result = -1;

  this.forEach((item, index) => {
    var flag = func(item);

    if (flag) {
      result = index;
    }
  });
  return result;
};

//验证字符串是不是正整数
export function validateNum(str) {
  var reg = new RegExp(/^[1-9]*[1-9][0-9]*$/);
  if (!reg.test(str)) {
    return false;
  }
  return true;
}

//验证字符串是不是整数
export function validateInteger(str) {
  var reg = new RegExp(/^-?\\d+$/);
  if (!reg.test(str)) {
    return false;
  }
  return true;
}

//判断当前运行的浏览器环境
export function browser() {
  let os = {};
  let ua = window.navigator.userAgent.toLowerCase();

  os.isAndroid = /android/.test(ua); //browser,wechat,android
  os.isIOS = /iphone|ipad|ipod/.test(ua); //browser,wechat,ios
  os.isBrowser = /macintel|win32/.test(navigator.platform.toLowerCase()); //browser
  os.isWeixin = ua.indexOf('micromessenger') != -1; //wechat
  os.isAlipay = ua.indexOf('alipayclient') != -1; //ali
  os.isApp = function() {
    return (this.isAndroid || this.isIOS) && !this.isWeixin && !this.isBrowser && !this.isAlipay;
  };

  return os;
}

export function dataURLtoFile(dataurl, filename) {
  //将base64转换为文件
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
