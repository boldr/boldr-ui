/* @flow */
/* eslint-disable react/no-find-dom-node, react/prop-types */
import React from 'react';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import { font, palette } from 'styled-theme';
import Headline from '../Headline';
import Icon from '../Icons';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  children: ReactChildren,
  title: string,
  closeable: boolean,
  reverse: boolean,
  onClose: () => void,
};

const overlayStyles = css`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9999;
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[class*="after-open"] {
    opacity: 1;
  }
  &[class*="before-close"] {
    opacity: 0;
  }
`;
// $FlowIssue
const ModalBox = styled(ReactModal)`
  position: absolute;
  display: flex;
  flex-direction: column;
  font-family: ${font('primary')};
  font-size: 1rem;
  background-color: ${palette('grayscale', 0, true)};
  border-radius: 0.125em;
  color: ${palette('grayscale', 0)};
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  right: auto;
  bottom: auto;
  margin: 1rem calc(-50% + 1rem) 1rem 1rem;
  transform: translate(-50%, 100%);
  transition: transform 250ms ease-in-out;
  outline: none;
  box-sizing: border-box;
  min-width: 320px;
  max-width: calc(640px - 1rem);
  max-height: calc(100% - 1rem);
  padding-top: ${({ hasHeader }) => (hasHeader ? 0 : '1rem')};
  @media screen and (max-width: 640px) {
    width: calc(100% - 1rem);
    min-width: 0;
  }
  &[class*="after-open"] {
    transform: translate(-50%, -50%);
  }
  &[class*="before-close"] {
    transform: translate(-50%, 100%);
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  > *:first-child {
    flex: 1;
  }
`;

const StyledHeading = styled(Headline)`
  margin: 0 1rem 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Content = styled.div`
  overflow: auto;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;
// $FlowIssue
const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`${overlayStyles}`;
// $FlowIssue
const Dialog = ({ children, title, closeable, onClose, ...props }) => {
  const hasHeader = title || closeable;
  return (
    <StyledReactModal
      contentLabel={title || 'Modal'}
      onRequestClose={onClose}
      hasHeader={hasHeader}
      {...props}
    >
      {hasHeader &&
        <Header>
          <StyledHeading type="h2" reverse={props.reverse}>
            {title}
          </StyledHeading>
          {closeable && <Icon kind="close" color="#222" onClick={onClose} />}
        </Header>}
      <Content>
        {children}
      </Content>
    </StyledReactModal>
  );
};

export default Dialog;
