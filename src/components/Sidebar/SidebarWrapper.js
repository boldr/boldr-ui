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
  padding-bottom: 16px;
  width: 240px;
  background: ${props => props.sidebarDark ? '#2D343C' : '#fff'};
  box-shadow: 1px 0 2px rgba(0,0,0,.15);
  color: #a8acb1;
  flex-direction: column;
  transition: width .3s cubic-bezier(0,0,.2,1);
  white-space: nowrap;
  `;
  return (
    <SidebarWrap { ...props }>
      {props.children}
    </SidebarWrap>
  );
};
SidebarWrapper.defaultProps = {
  sidebarDark: true,
};
export default SidebarWrapper;
