/* eslint-disable react/prop-types, react/no-unescaped-entities */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';

import {
  Sidebar,
  Anchor,
  SidebarNav,
  DashboardMain,
  DashboardWrapper,
  DashboardFooter,
  DashboardContent,
  Paper,
  Photo,
  FormGroup,
  Paragraph,
  Link,
  Label,
  RadioField,
  SelectField,
  Topbar,
  Icon,
  InputField,
  Heading,
  Modal,
  FormField,
  Form,
  Input,
  Grid,
  Col,
  Row,
} from '../src/components';
// import NewPostForm from './NewPostForm';
const required = value => (value ? undefined : 'Required');
const maxLength = max => value =>
  (value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined);
const maxLength15 = maxLength(15);
const number = value =>
  (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
const minValue = min => value =>
  (value && value < min ? `Must be at least ${min}` : undefined);
const minValue18 = minValue(18);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);
const tooOld = value =>
  (value && value > 65 ? 'You might be too old for this' : undefined);
const aol = value =>
  (value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined);
const Inner = styled.div`
  padding: 2rem;
`;

const selectopts = [
  { key: 'aba', value: 'abc'},
  { key: 'bab', value: 'cdb'}
]
const Toolbar = styled.div`
  width: 100%;
  height: 50px;
  background-color: #66bb6a;
  color: #fff;
  line-height: 24px;
  vertical-align: middle;
  font-size: 18px;
  font-weight: 600;
  padding-left: 1rem;
  display: flex;
  align-items: center;
`;


const remoteOptions = [
  { text: 'Yes I like', value: 'Yes' },
  { text: 'No', value: 'No' },
];

const NewPostForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Field
            name="firstName"
            component={InputField}
            addonBefore={ <Icon kind="edit" size={ 24 } color="#222" />}
            type="text"
            label="First Name"
            placeholder="First Name"
            validate={[required]}
          />
        </FormGroup>
        <FormGroup>
          <Field
            name="lastName"
            label="Last Name"
            component={InputField}
            type="text"
            placeholder="Last Name"
            validate={[required]}
          />
        </FormGroup>
        <FormGroup>
          <Field
            name="email"
            component={InputField}
            type="email"
            placeholder="Email"
            label="Email"
            validate={email}
            warn={aol}
          />
        </FormGroup>
      <div>
              <Field
          name="remote"
          label="Is this good?"
          validate={[required]}
          options={remoteOptions}
          component={RadioField}
        />
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component={ SelectField } options={ selectopts } />
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: 'newPost',
})(NewPostForm);
