import * as User from '../models/User/User';
import passport from 'koa-passport';
import { default as LocalStrategy } from 'passport-local';

async function validataUser(ctx, username, password, done) {
  const user = await User.findByCredential(username, password);
  if (!user) {
    console.log(`User ${username} unauthorized`);
    return done(new Error('Unauthorized'));
  }
  return done(null, user);
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    const loginUser = await User.findUser({ username: user.username });
    done(null, loginUser);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    validataUser
  )
);
