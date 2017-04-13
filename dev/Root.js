import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import '../src/styles/boldrui.scss';
import {
  Grid,
  Paper,
  Loader,
  Col,
  Row,
  Footer,
  Heading,
  FormGroup,
  StatsWidget,
  Sidebar,
  DashboardFooter,
  Topbar,
} from '../src/components';
import Posts from './Posts';

const Title = styled.div`
    padding: 12px;
`;

const Separator = styled.div`
    padding-right: 12px;
`;
const SeparatorTitleContainer = styled.div`
    font-size: 14px;
    color: #AAA;
    margin: 10px 12px;
    padding: 4px 12px 2px;
`;

class Root extends Component {
  renderDashboad = () => {
    return <div>Dashboard</div>;
  };

  renderPosts = () => {
    return <Posts />;
  };

  renderProducts = () => {
    return <div>Products</div>;
  };

  render() {
    const testStats = {
      posts: 3,
      users: 4,
      tags: 3,
      dogs: 9,
      cats: 0,
    };
    const meOb = {
      avatarUrl: 'https://boldr.io/images/unknown-avatar.png',
      firstName: 'Me',
      username: 'someone',
    };
    return (
      <Router>
        <div className="boldrui-dash-wrapper boldrui-dash-topbar__fixed boldrui-dash-sidebar-fixed">
          <Topbar />
          <div className="boldrui-dash-body">
            <Sidebar
              links={ [
                {
                  text: 'New Post',
                  iconType: 'new-post',
                  key: 0,
                  id: 1,
                  exact: true,
                  link: '/sales',
                },
                {
                  text: 'Post Listing',
                  iconType: 'posts',
                  key: 1,
                  id: 2,
                  exact: true,
                  link: '/sales',
                  links: [
                    {
                      text: 'Post Listing',
                      iconType: 'posts',
                      key: 1.1,
                      id: 3,
                      exact: true,
                      link: '/products',
                    },
                    {
                      text: 'Post Listing',
                      iconType: 'posts',
                      key: 1.2,
                      id: 4,
                      exact: true,
                      link: '/products',
                    },
                  ],
                },
                {
                  text: 'Tags',
                  iconType: 'tags',
                  key: 2,
                  id: 5,
                  exact: true,
                  link: '/admin/tags',
                },
                {
                  text: 'File Manager',
                  iconType: 'folder-upload',
                  key: 3,
                  id: 6,
                  exact: true,
                  link: '/admin/filemanger',
                },
                {
                  text: 'Navigation Editor',
                  iconType: 'routes',
                  key: 4,
                  id: 7,
                  exact: true,
                  link: '/admin/navigation',
                },
                {
                  text: 'Members List',
                  iconType: 'account-card',
                  key: 5,
                  id: 8,
                  exact: true,
                  link: '/admin/members',
                },
                {
                  text: 'Site Settings',
                  iconType: 'settings',
                  key: 6,
                  id: 9,
                  exact: true,
                  link: '/admin/settings',
                },
              ] }
            />
            <main className="boldrui-dash-main">
              <Grid fluid>
                <Route exact path="/" render={ this.renderDashboad } />
                <Route path="/posts" render={ this.renderPosts } />
                <Route path="/posts/products" render={ this.renderDashboad } />
                <Route path="/products" render={ this.renderProducts } />
              </Grid>
            </main>
          </div>
          <DashboardFooter />
        </div>
      </Router>
    );
  }
}

export default Root;
