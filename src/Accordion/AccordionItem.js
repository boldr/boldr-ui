/* @flow */
import * as React from 'react';
import uniqueId from 'lodash.uniqueid';

type Props = {
  isExpanded?: boolean,
  isAccordion?: boolean,
  onClick: Function,
  children: Array<React.Node>,
};

type State = {
  itemUuid: string,
};

class AccordionItem extends React.Component<Props, State> {
  static defaultProps = {
    isAccordion: true,
    isExpanded: false,
    onClick: () => {},
  };

  state: State = {
    itemUuid: uniqueId(),
  };

  props: Props;
  renderChildren = () => {
    const { isAccordion, isExpanded, onClick, children } = this.props;
    const { itemUuid } = this.state;

    return React.Children.map(children, item => {
      const itemProps = {
        isExpanded,
      };

      if (item.type.accordionElementName === 'AccordionItemTitle') {
        itemProps.key = 'title';
        itemProps.id = `boldrui-accordion__title-${itemUuid}`;
        itemProps.ariaControls = `boldrui-accordion__body-${itemUuid}`;
        itemProps.onClick = onClick;
        itemProps.role = isAccordion ? 'tab' : 'button';
      } else if (item.type.accordionElementName === 'AccordionItemBody') {
        itemProps.key = 'body';
        itemProps.id = `boldrui-accordion__body-${itemUuid}`;
        itemProps.role = isAccordion ? 'tabpanel' : '';
      }

      return React.cloneElement(item, itemProps);
    });
  };

  render() {
    return (
      <div className="boldrui-accordion__item">
        {this.renderChildren()}
      </div>
    );
  }
}

export default AccordionItem;
