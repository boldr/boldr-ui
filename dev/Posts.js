import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

class Posts extends React.Component {
  componentWillUnmount() {
    console.log('Posts Will Unmount');
  }

  render() {
    return <div>Posts</div>;
  }
}


export default Posts;
