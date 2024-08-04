import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Tree, Modal, notification, Spin, Dropdown, Card, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { addCateDataAPI, delCateDataAPI, editCateDataAPI, getCateDataAPI, getCateListAPI } from '@/api/Cate';
import Breadcrumb from '@/components/Breadcrumbs';
import { Cate } from '@/types/cate';
import "./index.scss"

const CateManager: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(false);
    const [cate, setCate] = useState<Cate>({ name: '', mark: '', url: '', icon: '', level: 0 });
    const [list, setList] = useState<Cate[]>([]);
    const formRef = useRef<any>(null);

    const getCateList = async () => {
        setLoading(true);
        const { data } = await getCateListAPI();
        setList(data as Cate[]);
        setLoading(false);
    };

    const addCateData = (id: number) => {
        setModel(true);
        setCate({ ...cate, level: id });
    };

    const editCateData = async (id: number) => {
        setLoading(true);

        setModel(true);
        const { data } = await getCateDataAPI(id);
        setCate(data);

        setLoading(false);
    };

    const submit = async () => {
        formRef.current
            .validateFields()
            .then(async (values: any) => {
                if (cate.id) {
                    await editCateDataAPI({ ...cate, ...values });
                    notification.success({ message: '🎉 修改分类成功' });
                } else {
                    await addCateDataAPI({ ...cate, ...values });
                    notification.success({ message: '🎉 新增分类成功' });
                }

                // 初始化表单状态
                formRef.current.resetFields();
                setCate({ name: '', mark: '', url: '', icon: '', level: 0 });

                setModel(false);
                getCateList();
            })
            .catch((errorInfo: any) => {
                console.error('Validate Failed:', errorInfo);
            });
    };

    const delCateData = (id: number) => {
        // whetherToDelete(async () => {
        //     await delCateDataAPI(id);
        //     notification.success({ message: '🎉 删除分类成功' });
        //     getCateList();
        // }, '分类');
    };

    const close = () => {
        setModel(false);
        formRef.current.resetFields();
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
                    label: <span onClick={() => delCateData(item.id!)}>删除</span>,
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
        getCateList();
    }, []);

    useEffect(() => {
        if (model && formRef.current) {
            formRef.current.setFieldsValue(cate);
        }
    }, [cate, model]);

    return (
        <Card title={<Breadcrumb pageName="分类" />} className='border-stroke dark:border-strokedark [&>.ant-card-head]:border-stroke [&>.ant-card-head]:dark:border-strokedark dark:bg-boxdark [&>.ant-card-body]:pt-2'>
            <div className='mt-2 mb-4 text-center'>
                <Button type="primary" onClick={() => setModel(true)}>新增一级分类</Button>
            </div>

            <Spin spinning={loading}>
                <Tree defaultExpandAll treeData={treeData(list)} />
            </Spin>

            <Modal title="新增分类导航" open={model} onCancel={close} footer={null}>
                <Form ref={formRef} layout="vertical" initialValues={cate} size='large' className='mt-6'>
                    <Form.Item label="名称" name="name" rules={[{ required: true, message: '分类名称不能为空' }, { min: 1, max: 10, message: '分类名称限制为 1 ~ 10 个字符' }]}>
                        <Input placeholder="大前端" />
                    </Form.Item>

                    <Form.Item label="标识" name="mark" rules={[{ required: true, message: '分类标识不能为空' }, { min: 1, max: 10, message: '分类标识限制为 1 ~ 10 个字符' }]}>
                        <Input placeholder="dqd" />
                    </Form.Item>

                    <Form.Item label="图标" name="icon">
                        <Input placeholder="🎉" />
                    </Form.Item>

                    <Form.Item label="链接（选填）" name="url">
                        <Input placeholder="https://liuyuyang.net/" />
                    </Form.Item>

                    <Form.Item className='!mb-0 flex justify-end'>
                        <Button onClick={close}>取消</Button>
                        <Button type="primary" onClick={submit} className='ml-2'>确定</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default CateManager;
