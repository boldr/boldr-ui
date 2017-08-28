/* @flow */
import * as React from 'react';
import classNames from 'classnames';

export type Props = {
  fluid: boolean,
  className: ?string,
  style: ?Object,
  children: Array<React.Node>,
  componentClass: string,
};

class Grid extends React.PureComponent<Props, *> {
  static defaultProps = {
    fluid: false,
    componentClass: 'div',
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
