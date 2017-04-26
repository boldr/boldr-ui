/* eslint-disable react/prop-types, react/no-unescaped-entities */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';

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
  Form,
  Input,
  Grid, Col, Row,
} from '../src/components';
import TopbarLink from '../src/components/Topbar/TopbarLink';
import menuItems from './items';
import Posts from './Posts';
import NewPost from './NewPost';

injectGlobal`
  body {
    margin: 0;
  }
`;
class App extends Component {
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
              <Heading size={1}>Hive</Heading>
              <Paragraph> Hello</Paragraph>
              <Paragraph>
                Today, April 14th 2017, WikiLeaks publishes six documents from
                 the
                CIA's HIVE project created by its "Embedded Development Branch"
                (EDB).
              </Paragraph>
              <Paragraph>
                HIVE is a back-end infrastructure malware with a public-facing
                HTTPS interface which is used by CIA implants to transfer
                exfiltrated information from target machines to the CIA and
                to receive commands from its operators to execute specific
                tasks on the targets. HIVE is used across multiple malware
                implants and CIA operations. The public HTTPS interface utilizes
                 unsuspicious-looking cover domains to hide its presence.

              </Paragraph>
              <Paragraph>
                Anti-Virus companies and forensic experts have noticed that some
                possible state-actor malware used such kind of back-end
                infrastructure by analyzing the communication behaviour of
                these specific implants, but were unable to attribute the
                back-end (and therefore the implant itself) to operations
                run by the CIA. In a recent blog post by Symantec, that was
                able to attribute the "Longhorn" activities to the CIA based
                 on the Vault 7, such back-end infrastructure is described:

              </Paragraph>
              <Paragraph>
                For C&C servers, Longhorn typically configures a specific
                domain and IP address combination per target. The domains
                appear to be registered by the attackers; however they use
                privacy services to hide their real identity. The IP addresses
                 are typically owned by legitimate companies offering virtual
                 private server (VPS) or webhosting services. The malware
                  communicates with C&C servers over HTTPS using a custom
                   underlying cryptographic protocol to protect communications
                   from identification.

                The documents from this publication might further enable
                anti-malware researchers and forensic experts to analyse
                this kind of communication between malware implants and
                back-end servers used in previous illegal activities.

              </Paragraph>
            </DashboardContent>
            <DashboardFooter copyright="© 2017 Steven Truesdell" />
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
export default connect(mapStateToProps)(App);
