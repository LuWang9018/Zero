import { requireAuth } from '../auth';
import * as Stock from '../../models/Stock/Stock';

async function listItens(ctx, next) {
  const data = ctx.request.body;
  const { userId } = ctx.params;
  const stock = await Stock.listItems({ userId }, data);
  ctx.state.stock = stock;
  await next();
}

async function outputStock(ctx) {
  ctx.body = ctx.state.stock;
}

const api = router => {
  router.get(
    '/api/stock/:userId/',
    requireAuth('read'),
    listItems,
    outputStock
  );
};

export default { api };
