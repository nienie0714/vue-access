let api = {
  getUser: { url: 'users', cache: true },
  postLoginForm: { url: 'login', cache: true }
};

for (var k in api) {
  let urlHost = window.htp.apihost;
  let url = api[k].url;

  if (process.env.NODE_ENV === 'development') {
    urlHost = '/api/';
  }
  api[k].url = urlHost + url;
}

export default api;
