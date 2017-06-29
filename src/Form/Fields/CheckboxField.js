/* @flow */
import React from 'react';
import omit from 'lodash/omit';
import Checkbox from '../../Checkbox';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export type Props = {
  value: boolean,
};
const CheckboxWrap = (props: Props) => {
  const passableProps = omit(props, unknownProps);
  return (
    <Checkbox
      className="boldrui-form__checkbox"
      checked={props.value === true}
      {...passableProps}
    />
  );
};
const CheckboxField = getControlGroup(CheckboxWrap);

export default CheckboxField;
