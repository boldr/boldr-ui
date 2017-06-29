/* @flow */
import React, { PureComponent } from 'react';
import classNames from 'classnames';

export type Props = {
  fluid: ?boolean,
  className: ?string,
  style: ?Object,
  children: ReactChildren,
  componentClass: ReactElement,
};

class Grid extends PureComponent {
  static defaultProps = {
    componentClass: 'div',
    fluid: false,
  };
  props: Props;
  render() {
    const ComponentClass = this.props.componentClass;

    const classes = classNames(
      {
        grid: !this.props.fluid,
        'grid--fluid': this.props.fluid,
      },
      this.props.className,
    );

    return (
      <ComponentClass className={classes} style={this.props.style}>
        {this.props.children}
      </ComponentClass>
    );
  }
}

export default Grid;
