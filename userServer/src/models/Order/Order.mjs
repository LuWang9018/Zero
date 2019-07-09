import { DB } from '../../db/db';
import uuid from 'uuid';

export async function createOrder(attr) {
  attr.orderId = uuid();

  try {
    if (attr.isSale) {
      await updateItem(itemId, { itemCurrentPrice: attr.historyPrice });
    }
    await DB('itemPriceHistory').insert(attr);
  } catch (e) {
    return {
      status: 'failed',
      msg: 'failed to create quantity change history ' + e,
    };
  }
}
