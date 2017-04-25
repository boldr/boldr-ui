import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from '../Label';
import Input from '../Input';
import Block from '../Block';

const Error = styled(Block)`
  margin: 0.5rem 0 0;
`;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  input[type="checkbox"],
  input[type="radio"] {
    margin-right: 0.5rem;
  }
  label {
    vertical-align: middle;
  }
`;

const FormField = ({ error, name, invalid, label, type, ...props }) => {
  const inputProps = {
    id: name,
    name,
    type,
    invalid,
    'aria-describedby': `${name}Error`,
    ...props,
  };
  const renderInputFirst = type === 'checkbox' || type === 'radio';
  return (
    <Wrapper>
      {renderInputFirst && <Input {...inputProps} />}
      {label && <Label htmlFor={inputProps.id}>{label}</Label>}
      {renderInputFirst || <Input {...inputProps} />}
      {invalid &&
        error &&
        <Error id={`${name}Error`} role="alert" palette="danger">
          {error}
        </Error>}
    </Wrapper>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};

FormField.defaultProps = {
  type: 'text',
};

export default FormField;
