import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext, useAppDispatch } from 'hooks';
import { Settings } from 'utils';

import styles from './index.module.scss';

const Login: React.FC = () => {
  const { signIn } = useContext(AuthContext);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const token = JSON.stringify(values);
      await signIn(dispatch, token);
      navigator('/');
    } finally {
      setLoading(false);
    }
  };
  const [form] = Form.useForm();
  return (
    <div id={styles.loginContainer}>
      <div className={styles.loginTop}>
        <h2>{Settings.title}</h2>
        <Avatar src={Settings.logo} />
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        size="large"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input allowClear prefix={<UserOutlined />} placeholder="admin or user" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="any password" />
        </Form.Item>
        <Form.Item>
          <Form.Item noStyle name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          Or{' '}
          <a
            onClick={() => {
              form.resetFields();
            }}
          >
            register now!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
