import React, { FC } from 'react';
import Button from '../../button';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, LoadingIcon } from '../../icon';
import useConfig from '../../_util/useConfig';
import { UploadFile } from '../../_type/components/upload';
import { returnFileSize, abridgeName, getCurrentDate } from '../util';

export interface DraggerProgressProps {
  display?: string;
  file: UploadFile;
  onTrigger?: () => void;
  onRemove?: () => void;
  onUpload?: () => void;
}

const DraggerProgress: FC<DraggerProgressProps> = (props) => {
  const { file, onUpload, onRemove, display } = props;
  const { classPrefix } = useConfig();
  const reUpload = React.useCallback(() => {
    props.onRemove?.();
    props.onTrigger?.();
  }, [props]);

  const showResultOperate = React.useMemo(() => ['success', 'fail'].includes(file?.status), [file]);

  const renderUploading = React.useCallback(() => {
    if (file?.status === 'fail') {
      return <ErrorCircleFilledIcon />;
    }
    if (file?.status === 'progress') {
      return (
        <div className="t-upload__single-progress">
          <LoadingIcon />
          <span className="t-upload__single-percent">{Math.min(file?.percent || 0, 99)}%</span>
        </div>
      );
    }
  }, [file]);

  return (
    <div className={`${classPrefix}-upload__dragger-progress`}>
      {display === 'image' && (
        <div className="t-upload__dragger-img-wrap">{file && <img src={file.url || 'default.png'} />}</div>
      )}
      <div className={`${classPrefix}-upload__dragger-progress-info`}>
        <div className={`${classPrefix}-upload__dragger-text`}>
          <span className={`${classPrefix}-upload__single-name`}>{abridgeName(file?.name)}</span>
          {file?.status !== 'success' && renderUploading()}
          {file?.status === 'success' && <CheckCircleFilledIcon />}
        </div>
        <small className={`${classPrefix}-upload__small`}>文件大小：{returnFileSize(file?.size)}</small>
        <small className={`${classPrefix}-upload__small`}>上传日期：{getCurrentDate()}</small>
        {!['success', 'fail'].includes(file?.status) && (
          <div className={`${classPrefix}-upload__dragger-btns`}>
            <Button
              theme="primary"
              variant="text"
              className={`${classPrefix}-upload__dragger-progress-cancel`}
              onClick={onRemove}
            >
              取消上传
            </Button>
            <Button theme="primary" variant="text" onClick={onUpload}>
              点击上传
            </Button>
          </div>
        )}
        {showResultOperate && (
          <div className="t-upload__dragger-btns">
            <Button theme="primary" variant="text" className="t-upload__dragger-progress-cancel" onClick={reUpload}>
              重新上传
            </Button>
            <Button theme="primary" variant="text" onClick={props.onRemove}>
              删除
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggerProgress;
