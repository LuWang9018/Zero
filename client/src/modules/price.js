import conf from '../config';
import { callApi } from './utils';

export const updatePrice = async (itemId, query) => {
  //console.log('update stock Quantity query', query);
  console.log('===========', itemId);
  const result = await callApi(`${conf.apiRoot}/api/price/${itemId}`, 'PUT', {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(query),
  });
  //console.log('result', result);
  return result;
};
