import React, { useState } from 'react';
import { Cascader } from '@tencent/tdesign-react';

export default function Example() {
  const value1 = '1.1';
  const value2 = ['1.1'];
  const [options] = useState([
    {
      label: '上海',
      value: '1',
      children: [
        {
          label: '黄浦区',
          value: '1.1',
        },
        {
          label: '静安区',
          value: '1.2',
        },
        {
          label: '浦东新区',
          value: '1.3',
        },
      ],
    },
    {
      label: '深圳',
      value: '2',
      children: [
        {
          label: '宝安区',
          value: '2.1',
        },
        {
          label: '南山区',
          value: '2.2',
        },
      ],
    },
  ]);

  const itemStyle = {
    marginTop: '16px',
  };

  return (
    <div className="tdesign-demo-block-column">
      <Cascader style={itemStyle} options={options} value={value1} disabled />
      <Cascader style={itemStyle} options={options} value={value2} disabled multiple />
    </div>
  );
}
