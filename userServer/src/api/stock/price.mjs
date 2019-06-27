import { requireAuth } from '../auth';
import * as Price from '../../models/Stock/Price';

async function updateItemPrice(ctx, next) {
  const data = ctx.request.body;
  const { itemId } = ctx.params;
  const item = await Price.changePrice({ itemId }, data);
  ctx.state.price = item;
  await next();
}

//output
async function outputItem(ctx) {
  ctx.body = ctx.state.price;
}

const api = router => {
  //price
  router.put(
    '/api/price/:itemId/',
    //requireAuth('update'),
    updateItemPrice,
    outputItem
  );
};

export default { api };
