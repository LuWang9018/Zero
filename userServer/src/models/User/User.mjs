import { DB } from '../../db/db';
import uuidv4 from 'uuid/v4';
import { passwordVerify, genHash } from '../Utils';

export async function createUser(attrs, options = {}) {
  const checkEmail = await listUsers({ email: attrs.email });
  if (checkEmail.length != 0) {
    return {
      result: 0,
      msg: 'email already used',
    };
  }
  const { salt, hash } = await genHash({ password: attrs.password });
  const userAttr = {
    username: attrs.username,
    imagePath: attrs.imagePath,
    hash,
    salt,
  };
  if (!userAttr.userId) userAttr.userId = uuidv4();
  try {
    await DB('user').insert(userAttr);
    await DB('email').insert({
      emailId: uuidv4(),
      email: attrs.email,
      verified: 0,
      primary: 1,
      userID: userAttr.userId,
    });
    delete userAttr.salt;
    delete userAttr.hash;
    return { status: 'ok', user: userAttr };
  } catch (e) {
    return { status: 'failed', msg: 'failed to create new user ' };
  }
}

export async function findByCredential(username, password) {
  if (!username || !password) return null;
  console.log(`Validating ${username} and ${password}`);
  /**
   *  TODO: email login....
   */
  const result = await new Promise(async (resolve, reject) => {
    const user = await DB('userFull')
      .select('*')
      .where({ username })
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
  try {
    const data = await DB('userFull')
      .select('*')
      .where(query)
      .then(rows => {
        console.log('rows', rows);
        return rows;
      });
    return data;
  } catch (e) {
    console.log('listUsers failed:', e);
  }
}

export async function findUser(query, options = {}) {
  const data = await DB('userFull')
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

  try {
    let result = await DB('user')
      .where(query)
      .update(data)
      .then(result => {
        return { status: 'ok', msg: 'update success' };
      });
    return result;
  } catch (e) {
    return { status: 'failed', msg: 'failed to update user ' };
  }
}

export async function deleteUser(query, options = {}) {
  try {
    let result = await DB('email')
      .where(query)
      .del()
      .then(rows => {
        //console.log(rows);
        DB('user')
          .where(query)
          .del();
        return { status: 'ok', msg: 'delete success' };
      });
    return result;
  } catch (e) {
    return { status: 'failed', msg: 'failed to delete user' };
  }
}
