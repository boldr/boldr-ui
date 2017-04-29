// @flow
import React from 'react';
import Input from '../../Input';
import Label from '../Label';
import Feedback from '../Feedback';

import type { MetaProps } from '../Form';

type Props = {
  input: any,
  label: string,
  type: string,
  meta: MetaProps,
  addonBefore: ?any,
  addonAfter: ?any,
};

const InputField = ({
  input,
  addonBefore,
  addonAfter,
  label,
  type,
  meta,
}: Props) => (
  <div>
    <Label label={label} />
    <div>
      <Input
        {...input}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        placeholder={label}
        type={type}
      />
      {meta.touched && <Feedback meta={meta} />}
    </div>
  </div>
);

export default InputField;
