import pass from 'pwd';

export async function passwordVerify(user, password) {
  const salt = user.salt;
  const hashed = user.hash;
  const passwordMatch = await pass
    .hash(password, salt)
    .then(({ hash }) => hash === hashed);
  return passwordMatch;
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
