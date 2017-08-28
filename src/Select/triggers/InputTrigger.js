import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputTrigger extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    keyword: PropTypes.string,
    text: PropTypes.string,
  };
  state = {
    value: '',
  };

  componentDidMount() {
    this.props.onChange({
      extraFilter: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.keyword === null ? nextProps.value : nextProps.keyword,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value;
  }

  inputChangeHandler = ev => {
    this.props.onChange({
      keyword: ev.target.value,
    });
  };

  render() {
    const { prefixCls, placeholder, keyword, text } = this.props;

    return (
      <input
        ref={input => (this.input = input)}
        className={`${prefixCls}-input`}
        placeholder={placeholder}
        type="text"
        value={keyword === null ? text : keyword}
        onChange={this.inputChangeHandler}
        onClick={this.props.onClick}
      />
    );
  }
}

export default InputTrigger;
