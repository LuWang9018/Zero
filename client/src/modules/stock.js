import conf from '../config';
import { callApi } from './utils';

export const getMyStock = userId => {
  return async dispatch => {
    const result = await callApi(`${conf.apiRoot}/api/stock/` + userId, 'GET', {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return result;
  };
};
