import React from 'react';
import BoldrComponent from '../util/BoldrComponent';
import Tooltip from '../Tooltip';
import IconButton from '../IconButton';
import Icon from '../Icons/Icon';
import MenuItem from './MenuItem';

class Menu extends BoldrComponent {
  static propTypes = {
    size: Tooltip.propTypes.size,
    placement: Tooltip.propTypes.placement,
    buttonTheme: IconButton.propTypes.theme,
  };

  static defaultProps = {
    size: 'normal',
    placement: 'top',
    buttonTheme: 'icon-standard',
  };

  render() {
    const menuItems = React.Children.map(this.props.children, (child, i) => {
      const { onClick, ...passThroughProps } = child.props;
      const onClickWithHide = () => {
        this.tooltip.hide();
        onClick();
      };
      return <MenuItem {...passThroughProps} onClick={onClickWithHide} key={i} />;
    });

    const tooltipContent = (
      <ul className="boldrui-menu">
        {menuItems}
      </ul>
    );

    return (
      <Tooltip
        ref={tooltip => {
          this.tooltip = tooltip;
        }}
        placement={this.props.placement}
        alignment="center"
        content={tooltipContent}
        showTrigger="click"
        hideTrigger="click"
        theme="light"
        size={this.props.size}
        shouldCloseOnClickOutside
      >
        <IconButton type="button" height="medium" theme={this.props.buttonTheme}>
          <Icon kind="more-vert" color="#222" />
        </IconButton>
      </Tooltip>
    );
  }
}

export default Menu;
