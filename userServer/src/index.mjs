import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import users from './api/users';

const app = new Koa();
const router = new Router();

app.use(logger());
users.api(router);
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
    ctx.stalus = 500;
  }
});
app.use(router.routes());
app.use(router.allowedMethods());
app.use(ctx => {
  ctx.status = 200;
});

app.listen(3000);

console.log('Server running on port 3000');
