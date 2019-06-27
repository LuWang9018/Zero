import { requireAuth } from '../auth';
import * as Stock from '../../models/Stock/Stock';

//items
async function createItem(ctx, next) {
  const data = ctx.request.body;
  const { userId } = ctx.params;

  const result = await Stock.createItem(userId, data);
  if (result.status === 'ok') {
    ctx.state.stock = result.stock;
    await next();
  } else {
    ctx.status = 422;
    ctx.body = result;
  }
}

async function listItems(ctx, next) {
  const query = ctx.request.query;
  //console.log('=========', ctx.request);
  const stocks = await Stock.listItems(query);
  ctx.state.stock = stocks;
  await next();
}

async function getItems(ctx, next) {
  const { userId } = ctx.params;
  const stocks = await Stock.getItems({ ownerId: userId });
  ctx.state.stock = stocks;
  await next();
}

async function getItem(ctx, next) {
  const { itemId } = ctx.params;
  const stock = await Stock.getItem({ itemId: itemId });
  ctx.state.stock = stock;
  await next();
}

async function updateItem(ctx, next) {
  const data = ctx.request.body;
  const { itemId } = ctx.params;
  const stocks = await Stock.updateItem({ itemId }, data);
  ctx.state.stock = stocks;
  await next();
}

async function updateItemQuantity(ctx, next) {
  const data = ctx.request.body;
  const { itemId } = ctx.params;
  const stocks = await Stock.changeQuantity({ itemId }, data);
  ctx.state.stock = stocks;
  await next();
}

//price history

//output
async function outputItem(ctx) {
  ctx.body = ctx.state.stock;
}

const api = router => {
  //items
  router.post(
    '/api/stock/:userId',
    //requireAuth('write'),
    createItem,
    outputItem
  );
  router.get(
    '/api/stock',
    //requireAuth('read'),
    listItems,
    outputItem
  );
  router.get(
    '/api/stock/:userId',
    //requireAuth('read'),
    getItems,
    outputItem
  );
  router.put(
    '/api/stock/:itemId',
    //requireAuth('update'),
    updateItem,
    outputItem
  );
  router.put(
    '/api/stock/:itemId/quantity',
    //requireAuth('update'),
    updateItemQuantity,
    outputItem
  );
};

export default { api };
