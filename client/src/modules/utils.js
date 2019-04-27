/**
 *
 * @param {*} url
 * @param {*} method  //GET, POST, PUT, DELETE
 * @param {*} options //headers, type, body
 *
 */

export const callApi = async (url, method, options = {}) => {
  const fetchOptions = {
    method: method || 'GET',
    credentials: 'include',
  };
  if (options.headers) {
    fetchOptions.headers = options.headers;
  }
  if (options.body) {
    fetchOptions.body = options.body;
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
