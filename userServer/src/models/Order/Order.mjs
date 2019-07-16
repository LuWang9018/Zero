import { DB } from '../../db/db';
import uuid from 'uuid';

//Order
export async function createOrder(userId, attr, options = {}) {
  attr.orderId = uuid();
  attr.createdBy = userId;

  try {
    await DB('order').insert(attr);

    return { status: 'ok', order: attr };
  } catch (e) {
    return {
      status: 'failed',
      msg: 'failed to create order' + e,
    };
  }
}

export async function listOrders(query, options = {}) {
  //console.log('list item query:', query);
  try {
    const data = await DB('order') //TODO: change that to orderFull
      .select('*')
      .where(query)
      .then(rows => {
        //console.log('rows', rows);
        return rows;
      });
    return data;
  } catch (e) {
    console.log('listOrder failed:', e);
  }
}

//Given get Order by id
export async function getOrder(query, options = {}) {
  try {
    const data = await DB('order') //TODO: change that to orderFull
      .select('*')
      .where(query)
      .first();
    return data;
  } catch (e) {
    console.log('getOrder failed:', e);
  }
}

export async function updateOrder(query, data, options = {}) {
  // console.log(data);
  try {
    let result = await DB('order')
      .where(query)
      .update(data)
      .then(result => {
        return { status: 'ok', msg: 'update success' };
      });

    return result;
  } catch (e) {
    return { status: 'failed', msg: 'failed to update order: ' + e };
  }
}

export async function deleteOrder(query, options = {}) {
  try {
    let result = await DB('order')
      .where(query)
      .del();

    return { status: 'ok', msg: 'delete success' };
  } catch (err) {
    return { status: 'failed', msg: 'failed to delete order ' + err };
  }
}

//Order Items
export async function createOrderItem(orderId, attr, options = {}) {
  attr.orderItemId = uuid();
  attr.orderId = orderId;

  try {
    await DB('orderItems').insert(attr);
    return { status: 'ok', order: attr };
  } catch (e) {
    return {
      status: 'failed',
      msg: 'failed to create order item' + e,
    };
  }
}

export async function listOrderItems(query, options = {}) {
  //console.log('list item query:', query);
  try {
    const data = await DB('orderItems') //TODO: change that to orderFull
      .select('*')
      .where(query)
      .then(rows => {
        //console.log('rows', rows);
        return rows;
      });
    return data;
  } catch (e) {
    console.log('listOrder failed:', e);
  }
}

//Given get Order by id
export async function getOrderItem(query, options = {}) {
  const data = await DB('orderItems')
    .select('*')
    .where(query)
    .first();
  return data;
}

export async function updateOrderItem(query, data, options = {}) {
  // console.log(data);
  try {
    let result = await DB('orderItems')
      .where(query)
      .update(data)
      .then(result => {
        return { status: 'ok', msg: 'update success' };
      });

    return result;
  } catch (e) {
    return { status: 'failed', msg: 'failed to update order item: ' + e };
  }
}

export async function deleteOrderItem(query, options = {}) {
  try {
    let result = await DB('orderItems')
      .where(query)
      .del();

    return { status: 'ok', msg: 'delete success' };
  } catch (err) {
    return { status: 'failed', msg: 'failed to delete order ' + err };
  }
}
