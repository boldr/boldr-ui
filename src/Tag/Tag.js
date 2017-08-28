// @flow
import * as React from 'react';
import classNames from 'classnames';
import BoldrComponent from '../util/BoldrComponent';

export type Props = {
  children: string,
  id: string,
  thumb?: React.Node,
  onRemove: Function,
  removable?: boolean,
  // small or large
  size?: string,
  wrap?: boolean,
  disabled?: boolean,
};

class Tag extends BoldrComponent {
  static defaultProps = {
    onRemove: () => {},
    size: 'small',
    removable: true,
  };
  props: Props;
  render() {
    const { id, children, thumb, removable, onRemove, size, wrap, disabled } = this.props;

    const className = classNames({
      'boldrui-tag': true,
      'boldrui-tag__lg': size === 'large',
      'boldrui-tag__wrap': wrap,
      'boldrui-tag__disabled': disabled,
    });

    const innerClassName = classNames({
      'boldrui-tag__inner-wrap': wrap,
      'boldrui-typo-4': true,
    });

    const title = wrap ? children : '';

    return (
      <span className={className} disabled={disabled} id={id} title={title}>
        {thumb &&
          <span className="boldrui-tag__thumb">
            {thumb}
          </span>}
        <span className={innerClassName}>
          {children}
        </span>
        {removable &&
          !disabled &&
          // eslint-disable-next-line
          <a
            className="boldrui-tag__remove--btn"
            onClick={() => onRemove(id)}
            onKeyPress={() => onRemove(id)}
          />}
      </span>
    );
  }
}

export default Tag;
