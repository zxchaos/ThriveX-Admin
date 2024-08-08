import React, { useState, useRef } from 'react';
import { Form, Input, Button, notification, Modal } from 'antd';
import { useUserStore } from '@/stores';
import { editAdminPassAPI } from '@/api/User';
import { EditUser } from '@/types/user'

const { confirm } = Modal;

const SystemPage: React.FC = () => {
    const store = useUserStore();

    const [form] = Form.useForm<EditUser>();

    const initialValues: EditUser = {
        username: store.user?.username || '',
        oldPassword: '',
        newPassword: ''
    };

    const rules = {
        username: [
            { required: true, message: '管理员账号不能为空' },
            { min: 6, max: 16, message: '账号限制在6 ~ 16个字符' }
        ],
        oldPassword: [
            { required: true, message: '管理员旧密码不能为空' },
            { min: 6, max: 16, message: '密码限制在6 ~ 16个字符' }
        ],
        newPassword: [
            { required: true, message: '管理员新密码不能为空' },
            { min: 6, max: 16, message: '密码限制在6 ~ 16个字符' }
        ]
    };

    const handleSubmit = async (values: EditUser) => {
        try {
            await editAdminPassAPI(values);
            confirm({
                title: '提示',
                content: '🔒️ 修改成功，请重新登录',
                okText: '确定',
                onOk: () => {
                    store.quitLogin();
                },
                cancelButtonProps: { style: { display: 'none' } }
            });
        } catch (error) {
            notification.error({
                message: '错误',
                description: '修改密码失败，请重试'
            });
        }
    };

    return (
        <div className="setup">
            <h2 className="title flex justify-center my-2 border-b-0">系统配置</h2>

            <Form
                form={form}
                initialValues={initialValues}
                size='large'
                layout="vertical"
                onFinish={handleSubmit}
                className="w-5/12 mx-auto"
            >
                <Form.Item
                    label="管理员账号"
                    name="username"
                    rules={rules.username}
                >
                    <Input placeholder="请输入账号" disabled />
                </Form.Item>

                <Form.Item
                    label="管理员旧密码"
                    name="oldPassword"
                    rules={rules.oldPassword}
                >
                    <Input.Password placeholder="请输入旧密码" />
                </Form.Item>

                <Form.Item
                    label="管理员新密码"
                    name="newPassword"
                    rules={rules.newPassword}
                >
                    <Input.Password placeholder="请输入新密码" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SystemPage;
