/* @flow */
/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import classNames from 'classnames';

export type Props = {
  reverse?: boolean,
  className?: string,
  style?: Object,
  children?: ReactChildren,
  xsStart?: boolean,
  smStart?: boolean,
  mdStart?: boolean,
  lgStart?: boolean,
  xsCenter?: boolean,
  smCenter?: boolean,
  mdCenter?: boolean,
  lgCenter?: boolean,
  xsEnd?: boolean,
  smEnd?: boolean,
  mdEnd?: boolean,
  lgEnd?: boolean,
  xsTop?: boolean,
  smTop?: boolean,
  mdTop?: boolean,
  lgTop?: boolean,
  xsMiddle?: boolean,
  smMiddle?: boolean,
  mdMiddle?: boolean,
  lgMiddle?: boolean,
  xsBottom?: boolean,
  smBottom?: boolean,
  mdBottom?: boolean,
  lgBottom?: boolean,
  xsAround?: boolean,
  smAround?: boolean,
  mdAround?: boolean,
  lgAround?: boolean,
  xsBetween?: boolean,
  smBetween?: boolean,
  mdBetween?: boolean,
  lgBetween?: boolean,
  componentClass: ReactElement,
};

const Row = (props: Props) => {
  const ComponentClass = props.componentClass;

  const classes = classNames(
    {
      grid__row: true,
      'grid__row--reverse': props.reverse,

      'grid__row--xs-start': props.xsStart,
      'grid__row--sm-start': props.smStart,
      'grid__row--md-start': props.mdStart,
      'grid__row--lg-start': props.lgStart,

      'grid__row--xs-center': props.xsCenter,
      'grid__row--sm-center': props.smCenter,
      'grid__row--md-center': props.mdCenter,
      'grid__row--lg-center': props.lgCenter,

      'grid__row--xs-end': props.xsEnd,
      'grid__row--sm-end': props.smEnd,
      'grid__row--md-end': props.mdEnd,
      'grid__row--lg-end': props.lgEnd,

      'grid__row--xs-top': props.xsTop,
      'grid__row--sm-top': props.smTop,
      'grid__row--md-top': props.mdTop,
      'grid__row--lg-top': props.lgTop,

      'grid__row--xs-middle': props.xsMiddle,
      'grid__row--sm-middle': props.smMiddle,
      'grid__row--md-middle': props.mdMiddle,
      'grid__row--lg-middle': props.lgMiddle,

      'grid__row--xs-bottom': props.xsBottom,
      'grid__row--sm-bottom': props.smBottom,
      'grid__row--md-bottom': props.mdBottom,
      'grid__row--lg-bottom': props.lgBottom,

      'grid__row--xs-around': props.xsAround,
      'grid__row--sm-around': props.smAround,
      'grid__row--md-around': props.mdAround,
      'grid__row--lg-around': props.lgAround,

      'grid__row--xs-between': props.xsBetween,
      'grid__row--sm-between': props.smBetween,
      'grid__row--md-between': props.mdBetween,
      'grid__row--lg-between': props.lgBetween,
    },
    props.className,
  );

  return (
    <ComponentClass className={classes} style={props.style}>
      {props.children}
    </ComponentClass>
  );
};

Row.defaultProps = {
  componentClass: 'div',
};

export default Row;
