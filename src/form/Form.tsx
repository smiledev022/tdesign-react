import React, { useRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import useConfig from '../hooks/useConfig';
import noop from '../_util/noop';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import type { TdFormProps } from './type';
import useInstance from './hooks/useInstance';
import useForm from './hooks/useForm';
import { StyledProps } from '../common';
import FormContext from './FormContext';
import FormItem from './FormItem';
import FormList from './FormList';
import { formDefaultProps } from './defaultProps';

export interface FormProps extends TdFormProps, StyledProps {
  children?: React.ReactNode;
}

const Form = forwardRefWithStatics(
  (props: FormProps, ref) => {
    const { classPrefix, form: globalFormConfig } = useConfig();

    const {
      style,
      className,
      form,
      labelWidth,
      statusIcon,
      labelAlign,
      layout,
      colon,
      initialData,
      requiredMark = globalFormConfig.requiredMark,
      scrollToFirstError,
      showErrorMessage,
      resetType,
      rules,
      errorMessage = globalFormConfig.errorMessage,
      preventSubmitDefault,
      disabled,
      children,
      onReset,
      onValuesChange = noop,
    } = props;

    const formClass = classNames(`${classPrefix}-form`, className, {
      [`${classPrefix}-form-inline`]: layout === 'inline',
    });

    const formRef: React.RefObject<HTMLFormElement> = useRef();
    const formMapRef = useRef(new Map()); // 收集所有 formItem 实例
    const formInstance = useInstance(props, formRef, formMapRef);

    useImperativeHandle(ref, () => formInstance);
    form && Object.assign(form, { ...formInstance });

    function onResetHandler(e: React.FormEvent<HTMLFormElement>) {
      [...formMapRef.current.values()].forEach((formItemRef) => {
        formItemRef?.current.resetField();
      });
      onReset?.({ e });
    }

    function onFormItemValueChange(changedValue: Record<string, unknown>) {
      const allFields = formInstance.getFieldsValue(true);
      onValuesChange(changedValue, allFields);
    }

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLFormElement>) {
      if ((e.target as Element).tagName.toLowerCase() === 'textarea') return;
      if (preventSubmitDefault && e.key === 'Enter') {
        e.preventDefault?.();
        e.stopPropagation?.();
      }
    }

    return (
      <FormContext.Provider
        value={{
          labelWidth,
          statusIcon,
          labelAlign,
          layout,
          colon,
          initialData,
          requiredMark,
          errorMessage,
          showErrorMessage,
          scrollToFirstError,
          resetType,
          rules,
          disabled,
          formMapRef,
          onFormItemValueChange,
        }}
      >
        <form
          ref={formRef}
          style={style}
          className={formClass}
          onSubmit={formInstance.submit}
          onReset={onResetHandler}
          onKeyDown={onKeyDownHandler}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  },
  { useForm, FormItem, FormList },
);

Form.displayName = 'Form';
Form.defaultProps = formDefaultProps;

export default Form;
