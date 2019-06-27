import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import passport from 'passport';
import './api/passport';
import session from 'koa-session';
import cors from 'koa-cors2';

//user
import users from './api/users/users';
import email from './api/users/email';

//stock
import stock from './api/stock/stock';

//price
import price from './api/stock/price';

//DB
// import { connection } from "./db/db";
// connection.connect(function(err) {
//   if (err) {
//     return console.error("error: " + err.message);
//   }

//   console.log("Connected to the MySQL server.");
// });

const app = new Koa();
const router = new Router();

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
app.use(cors({ credentials: true }));

app.keys = ['zero'];
const sessionConfig = {
  key: 'zero',
  maxAge: 604800000,
  signed: true,
};
app.use(passport.initialize());
app.use(passport.session());
app.use(session(sessionConfig, app));

//user
users.api(router);
email.api(router);
//stock
stock.api(router);
//price
price.api(router);

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
