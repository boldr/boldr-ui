/* eslint-disable react/prop-types, react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';
import Button from 'react-md/lib/Buttons';
import '../src/styles/boldrui.scss';
import theme from '../src/theme/theme';
import Photo from '../src/components/Photo';
import Heading from '../src/components/Heading';
import { Grid, Col, Row } from '../src/components/Layout';

import {
  Sidebar,
  Anchor,
  SidebarNav,
  DashboardWrapper,
  DashboardFooter,
  DashboardContent,
  Link,
  Topbar,
} from '../src';
import TopbarLink from '../src/components/Topbar/TopbarLink';
import menuItems from './items';
import NewPost from './NewPost';
import App from './App';

injectGlobal`
  body {
    margin: 0;
  }
`;
class Root extends PureComponent {
  renderMain = () => {
    return <App />;
  };
renderNewPost = () => <NewPost />;
  render() {
    return (
        <Switch>
          <Route exact path="/" render={this.renderMain} />
          <Route exact path="/admin/posts" render={this.renderNewPost} />
              <Route exact path="/admin/new-post" render={this.renderNewPost} />
        </Switch>
    );
  }
}
const mapStateToProps = state => {
  return {
    ui: state.ui,
    routing: state.routing,
  };
};
export default connect(mapStateToProps)(Root);
