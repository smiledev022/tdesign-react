import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import { TreeNode, CascaderContextType, CascaderProps, ContextType } from '../interface';

/**
 * 面板数据计算方法
 * @param treeNodes
 * @returns
 */
export function getPanels(treeNodes: CascaderContextType['treeNodes']) {
  const panels: TreeNode[][] = [];
  treeNodes.forEach((node: TreeNode) => {
    if (panels[node.level]) {
      panels[node.level].push(node);
    } else {
      panels[node.level] = [node];
    }
  });
  return panels;
}

/**
 * 点击item的副作用
 * @param propsTrigger
 * @param trigger
 * @param node
 * @param cascaderContext
 * @param onChange
 * @param ctx
 */
export function expendClickEffect(
  propsTrigger: CascaderProps['trigger'],
  trigger: CascaderProps['trigger'],
  node: TreeNode,
  cascaderContext: CascaderContextType,
  onChange: CascaderProps['onChange'],
  ctx: any,
) {
  const {
    checkStrictly,
    filterActive,
    multiple,
    treeStore,
    setFilterActive,
    setVisible,
    setModel,
    setTreeNodes,
    setExpend,
  } = cascaderContext;

  // 点击展开节点，设置展开状态
  if (propsTrigger === trigger && !node.isLeaf()) {
    const expanded = node.setExpanded(true);
    treeStore.refreshNodes();
    treeStore.replaceExpanded(expanded);
    const nodes = treeStore.getNodes().filter((node: TreeNode) => node.visible);
    setTreeNodes(nodes);

    // 多选条件下手动维护expend
    if (multiple) {
      setExpend(expanded);
    }
  }

  if (!multiple && (node.isLeaf() || checkStrictly) && trigger === 'click') {
    treeStore.resetChecked();
    const checked = node.setChecked(!node.isChecked());
    const [value] = checked;

    if (onChange && isFunction(onChange)) {
      onChange(value, ctx);
    }

    // 过滤状态下，点击后清除过滤状态
    if (filterActive) {
      setFilterActive(false);
    }

    // 非过滤状态下，关闭
    if (!filterActive) {
      setVisible(false);
    }

    // 非受控状态下更新状态
    setModel(value);
  }
}

/**
 * 多选状态下选中状态数据变化的副作用
 * @param node
 * @param cascaderContext
 * @param onChange
 * @param ctx
 * @returns
 */
export function valueChangeEffect(
  node: TreeNode,
  cascaderContext: CascaderContextType,
  onChange: CascaderProps['onChange'],
  ctx: ContextType,
) {
  const { disabled, max, multiple, setVisible, setModel, filterActive, setFilterActive, treeNodes, treeStore } =
    cascaderContext;

  if (!node || disabled || node.disabled) {
    return;
  }
  const checked = node.setChecked(!node.isChecked());

  if (isNumber(max) && max < 0) {
    console.warn('max should > 0');
  }

  if (checked.length > max && isNumber(max) && max > 0) {
    return;
  }

  if (checked.length === 0) {
    const expanded = treeStore.getExpanded();
    setTimeout(() => {
      treeStore.replaceExpanded(expanded);
      treeStore.refreshNodes();
    }, 0);
  }

  if (!multiple) {
    setVisible(false);
  }

  const isSelectAll = treeNodes.every((item) => checked.indexOf(item.value) > -1);

  if (filterActive && isSelectAll) {
    setVisible(false);
    setFilterActive(false);
  }

  setModel(checked);

  if (onChange && isFunction(onChange)) {
    onChange(checked, ctx);
  }
}
