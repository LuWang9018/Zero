import React from 'react';
import {
  ResourceList,
  TextStyle,
  Thumbnail,
  Button,
  ButtonGroup,
} from '@shopify/polaris';
import { addShoppingCartItem } from '../../modules/order';
import './genItemList.css';

export function genItemList(item, id, index, other = {}) {
  {
    const { itemId, itemName, itemCode, itemCurrentPrice, itemStock } = item;
    const userId = other.userId;
    let imageUrl = item.imageUrl
      ? item.imageUrl
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png';
    const media = (
      <Thumbnail source={imageUrl} alt='Cannot load image' size='large' />
    );

    async function addShoppingCartItemHelper(e) {
      console.log(e);
      await e.stopPropagation();

      addShoppingCartItem(userId, { itemId });
    }

    return (
      <ResourceList.Item
        id={itemId}
        url={`/productDetail/${itemId}`}
        media={media}
        accessibilityLabel={`View details for ${itemName}`}
        style={{ 'z-index': 0 }}
      >
        <div>
          <div id='itemListInfo'>
            <h3>
              <TextStyle variation='strong'>{itemName}</TextStyle>
            </h3>
            <div>{itemCode}</div>
            <div>{itemCurrentPrice}</div>
            <div>{itemStock}</div>
          </div>
          <div id='itemListActions'>
            <ButtonGroup>
              <Button
                primary
                onClick={event => addShoppingCartItemHelper(event)}
              >
                Restock
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </ResourceList.Item>
    );
  }
}
