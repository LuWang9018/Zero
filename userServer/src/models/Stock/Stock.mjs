import { stockDB } from '../../db/db';

export async function createItem(attrs, options = {}) {
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
    await userDB('user').insert(userAttr);
    await userDB('email').insert({
      emailId: uuidv4(),
      email: attrs.email,
      verified: 0,
      primary: 1,
      userID: userAttr.userId,
    });
    return { status: 'ok', user: userAttr };
  } catch (e) {
    return { status: 'failed', msg: 'failed to create new user ' };
  }
}

// export async function updateEmail(query, data, options = {}) {
//   if (data.name) {
//     delete data.name;
//   }

//   if (data.userId) {
//     delete data.userId;
//   }

//   let result = await new Promise((resolve, reject) => {
//     userDB('email')
//       .where(query)
//       .update(data)
//       .then(response => {
//         return resolve({
//           result: 1,
//           msg: response,
//         });
//       })
//       .catch(function(error) {
//         return resolve({
//           result: 0,
//           msg: 'insert email failed: ' + error,
//         });
//       });
//   });

//   return result;
// }
