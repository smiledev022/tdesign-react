import React from 'react';
import isString from 'lodash/isString';
import Button from '../button/Button';
import InfoCircleFilledIcon from '../icon/icons/InfoCircleFilledIcon';
import noop from '../_util/noop';
import useConfig from '../_util/useConfig';
import { PopConfirmProps } from './PopConfirm';

const PopContent = (props: PopConfirmProps & { onClose?: () => void }) => {
  const { content, cancelBtn, confirmBtn, icon, theme, onCancel = noop, onConfirm = noop, onClose = noop } = props;
  const { classPrefix } = useConfig();

  function renderIcon() {
    let color = '#0052D9';
    // theme 为 default 时不展示图标，否则根据 theme 的值设置图标颜色样式
    const defaultIcon = theme === 'default' ? null : <InfoCircleFilledIcon />;

    switch (theme) {
      case 'warning': // 黄色
        color = '#FFAA00';
        break;
      case 'danger':
        color = '#FF3E00'; // 红色
        break;
    }

    let iconComponent = null;

    // icon 是自定义组件实例，优先级最高
    if (React.isValidElement(icon)) {
      iconComponent = React.cloneElement(icon, {
        style: { color },
        ...icon.props,
      });
      // icon 是自定义组件类型
    } else if (typeof icon === 'function') {
      iconComponent = icon();
    } else if (defaultIcon) {
      iconComponent = React.cloneElement(defaultIcon, {
        style: { color },
      });
    }
    return iconComponent;
  }

  function renderCancel() {
    if (React.isValidElement(cancelBtn)) {
      return React.cloneElement(cancelBtn, {
        onClick: (e) => {
          onClose();
          cancelBtn.props?.onClick(e);
        },
      });
    }

    return (
      <Button
        size="small"
        variant="outline"
        onClick={(e) => {
          onClose();
          onCancel({ e });
        }}
      >
        {isString(cancelBtn) ? cancelBtn : '取消'}
      </Button>
    );
  }

  function renderConfirm() {
    if (React.isValidElement(confirmBtn)) {
      return React.cloneElement(confirmBtn, {
        onClick: (e) => {
          onClose();
          confirmBtn.props?.onClick(e);
        },
      });
    }

    return (
      <Button
        size="small"
        theme="primary"
        onClick={(e) => {
          onClose();
          onConfirm({ e });
        }}
      >
        {isString(confirmBtn) ? confirmBtn : '确定'}
      </Button>
    );
  }

  return (
    <div className={`${classPrefix}-popconfirm__content`}>
      <div className={`${classPrefix}-popconfirm__body`}>
        {renderIcon()}
        <div className={`${classPrefix}-popconfirm__inner`}>{content}</div>
      </div>
      <div className={`${classPrefix}-popconfirm__buttons`}>
        {renderCancel()}
        {renderConfirm()}
      </div>
    </div>
  );
};

PopContent.displayName = 'PopContent';

export default PopContent;
