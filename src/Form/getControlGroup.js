import React, { Component } from 'react';
import { string, bool } from 'prop-types';
import cx from 'classnames';

export default Control => {
  return class ControlGroup extends Component {
    static propTypes = {
      required: bool,
      helpDesc: string,
      label: string,
      className: string,
    };
    getControlInstance = () => {
      return this.control;
    };

    render() {
      const { required = false, helpDesc = '', label = '', className = '', ...props } = this.props;

      const showError = props.isTouched && props.error;
      const groupClassName = cx({
        'boldrui-form__control-group': true,
        'boldrui-form__control-group--active': props.isActive,
        'has-error': showError,
        [className]: true,
      });

      return (
        <div className={groupClassName}>
          <label className="boldrui-form__control-label">
            {required ? <em className="boldrui-form__required">*</em> : null}
            {label}
          </label>
          <div className="boldrui-form__controls">
            <Control {...props} ref={ref => (this.control = ref)} />
            {showError &&
              <p className="boldrui-form__error-desc">
                {props.error}
              </p>}
            {helpDesc &&
              <p className="boldrui-form__help-desc">
                {helpDesc}
              </p>}
          </div>
        </div>
      );
    }
  };
};
