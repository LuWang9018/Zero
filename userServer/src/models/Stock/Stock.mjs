import { DB } from '../../db/db';
import uuid from 'uuid';

import { listUsers } from '../User/User';

export async function createItem(userId, attrs, options = {}) {
  const checkUser = await listUsers({ userId: userId });
  if (checkUser.length === 0) {
    return {
      result: 0,
      msg: 'User does not exist',
    };
  }

  let today = Date.now();
  let itemAttr = Object.assign({}, attrs);
  itemAttr.itemId = uuid();
  itemAttr.ownerId = userId;
  //console.log('attrs', itemAttr);
  try {
    try {
      await DB('stock').insert(itemAttr);
    } catch (err) {
      console.log('ERROR:', err);
    }

    // if (itemAttr.itemCurrentPrice) {
    //   await changePrice(itemAttr.itemId, itemAttr.itemCurrentPrice);
    // }
    await changeQuantity(itemAttr.itemId, {
      changeId: uuid(),
      itemId: itemAttr.itemId,
      quantityChange: 0,
      quantityAfterChange: 0,
      quantityChangeTime: today,
      itemPrice: itemAttr.itemCurrentPrice ? itemAttr.itemCurrentPrice : 0,
      type: 'init',
      editedBy: userId,
    });

    return { status: 'ok', stock: itemAttr };
  } catch (e) {
    return { status: 'failed', msg: 'failed to create new item' + e };
  }
}

export async function listItems(query, options = {}) {
  //console.log('list item query:', query);
  try {
    const data = await DB('stock') //TODO: change that to stockFull
      .select('*')
      .where(query)
      .then(rows => {
        //console.log('rows', rows);
        return rows;
      });
    return data;
  } catch (e) {
    console.log('listUsers failed:', e);
  }
}

//Given user id get his items
export async function getItems(query, options = {}) {
  const data = await DB('stock') //TODO: change that to stockFull
    .select('*')
    .where(query);
  return data;
}

export async function updateItem(query, data, options = {}) {
  //console.log('update item called', query, data);
  if (data.itemId) {
    delete data.itemId;
  }
  if (data.ownerId) {
    delete data.ownerId;
  }

  // console.log('query', query);

  // console.log(data);
  try {
    let result = await DB('stock')
      .where(query)
      .update(data)
      .then(result => {
        return { status: 'ok', msg: 'update success' };
      });

    return result;
  } catch (e) {
    return { status: 'failed', msg: 'failed to update stock: ' + e };
  }
}

export async function changePrice(itemId, price) {
  const time = Date.now();

  const priceRecord = {
    historyId: uuid(),
    itemId: itemId,
    itemPrice: price,
    itemPriceChangeTime: time,
  };
  try {
    await DB('itempricehistory').insert(priceRecord);
  } catch (e) {
    return { status: 'failed', msg: 'failed to create price history ' + e };
  }
}

export async function changeQuantity(itemId, attr) {
  //console.log('stockChangeHistory attr', attr);
  attr.changeId = uuid();
  try {
    await updateItem(itemId, { itemStock: attr.quantityAfterChange });
    await DB('stockChangeHistory').insert(attr);
  } catch (e) {
    return {
      status: 'failed',
      msg: 'failed to create quantity change history ' + e,
    };
  }
}
