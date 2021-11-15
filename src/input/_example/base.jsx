import React, { useState } from 'react';
import { Input } from 'tdesign-react';

export default function InputExample() {
  const [value, onChange] = useState('Welcome to TDesign');

  return (
    <div className="tdesign-demo-item--input__input-box">
      <Input
        placeholder="请输入内容（无默认值）"
        onChange={(value) => {
          console.log(value);
        }}
      />
      <Input
        placeholder="请输入内容（有默认值）"
        value={value}
        onChange={(value) => {
          onChange(value);
        }}
        onEnter={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}
