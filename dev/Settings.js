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
} from '../src';
import {
  ExpandablePanel,
  HeaderPanel,
  SettingsGroup,
  SettingsItem,
  SettingsPanel,
} from '../src/components/ExpandablePanel';
import TopbarLink from '../src/components/Topbar/TopbarLink';
import menuItems from './items';
import NewPostForm from './NewPostForm';

class Settings extends Component {
  state = {
    hidden: false,
    activate: null,
    modalIsOpen: false,
  };
  render() {
    return (
    <div>
<SettingsPanel>
          <HeaderPanel
            title="Gmail"
            subtitle="Für alle aktiviert"
            description="https://mail.google.com/a/company.com"
            image={<img src="https://ssl.gstatic.com/apps/cpanel/resources/img/gmail-128.png" />}
          />
          <ExpandablePanel
            title="Nutzer Einstellungen"
            description="Sed diam nonumy eirmod tempor invidunt ut labore"
          >
            <SettingsGroup title="Lorem ipsum">
              <SettingsItem title="Lorem ipsum" description="Description">
                <div>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                  sed diam nonumy eirmod tempor invidunt ut labore
                  et dolore magna aliquyam erat, sed diam voluptua.
                </div>
              </SettingsItem>
              <SettingsItem title="Lorem ipsum">
                <div>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                  sed diam nonumy eirmod tempor invidunt ut labore
                  et dolore magna aliquyam erat, sed diam voluptua.
                </div>
              </SettingsItem>
            </SettingsGroup>
          </ExpandablePanel>
          <ExpandablePanel
            title="E-Mail-Adressen"
            description="Lassen Sie sich alle E-Mail-Adressen und Aliase für Ihre Organisation anzeigen."
          >
          </ExpandablePanel>
        </SettingsPanel>
    </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ui: state.ui,
    routing: state.routing,
  };
};
export default connect(mapStateToProps)(Settings);
