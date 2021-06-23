import React from 'react';
import { MenuValue } from '../../_type/components/menu/index';
import { checkIsSubMenu } from './checkMenuType';
import checkSubMenuChildrenActive from './checkSubMenuChildrenActive';

const checkSubMenuActive = (children: React.ReactNode, active: MenuValue) => React.Children.toArray(children).find(
  (child: React.ReactElement) => checkIsSubMenu(child)
      && (child.props.value === active || checkSubMenuChildrenActive(child.props.children, active)),
);
export default checkSubMenuActive;
