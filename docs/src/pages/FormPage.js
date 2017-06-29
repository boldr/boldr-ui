import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';

import {
  Button,
  Headline,
  Tooltip,
  Grid,
  Tag,
  Col,
  Icon,
  Row,
  ImageDisplay,
  Paper,
  Media,
  MediaOverlay,
  Topbar,
  TopbarLink,
  ResponsiveImage,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Navbar,
} from 'boldr-ui';

const Spacer = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 20px;
`;

class FormPage extends React.Component {
  render() {
    return <div>form page</div>;
  }
}
FormPage.propTypes = {
  classes: PropTypes.object,
};

export default FormPage;
