import React, { useState } from 'react';
import { Tabs, TabPanel, Button } from '@tencent/tdesign-react';

export default function IconTabs() {
  const [isCard, setIsCard] = useState(false);
  const desc = `切换到${isCard ? '常规型' : '卡片型'}`;
  const theme = isCard ? 'card' : 'normal';
  const toggle = () => {
    setIsCard(!isCard);
  };
  return (
    <>
      <Button theme="line" onClick={toggle}>
        {desc}
      </Button>
      <Tabs tabPosition={'top'} size={'middle'} theme={theme}>
        <TabPanel name={'a'} label={'a'}>
          <div style={{ margin: 20 }}>a</div>
        </TabPanel>
        <TabPanel name={'b'} label={'b'}>
          <div style={{ margin: 20 }}>b</div>
        </TabPanel>
      </Tabs>
    </>
  );
}
