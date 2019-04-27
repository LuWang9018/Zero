import { DBconnection } from '../db/db';

export async function updateEmail(query, data, options = {}) {
  if (data.name) {
    delete data.name;
  }

  if (data.userId) {
    delete data.userId;
  }

  // console.log('query', query);
  // console.log('data', data);
  let result = await new Promise((resolve, reject) => {
    DBconnection('email')
      .where(query)
      .update(data)
      .then(response => {
        return resolve({
          result: 1,
          msg: response,
        });
      })
      .catch(function(error) {
        return resolve({
          result: 0,
          msg: 'insert email failed: ' + error,
        });
      });
  });

  return result;
}
