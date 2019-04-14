import pass from 'pwd';

export function auth(user) {
  pass.hash(user.password, user.salt, function(err, hash) {
    if (user.hash == hash) {
      return true;
    }
  });

  return false;
}

export function genHash(user) {
  pass.hash(user.password, function(err, salt, hash) {
    user.salt = salt;
    user.hash = hash;
  });

  return user;
}
