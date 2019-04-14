import pass from 'pwd';

export function auth(user) {
  pass.hash(user.password, user.salt, function(err, hash) {
    if (user.hash == hash) {
      return true;
    }
  });

  return false;
}
