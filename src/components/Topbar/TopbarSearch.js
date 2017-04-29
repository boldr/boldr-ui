/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import Icon from '../Icons';

const BASE_ELEMENT = StyleClasses.TOPBAR_SEARCH;

class TopbarSearch extends PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    onToggle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    placeholder: 'Search this site...',
  };
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.active && this.props.active) {
      this._input.focus();
    }
  }
  render() {
    const { active, placeholder } = this.props;
    const classes = cn(BASE_ELEMENT, {
      [`${BASE_ELEMENT}--active`]: active,
    });
    return (
      <div className={classes}>
        <input
          ref={ref => (this._input = ref)}
          className={`${BASE_ELEMENT}__input`}
          type="text"
          placeholder={placeholder}
        />

        <button
          className={`${BASE_ELEMENT}__icon ${BASE_ELEMENT}__clear`}
          onClick={this.props.onToggle}
        >
          <Icon kind="close" color="rgba(0, 0, 0, 0.87)" size={14} />
        </button>

        <button
          className={`${BASE_ELEMENT}__icon ${BASE_ELEMENT}__search`}
          onClick={this.props.onToggle}
        >
          <Icon kind="search" color="rgba(0, 0, 0, 0.87)" size={14} />
          {/* eslint-enable */}
        </button>
      </div>
    );
  }
}

export default TopbarSearch;
