import React from 'react';
import { NotificationPlugin, Button } from 'tdesign-react';

export default function NotificationExample() {
  const openNotification = React.useCallback(() => {
    const notification = NotificationPlugin.info({
      title: '信息',
      content: '这是一条可以自动关闭的消息通知',
      onCloseBtnClick: () => {
        notification.then((instance) => instance.close());
        NotificationPlugin.close(notification);
      },
    });
  }, []);

  return (
    <Button onClick={openNotification}>自由控制关闭时机</Button>
  );
}
