/* @flow */
import * as React from 'react';

type Props = {
  id: string,
  isExpanded: boolean,
  onClick: Function,
  ariaControls: string,
  children: Array<React.Node>,
  role: string,
};

class AccordionItemTitle extends React.PureComponent<Props, *> {
  static defaultProps = {
    id: '',
    isExpanded: false,
    onClick: () => {},
    ariaControls: '',
    role: '',
  };

  handleKeyPress = (e: Event) => {
    const { onClick } = this.props;
    if (e.charCode === 13 || e.charCode === 32) {
      onClick();
    }
  };
  props: Props;
  render() {
    const { id, isExpanded, ariaControls, onClick, children, role } = this.props;
    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        id={id}
        aria-expanded={isExpanded}
        aria-controls={ariaControls}
        className="boldrui-accordion__title"
        onClick={onClick}
        role={role}
        onKeyPress={this.handleKeyPress}
      >
        {children}
      </div>
    );
  }
}

export default AccordionItemTitle;
