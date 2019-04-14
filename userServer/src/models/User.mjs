import { DBconnection } from '../db/db';
import uuidv4 from 'uuid/v4';
import { auth, genHash } from './Utils';
import util from 'util';
export async function createUser(attrs, options = {}) {
  console.log(attrs, 'attrs');
  let userId = uuidv4();
  let user = await genHash({ password: attrs.password });

  let query = util.format(
    "CALL createUser('%s', '%s', '%s', '%s', '%s')",
    userId.toString(),
    attrs.name,
    user.hash,
    user.salt,
    attrs.imagePath
  );
  console.log(query);
  DBconnection.query(query, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });
}

export async function listUsers(query, options = {}) {}

export async function findUser(query, options = {}) {}

export async function updateUser(query, update, options = {}) {}

export async function deleteUser(query, options = {}) {}
