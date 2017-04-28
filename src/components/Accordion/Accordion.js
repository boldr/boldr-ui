/* @flow */
import React, { Component } from 'react';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  accordion: boolean,
  children: ReactChildren,
  className: string,
  onChange: () => void,
};
type State = {
  activeItems: Array<any>,
};

class Accordion extends Component {
  static defaultProps = {
    accordion: true,
    onChange: () => {},
    className: 'boldrui-accordion',
  };
  constructor(props) {
    super(props);
    const activeItems = this.preExpandedItems();
    this.state = {
      activeItems,
      accordion: true,
    };
    this.renderItems = this.renderItems.bind(this);
  }
  state: State;
  props: Props;
  preExpandedItems() {
    const activeItems = [];
    React.Children.map(this.props.children, (item, index) => {
      if (item.props.expanded) {
        if (this.props.accordion) {
          if (activeItems.length === 0) {
            activeItems.push(index);
          }
        } else {
          activeItems.push(index);
        }
      }
    });
    return activeItems;
  }

  handleClick(key: string | number) {
    let { activeItems } = this.state;
    if (this.props.accordion) {
      activeItems = activeItems[0] === key ? [] : [key];
    } else {
      activeItems = [...activeItems];
      const index = activeItems.indexOf(key);
      const isActive = index > -1;
      if (isActive) {
        // remove active state
        activeItems.splice(index, 1);
      } else {
        activeItems.push(key);
      }
    }
    this.setState({
      activeItems,
    });

    this.props.onChange(this.props.accordion ? activeItems[0] : activeItems);
  }

  renderItems() {
    const { accordion, children } = this.props;

    return React.Children.map(children, (item, index) => {
      const key = index;
      const expanded =
        this.state.activeItems.indexOf(key) !== -1 && !item.props.disabled;

      return React.cloneElement(item, {
        disabled: item.props.disabled,
        accordion,
        expanded,
        key: `boldrui-accordion__item-${key}`,
        onClick: this.handleClick.bind(this, key),
      });
    });
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        {this.renderItems()}
      </div>
    );
  }
}

export default Accordion;
