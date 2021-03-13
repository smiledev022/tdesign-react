import React from 'react';
import { Button, Popup } from '@tencent/tdesign-react';
const styles = {
  container: {
    margin: '0 auto',
    width: '500px',
    height: '260px',
    position: 'relative',
  },
  placementTop: {
    position: 'absolute',
    top: '0',
    left: '42%',
  },
  placementTopLeft: {
    position: 'absolute',
    top: '0',
    left: '70px',
  },
  placementTopRight: {
    position: 'absolute',
    top: '0',
    right: '70px',
  },
  placementBottom: {
    position: 'absolute',
    bottom: '0',
    left: '42%',
  },
  placementBottomLeft: {
    position: 'absolute',
    bottom: '0',
    left: '70px',
    width: '120px',
  },
  placementBottomRight: {
    position: 'absolute',
    bottom: '0',
    right: '70px',
  },
  placementLeft: {
    position: 'absolute',
    left: '0',
    top: '42%',
  },
  placementLeftTop: {
    position: 'absolute',
    left: '0',
    top: '50px',
  },
  placementLeftBottom: {
    position: 'absolute',
    left: '0',
    bottom: '50px',
  },
  placementRight: {
    position: 'absolute',
    right: '0',
    top: '42%',
  },
  placementRightTop: {
    position: 'absolute',
    right: '0',
    top: '50px',
  },
  placementRightBottom: {
    position: 'absolute',
    right: '0',
    bottom: '50px',
  },
};
export default function Placements() {
  return (
    <div style={styles.container}>
      <Popup content="这是Popup内容" placement="top" showArrow destroyOnHide>
        <Button style={styles.placementTop}>top</Button>
      </Popup>
      <Popup content="这是Popup内容 top-left" placement="top-left" showArrow destroyOnHide>
        <Button style={styles.placementTopLeft}>top-left</Button>
      </Popup>
      <Popup content="这是Popup内容top-right" placement="top-right" showArrow destroyOnHide>
        <Button style={styles.placementTopRight}>top-right</Button>
      </Popup>
      <Popup content="这是Popup内容" placement="bottom" showArrow destroyOnHide>
        <Button style={styles.placementBottom}>bottom</Button>
      </Popup>
      <Popup content="这是Popup内容 bottom-left" placement="bottom-left" showArrow destroyOnHide>
        <Button style={styles.placementBottomLeft}>bottom-left</Button>
      </Popup>
      <Popup content="这是Popup内容 bottom-right" placement="bottom-right" showArrow destroyOnHide>
        <Button style={styles.placementBottomRight}>bottom-right</Button>
      </Popup>
      <Popup content="这是Popup内容" placement="left" showArrow destroyOnHide>
        <Button style={styles.placementLeft}>left</Button>
      </Popup>
      <Popup
        content="这是Popup内容   left-top"
        placement="left-top"
        overlayStyle={{ width: '140px' }}
        showArrow
        destroyOnHide
      >
        <Button style={styles.placementLeftTop}>left-top</Button>
      </Popup>
      <Popup
        content="这是Popup内容 left-bottom"
        placement="left-bottom"
        overlayStyle={{ width: '140px' }}
        showArrow
        destroyOnHide
      >
        <Button style={styles.placementLeftBottom}>left-bottom</Button>
      </Popup>
      <Popup content="这是Popup内容" placement="right" showArrow destroyOnHide>
        <Button style={styles.placementRight}>right</Button>
      </Popup>
      <Popup
        content="这是Popup内容 right-top"
        placement="right-top"
        overlayStyle={{ width: '140px' }}
        showArrow
        destroyOnHide
      >
        <Button style={styles.placementRightTop}>right-top</Button>
      </Popup>
      <Popup
        content="这是Popup内容 right-bottom"
        placement="right-bottom"
        overlayStyle={{ width: '140px' }}
        showArrow
        destroyOnHide
      >
        <Button style={styles.placementRightBottom}>right-bottom</Button>
      </Popup>
    </div>
  );
}
