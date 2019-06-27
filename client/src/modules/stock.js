import conf from '../config';
import { callApi } from './utils';

export const getMyStocks = async userId => {
  const result = await callApi(`${conf.apiRoot}/api/stock/` + userId, 'GET', {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
  return result;
};

export const getMyStock = async query => {
  const result = await callApi(`${conf.apiRoot}/api/stock/`, 'GET', {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),

    query: query,
  });
  return result;
};

export const addStock = async (userId, query) => {
  const result = await callApi(`${conf.apiRoot}/api/stock/${userId}`, 'POST', {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(query),
  });
  console.log('result', result);
  return result;
};

export const updateStock = async (itemId, query) => {
  //console.log('update stock query', query);
  const result = await callApi(`${conf.apiRoot}/api/stock/${itemId}`, 'PUT', {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(query),
  });
  //console.log('result', result);
  return result;
};

export const updateStockQuantity = async (itemId, query) => {
  //console.log('update stock Quantity query', query);
  const result = await callApi(
    `${conf.apiRoot}/api/stock/${itemId}/quantity`,
    'PUT',
    {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(query),
    }
  );
  //console.log('result', result);
  return result;
};

// export const authenticate = (username, password) => {
//   return async dispatch => {
//     const result = await callApi(`${conf.apiRoot}/api/session`, 'POST', {
//       headers: new Headers({
//         'Content-Type': 'application/json',
//       }),
//       body: JSON.stringify({ username, password }),
//     });
//     if (result) dispatch(setUser(result));
//     return result;
//   };
// };
