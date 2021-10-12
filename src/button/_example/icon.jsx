import React from 'react';
import { Button } from '@tencent/tdesign-react';
import { SearchIcon, AddIcon, CloudUploadIcon, DiscountIcon, CloudDownloadIcon } from '@tencent/tdesign-icons-react';

export default function ButtonExample() {
  return (
    <div className="tdesign-demo-block-row">
      <Button icon={<AddIcon />}>新建</Button>
      <Button variant="outline" icon={<CloudUploadIcon />}>
        上传文件
      </Button>
      <Button shape="circle" icon={<DiscountIcon />} />
      <Button shape="circle" icon={<CloudDownloadIcon />} />
      <Button theme="default" variant="outline" icon={<SearchIcon />}>
        Function Icon
      </Button>
    </div>
  );
}
