import { DB } from '../../db/db';
import uuidv4 from 'uuid/v4';

import { listUsers } from '../User/User';

export async function createItem(userId, attrs, options = {}) {
  const checkUser = await listUsers({ userId: userId });
  if (checkUser.length == 0) {
    return {
      result: 0,
      msg: 'User does not exist',
    };
  }

  let itemAttr = Object.assign({}, attrs);
  itemAttr.itemId = uuidv4();
  itemAttr.ownerId = userId;

  try {
    await DB('stock').insert(itemAttr);

    if (itemAttr.itemCurrentPrice) {
      await changePrice(itemAttr.itemId, itemAttr.itemCurrentPrice);
    }

    if (itemAttr.itemStock) {
      await changeQuantity(
        itemAttr.itemId,
        itemAttr.itemStock,
        itemAttr.itemCurrentPrice,
        { type: 'init' }
      );
    }

    return { status: 'ok', stock: itemAttr };
  } catch (e) {
    return { status: 'failed', msg: 'failed to create new item' + e };
  }
}

export async function listItems(query, options = {}) {
  console.log('list item query:', query);
  try {
    const data = await DB('stock') //TODO: change that to stockFull
      .select('*')
      .where(query)
      .then(rows => {
        console.log('rows', rows);
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

export async function updateStock(query, data, options = {}) {
  if (data.itemId) {
    delete data.itemId;
  }
  if (data.ownerId) {
    delete data.ownerId;
  }

  console.log('query', query);

  console.log(data);
  try {
    if (data.itemCurrentPrice) {
      console.log('query.itemId', query.itemId);
      changePrice(query.itemId, data.itemCurrentPrice);
    }

    if (data.itemStock) {
      const result = await getItem(query);
      console.log('result', result);
      changeQuantity(query.itemId, data.itemStock, result.itemCurrentPrice, {
        type: 'update',
      });
    }

    let result = await DB('stock')
      .where(query)
      .update(data)
      .then(result => {
        return { status: 'ok', msg: 'update success' };
      });
    return result;
  } catch (e) {
    return { status: 'failed', msg: 'failed to update user ' + e };
  }
}

async function changePrice(itemId, price) {
  const time = Date.now();

  const priceRecord = {
    historyId: uuidv4(),
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

async function changeQuantity(itemId, quantity, price, infoJson) {
  const time = Date.now();

  const quantityChange = {
    changeId: uuidv4(),
    itemId: itemId,
    quantityChange: quantity,
    quantityChangeTime: time,
    itemPrice: price,
    info: JSON.stringify(infoJson),
  };
  console.log('quantityChange', quantityChange);
  try {
    await DB('stockchangehistory').insert(quantityChange);
  } catch (e) {
    return {
      status: 'failed',
      msg: 'failed to create quantity change history ' + e,
    };
  }
}
