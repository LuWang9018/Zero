import React from 'react';
import {
  Card,
  ActionList,
  TopBar,
  Navigation,
  Modal,
  FormLayout,
  TextField,
  AppProvider,
  SkeletonBodyText,
  Layout,
  TextContainer,
  SkeletonDisplayText,
  Frame,
  Toast,
  ContextualSaveBar,
  Loading,
  Page,
  SkeletonPage,
  ResourceList,
  TextStyle,
  Thumbnail,
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, logout } from '../../modules/users';
import { getMyStock } from '../../modules/stock';

export function pruductList(item) {
  {
    const { itemId, itemName, itemCode, itemCurrentPrice } = item;
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
      </ResourceList.Item>
    );
  }
}
