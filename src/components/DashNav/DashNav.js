import React from 'react';
import RcMenu, { Item, Divider, SubMenu, ItemGroup } from 'rc-menu';
import animation from '../../util/animation';

type Props = {
  id: ?string,
  theme?: 'light' | 'dark',
  mode?: 'vertical' | 'horizontal' | 'inline',
  selectedKeys?: Array<string>,
  defaultSelectedKeys?: Array<string>,
  openKeys?: Array<string>,
  defaultOpenKeys?: Array<string>,
  onOpenChange?: (openKeys: string[]) => void,
  onSelect?: (param: SelectParam) => void,
  onDeselect?: (param: SelectParam) => void,
  onClick?: (param: ClickParam) => void,
  style?: React.CSSProperties,
  openAnimation?: string | Object,
  openTransitionName?: string | Object,
  className?: string,
  prefixCls?: string,
  multiple?: boolean,
};

class DashNav extends React.Component {
  static Divider = Divider;
  static Item = Item;
  static SubMenu = SubMenu;
  static ItemGroup = ItemGroup;
  static defaultProps = {
    prefixCls: 'boldrui-dash-nav',
    className: '',
    theme: 'light', // or dark
  };
  constructor(props) {
    super(props);
    let openKeys;
    if ('defaultOpenKeys' in props) {
      openKeys = props.defaultOpenKeys;
    } else if ('openKeys' in props) {
      openKeys = props.openKeys; // eslint-disable-line
    }

    this.state = {
      openKeys: openKeys || [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.mode === 'inline' && nextProps.mode !== 'inline') {
      this.switchModeFromInline = true;
    }
    if ('openKeys' in nextProps) {
      this.setState({ openKeys: nextProps.openKeys });
    }
  }
  handleClick = e => {
    this.setOpenKeys([]);

    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };
  handleOpenChange = (openKeys: string[]) => {
    this.setOpenKeys(openKeys);

    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(openKeys);
    }
  };
  setOpenKeys(openKeys) {
    if (!('openKeys' in this.props)) {
      this.setState({ openKeys });
    }
  }
  props: Props;
  render() {
    let openAnimation = this.props.openAnimation || this.props.openTransitionName;
    if (this.props.openAnimation === undefined && this.props.openTransitionName === undefined) {
      switch (this.props.mode) {
        case 'horizontal':
          openAnimation = 'slide-up';
          break;
        case 'vertical':
          // When mode switch from inline
          // submenu should hide without animation
          if (this.switchModeFromInline) {
            openAnimation = '';
            this.switchModeFromInline = false;
          } else {
            openAnimation = 'zoom-big';
          }
          break;
        case 'inline':
          openAnimation = animation;
          break;
        default:
      }
    }

    let props = {};
    const className = `${this.props.className} ${this.props.prefixCls}-${this.props.theme}`;
    if (this.props.mode !== 'inline') {
      // There is this.state.openKeys for
      // closing vertical popup submenu after click it
      props = {
        openKeys: this.state.openKeys,
        onClick: this.handleClick,
        onOpenChange: this.handleOpenChange,
        openTransitionName: openAnimation,
        className,
      };
    } else {
      props = {
        openAnimation,
        className,
      };
    }
    return <RcMenu { ...this.props } { ...props } />;
  }
}
export default DashNav;
