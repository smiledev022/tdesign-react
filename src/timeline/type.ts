/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, TElement } from '../common';

export interface TdTimeLineProps {
  /**
   * 时间信息放在时间轴的位置。纵向时间轴信息位置：左侧、右侧或两侧，默认信息在时间轴右侧。横向时间轴信息位置：上方、下方、两侧
   * @default right
   */
  align?: 'left' | 'right' | 'alternate' | 'top' | 'bottom';
  /**
   * 时间轴方向：水平方向、垂直方向
   * @default vertical
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 时间轴是否表现为倒序
   * @default false
   */
  reverse?: boolean;
  /**
   * 步骤条风格
   * @default default
   */
  theme?: 'default' | 'dot';
}

export interface TdTimeLineItemProps {
  /**
   * 时间信息相对于时间轴的位置，优先级高于 `TimeLine.align`
   */
  align?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * 描述内容，同 content
   */
  children?: TNode;
  /**
   * 时间轴颜色
   * @default ''
   */
  color?: string;
  /**
   * 描述内容
   */
  content?: TNode;
  /**
   * 用于自定义时间轴节点元素
   */
  dot?: TElement;
  /**
   * 当前步骤状态：默认状态（未开始）、进行中状态、完成状态
   */
  status?: 'default' | 'process' | 'finish';
  /**
   * 时间，可完全自定义
   */
  time?: TNode;
}
