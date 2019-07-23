import { DB } from '../../db/db';
import uuid from 'uuid';

//shoppingCart
export async function createShoppingCartItem(userId, attr, options = {}) {
  attr.shoppingCartItemId = uuid();
  attr.userId = userId;

  try {
    await DB('shoppingCart').insert(attr);

    return { status: 'ok', shoppingCart: attr };
  } catch (e) {
    return {
      status: 'failed',
      msg: 'failed to create shoppingCartItem' + e,
    };
  }
}

export async function listShoppingCartItems(query, options = {}) {
  //console.log('list item query:', query);
  try {
    const data = await DB('shoppingCart')
      .select(
        'stock.*',
        'shoppingCart.shoppingCartItemId',
        'shoppingCart.itemQuantity'
      )
      .where(query)
      .join('stock', 'stock.itemId', '=', 'shoppingCart.itemId')
      .then(rows => {
        //console.log('rows', rows);
        return rows;
      });
    return data;
  } catch (e) {
    console.log('shopping cart items failed:', e);
  }
}

//Given get shoppingCart item by id
export async function getShoppingCartItem(query, options = {}) {
  try {
    const data = await DB('shoppingCart')
      .select('*')
      .where(query)
      .first();
    return data;
  } catch (e) {
    console.log('getShoppingCartItem failed:', e);
  }
}

export async function updateShoppingCartItem(query, data, options = {}) {
  // console.log(data);
  try {
    let result = await DB('shoppingCart')
      .where(query)
      .update(data)
      .then(result => {
        return { status: 'ok', msg: 'update success' };
      });

    return result;
  } catch (e) {
    return { status: 'failed', msg: 'failed to update ShoppingCartItem: ' + e };
  }
}

export async function deleteShoppingCartItem(query, options = {}) {
  //console.log('=========', query);
  try {
    let result = await DB('shoppingCart')
      .where(query)
      .del();

    return { status: 'ok', msg: 'delete success' };
  } catch (err) {
    return {
      status: 'failed',
      msg: 'failed to delete ShoppingCartItem ' + err,
    };
  }
}
