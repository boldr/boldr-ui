import React from 'react';

import omit from 'lodash/omit';
import Checkbox from '../../Checkbox';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const CheckboxGroup = Checkbox.Group;
const CheckboxGroupWrap = props => {
  const passableProps = omit(props, unknownProps);
  return <CheckboxGroup className="boldrui-form__checkbox-group" {...passableProps} />;
};
const CheckboxGroupField = getControlGroup(CheckboxGroupWrap);

export default CheckboxGroupField;
