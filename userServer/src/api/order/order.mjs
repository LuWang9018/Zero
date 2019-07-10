import { requireAuth, logout, authenticateorder } from '../auth';
import * as order from '../../models/order/order';

async function createorder(ctx, next) {
  const data = ctx.request.body;
  const result = await order.createorder(data);
  if (result.status === 'ok') {
    ctx.state.order = result.order;
    await ctx.logIn(result.order);
    await next();
  } else {
    ctx.status = 422;
    ctx.body = result;
  }
}

async function getorder(ctx, next) {
  const { orderId } = ctx.params;
  const order = await order.findorder({ orderId });
  ctx.state.order = order;
  await next();
}

async function listorders(ctx, next) {
  const query = ctx.request.query;
  const orders = await order.listorders(query);
  ctx.state.order = orders;
  await next();
}

async function updateOrder(ctx, next) {
  const data = ctx.request.body;
  const { orderId } = ctx.params;
  const order = await order.updateorder({ orderId }, data);
  ctx.state.order = order;
  await next();
}

async function deleteOrder(ctx, next) {
  const { orderId } = ctx.params;
  const order = order.deleteorder({ orderId });
  ctx.state.order = order;
  await next();
}

async function outputOrder(ctx) {
  if (ctx.state.order) {
    ctx.body = ctx.state.order;
  } else {
    ctx.status = 404;
  }
}

const api = router => {
  router.post('/api/orders', createOrder, outputOrder);
  router.get(
    '/api/orders/:orderId',
    //requireAuth('read'),
    getOrder,
    outputOrder
  );
  router.get('/api/orders', requireAuth('read'), listOrders, outputOrder);
  router.put(
    '/api/orders/:orderId',
    //requireAuth('update'),
    updateOrder,
    outputOrder
  );
  router.del(
    '/api/orders/:orderId',
    //requireAuth('delete'),
    deleteOrder,
    outputOrder
  );
};

export default { api };
