/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import styled, { css } from 'styled-components';
import { Btn, FontIcon } from '../src/components';
import InputTags from '../src/components/InputTags/InputTags';

const TagList = styled.ul`
  display: inline;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TagItem = styled.li`
  display: inline;
`;
const styles = css`
  transition: border-color 0.3s ease;
    background: white;
    border: 1px solid #d9d8dd;
    height: 24px;
    margin-top: 5px;
        font-size: 12px;
    height: 26px;
    color: #626166;
    border-radius: 12px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    display: inline-block;
    padding: 0 9px;
`;
const StyledInput = styled.input`${styles}`;
const Input = ({ ...props }) => {
  return <StyledInput {...props} />;
};

const RenderTags = ({ fields, meta: { touched, error } }) => (
  <div>
    <Btn
      secondary
      flat
      onClick={() => fields.push('')}
      style={{ marginBottom: 17 }}
      label="Add Tag"
    >
      add
    </Btn>
    <TagList>
      {fields.map((name, index) => (
        <TagItem key={index}>
          <a onClick={() => fields.remove(index)}>
            {String.fromCharCode(215)}
          </a>

          <Field
            id={`tag${index}`}
            name={name}
            type="text"
            label="tag"
            component={Input}
          />
        </TagItem>
      ))}
    </TagList>
  </div>
);

export default RenderTags;
