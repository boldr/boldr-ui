import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Editor, Raw } from 'slate';
import { Grid, Col, Row } from '../src/components/Layout';
import initialState from './state.json';

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
const DEFAULT_NODE = 'paragraph';

const schema = {
  nodes: {
    'block-quote': props => (
      <blockquote {...props.attributes}>{props.children}</blockquote>
    ),
    div: props => <div {...props.attributes}>{props.children}</div>,
    paragraph: props => <p {...props.attributes}>{props.children}</p>,
    'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
    'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
    'heading-three': props => <h3 {...props.attributes}>{props.children}</h3>,
    'heading-four': props => <h4 {...props.attributes}>{props.children}</h4>,
    'heading-five': props => <h5 {...props.attributes}>{props.children}</h5>,
    'heading-six': props => <h6 {...props.attributes}>{props.children}</h6>,
    'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
    'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
    'list-item': props => <li {...props.attributes}>{props.children}</li>,
    'table-body': props => (
      <tbody {...props.attributes}>{props.children}</tbody>
    ),
    table: props => <table {...props.attributes}>{props.children}</table>,
    'table-row': props => <tr {...props.attributes}>{props.children}</tr>,
    'table-cell': props => <td {...props.attributes}>{props.children}</td>,
    'table-head': props => <th {...props.attributes}>{props.children}</th>,
  },
  marks: {
    bold: {
      fontWeight: 'bold',
    },
    code: {
      fontFamily: 'monospace',
      backgroundColor: '#eee',
      padding: '3px',
      borderRadius: '4px',
    },
    italic: {
      fontStyle: 'italic',
    },
    underlined: {
      textDecoration: 'underline',
    },
  },
};

class Posts extends React.Component {
  state = {
    state: Raw.deserialize(initialState, { terse: true }),
  };

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { state } = this.state;
    return state.marks.some(mark => mark.type == type);
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { state } = this.state;
    return state.blocks.some(node => node.type === type);
  };

  /**
   * On change, save the new state.
   *
   * @param {State} state
   */

  onChange = state => {
    this.setState({ state });
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} e
   * @param {Object} data
   * @param {State} state
   * @return {State}
   */

  onKeyDown = (e, data, state) => {
    if (!data.isMod) return;
    let mark;

    switch (data.key) {
      case 'b':
        mark = 'bold';
        break;
      case 'i':
        mark = 'italic';
        break;
      case 'u':
        mark = 'underlined';
        break;
      case '`':
        mark = 'code';
        break;
      default:
        return;
    }

    state = state.transform().toggleMark(mark).apply();

    e.preventDefault();
    return state;
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} e
   * @param {String} type
   */

  onClickMark = (e, type) => {
    e.preventDefault();
    let { state } = this.state;

    state = state.transform().toggleMark(type).apply();

    this.setState({ state });
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} e
   * @param {String} type
   */

  onClickBlock = (e, type) => {
    e.preventDefault();
    let { state } = this.state;
    const transform = state.transform();
    const { document } = state;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        transform.setBlock(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = state.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        transform
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        transform
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list',
          )
          .wrapBlock(type);
      } else {
        transform.setBlock('list-item').wrapBlock(type);
      }
    }

    state = transform.apply();
    this.setState({ state });
  };

  /**
   * Render.
   *
   * @return {Element}
   */

  render = () => {
    return (
      <div style={{ paddingTop: '100px' }}>
        <Grid>
          {this.renderToolbar()}
          {this.renderEditor()}
        </Grid>
      </div>
    );
  };

  /**
   * Render the toolbar.
   *
   * @return {Element}
   */

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('heading-one', 'looks_one')}
        {this.renderBlockButton('heading-two', 'looks_two')}
        {this.renderBlockButton('block-quote', 'format_quote')}
        {this.renderBlockButton('numbered-list', 'format_list_numbered')}
        {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
      </div>
    );
  };

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    const onMouseDown = e => this.onClickMark(e, type);

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  };

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type);
    const onMouseDown = e => this.onClickBlock(e, type);

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  };

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          spellCheck
          placeholder={'Enter some rich text...'}
          schema={schema}
          state={this.state.state}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  };
}

export default Posts;
