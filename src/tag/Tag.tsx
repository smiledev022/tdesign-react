import React from 'react';
import classNames from 'classnames';
import noop from '../_util/noop';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import useConfig from '../_util/useConfig';
import { StyledProps } from '../_type';
import { Icon } from '../icon';
import CheckTag from './CheckTag';

/**
 * Tag 组件支持的属性。
 */
export interface TagProps extends StyledProps {
  /**
   * 标签类型
   *
   *  @default 'middle'
   */
  theme?: string;

  /**
   * 按钮大小
   *
   * @default 'middle'
   */
  size?: 'large' | 'middle' | 'small';

  /**
   * 设置按钮为禁用状态
   *
   * @default false
   * */
  disabled?: boolean;

  /**
   * 设置按钮为禁用状态
   *
   *@default false
   * */
  closable?: boolean;

  /**
   * 最大长度
   */
  maxWidth?: React.CSSProperties['maxWidth'];

  /**
   * 形状
   *
   * @default 'square'
   */
  shape?: 'square' | 'round' | 'mark';

  /**
   * 样式模式
   *
   * @default 'dark'
   */
  effect?: 'dark' | 'light' | 'plain';

  /**
   * 点击回调函数
   */
  onClick?: (e?: React.MouseEvent) => void;

  /**
   * 标签中的图标，可自定义图标呈现。类型为 String 表示可以传入“x”或“关闭”等文本内容。TS 类型：String | TNode。
   */
  icon?: string | React.ReactNode;

  /**
   * 关闭回调函数
   */
  onClose?: (e?: React.MouseEvent) => void;

  /**
   * 标签内容
   */
  children?: React.ReactNode;
}

/**
 * 标签组件
 */
const Tag = forwardRefWithStatics(
  (props: TagProps, ref: React.Ref<HTMLSpanElement>) => {
    const {
      theme = 'default',
      size = 'middle',
      effect = 'dark',
      shape = 'square',
      closable,
      disabled,
      maxWidth,
      icon,
      onClick = noop,
      onClose = noop,
      className,
      style,
      children,
      ...otherTagProps
    } = props;

    const { classPrefix } = useConfig();
    const tagClassPrefix = `${classPrefix}-tag`;

    const sizeMap = {
      large: `${classPrefix}-size-l`,
      small: `${classPrefix}-size-s`,
    };

    const tagClassNames = classNames(
      tagClassPrefix,
      `${tagClassPrefix}--${theme}`,
      `${tagClassPrefix}--${effect}`,
      `${tagClassPrefix}--${size}`,
      `${tagClassPrefix}--${shape}`,
      {
        [`${tagClassPrefix}--ellipsis`]: !!maxWidth,
        [`${tagClassPrefix}--disabled`]: disabled,
      },
      sizeMap[size],
      className,
    );

    const renderIcon = () => {
      if (typeof icon === 'string') {
        return <Icon name={icon} />;
      }
      return icon;
    };

    /**
     * 删除 Icon
     */
    const deleteIcon = <Icon name="close" onClick={onClose} />;

    const tag: JSX.Element = (
      <span
        ref={ref}
        className={tagClassNames}
        onClick={!disabled && onClick}
        style={{ ...(style || {}), ...{ maxWidth } }}
        {...otherTagProps}
      >
        {renderIcon()}
        {children}
        {closable && deleteIcon}
      </span>
    );

    return tag;
  },
  {
    CheckTag,
  },
);

Tag.displayName = 'Tag';

export default Tag;
