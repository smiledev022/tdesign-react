import React, { useState } from 'react';
import { Affix, Button } from '@tencent/tdesign-react';

export default function BaseExample() {
  const [top, setTop] = useState(150);

  const handleClick = () => {
    setTop(top + 10);
  };

  return (
    <Affix offsetTop={top} offsetBottom={10}>
      <Button onClick={handleClick}>Base</Button>
    </Affix>
  );
}
