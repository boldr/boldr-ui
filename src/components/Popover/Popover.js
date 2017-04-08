import React, { Component } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import type { Props } from '../Tooltip/Tooltip';

export default class Popover extends Component {
  static defaultProps = {
    prefixCls: 'boldrui-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {},
  };

  refs: {
    tooltip: Tooltip,
  };
  props: Props;
  getPopupDomNode() {
    return this.refs.tooltip.getPopupDomNode();
  }

  getOverlay() {
    const { title, prefixCls, content } = this.props;

    return (
      <div>
        {title && <div className={ `${prefixCls}-title` }>{title}</div>}
        <div className={ `${prefixCls}-inner-content` }>
          {content}
        </div>
      </div>
    );
  }

  render() {
    const props = Object.assign({}, this.props);
    delete props.title;
    return <Tooltip { ...props } ref="tooltip" overlay={ this.getOverlay() } />;
  }
}
