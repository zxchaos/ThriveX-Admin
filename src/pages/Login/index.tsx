import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { Button, Form, Input, notification } from 'antd';
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { loginDataAPI } from '@/api/User';
import { useUserStore } from '@/stores';

const LoginForm: React.FC = () => {
    const [form] = useForm();
    const [isPassVisible, setIsPassVisible] = useState(false);
    const store = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();
    const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/home';

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const { data } = await loginDataAPI(values);
            store.token = data.token;
            store.user = data.user;

            notification.success({
                message: 'success',
                description: `Hello ${data.user.name} 欢迎回来 🎉`,
            });

            navigate(returnUrl);
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="overflow-hidden relative w-[400px] h-[380px] rounded-lg bg-white shadow-[4px_6px_200px_200px_rgba(121,122,243,0.1)]">
                <div className="flex flex-col justify-center items-center h-25 bg-primary text-white">
                    <h3 className="text-3xl">Thrive</h3>
                    <p className="text-gray-300 mt-2">现代化博客管理系统</p>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onSubmit}
                    className='pt-5 px-10'
                    size='large'
                >
                    <Form.Item
                        name="username"
                        label="账号"
                        rules={[
                            { required: true, message: '请输入账号' }
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            { required: true, message: '请输入密码' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type={isPassVisible ? 'text' : 'password'}
                            placeholder="请输入密码"
                            iconRender={visible =>
                                visible ? (
                                    <EyeOutlined onClick={() => setIsPassVisible(!isPassVisible)} />
                                ) : (
                                    <EyeInvisibleOutlined onClick={() => setIsPassVisible(!isPassVisible)} />
                                )
                            }
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" block>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
