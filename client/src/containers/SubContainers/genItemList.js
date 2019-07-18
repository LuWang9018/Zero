import React from 'react';
import {
  ResourceList,
  TextStyle,
  Thumbnail,
  Button,
  ButtonGroup,
} from '@shopify/polaris';
import {
  addShoppingCartItem,
  removeShoppingCartItem,
} from '../../modules/order';
import './genItemList.css';

class Buttons {
  //stock buttons
  addToShappingCart(userId, item) {
    return (
      <Button
        primary
        onClick={event => {
          event.stopPropagation();
          const { itemId } = item;
          addShoppingCartItem(userId, { itemId });
        }}
      >
        Restock
      </Button>
    );
  }

  //chopping cart buttons
  removeShappingCartItem(itemId) {
    return (
      <Button
        destructive
        outline
        primary
        onClick={event => {
          event.stopPropagation();
          removeShoppingCartItem(itemId);
        }}
      >
        Remove item
      </Button>
    );
  }
}

export function genItemList(item, id, index, other = {}) {
  {
    const buttons = new Buttons();
    const { itemId, itemName, itemCode, itemCurrentPrice, itemStock } = item;
    const { userId, action } = other;
    let imageUrl = item.imageUrl
      ? item.imageUrl
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png';
    const media = (
      <Thumbnail source={imageUrl} alt="Cannot load image" size="large" />
    );

    function actionGroups() {
      if (action === 'itemList') {
        return (
          <ButtonGroup>{buttons.addToShappingCart(userId, item)}</ButtonGroup>
        );
      } else if (action === 'shoppingCart') {
        return (
          <ButtonGroup>
            {buttons.removeShappingCartItem(userId, item)}
          </ButtonGroup>
        );
      } else {
        return <div />;
      }
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
          <div id="itemListInfo">
            <h3>
              <TextStyle variation="strong">{itemName}</TextStyle>
            </h3>
            <div>{itemCode}</div>
            <div>{itemCurrentPrice}</div>
            <div>{itemStock}</div>
          </div>
          <div id="itemListActions">{actionGroups()}</div>
        </div>
      </ResourceList.Item>
    );
  }
}
