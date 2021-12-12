/* eslint-disable indent */
/* eslint-disable no-param-reassign */
import path from 'path';
import fs from 'fs';

import mdToReact from './md-to-react';

let demoImports = {};
let demoCodesImports = {};

const transformDemo = ['table'];

export default {
  before({ source, file }) {
    const resouceDir = path.dirname(file);
    const reg = file.match(/src\/(\w+-?\w+)\/(\w+-?\w+)\.md/);
    const name = reg && reg[1];
    demoImports = {};
    demoCodesImports = {};

    // 统一换成 iwiki 文档内容
    if (name && source.includes(':: BASE_DOC ::')) {
      const docPath = path.resolve(__dirname, `../../src/_common/docs/web/api/${name}.md`);
      if (fs.existsSync(docPath)) {
        const baseDoc = fs.readFileSync(docPath, 'utf-8');
        source = source.replace(':: BASE_DOC ::', baseDoc);
      } else {
        console.error(`未找到 ${docPath} 文件`);
      }
    }

    // 替换成对应 demo 文件
    source = source.replace(/\{\{\s+(.+)\s+\}\}/g, (demoStr, demoFileName) => {
      const demoPath = path.resolve(resouceDir, `./_example/${demoFileName}.jsx`);
      if (!fs.existsSync(demoPath)) {
        console.log('\x1B[36m%s\x1B[0m', `${name} 组件需要实现 _example/${demoFileName}.jsx 示例!`);
        return '\n<h3>DEMO (🚧建设中）...</h3>';
      }

      return `\n::: demo _example/${demoFileName} ${name}\n:::\n`;
    });

    source.replace(/:::\s*demo\s+([\\/.\w-]+)/g, (demoStr, relativeDemoPath) => {
      const demoPathOnlyLetters = relativeDemoPath.replace(/[^a-zA-Z\d]/g, '');
      const demoDefName = `Demo${demoPathOnlyLetters}`;
      const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;
      demoImports[demoDefName] = `import ${demoDefName} from './${relativeDemoPath}';`;
      demoCodesImports[demoCodeDefName] = `import ${demoCodeDefName} from './${relativeDemoPath}?raw';`;
    });

    // fix table | render error、jsx { } render error
    source = source.replace(/`([^`]+)`/g, (str, codeStr) => {
      codeStr = codeStr.replace(/\|/g, '\\|');
      return `<td-code text="${codeStr}"></td-code>`;
    });

    return source;
  },
  render({ source, file, md }) {
    const demoDefsStr = Object.keys(demoImports)
      .map((key) => demoImports[key])
      .join('\n');
    const demoCodesDefsStr = Object.keys(demoCodesImports)
      .map((key) => demoCodesImports[key])
      .join('\n');

    const sfc = mdToReact({
      md,
      file,
      source,
      demoDefsStr,
      demoCodesDefsStr,
    });

    return sfc;
  },
};
