/* eslint-disable react/prop-types, react/no-unescaped-entities */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Sidebar,
  Anchor,
  SidebarNav,
  DashboardWrapper,
  DashboardFooter,
  DashboardContent,
  Paper,
  Paragraph,
  Link,
  Topbar,
  Modal,
  FormField,
  Form,
  Input,
} from '../src/components';
import Checkbox from '../src/components/Checkbox';
import Radio from '../src/components/Radio';
import Option from '../src/components/Select';
import InputTags from '../src/components/InputTags/InputTags';

const isAgree = true;
const {
  Field,
  createForm,
  InputField,
  SubmissionError,
  CheckboxField,
  CheckboxGroupField,
  RadioGroupField,
  SelectField,
  TagInputField,
} = Form;

class NewPostForm extends Component {
  state = {
    hidden: false,
    activate: null,
    modalIsOpen: false,
    tags: [],
    initialTags: ['foo', 'bar'],
  };
  onTagAdded = tag => {
    this.setState({
      tags: [...this.state.tags, tag],
    });
  };

  onTagRemoved = (tag, index) => {
    this.setState({
      tags: this.state.tags.filter((tag, i) => i !== index),
    });
  };

  render() {
    const { handleSubmit, boldrForm } = this.props;
    const isSubmitting = boldrForm.isSubmitting();
    const submit = (values) => {
      this.props.onSubmit(values);
    };
    return (
      <Form onSubmit={handleSubmit(submit)}>

        <Field
          name="excerpt"
          type="text"
          label="Excerpt"
          value=""
          component={InputField}
        />
        <Field
          name="sex"
          label="Sex"
          value="female"
          component={RadioGroupField}
        >
          <Radio value="male">male</Radio>
          <Radio value="female">female</Radio>
        </Field>
        <Field name="tags" value={ this.state.tags } component={ TagInputField } tags={ this.state.tags } onAdded={ this.onTagAdded } onRemoved={ this.onTagRemoved } />
        <Field
          name="interest"
          label="Do what"
          value={['eat', 'sleep']}
          component={CheckboxGroupField}
          validations={{
            validInterest(values, value) {
              const len = value.length;
              if (len === 3) {
                return true;
              } else if (len === 2) {
                return 'a';
              } else if (len === 1) {
                return 'b';
              }
            },
          }}
          validationErrors={{
            validInterest: 'eat',
          }}
        >
          <Checkbox value="eat">eat</Checkbox>
          <Checkbox value="sleep">sleep</Checkbox>
          <Checkbox value="repeat">repeat</Checkbox>
        </Field>
        <Field
          name="custom-select"
          label="Choose"
          className="custom-select"
          placeholder="select"
          component={SelectField}
        >
          <Option className="boldrui-select-option" value="1">ab</Option>
          <Option className="boldrui-select-option" value="2">cd</Option>
          <Option className="boldrui-select-option" value="3">ef</Option>
        </Field>
        <Field
          name="featured"
          label="Featured Post："
          value={isAgree}
          component={CheckboxField}
        >
          Yes
        </Field>
        <button type="submit">submit</button>
      </Form>
    );
  }
}
const mapStateToProps = state => {
  return {
    ui: state.ui,
    routing: state.routing,
  };
};
NewPostForm = createForm()(NewPostForm);

export default connect(mapStateToProps)(NewPostForm);
