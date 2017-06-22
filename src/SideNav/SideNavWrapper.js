/* @flow */
import React from 'react';
import styled from 'styled-components';

const SidebarBase = styled.div`
  display: inline-block;
  padding-bottom: 16px;
  font-family: 'Roboto';
  width: 240px;
  height: 100%;
  background-color: #273647;
  color: #fff;
`;

const SideNavWrapper = ({ children }: ReactChildren) => {
  return (
    <SidebarBase>
      {children}
    </SidebarBase>
  );
};

export default SideNavWrapper;
