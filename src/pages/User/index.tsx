import { useState, useEffect } from 'react';
import { Table, Button, Tag, notification, Card, Popconfirm, Form, Input, Select, Avatar } from 'antd';

import { getUserListAPI, delUserDataAPI } from '@/api/User';
import type { User } from '@/types/app/user';
import { Role } from '@/types/app/role';

import { titleSty } from '@/styles/sty';
import Title from '@/components/Title';
import logo from '@/images/logo/logo.png'

import dayjs from 'dayjs'

const UserPage = () => {
    const [current, setCurrent] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [userList, setUserList] = useState<User[]>([]);

    const [form] = Form.useForm();

    const getUserList = async () => {
        setLoading(true);

        const { data } = await getUserListAPI();
        setUserList(data as User[]);

        setLoading(false);
    };

    useEffect(() => {
        getUserList();
    }, []);

    const delUserData = async (id: number) => {
        setLoading(true);

        await delUserDataAPI(id);
        await getUserList();
        form.resetFields();
        setCurrent(1);
        notification.success({ message: '🎉 删除用户成功' });

        setLoading(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 100,
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            align: 'center',
            width: 150,
            render: (url: string) => url ? <Avatar size={64} src={url} /> : <Avatar size={64} src={logo} />,
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 200,
            sorter: (a: User, b: User) => a.name.length - b.name.length,
            showSorterTooltip: false
        },
        {
            title: '介绍',
            dataIndex: 'info',
            key: 'info',
            align: 'center',
            render: (text: string) => text ? text : '暂无介绍',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            width: 200
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            render: (text: string) => text ? text : '暂无邮箱',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            render: (role: Role) => <Tag color="blue">{role.name}</Tag>,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
            width: 200,
            render: (text: string) => dayjs(+text).format('YYYY-MM-DD HH:mm:ss'),
            sorter: (a: User, b: User) => +a.createTime! - +b.createTime!,
            showSorterTooltip: false
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            align: 'center',
            render: (text: string, record: User) => (
                <div className='flex space-x-2'>
                    <Button>修改</Button>

                    <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delUserData(record.id!)}>
                        <Button type="primary" danger>删除</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const onSubmit = async (values: any) => {
        const query = {
            key: values.name,
            role: values.role,
        };

        const { data } = await getUserListAPI({ query });
        setUserList(data as User[]);
    };

    return (
        <>
            <Title value="用户管理" />

            <Card className='my-2 overflow-scroll'>
                <Form form={form} layout="inline" onFinish={onSubmit} autoComplete="off" className='flex-nowrap'>
                    <Form.Item label="用户名" name="name" className='min-w-[200px]'>
                        <Input placeholder='请输入用户名' />
                    </Form.Item>

                    <Form.Item label="角色" name="role" className='min-w-[200px]'>
                        <Select
                            allowClear
                            options={[
                                { label: '管理员', value: 'admin' },
                                { label: '用户', value: 'user' }
                            ]}
                            placeholder="请选择角色"
                        />
                    </Form.Item>

                    <Form.Item className='pr-6'>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card className={`${titleSty} min-h-[calc(100vh-250px)]`}>
                <Table
                    rowKey="id"
                    dataSource={userList}
                    columns={columns as any}
                    loading={loading}
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        position: ['bottomCenter'],
                        current,
                        defaultPageSize: 8,
                        onChange(current) {
                            setCurrent(current);
                        }
                    }}
                />
            </Card>
        </>
    );
};

export default UserPage;