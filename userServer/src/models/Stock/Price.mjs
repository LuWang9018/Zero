import { DB } from '../../db/db';
import uuid from 'uuid';
import { updateItem } from './Stock';
import { listUsers } from '../User/User';

export async function changePrice(itemId, attr) {
  attr.historyId = uuid();
  console.log('changePrice attr', attr);

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
