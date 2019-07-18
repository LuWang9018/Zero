import conf from '../config';
import { callApi } from './utils';

export const addShoppingCartItem = async (userId, query) => {
  console.log('addShoppingCartItem', userId, query);
  console.log(JSON.stringify(query));
  const result = await callApi(
    `${conf.apiRoot}/api/shoppingCart/${userId}`,
    'POST',
    {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(query),
    }
  );
  console.log('result', result);
  return result;
};

export const getMyShoppingCartItems = async userId => {
  const result = await callApi(
    `${conf.apiRoot}/api/shoppingCart/?userId=${userId}`,
    'GET',
    {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }
  );
  return result;
};

export const removeShoppingCartItem = async shoppingCartItemId => {
  const result = await callApi(
    `${conf.apiRoot}/api/shoppingCart/${shoppingCartItemId}`,
    'DELETE',
    {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }
  );
  return result;
};
// export const getMyStock = async query => {
//   const result = await callApi(`${conf.apiRoot}/api/shoppingCart/`, 'GET', {
//     headers: new Headers({
//       'Content-Type': 'application/json',
//     }),

//     query: query,
//   });
//   return result;
// };
