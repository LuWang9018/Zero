import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import pass from 'pwd';

import users from './api/users';
import email from './api/email';

//import { DBconnection } from "./db/db";

const app = new Koa();
const router = new Router();

//

app.use(logger());

app.use(
  koaBody({
    multipart: true,
    formLimit: '500mb',
    jsonLimit: '500mb',
    formidable: {
      maxFileSize: 500 * 1024 * 1024,
    },
  })
);

users.api(router);
email.api(router);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
    ctx.stalus = 500;
  }
});
app.use(router.routes());

app.listen(5000);

console.log('Server running on port 5000');
