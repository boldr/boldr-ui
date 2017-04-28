import React from 'react';
import styled from 'styled-components';
import InputWrapper from '../InputWrapper';

const RadioField = props => {
  const { meta, ...rest } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...rest}>
      <RadioContainer>
        {props.options.map(option => (
          <RadioInputContainer key={option.value}>
            <RadioInput
              {...props.input}
              type="radio"
              key={option.value}
              id={props.input.name}
              name={props.input.name}
              value={option.text}
              showError={showError}
              checked={option.text === props.input.value}
            />
            <RadioText showError={showError}>
              {option.text}
            </RadioText>
          </RadioInputContainer>
        ))}
      </RadioContainer>
    </InputWrapper>
  );
};
const RadioContainer = styled.div`
  display: flex;
`;

const RadioInputContainer = styled.div`
  position: relative;
  margin: 2rem 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    margin-left: 2rem;
  }
  input[type=radio]:checked {
    background: #00bcd4;
    border-color: #00bcd4;
  }
  input[type=radio]:checked ~ div {
    color: white;
  }
`;

const RadioInput = styled.input`
  border-radius: 3px;
  border: solid 1px #babbbb;
  border-color: ${props => (props.showError ? '#d32f2f' : '')};
  padding: 18px;
  font-size: 16px;
  width: 100%;
  margin: 0 auto 1rem;

  &:active,
  &:focus {
    border-color: ${props => (props.showError ? '#d32f2f' : '#484848')};
    outline: none;
  }
  position: absolute;
  -webkit-appearance: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const RadioText = styled.div`
  position: relative;
  top: 2px;
  pointer-events: none;
  color: ${props => (props.showError ? '#d32f2f' : 'rgba(0, 0, 0, 0.87)')};
`;

export default RadioField;
