import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class CardTitleBlock extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node,
    avatar: PropTypes.bool,
  };

  render() {
    const { id, subtitle, avatar } = this.props;
    let { title } = this.props;
    title = (
      <h2
        id={id}
        className={cn('boldrui-card-title--title md-text', {
          'boldrui-card-title--large': !avatar,
        })}
      >
        {title}
      </h2>
    );

    if (!subtitle) {
      return title;
    }

    return (
      <div
        className={cn('boldrui-card-title--title-block', {
          'boldrui-card-title--one-line': avatar,
        })}
      >
        {title}
        <h3 className="boldrui-card-title--title md-text--secondary">{subtitle}</h3>
      </div>
    );
  }
}
