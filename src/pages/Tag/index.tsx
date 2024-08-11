import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Card, message, Popconfirm, Spin } from 'antd';
import { addTagDataAPI, delTagDataAPI, editTagDataAPI, getTagListAPI } from '@/api/Tag';
import Title from '@/components/Title';

interface Tag {
    id?: number;
    name: string;
}

const TagManagement: React.FC = () => {
    const [form] = Form.useForm<Tag>();
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState<Tag>({ name: '' });
    const [title, setTitle] = useState<string>('新增标签');
    const [list, setList] = useState<Tag[]>([]);

    // 获取标签列表
    const getTagList = async () => {
        const { data } = await getTagListAPI();
        setList(data as Tag[]);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getTagList();
    }, []);

    const delTagData = async (id: number) => {
        setLoading(true);
        await delTagDataAPI(id);
        message.success('🎉 删除标签成功');
        getTagList();
    };

    const editTagData = (data: Tag) => {
        setTag(data);
        form.setFieldsValue(data)
        setTitle('编辑标签');
    };

    const submit = () => {
        form.validateFields().then(async (values) => {
            setLoading(true);
            const fn = (value: string) => {
                form.resetFields();
                form.setFieldsValue({ name: '' })
                setTag({} as Tag)
                message.success(value);
                getTagList();
            };

            if (tag.id) {
                await editTagDataAPI({ ...tag, ...values });
                setTitle('新增标签');
                fn('🎉 编辑标签成功');
            } else {
                await addTagDataAPI(values);
                fn('🎉 新增标签成功');
            }
        });
    };

    return (
        <>
            <Title value="标签管理" />

            <Card className="mt-2">
                <Spin spinning={loading}>
                    <div className="w-10/12 flex justify-between px-8 mx-auto">
                        <div className="flex flex-col w-[40%]">
                            <h2 className="text-xl pb-4 text-center">{title}</h2>

                            <Form form={form} size="large" layout="vertical" initialValues={tag}>
                                <Form.Item
                                    label="标签名称"
                                    name="name"
                                    rules={[{ required: true, message: '标签不能为空' }]}
                                >
                                    <Input placeholder="大前端" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" size="large" onClick={submit} className="w-full">{title}</Button>
                                </Form.Item>
                            </Form>
                        </div>

                        <div className="flex flex-col w-[50%]">
                            <h2 className="text-xl pb-4 text-center">标签列表</h2>

                            <Table dataSource={list} rowKey="id">
                                <Table.Column title="ID" dataIndex="id" align="center" />
                                <Table.Column title="名称" dataIndex="name" align="center" />
                                <Table.Column
                                    title="操作"
                                    align="center"
                                    render={(text, record: Tag) => (
                                        <>
                                            <div className='flex justify-center space-x-4'>
                                                <Button size="small" onClick={() => editTagData(record)}>编辑</Button>

                                                <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delTagData(record.id!)}>
                                                    <Button size="small" type="primary" danger>删除</Button>
                                                </Popconfirm>
                                            </div>
                                        </>
                                    )}
                                />
                            </Table>
                        </div>
                    </div>
                </Spin>
            </Card>
        </>
    );
};

export default TagManagement;
