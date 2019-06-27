/**
 *
 * @param {*} url
 * @param {*} method  //GET, POST, PUT, DELETE
 * @param {*} options //headers, type, body
 *
 */

function buildQuery(params) {
  return (
    '?' +
    Object.keys(params)
      .map(k => k + '=' + params[k])
      .join('&')
  );
}

export const callApi = async (url, method, options = {}) => {
  const fetchOptions = {
    method: method || 'GET',
    credentials: 'include',
  };
  if (options.headers) {
    fetchOptions.headers = options.headers;
  }
  if (options.body) {
    //console.log('body', options.body);
    fetchOptions.body = options.body;
  }
  if (options.query) {
    url += buildQuery(options.query);
  }

  const data = await fetch(url, fetchOptions).then(res => {
    if (res.status === 200) {
      if (options.type === 'blob') return res.blob();
      return res.json();
    }
    return null;
  });
  return data;
};
