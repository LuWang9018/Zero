import * as React from 'react';
import {mount} from 'enzyme';
import {layeredComponent, LayeredComponent} from '../components';

describe('React Utilities', () => {
  describe('Components', () => {
    describe('layeredComponent', () => {
      const realAppendChild = document.body.appendChild;
      const realRemoveChild = document.body.removeChild;

      @layeredComponent({idPrefix: 'Popover'})
      class Popover extends React.Component {
        renderLayer() {
          return <div />;
        }

        render() {
          return <div />;
        }
      }

      beforeEach(() => {
        document.body.appendChild = jest.fn();
        document.body.removeChild = jest.fn();
      });

      afterEach(() => {
        document.body.appendChild = realAppendChild;
        document.body.removeChild = realRemoveChild;
      });

      it('appends a new div with unique ID to the body', () => {
        mount(<Popover />);
        const node = (document.body.appendChild as jest.Mock).mock.calls[0][0];
        expect(document.body.appendChild).toBeCalled();
        expect(node.nodeName).toBe('DIV');
        expect(node.id).toMatch('PopoverLayer');
      });

      it('removes layer div on unmount', () => {
        const popover = mount(<Popover />);
        const node = (popover.instance() as LayeredComponent).layerNode;
        popover.unmount();
        expect(document.body.removeChild).lastCalledWith(node);
      });
    });
  });
});
