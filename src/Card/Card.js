import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import getField from '../utils/getField';
import Paper from '../Paper/Paper';
import Collapse from '../utils/Collapse';
import contextTypes from './contextTypes';

export default class Card extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the card.
     */
    className: PropTypes.string,

    /**
     * Any Card parts that should be rendered.
     */
    children: PropTypes.node,

    /**
     * Boolean if the card is expanded by default when there is an expander
     * component.
     */
    defaultExpanded: PropTypes.bool,

    /**
     * Boolean if the card should raise on hover when on a desktop display.
     */
    raise: PropTypes.bool,

    /**
     * Boolean if the card is currently expanded. This will require the `onExpanderClick` function
     * to toggle the state. The card will become controlled if this is not `undefined`.
     */
    expanded: PropTypes.bool,

    /**
     * An optional function to call when the expander is clicked.
     */
    onExpanderClick: PropTypes.func,

    /**
     * The icon className to use for the expander icon.
     */
    expanderIconClassName: PropTypes.string,

    /**
     * Any icon children required for the expander icon.
     */
    expanderIconChildren: PropTypes.node,

    /**
     * The tooltip position for the expander icon.
     */
    expanderTooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The optional tooltip to display for the expander icon.
     */
    expanderTooltipLabel: PropTypes.node,

    /**
     * An optional delay before the tooltip appears for the expander icon on hover.
     */
    expanderTooltipDelay: PropTypes.number,

    /**
     * Boolean if the card contains a table. It will update the styling accordingly.
     * When using the `DataTable` component, do not wrap it in a `CardText` component.
     *
     * ```js
     * <Card tableCard={true}>
     *   <CardTitle title="Example />
     *   <DataTable>
     *     ...
     *   </DataTable>
     * </Card>
     * ```
     */
    tableCard: PropTypes.bool,

    /**
     * An optional function to call when the mouseover event is triggered.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when the mouseleave event is triggered.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional function to call when the touchstart event is triggered.
     */
    onTouchStart: PropTypes.func,

    /**
     * Boolean if the card expansion should be animated.
     */
    animate: PropTypes.bool,
  };

  static defaultProps = {
    animate: true,
    expanderIconChildren: 'keyboard_arrow_down',
    expanderIconClassName: 'material-icons',
    expanderTooltipPosition: 'left',
  };

  static childContextTypes = contextTypes;

  constructor(props) {
    super(props);

    this.state = {
      zDepth: 1,
      expanded: !!props.defaultExpanded,
    };
  }

  getChildContext() {
    const {
      expanderTooltipLabel,
      expanderTooltipDelay,
      expanderTooltipPosition,
      expanderIconClassName,
      expanderIconChildren,
    } = this.props;

    const expanded = getField(this.props, this.state, 'expanded');

    return {
      expanded,
      onExpandClick: this._handleExpandClick,
      iconClassName: typeof iconClassName !== 'undefined' ? iconClassName : expanderIconClassName,
      iconChildren: typeof iconChildren !== 'undefined' ? iconChildren : expanderIconChildren,
      tooltipLabel: expanderTooltipLabel,
      tooltipDelay: expanderTooltipDelay,
      tooltipPosition: expanderTooltipPosition,
    };
  }

  _handleMouseOver = e => {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (this.props.raise && !this._touched) {
      this.setState({ zDepth: 4 });
    }
  };

  _handleMouseLeave = e => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    this._touched = false;
    if (this.props.raise && this.state.zDepth !== 1) {
      this.setState({ zDepth: 1 });
    }
  };

  _handleTouchStart = e => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this._touched = true;
  };

  _handleExpandClick = e => {
    const { onExpanderClick } = this.props;
    const expanded = !getField(this.props, this.state, 'expanded');
    if (onExpanderClick) {
      onExpanderClick(expanded, e);
    }

    if (typeof this.props.expanded === 'undefined') {
      this.setState({ expanded });
    }
  };

  render() {
    const { zDepth } = this.state;
    const {
      className,
      raise,
      tableCard,
      children,
      animate,
      /* eslint-disable no-unused-vars */
      expanded: propExpanded,
      onExpanderClick,
      defaultExpanded,
      expanderIconChildren,
      expanderIconClassName,
      expanderTooltipLabel,
      expanderTooltipDelay,
      expanderTooltipPosition,
      ...props
    } = this.props;

    const expanded = getField(this.props, this.state, 'expanded');
    let expanderIndex = -1;
    const parts = Children.map(Children.toArray(children), (child, i) => {
      if (!child || !child.props) {
        return child;
      } else if (expanderIndex < 0 && (child.props.isExpander || child.props.expander)) {
        expanderIndex = i;
      }

      if (!child.props.expandable) {
        return child;
      }

      const collapsed = expanderIndex === -1 || expanderIndex === i || !expanded;
      return <Collapse collapsed={collapsed} animate={animate}>{child}</Collapse>;
    });

    return (
      <Paper
        {...props}
        zDepth={zDepth}
        className={cn(
          'boldrui-card',
          {
            'boldrui-card--raise': raise,
            'boldrui-card--table': tableCard,
          },
          'md-background--card',
          className,
        )}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
        onTouchStart={this._handleTouchStart}
        noPadding
      >
        <div className="boldrui-card__inner">
          {parts}
        </div>
      </Paper>
    );
  }
}
