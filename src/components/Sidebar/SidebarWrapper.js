import React from 'react';
import styled from 'styled-components';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  children: ReactChildren,
  sidebarDark: boolean,
};

const SidebarWrapper = (props: Props) => {
  const SidebarWrap = styled.aside`
  display: inline-block;
  width: 240px;
  background: ${props => (props.sidebarDark ? '#333c44' : '#fff')};
  box-shadow: 1px 0 2px rgba(0,0,0,.15);
  color: #a8acb1;
  flex-direction: column;
  -webkit-transition: 300ms ease-out all; transition: 300ms ease-out all;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  white-space: nowrap;
  `;
  return (
    <SidebarWrap {...props}>
      {props.children}
    </SidebarWrap>
  );
};
SidebarWrapper.defaultProps = {
  sidebarDark: true,
};
export default SidebarWrapper;
