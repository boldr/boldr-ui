/* eslint-disable react/prop-types, react/no-unescaped-entities */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import { Editor, Raw } from 'slate';
import { Field, reduxForm, FieldArray } from 'redux-form';
import '../src/styles/boldrui.scss';
import theme from '../src/theme/theme';
import Photo from '../src/components/Photo';
import Heading from '../src/components/Heading';
import { Grid, Col, Row } from '../src/components/Layout';
import Form from '../src/components/Form/Form';
import DashboardMain from '../src/components/DashboardMain';
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
} from '../src/components';
import RenderTags from './RenderTags';
import InputTags from '../src/components/InputTags/InputTags';
import TopbarLink from '../src/components/Topbar/TopbarLink';
import menuItems from './items';
import initialState from './state.json';

const Inner = styled.div`
  padding: 2rem;
`;

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

class NewPost extends Component {
  state = {
    hidden: false,
    activate: null,
    modalIsOpen: false,
    tags: [],
    initialTags: ['foo', 'bar'],
    readOnlyTags: ['read', 'only', 'tags'],
    deleteTagsOne: ['delete one', 'delete two'],
    deleteTagsTwo: ['delete one', 'delete two'],
    uniqueTags: ['hello', 'world'],
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

  onInitTagAdded(tag) {
    this.setState({
      initialTags: [...this.state.initialTags, tag],
    });
  }

  onInitTagRemoved(tag, index) {
    this.setState({
      initialTags: this.state.initialTags.filter((tag, i) => i !== index),
    });
  }

  onDeleteOneTagAdded(tag) {
    this.setState({
      deleteTagsOne: [...this.state.deleteTagsOne, tag],
    });
  }

  onDeleteOneTagRemoved(tag, index) {
    this.setState({
      deleteTagsOne: this.state.deleteTagsOne.filter((tag, i) => i !== index),
    });
  }

  onDeleteTwoTagAdded(tag) {
    this.setState({
      deleteTagsTwo: [...this.state.deleteTagsTwo, tag],
    });
  }

  onDeleteTwoTagRemoved(tag, index) {
    this.setState({
      deleteTagsTwo: this.state.deleteTagsTwo.filter((tag, i) => i !== index),
    });
  }

  onUniqueAdded(tag) {
    this.setState({
      uniqueTags: [...this.state.uniqueTags, tag],
    });
  }

  onUniqueRemoved(tag, index) {
    this.setState({
      uniqueTags: this.state.uniqueTags.filter((tag, i) => i !== index),
    });
  }
  handleSidebarClick = e => {
    this.props.dispatch({ type: 'TOGGLE_SIDEBAR' });
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  onExpandCollapse = () => {
    this.props.dispatch({ type: 'TOGGLE_SB_MENU' });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <DashboardWrapper>
          {this.props.ui.visible
            ? <Sidebar
                items={menuItems}
                activeItem={this.props.routing.location.pathname}
                location={this.props.routing.location.pathname}
                onExpandCollapse={this.onExpandCollapse}
                onVisibilityChange={this.handleSidebarClick}
                visible={this.props.ui.visible}
                expanded={this.props.ui.expanded}
                logoImg="https://boldr.io/assets/boldr-white-logo.png"
                logoLink="/"
                isPrimaryColor
              />
            : null}
          <DashboardMain>
            <Topbar
              url={window.location.pathname}
              onMenuClick={this.handleSidebarClick}
              link={TopbarLink}
              links={[
                { title: 'Example Link', url: '/example' },
                { title: 'Another', url: '/another' },
                {
                  title: 'Link w/ Children',
                  url: '/children',
                },
              ]}
            />
            <DashboardContent padLeft padRight>
              <Grid fluid>
                <Row>
                  <Col xs={12} md={8}>
                    <Paper zDepth={1}>
                      <Toolbar>Content</Toolbar>
                      <Inner>
                        <Field
                          name="title"
                          label="Title"
                          component={FormField}
                        />
                        <InputTags
                          tags={this.state.tags}
                          onAdded={this.onTagAdded}
                          onRemoved={this.onTagRemoved}
                        />
                        <FieldArray
                          name="tags"
                          type="text"
                          id="post-tags"
                          component={RenderTags}
                          label="Tags"
                          tabIndex={-1}
                        />
                      </Inner>
                    </Paper>
                  </Col>
                  <Col xs={12} md={4}>
                    <Paper zDepth={1}>
                      <FormField label="Title" />
                    </Paper>
                  </Col>
                </Row>
              </Grid>
            </DashboardContent>

          </DashboardMain>
        </DashboardWrapper>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = state => {
  return {
    ui: state.ui,
    routing: state.routing,
  };
};
NewPost = connect(mapStateToProps)(NewPost);
export default reduxForm({
  form: 'newPostForm',
})(NewPost);
