import React, { useState } from 'react';

import { Select } from 'tdesign-react';
import { BrowseIcon } from 'tdesign-icons-react';

const { Option } = Select;

const SelectPrefix = () => {
  const [value, setValue] = useState('apple');
  const onChange = (value) => {
    setValue(value);
  };
  return (
    <Select value={value} onChange={onChange} style={{ width: '40%' }} prefixIcon={<BrowseIcon />}>
      <Option key="apple" label="Apple" value="apple" />
      <Option key="orange" label="Orange" value="orange" disabled />
      <Option key="banana" label="Banana" value="banana" />
    </Select>
  );
};

export default SelectPrefix;
