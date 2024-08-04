import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Tree, Modal, notification, Spin, Dropdown, Menu, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { addCateDataAPI, delCateDataAPI, editCateDataAPI, getCateDataAPI, getCateListAPI } from '@/api/Cate';
import Breadcrumb from '@/components/Breadcrumbs';
import { Cate } from '@/types/cate'

const CateManager: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(false);
    const [cate, setCate] = useState<Cate>({ name: '', mark: '', url: '', icon: '', level: 0 });
    const [list, setList] = useState<Cate[]>([]);
    const formRef = useRef<any>(null);

    useEffect(() => {
        getCateList();
    }, []);

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

    const renderTreeNodes = (data: Cate[]) =>
        data.map(item => (
            <Tree.TreeNode title={item.name} key={item.id} dataRef={item}>
                {item.children ? renderTreeNodes(item.children) : null}
            </Tree.TreeNode>
        ));

    const menu = (data: Cate) => (
        <Menu>
            <Menu.Item onClick={() => addCateData(data.id!)}>新增</Menu.Item>
            <Menu.Item onClick={() => editCateData(data.id!)}>编辑</Menu.Item>
            <Menu.Item onClick={() => delCateData(data.id!)}>删除</Menu.Item>
        </Menu>
    );

    return (
        <Card title={<Breadcrumb pageName="分类" />} className='border-stroke dark:border-strokedark [&>.ant-card-head]:border-stroke [&>.ant-card-head]:dark:border-strokedark dark:bg-boxdark [&>.ant-card-body]:pt-2'>
            <div className='mt-2 mb-4 text-center'>
                <Button type="primary" onClick={() => setModel(true)}>新增分类</Button>
            </div>

            <Spin spinning={loading}>
                <Tree defaultExpandAll>{renderTreeNodes(list)}</Tree>
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
        </Card >
    );
};

export default CateManager;
