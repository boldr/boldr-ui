import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import { SlideLeft, SlideRight } from 'animate-components';
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
import DashboardContent from '../src/components/DashboardContent';
import DashboardWrapper from '../src/components/DashboardWrapper';

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
  state = {
    hidden: false,
  };

  renderDashboad = () => {
    return (
      <div>
        Today, April 7th 2017, WikiLeaks releases Vault 7 "Grasshopper" -- 27 documents from the CIA's Grasshopper framework, a platform used to build customized malware payloads for Microsoft Windows operating systems.

        Grasshopper is provided with a variety of modules that can be used by a CIA operator as blocks to construct a customized implant that will behave differently, for example maintaining persistence on the computer differently, depending on what particular features or capabilities are selected in the process of building the bundle. Additionally, Grasshopper provides a very flexible language to define rules that are used to "perform a pre-installation survey of the target device, assuring that the payload will only [be] installed if the target has the right configuration". Through this grammar CIA operators are able to build from very simple to very complex logic used to determine, for example, if the target device is running a specific version of Microsoft Windows, or if a particular Antivirus product is running or not.
      </div>
    );
  };

  renderPosts = () => {
    return <Posts />;
  };

  renderProducts = () => {
    return <div>Products</div>;
  };
  toggleSidebar = e => {
    this.setState({
      hidden: !this.state.hidden,
    });
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
      <div
        style={ {
          display: 'flex',
          height: '100%',
        } }
      >
        {!this.state.hidden ? <Sidebar /> : null}
        <DashboardWrapper>
          <Topbar toggleSidebar={ this.toggleSidebar } />
          <DashboardContent>
            <Grid fluid>
              <Route exact path="/" render={ this.renderDashboad } />

            </Grid>
          </DashboardContent>
          <DashboardFooter copyright="© 2017 Steven Truesdell" />
        </DashboardWrapper>
      </div>
    );
  }
}

export default Root;
