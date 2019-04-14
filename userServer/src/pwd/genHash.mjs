import pass from 'pwd';

export function genHash(user) {
  pass.hash(user.password, function(err, salt, hash) {
    user.salt = salt;
    user.hash = hash;
  });

  return user;
}
