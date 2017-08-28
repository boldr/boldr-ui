/* @flow */
import * as React from 'react';

type Props = {
  isAccordion: boolean,
  children: Array<React.Node>,
  onChange: () => mixed,
};
type State = {
  activeItems: Array<any>,
};

class Accordion extends React.Component<Props, State> {
  static defaultProps = {
    isAccordion: true,
    onChange: () => {},
  };
  constructor(props: Props) {
    super(props);
    const activeItems = this.preExpandedItems();
    this.state = {
      activeItems,
    };
  }
  state: State;
  props: Props;
  preExpandedItems() {
    const activeItems = [];
    React.Children.map(this.props.children, (item, index) => {
      // $FlowIssue
      if (item.props.expanded) {
        if (this.props.isAccordion) {
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
    if (this.props.isAccordion) {
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

    this.props.onChange(this.props.isAccordion ? activeItems[0] : activeItems);
  }

  renderItems = () => {
    const { isAccordion, children } = this.props;

    return React.Children.map(children, (item, index) => {
      const key = index;
      const isExpanded = this.state.activeItems.indexOf(key) !== -1 && !item.props.disabled;

      return React.cloneElement(item, {
        disabled: item.props.disabled,
        isAccordion,
        isExpanded,
        key: `boldrui-accordion__item-${key}`,
        onClick: this.handleClick.bind(this, key),
      });
    });
  };

  render() {
    return (
      <div className="boldrui-accordion">
        {this.renderItems()}
      </div>
    );
  }
}

export default Accordion;
