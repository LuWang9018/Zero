import { requireAuth, logout, authenticateUser } from './auth';
import * as User from '../models/User';

async function getUser(ctx, next) {
  const { userId } = ctx.params;
  const user = await User.findUser({ userId });
  ctx.state.user = user;
  await next();
}

async function createUser(ctx, next) {
  const data = ctx.request.body;
  const result = await User.createUser(data);
  if (result.status === 'ok') {
    ctx.state.user = result.user;
    await ctx.logIn(result.user);
    await next();
  } else {
    ctx.status = 422;
    ctx.body = result;
  }
}

async function listUsers(ctx, next) {
  const query = ctx.request.query;
  const users = await User.listUsers(query);
  ctx.state.user = users;
  await next();
}

async function updateUser(ctx, next) {
  const data = ctx.request.body;
  const { userId } = ctx.params;
  const user = await User.updateUser({ userId }, data);
  ctx.state.user = user;
  await next();
}

async function deleteUser(ctx, next) {
  const { userId } = ctx.params;
  const user = User.deleteUser({ userId });
  ctx.state.user = user;
  await next();
}

async function outputUser(ctx) {
  if (ctx.state.user) {
    ctx.body = ctx.state.user;
  } else {
    ctx.status = 404;
  }
}

const api = router => {
  router.get('/api/users/:userId', requireAuth('read'), getUser, outputUser);
  router.get('/api/users', requireAuth('read'), listUsers, outputUser);
  router.post('/api/users', createUser, outputUser);
  router.put(
    '/api/users/:userId',
    requireAuth('update'),
    updateUser,
    outputUser
  );
  router.del(
    '/api/users/:userId',
    requireAuth('delete'),
    deleteUser,
    outputUser
  );
  router.get('/api/session', requireAuth('read'), outputUser);
  router.post('/api/session', authenticateUser);
  router.del('/api/session', logout);
};

export default { api };
