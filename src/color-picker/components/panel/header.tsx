import React, { useState } from 'react';
import classNames from 'classnames';
import { CloseIcon } from 'tdesign-icons-react';
import { COLOR_MODES } from '../../const';
import Radio from '../../../radio';
import { TdColorModes } from '../../interface';
import { TdColorPickerProps } from '../../type';

export interface ColorPanelHeaderProps extends TdColorPickerProps {
  mode?: TdColorModes;
  togglePopup?: Function;
  onModeChange?: Function;
  baseClassName?: string;
}

const Header = (props: ColorPanelHeaderProps) => {
  const { baseClassName, mode = 'monochrome', colorModes, togglePopup, closeBtn, onModeChange } = props;
  const [modeValue, setModeValue] = useState<TdColorModes>(mode);

  const handleClosePopup = () => {
    togglePopup?.(false);
  };

  const handleModeChange = (v: TdColorModes) => {
    setModeValue(v);
    onModeChange(v);
  };

  return (
    <div className={`${baseClassName}__head`}>
      <div className={`${baseClassName}__mode`}>
        {colorModes?.length === 1 ? (
          COLOR_MODES[colorModes[0]]
        ) : (
          <Radio.Group variant="default-filled" size="small" value={modeValue} onChange={handleModeChange}>
            {Object.keys(COLOR_MODES).map((key) => (
              <Radio.Button key={key} value={key}>
                {COLOR_MODES[key]}
              </Radio.Button>
            ))}
          </Radio.Group>
        )}
      </div>
      {closeBtn ? (
        <span
          role="button"
          className={classNames(`${baseClassName}__icon`, `${baseClassName}__close`)}
          onClick={handleClosePopup}
        >
          <CloseIcon />
        </span>
      ) : null}
    </div>
  );
};

export default React.memo(Header);
