/* @flow */
import React, { Component } from 'react';
import { IconButton, Paper } from 'material-ui';
import * as colors from 'material-ui/styles/colors';
import enhanceWithClickOutside from 'react-click-outside';
import type { ReactChildren } from '../../types/react.js.flow';
import Text from './Text';

const styles = {
  root: {
    padding: '25px 50px',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
};

type Props = {
  title: string,
  description: string,
  textStyle: Object,
  style: Object,
  children: ReactChildren,
};

type State = {
  expanded: boolean,
  hovered: boolean,
};

class ExpandablePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      hovered: false,
    };
  }
  state: State;
  handleClickOutside() {
    this.setState({ expanded: false });
  }
  handleMouseEnter = () => {
    this.setState({ hovered: true });
  };
  handleMouseLeave = () => {
    this.setState({ hovered: false });
  };
  handleTouch = () => {
    this.setState({ expanded: true });
  };
  props: Props;

  render() {
    return (
      <Paper
        style={
          this.state.expanded
            ? {
                margin: '40px -20px',
              }
            : {
                ...styles.root,
                cursor: 'pointer',
                backgroundColor: this.state.hovered
                  ? colors.grey200
                  : colors.white,
                ...this.props.style,
              }
        }
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleTouch}
      >
        {this.state.expanded
          ? <div>
              <div
                style={{
                  padding: '16px 20px',
                }}
              >
                <Text type="title">
                  {this.props.title}
                </Text>
              </div>
              {this.props.children}
            </div>
          : <div
              style={{
                ...styles.text,
                ...this.props.textStyle,
              }}
            >
              <Text type="body1">
                {this.props.title}
              </Text>
              <Text type="caption">
                {this.props.description}
              </Text>
            </div>}
      </Paper>
    );
  }
}

export default enhanceWithClickOutside(ExpandablePanel);
