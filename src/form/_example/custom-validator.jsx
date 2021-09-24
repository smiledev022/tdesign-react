import React from 'react';
import { Form, Input, Button, Message } from '@tencent/tdesign-react';

const { FormItem } = Form;

export default function BaseForm() {
  const form = React.createRef();

  const onSubmit = (e) => {
    console.log(e);
    if (e.validateResult === true) {
      Message.info('提交成功');
    }
  };

  const onReset = (e) => {
    console.log(e);
    Message.info('重置成功');
  };

  // 自定义异步校验器
  function rePassword(val) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(form.current.getFieldValue('password') === val);
        clearTimeout(timer);
      });
    });
  }

  // 自定义校验器，不同的值输出不同的校验结果。支持异步校验（文案选自某密码重置站点，如有侵权，请联系我们删除）
  function passwordValidator(val) {
    if (val.length > 0 && val.length <= 2) {
      return { result: false, message: '太简单了！再开动一下你的小脑筋吧！', type: 'error' };
    }
    if (val.length > 2 && val.length < 4) {
      return { result: false, message: '还差一点点，就是一个完美的密码了！', type: 'warning' };
    }
    return { result: true, message: '太强了，你确定自己记得住吗！', type: 'success' };
  }

  const rules = {
    account: [
      { required: true, message: '姓名必填', type: 'error' },
      { min: 2, message: '至少需要两个字', type: 'error' },
    ],
    password: [
      { required: true, message: '密码必填', type: 'error' },
      // 不同的校验结果有不同的错误信息提醒，切错误信息类型不同
      { validator: passwordValidator },
    ],
    rePassword: [
      // 自定义校验规则
      { required: true, message: '密码必填', type: 'error' },
      { validator: rePassword, message: '两次密码不一致' },
    ],
  };

  return (
    <div>
      <Form ref={form} statusIcon={true} onSubmit={onSubmit} onReset={onReset} labelWidth={100} rules={rules}>
        <FormItem label="用户名" name="account">
          <Input />
        </FormItem>
        <FormItem label="密码" name="password">
          <Input />
        </FormItem>
        <FormItem label="确认密码" name="rePassword">
          <Input />
        </FormItem>
        <FormItem statusIcon={false}>
          <Button theme="primary" type="submit" style={{ marginRight: 10 }}>
            提交
          </Button>
          <Button type="reset">重置</Button>
        </FormItem>
      </Form>
    </div>
  );
}
