/* eslint-disable react/prop-types, react/no-unescaped-entities */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import '../src/styles/boldrui.scss';
import theme from '../src/theme/theme';

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
  Paragraph,
  Link,
  Topbar,
  Heading,
  Modal,
  FormField,
  FormCard,
  Form,
  Input,
  Grid, Col, Row,
} from '../src/components';

import TopbarLink from '../src/components/Topbar/TopbarLink';
import menuItems from './items';
import NewPostForm from './NewPostForm';

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
const renderField = (field) => (
    <div className="input-row">
      <Input {...field.input} type="text"/>
      {field.meta.touched && field.meta.error &&
       <span className="error">{field.meta.error}</span>}
    </div>
  )

class NewPost extends Component {
  state = {
    hidden: false,
    activate: null,
    modalIsOpen: false,
  };
  handleSidebarClick = e => {
    this.props.dispatch({ type: 'TOGGLE_SIDEBAR' });
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  handleNewPost = (values) => {
    console.log(values)
  }
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
                <FormCard title="new post" form={ <NewPostForm onSubmit={ this.handleNewPost } /> } />
                <Row>
                  <Col xs={12} md={8}>
                    <Paper zDepth={1}>
                      <Toolbar>Content</Toolbar>
                      <Inner>
                        <NewPostForm onSubmit={ this.handleNewPost } />
                      </Inner>
                    </Paper>
                  </Col>
                  <Col xs={12} md={4}>
                    <Paper zDepth={1}>
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
export default connect(mapStateToProps)(NewPost);
