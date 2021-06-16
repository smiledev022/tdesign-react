import React from 'react';
import classNames from 'classnames';
import { TdTabPanelProps } from '../_type/components/tabs';
import { Styles } from '../_type/common';
import { useTabClass } from './useTabClass';

export interface TabPanelProps extends TdTabPanelProps {
  style?: Styles;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { tdTabPanelClassPrefix } = useTabClass();

  const { style } = props;

  return (
    <div className={classNames(tdTabPanelClassPrefix)} style={style}>
      {props.children}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';

export default TabPanel;
