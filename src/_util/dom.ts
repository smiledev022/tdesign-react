import isString from 'lodash/isString';
import { ScrollContainer, ScrollContainerElement } from '../_type/common';

const trim = (str: string): string => (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');

function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return ` ${el.className} `.indexOf(` ${cls} `) > -1;
}

export const addClass = function (el: Element, cls: string) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`;
    }
  }
  if (!el.classList) {
    // eslint-disable-next-line
    el.className = curClass;
  }
};

export const removeClass = function (el: Element, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ');
    }
  }
  if (!el.classList) {
    // eslint-disable-next-line
    el.className = trim(curClass);
  }
};

/**
 * 获取滚动容器
 * 因为document不存在scroll等属性, 因此排除document
 * window | HTMLElement
 * @param {ScrollContainerElement} [container='body']
 * @returns {ScrollContainer}
 */
export const getScrollContainer = (container: ScrollContainer = 'body'): ScrollContainerElement => {
  if (isString(container)) {
    return container ? (document.querySelector(container) as HTMLElement) : window;
  }
  if (typeof container === 'function') {
    return container();
  }
  return container;
};

export const getAttach = (node: any): HTMLElement => {
  const attachNode = typeof node === 'function' ? node() : node;
  if (!attachNode) {
    return document.body;
  }
  if (isString(attachNode)) {
    return document.querySelector(attachNode);
  }
  if (attachNode instanceof HTMLElement) {
    return attachNode;
  }
  return document.body;
};
