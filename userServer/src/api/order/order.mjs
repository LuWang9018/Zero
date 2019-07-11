//import { requireAuth, logout, authenticateorder } from '../auth';
import * as Order from '../../models/Order/Order';

//Order
async function createOrder(ctx, next) {
  const data = ctx.request.body;
  const { userId } = ctx.params;

  const result = await Order.createOrder(userId, data);
  if (result.status === 'ok') {
    ctx.state.order = result.order;
    await next();
  } else {
    ctx.status = 422;
    ctx.body = result;
  }
}

async function getOrder(ctx, next) {
  const { orderId } = ctx.params;
  const order = await Order.getOrder({ orderId });
  ctx.state.order = order;
  await next();
}

async function listOrders(ctx, next) {
  const query = ctx.request.query;
  const orders = await Order.listOrders(query);
  ctx.state.order = orders;
  await next();
}

async function updateOrder(ctx, next) {
  const data = ctx.request.body;
  const { orderId } = ctx.params;
  const order = await Order.updateOrder({ orderId }, data);
  ctx.state.order = order;
  await next();
}

async function deleteOrder(ctx, next) {
  const { orderId } = ctx.params;
  const order = Order.deleteOrder({ orderId });
  ctx.state.order = order;
  await next();
}

//orderItems
async function createOrderItem(ctx, next) {
  const data = ctx.request.body;
  const { orderId } = ctx.params;

  const result = await Order.createOrderItem(orderId, data);
  if (result.status === 'ok') {
    ctx.state.order = result.order;
    await next();
  } else {
    ctx.status = 422;
    ctx.body = result;
  }
}

// async function getOrderItem(ctx, next) {
//   const { orderItemId } = ctx.params;
//   const order = await Order.getOrderItem({ orderItemId });
//   ctx.state.order = order;
//   await next();
// }

async function listOrderItems(ctx, next) {
  const query = ctx.request.query;
  const order = await Order.listOrdersItems(query);
  ctx.state.order = order;
  await next();
}

async function updateOrderItem(ctx, next) {
  const data = ctx.request.body;
  const { orderItemId } = ctx.params;
  const order = await Order.updateOrderItem({ orderItemId }, data);
  ctx.state.order = order;
  await next();
}

async function deleteOrderItem(ctx, next) {
  const { orderItemId } = ctx.params;
  const order = Order.deleteOrderItem({ orderItemId });
  ctx.state.order = order;
  await next();
}

//result
async function outputOrder(ctx) {
  if (ctx.state.order) {
    ctx.body = ctx.state.order;
  } else {
    ctx.status = 404;
  }
}

const api = router => {
  //orders
  router.post('/api/orders/:userId', createOrder, outputOrder);
  router.get(
    '/api/orders/:orderId',
    //requireAuth('read'),
    getOrder,
    outputOrder
  );
  router.get(
    '/api/orders',
    //requireAuth('read'),
    listOrders,
    outputOrder
  );
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

  //order items
  router.post(
    '/api/orders/:orderId/items',
    //requireAuth('read'),
    createOrderItem,
    outputOrder
  );
  router.get(
    '/api/orders/:orderId/items',
    //requireAuth('read'),
    listOrderItems,
    outputOrder
  );
  router.put(
    '/api/orders/:orderItemId',
    //requireAuth('update'),
    updateOrderItem,
    outputOrder
  );
  router.del(
    '/api/orders/:orderItemId',
    //requireAuth('delete'),
    deleteOrderItem,
    outputOrder
  );
};

export default { api };
