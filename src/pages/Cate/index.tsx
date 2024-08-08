import React, { useState, useEffect, useRef } from 'react';
import { Cate } from '@/types/cate';
import { addCateDataAPI, delCateDataAPI, editCateDataAPI, getCateDataAPI, getCateListAPI } from '@/api/Cate';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Tree, Modal, Spin, Dropdown, Card, MenuProps, Popconfirm, message } from 'antd';
import Title from '@/components/Title';
import "./index.scss"

const CatePage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(false);
    const [cate, setCate] = useState<Cate>({} as Cate);
    const [list, setList] = useState<Cate[]>([]);
    const [isMethod, setIsMethod] = useState<'create' | 'edit'>('create');

    const getCateList = async () => {
        const { data } = await getCateListAPI();
        setList(data as Cate[]);
        setLoading(false);
    };

    const addCateData = (id: number) => {
        setIsMethod("create")
        setModel(true);
        setCate({ ...cate, level: id });
    };

    const editCateData = async (id: number) => {
        setIsMethod("edit")
        setLoading(true);
        setModel(true);
        const { data } = await getCateDataAPI(id);
        setCate(data);
        form.setFieldsValue(data);
        setLoading(false);
    };

    const delCateData = async (id: number) => {
        setLoading(true);
        await delCateDataAPI(id);
        message.success('🎉 删除分类成功');
        getCateList();
    };

    const [form] = Form.useForm();

    const submit = async () => {
        form.validateFields().then(async (values: Cate) => {
            if (isMethod === "edit") {
                await editCateDataAPI({ ...cate, ...values });
                message.success('🎉 修改分类成功');
            } else {
                await addCateDataAPI({ ...cate, ...values });
                message.success('🎉 新增分类成功');
            }

            // 初始化表单状态
            form.resetFields();
            setCate({} as Cate);

            setModel(false);
            getCateList();
            setIsMethod("create")
        })
    };

    const closeModel = () => {
        setIsMethod("create")
        setModel(false);
        form.resetFields();
        setCate({} as Cate);
    };

    // 将数据转换为树形结构
    const treeData = (data: Cate[]): any[] => (
        data.map(item => {
            const items: MenuProps['items'] = [
                {
                    key: '1',
                    label: <span onClick={() => addCateData(item.id!)}>新增</span>,
                },
                {
                    key: '2',
                    label: <span onClick={() => editCateData(item.id!)}>编辑</span>,
                },
                {
                    key: '3',
                    label: (
                        <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delCateData(item.id!)}>
                            <span>删除</span>
                        </Popconfirm>
                    ),
                },
            ];

            return ({
                title: (
                    <div className='group w-full flex justify-between items-center'>
                        <h3>{item.name}</h3>

                        <div className='controls hidden'>
                            <Dropdown menu={{ items }} arrow>
                                <Button type='link' size='small'>操作 <DownOutlined /></Button>
                            </Dropdown>
                        </div>
                    </div>
                ),
                key: item.id,
                children: item.children ? treeData(item.children) : [],
            })
        })
    )

    useEffect(() => {
        setLoading(true);
        getCateList();
    }, []);

    return (
        <>
            <Title value="分类管理" />

            <Card className={`CatePage [&>.ant-card-body]:!p-2 [&>.ant-card-body]:!pb-6 mt-2`}>
                <div className='my-2 text-center'>
                    <Button type="primary" onClick={() => setModel(true)}>新增一级分类</Button>
                </div>

                <Spin spinning={loading}>
                    <Tree defaultExpandAll={true} treeData={treeData(list)} />
                </Spin>

                <Modal title={isMethod === "edit" ? "编辑分类" : "新增分类"} open={model} onCancel={closeModel} footer={null}>
                    <Form form={form} layout="vertical" initialValues={cate} size='large' className='mt-6'>
                        <Form.Item label="名称" name="name" rules={[{ required: true, message: '分类名称不能为空' }]}>
                            <Input placeholder="大前端" />
                        </Form.Item>

                        <Form.Item label="标识" name="mark" rules={[{ required: true, message: '分类标识不能为空' }]}>
                            <Input placeholder="dqd" />
                        </Form.Item>

                        <Form.Item label="图标" name="icon">
                            <Input placeholder="🎉" />
                        </Form.Item>

                        <Form.Item label="链接（选填）" name="url">
                            <Input placeholder="https://blog.liuyuyang.net/" />
                        </Form.Item>

                        <Form.Item className='!mb-0 flex justify-end'>
                            <Button onClick={closeModel}>取消</Button>
                            <Button type="primary" onClick={submit} className='ml-2'>确定</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </>
    );
};

export default CatePage;