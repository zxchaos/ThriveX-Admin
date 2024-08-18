import { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Popconfirm, message, Card } from 'antd';
import { getRoleListAPI, addRoleDataAPI, editRoleDataAPI, delRoleDataAPI } from '@/api/Role';
import { Role } from '@/types/app/role';
import Title from '@/components/Title';
import { ColumnsType } from 'antd/es/table';

const RolePage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [role, setRole] = useState<Role>({} as Role);
    const [list, setList] = useState<Role[]>([]);

    const columns: ColumnsType<Role> = [
        { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
        { title: '角色名称', dataIndex: 'name', key: 'name' },
        { title: '角色描述', dataIndex: 'description', key: 'description' },
        {
            title: '操作', key: 'action',
            render: (text: string, record: Role) => (
                <>
                    <Button onClick={() => editRoleData(record)}>修改</Button>
                    <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delRoleData(record.id!)}>
                        <Button type="primary" danger className="ml-2">删除</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    const getRoleList = async () => {
        setLoading(true);
        const { data } = await getRoleListAPI();
        setList(data as Role[]);
        setLoading(false);
    };

    useEffect(() => {
        getRoleList();
    }, []);

    const [form] = Form.useForm();
    const editRoleData = (record: Role) => {
        setRole(record);
        form.setFieldsValue(record);
    };

    const delRoleData = async (id: number) => {
        setLoading(true);
        await delRoleDataAPI(id);
        message.success('🎉 删除角色成功');
        getRoleList();
    };

    const onSubmit = async () => {
        setLoading(true);
        form.validateFields().then(async (values: Role) => {
            if (role.id) {
                await editRoleDataAPI({ ...role, ...values });
                message.success('🎉 编辑角色成功');
            } else {
                await addRoleDataAPI(values);
                message.success('🎉 新增角色成功');
            }

            getRoleList();
            form.resetFields();
            form.setFieldsValue({ name: '', description: '' })
            setRole({} as Role);
        });
    };

    return (
        <>
            <Title value="角色管理" />

            <div className='flex justify-between mx-auto mt-2'>
                <Card className="w-[40%] h-73">
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={role}
                        onFinish={onSubmit}
                        size='large'

                    >
                        <Form.Item label="角色名称" name="name" rules={[{ required: true, message: '角色名称不能为空' }]}>
                            <Input placeholder="请输入角色名称" />
                        </Form.Item>

                        <Form.Item label="描述" name="description" rules={[{ required: true, message: '角色描述不能为空' }]}>
                            <Input placeholder="请输入角色描述" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">{role.id ? '编辑角色' : '新增角色'}</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card className="w-[59%] [&>.ant-card-body]:!p-0">
                    <Table
                        rowKey="id"
                        dataSource={list}
                        columns={columns}
                        scroll={{ x: 'max-content' }}
                        pagination={{
                            position: ['bottomCenter'],
                            pageSize: 8
                        }}
                        loading={loading}
                    />
                </Card>
            </div>
        </>
    );
};

export default RolePage;
