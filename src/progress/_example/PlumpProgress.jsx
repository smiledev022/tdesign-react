import React from 'react';
import Progress from '../Progress';

export default function LineProgress() {
  const style = { margin: '20px 0 10px' };
  return (
    <div>
      <div style={style}>默认样式</div>
      <Progress theme={'plump'} percentage={30}></Progress>
      <div style={style}>进度0-10%时数字数字位置出现在目前进度的右边区域</div>
      <Progress theme={'plump'} percentage={5}></Progress>
      <div style={style}>success</div>
      <Progress theme={'plump'} status={'success'} percentage={100}></Progress>
      <div style={style}>warning</div>
      <Progress theme={'plump'} status={'warning'} percentage={30}></Progress>
      <div style={style}>error</div>
      <Progress theme={'plump'} status={'error'} percentage={30}></Progress>
      <div style={style}>active</div>
      <Progress theme={'plump'} status={'active'} percentage={30}></Progress>
      <div style={style}>自定义颜色与尺寸</div>
      <Progress theme={'plump'} strokeWidth={30} color={'#00f'} trackColor={'#0f0'} percentage={30}></Progress>
      <div style={style}>不显示数字</div>
      <Progress theme={'plump'} label={false}></Progress>
    </div>
  );
}
