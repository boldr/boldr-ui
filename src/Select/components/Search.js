import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    onChange: PropTypes.func,
    keyword: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.any,
    placeholder: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  changeHandler(ev) {
    this.props.onChange(ev.target.value);
  }

  render() {
    let { prefixCls, placeholder, keyword } = this.props;

    return (
      <div className={`${prefixCls}-search`}>
        <input
          type="text"
          ref={el => (this.input = el)}
          placeholder={placeholder}
          className={`${prefixCls}-filter`}
          value={keyword}
          onChange={this.changeHandler}
        />
      </div>
    );
  }
}

export default Search;
