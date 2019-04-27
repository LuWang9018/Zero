import { requireAuth } from './auth';
import * as Email from '../models/Email';

//email
async function updateEmail(ctx, next) {
  const data = ctx.request.body;
  const { userId } = ctx.params;
  const email = await Email.updateEmail({ userId }, data);
  ctx.state.email = email;
  await next();
}

async function outputEmail(ctx) {
  ctx.body = ctx.state.email;
}

const api = router => {
  router.put(
    '/api/users/:userId/email',
    requireAuth('update'),
    updateEmail,
    outputEmail
  );
};

export default { api };
