import { DBconnection } from '../db/db';
import uuidv4 from 'uuid/v4';
import { passwordVerify, genHash } from './Utils';

export async function createUser(attrs, options = {}) {
  console.log('!--------------------------!');

  //1. check user name
  const checkUser = await listUsers({ name: attrs.name });
  console.log(
    '=>>>>>>>>>>>>>>>>>>>>>>',
    checkUser,
    '=========length',
    checkUser.length,
    'name',
    attrs.name
  );
  if (checkUser.length != 0) {
    return {
      result: 0,
      msg: 'user name already been taken',
    };
  }
  //2. check email
  const checkEmail = await listUsers({ email: attrs.email });
  if (checkEmail.length != 0) {
    return {
      result: 0,
      msg: 'email already used',
    };
  }

  let userId = uuidv4();
  let emailId = uuidv4();
  let user = await genHash({ password: attrs.password });

  let data = await new Promise((resolve, reject) => {
    DBconnection('user')
      .insert([
        {
          userId: userId,
          name: attrs.name,
          hash: user.hash,
          salt: user.salt,
          imagePath: attrs.imagePath,
        },
      ])
      .then(() => {
        DBconnection('email')
          .insert([
            {
              emailId: emailId,
              email: attrs.email,
              verified: 0,
              primary: 1,
              userID: userId,
            },
          ])
          .then(function(response) {
            return resolve({
              result: 1,
              msg: response,
            });
          })
          .catch(function(error) {
            console.log('error', error);
            //TODO: add error handling later
            return reject({
              result: 0,
              msg: 'insert email failed',
            });
          });
      })
      .catch(function(error) {
        console.log('error', error);
        //TODO: add error handling later
        return reject({
          result: 0,
          msg: 'insert user failed',
        });
      });
  });

  return data;
}

export async function findByCredential(username, password) {
  if (!username || !password) return null;
  console.log(`Validating ${username} and ${password}`);
  /**
   *  TODO: email login....
   */
  const result = await new Promise(async (resolve, reject) => {
    const user = await DBconnection('user')
      .select('*')
      .where({ name: username })
      .first();
    if (!user) return resolve(null);
    console.log(user);
    const passwordMatch = await passwordVerify(user, password);
    if (passwordMatch) return resolve(user);
    return resolve(null);
  });
  console.log(result);
  return result;
}

export async function listUsers(query, options = {}) {
  console.log('list user query:', query);
  let data = await new Promise((resolve, reject) => {
    DBconnection('userFull')
      .select('*')
      .where(query)
      .then(rows => {
        console.log('rows', rows);
        return resolve(rows);
      })
      .catch(function(error) {
        //console.log("error", error);
        //TODO: add error handling later
        return reject(error);
      });
  });
  return data;
}

export async function findUser(query, options = {}) {
  const data = await DBconnection('userFull')
    .select('*')
    .where(query)
    .first();
  return data;
}

export async function updateUser(query, data, options = {}) {
  if (data.password) {
    let user = await genHash({ password: data.password });
    data.hash = user.hash;
    data.salt = user.salt;
    delete data.password;
  }

  if (data.name) {
    delete data.name;
  }

  if (data.userId) {
    delete data.userId;
  }
  // console.log('query', query);
  // console.log('data', data);
  let result = await new Promise((resolve, reject) => {
    DBconnection('user')
      .where(query)
      .update(data)
      .then(result => {
        resolve(result);
      })
      .catch(function(error) {
        return reject(error);
      });
  });
}

export async function deleteUser(query, options = {}) {
  let data = await new Promise((resolve, reject) => {
    DBconnection('email')
      .where(query)
      .del()
      .then(rows => {
        //console.log(rows);
        DBconnection('user')
          .where(query)
          .del();
        return resolve({ result: 1, message: 'delete success' });
      })
      .catch(function(error) {
        //console.log("error", error);
        //TODO: add error handling later
        return reject(error);
      });
  });
}
