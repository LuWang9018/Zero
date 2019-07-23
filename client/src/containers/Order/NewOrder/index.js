import React from 'react';
import {
  Card,
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
  Button,
} from '@shopify/polaris';
import { genItemList } from '../../SubContainers/genItemList';

export class CreateOrder extends React.Component {
  constructor(props) {
    super(props);

    this.removeItemFromThisOrder = this.removeItemFromThisOrder.bind(this);
  }
  state = {
    active: true,
  };

  removeItemFromThisOrder(id) {
    console.log('NewOrder index.js:', id);
    console.log('NewOrder index.js:', this.props);
    this.props.items.items.splice(id, 1);
  }

  render() {
    const { active } = this.state;

    return (
      <div>
        <Button onClick={this.handleChange}>Create Order</Button>
        <Modal
          open={active}
          onClose={this.handleChange}
          title='Reach more shoppers with Instagram product tags'
          primaryAction={{
            content: 'Add Instagram',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Learn more',
              onAction: this.handleChange,
            },
          ]}
        >
          <Modal.Section>
            <Card>
              <ResourceList
                key={`ResourceList ${this.props.items.name}`}
                resourceName={{ singular: 'My item', plural: 'My items' }}
                items={this.props.items.items}
                renderItem={(
                  item,
                  id,
                  index,
                  other = {
                    userId: this.state.userInfo
                      ? this.state.userInfo.userId
                      : undefined,
                    action: 'pendingOrder',
                    removeItemFromThisOrder: this.removeItemFromThisOrder,
                  }
                ) => genItemList(item, id, index, other)}
              />
            </Card>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleChange = () => {
    this.setState(({ active }) => ({ active: !active }));
  };
}
