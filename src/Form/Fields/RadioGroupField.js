import React from 'react';

import omit from 'lodash/omit';
import RadioGroup from '../../Radio/RadioGroup';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const RadioGroupWrap = props => {
  const passableProps = omit(props, unknownProps);
  return <RadioGroup className="boldrui-form__radio-group" {...passableProps} />;
};
const RadioGroupField = getControlGroup(RadioGroupWrap);

export default RadioGroupField;
