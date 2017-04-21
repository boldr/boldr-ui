import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Col, Row } from '../src/components/Layout';

const Box = styled.div`
  position: relative;
      box-sizing: border-box;
      min-height: 2rem;
      line-height: 2rem;
      margin-bottom: 1rem;
      background: #00A8EF;
      border-radius: 2px;
      overflow: hidden;
      text-align:center;
      color: #fff;

`;

class Posts extends React.Component {
  componentWillUnmount() {
    console.log('Posts Will Unmount');
  }

  render() {
    return (
      <div>
        <Grid fluid>
         <Row>
           <Col xs={12} sm={3} md={2} lg={1}>
             <Box />
           </Col>
           <Col xs={6} sm={6} md={8} lg={10}>
             <Box />
           </Col>
           <Col xs={6} sm={3} md={2} lg={1}>
             <Box />
           </Col>
         </Row>
         <Row>
           <Col xs={12} sm={3} md={2} lg={1}>
             <Box />
           </Col>
           <Col xs={12} sm={9} md={10} lg={11}>
             <Box />
           </Col>
         </Row>
         <Row>
           <Col xs={10} sm={6} md={8} lg={10}>
             <Box />
           </Col>
           <Col xs={2} sm={6} md={4} lg={2}>
             <Box />
           </Col>
         </Row>
       </Grid>
      </div>
    );
  }
}

export default Posts;
