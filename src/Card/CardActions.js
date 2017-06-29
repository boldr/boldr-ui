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
          'boldrui-card-footer',
          {
            'boldrui-card-footer__inline': !stacked,
            'boldrui-card-footer__stacked': stacked,
            'boldrui-card-footer__centered': centered,
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
