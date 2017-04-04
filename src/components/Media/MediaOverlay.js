/* @flow */
import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import { StyleClasses, BOLDR_NS } from '../../theme/styleClasses';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  // Any children to display in the overlay.
  children: ?ReactChildren,
  //  An optional css className to apply.
  className: ?string,
  // An optional inline-style to apply to the overlay.
  style: ?Object,
  // The aspect ratio to use.
  aspectRatio: string,
  // Boolean if this component should be expandable when there is a `CardExpander`
  expandable: ?string,
  // The component to render the media overlay as.
  component: Function | string,
};

const BASE_ELEMENT = StyleClasses.MEDIA_OVERLAY;

class MediaOverlay extends PureComponent {
  static defaultProps = {
    component: 'div',
  };

  props: Props;

  render() {
    const { className, component: Component, ...props } = this.props;
    return <Component className={ cn(BASE_ELEMENT, className) } { ...props } />;
  }
}

export default MediaOverlay;
