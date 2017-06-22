/* @flow */
import React from 'react';
import styled from 'styled-components';

const SbHeader = styled.div`
  display: flex;
  padding: 1em;
  background-color: #202b39;
  align-items: center;
`;

const SideNavHeader = ({ children }: ReactChildren) => {
  return (
    <SbHeader>
      {children}
    </SbHeader>
  );
};

export default SideNavHeader;
