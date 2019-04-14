import pass from 'pwd';

export function auth(user) {
  pass.hash(user.password, user.salt, function(err, hash) {
    if (user.hash == hash) {
      return true;
    }
  });

  return false;
}

export async function genHash(user) {
  await new Promise(resolve => {
    pass.hash(user.password, function(err, salt, hash) {
      user.salt = salt;
      user.hash = hash;
      resolve();
    });
  });
  console.log('user', user);
  return user;
}
