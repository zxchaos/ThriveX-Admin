import { useState, useEffect } from 'react';
import { Table, Button, Tag, notification, Card, Popconfirm, Form, Input, Select, Avatar, Drawer, DatePicker } from 'antd';

import { getUserDataAPI, getUserListAPI, delUserDataAPI, addUserDataAPI, editUserDataAPI } from '@/api/User';
import { getRoleListAPI } from '@/api/Role'

import type { FilterForm, FilterUser, User } from '@/types/app/user';
import { Role } from '@/types/app/role';

import { useUserStore } from '@/stores'

import { titleSty } from '@/styles/sty';
import Title from '@/components/Title';
import logo from '@/images/logo/logo.png';
import dayjs from 'dayjs';

const UserPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState(false)

    const store = useUserStore()

    const [userList, setUserList] = useState<User[]>([]);
    const [roleList, setRoleList] = useState<Role[]>([]);
    const [user, setUser] = useState<User>({} as User)
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

    const { RangePicker } = DatePicker;

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
                    <Button onClick={() => editUserData(record.id!)}>修改</Button>

                    <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delUserData(record.id!)}>
                        <Button type="primary" danger disabled={record.id === store.user.id}>删除</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const [userForm] = Form.useForm();

    const getUserList = async () => {
        setLoading(true);
        const { data } = await getUserListAPI();
        setUserList(data as User[]);
        setLoading(false);
    };

    const getRoleList = async () => {
        const { data } = await getRoleListAPI();
        setRoleList(data as Role[]);
    };

    useEffect(() => {
        getUserList();
        getRoleList()
    }, []);

    const delUserData = async (id: number) => {
        setLoading(true);
        await delUserDataAPI(id);
        await getUserList();
        notification.success({ message: '🎉 删除用户成功' });
        setLoading(false);
    };

    const editUserData = async (id: number) => {
        const { data } = await getUserDataAPI(id)
        setUser({ ...data, role: data.role.id });

        userForm.setFieldsValue({ ...data, roleId: data.role.id });
        setDrawerVisible(true);
    };

    const reset = () => {
        setUser({} as User)
        userForm.resetFields()
    }

    const onSubmit = async () => {
        setBtnLoading(true)

        userForm.validateFields().then(async (values: User) => {
            if (user.id) {
                await editUserDataAPI({ ...user, ...values });
                notification.success({ message: '🎉 编辑用户成功' });
            } else {
                await addUserDataAPI({ ...values, password: "123456", createTime: new Date().getTime().toString() });
                notification.success({ message: '🎉 创建用户成功' });
            }
            setDrawerVisible(false);
            getUserList();
        })

        setBtnLoading(false)
    };

    const [filterForm] = Form.useForm();

    const onFilterSubmit = async (values: FilterForm) => {
        const query: FilterUser = {
            key: values.name,
            roleId: values.role,
            startDate: values.createTime && values.createTime[0].valueOf() + '',
            endDate: values.createTime && values.createTime[1].valueOf() + ''
        }

        const { data } = await getUserListAPI({ query });
        setUserList(data as User[]);
    }

    return (
        <>
            <Title value="用户管理">
                <Button type="primary" size='large' onClick={() => setDrawerVisible(true)}>新增用户</Button>
            </Title>

            <Card className='my-2 overflow-scroll'>
                <Form form={filterForm} layout="inline" onFinish={onFilterSubmit} autoComplete="off" className='flex-nowrap'>
                    <Form.Item label="名称" name="name" className='min-w-[200px]'>
                        <Input placeholder='请输入名称' />
                    </Form.Item>

                    <Form.Item label="角色" name="role" className='min-w-[230px]'>
                        <Select options={roleList.map(item => ({ label: item.name, value: item.id }))} placeholder="请选择角色" />
                    </Form.Item>

                    <Form.Item label="时间范围" name="createTime" className='min-w-[250px]'>
                        <RangePicker placeholder={["选择起始时间", "选择结束时间"]} />
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
                    pagination={{
                        position: ['bottomCenter'],
                        defaultPageSize: 8
                    }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>

            <Drawer
                title={user.id ? "编辑用户" : "创建用户"}
                size='large'
                onClose={() => {
                    reset()
                    setDrawerVisible(false)
                }}
                open={drawerVisible}
            >
                <Form
                    form={userForm}
                    layout="vertical"
                    size='large'
                    onFinish={onSubmit}
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input placeholder='liuyuyang' />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ required: true, message: '请输入名称' }]}
                    >
                        <Input placeholder='宇阳' />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[{ type: 'email', message: '请输入有效的邮箱' }]}
                    >
                        <Input placeholder='3311118881@qq.com' />
                    </Form.Item>

                    <Form.Item
                        name="avatar"
                        label="头像链接"
                        rules={[{ type: 'url', message: '请输入有效的头像地址' }]}
                    >
                        <Input placeholder='https://res.liuyuyang.net/usr/images/avatar.jpg' />
                    </Form.Item>

                    <Form.Item
                        name="info"
                        label="介绍"
                    >
                        <Input.TextArea placeholder='再渺小的星光也有属于它的光芒!' />
                    </Form.Item>

                    <Form.Item
                        name="roleId"
                        label="角色"
                        rules={[{ required: true, message: '请选择角色' }]}
                    >
                        <Select options={roleList.map(item => ({ label: item.name, value: item.id }))} placeholder="选择用户角色" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={btnLoading} className="w-full">{user.id ? "编辑用户" : "创建用户"}</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default UserPage;
