/* eslint-disable react/prefer-stateless-function, no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CardExpander from './CardExpander';

/**
 * The `CardActions` component is used for adding actions on your card.
 * The actions should be `FlatButton`s or `IconButton`s.
 *
 * This component can act as a `CardExpander`.
 */
export default class CardActions extends Component {
  static propTypes = {
    /**
     * Boolean if this component should act as an expander and inject the
     * `CardExpander`.
     */
    expander: PropTypes.bool,

    /**
     * An optional className to apply to the actions container.
     */
    className: PropTypes.string,

    /**
     * An actions to display.
     */
    children: PropTypes.node,

    /**
     * Boolean if the actions should be centered.
     */
    centered: PropTypes.bool,

    /**
     * Boolean if the actions should be stacked.
     */
    stacked: PropTypes.bool,
  };

  render() {
    const { className, children, expander, centered, stacked, ...props } = this.props;
    return (
      <section
        {...props}
        className={cn(
          'boldrui-card__footer',
          {
            'boldrui-card__footer--inline': !stacked,
            'boldrui-card__footer--stacked': stacked,
            'boldrui-card__footer--centered': centered,
          },
          className,
        )}
      >
        {children}
        {expander && <CardExpander />}
      </section>
    );
  }
}
