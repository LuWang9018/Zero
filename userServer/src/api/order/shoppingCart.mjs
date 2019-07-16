//import { requireAuth, logout, authenticateorder } from '../auth';
import * as ShoppingCart from '../../models/order/ShoppingCart';
import { stringify } from 'querystring';

//ShoppingCart
async function createShoppingCartItem(ctx, next) {
  const data = ctx.request.body;
  const { userId } = ctx.params;

  const result = await ShoppingCart.createShoppingCartItem(userId, data);
  if (result.status === 'ok') {
    ctx.state.result = result.shoppingCart;
    await next();
  } else {
    ctx.status = 422;
    ctx.body = result;
  }
}

async function getShoppingCartItem(ctx, next) {
  //console.log('getShoppingCartItem', JSON.stringify(query));

  const { shoppingCartItemId } = ctx.params;
  const result = await ShoppingCart.getShoppingCartItem({ shoppingCartItemId });
  ctx.state.result = result;
  await next();
}

async function listShoppingCartItems(ctx, next) {
  const query = ctx.request.query;
  //console.log('listShoppingCartItems', JSON.stringify(query));
  const result = await ShoppingCart.listShoppingCartItems(query);
  ctx.state.result = result;
  await next();
}

async function updateShoppingCartItem(ctx, next) {
  const data = ctx.request.body;
  const { shoppingCartItemId } = ctx.params;
  const result = await ShoppingCart.updateShoppingCartItem(
    { shoppingCartItemId },
    data
  );
  ctx.state.result = result;
  await next();
}

async function deleteShoppingCartItem(ctx, next) {
  const { shoppingCartItemId } = ctx.params;
  const result = ShoppingCart.deleteShoppingCartItem({ shoppingCartItemId });
  ctx.state.result = result;
  await next();
}

//result
async function outputshoppingCart(ctx) {
  if (ctx.state.result) {
    ctx.body = ctx.state.result;
  } else {
    ctx.status = 404;
  }
}

const api = router => {
  //shopping cart items
  router.post(
    '/api/shoppingCart/:userId',
    //requireAuth('read'),
    createShoppingCartItem,
    outputshoppingCart
  );
  router.get(
    '/api/shoppingCart/:shoppingCartItemId',
    //requireAuth('read'),
    getShoppingCartItem,
    outputshoppingCart
  );
  router.get(
    '/api/shoppingCart',
    //requireAuth('read'),
    listShoppingCartItems,
    outputshoppingCart
  );
  router.put(
    '/api/shoppingCart/:shoppingCartItemId',
    //requireAuth('update'),
    updateShoppingCartItem,
    outputshoppingCart
  );
  router.del(
    '/api/shoppingCart/:shoppingCartItemId',
    //requireAuth('delete'),
    deleteShoppingCartItem,
    outputshoppingCart
  );
};

export default { api };
