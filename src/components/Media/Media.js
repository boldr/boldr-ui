/* @flow */
import React, { PureComponent } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { StyleClasses, BOLDR_NS } from '../../theme/styleClasses';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  // Any media elements to display.
  children: ?ReactChildren,
  // An optional css className to apply.
  className: ?string,
  // Boolean if the aspect ratio should be forced.
  forceAspect: ?boolean,
  // The aspect ratio to use.
  aspectRatio: string,
  // Boolean if this component should be expandable when there is a `CardExpander`
  expandable: ?string,
  // The component to render the card media as.
  component: Function | string,
};

function validateAspectRatio(props, propName, component, ...args) {
  const value = props[propName];
  let err = PropTypes.string.isRequired(props, propName, component, ...args);
  if (!err && value.split('-').length !== 2) {
    err = new Error(
      `Your provided an \`${propName}\` prop to the ${component} that is not a valid ` +
        `aspect ratio \`${value}\`. This should be in the form of '{width}-{height}'.`,
    );
  }

  return err;
}
const BASE_ELEMENT = StyleClasses.MEDIA;

class Media extends PureComponent {
  static defaultProps = {
    forceAspect: true,
    aspectRatio: '16-9',
    component: 'section',
  };
  props: Props;
  render() {
    const {
      component: Component,
      className,
      children,
      forceAspect,
      aspectRatio,
      expandable, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return (
      <Component
        {...props}
        className={cn(
          BASE_ELEMENT,
          {
            [`${BASE_ELEMENT}__${aspectRatio}`]: forceAspect,
          },
          className,
        )}
      >
        {children}
      </Component>
    );
  }
}

export default Media;
