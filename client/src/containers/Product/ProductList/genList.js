import React from 'react';
import { ResourceList, TextStyle, Thumbnail } from '@shopify/polaris';

export function genList(item) {
  {
    const { itemId, itemName, itemCode, itemCurrentPrice, itemStock } = item;
    let imageUrl = item.imageUrl
      ? item.imageUrl
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png';
    const media = (
      <Thumbnail source={imageUrl} alt='Cannot load image' size='large' />
    );

    return (
      <ResourceList.Item
        id={itemId}
        url={`/productDetail/${itemId}`}
        media={media}
        accessibilityLabel={`View details for ${itemName}`}
      >
        <h3>
          <TextStyle variation='strong'>{itemName}</TextStyle>
        </h3>
        <div>{itemCode}</div>
        <div>{itemCurrentPrice}</div>
        <div>{itemStock}</div>
      </ResourceList.Item>
    );
  }
}
