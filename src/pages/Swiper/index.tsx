import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Tabs, Card, Popconfirm, message } from 'antd';
import { getSwiperListAPI, addSwiperDataAPI, editSwiperDataAPI, delSwiperDataAPI } from '@/api/Swiper';
import { Swiper } from '@/types/app/swiper';
import Title from '@/components/Title';
import { ColumnsType } from 'antd/es/table';

const SwiperPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [swiper, setSwiper] = useState<Swiper>({} as Swiper);
    const [list, setList] = useState<Swiper[]>([]);
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const [viewImage, setViewImage] = useState<string>('');
    const [tab, setTab] = useState<string>('list');

    const columns: ColumnsType<Swiper> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: '图片', dataIndex: 'image', key: 'image', width: 200,
            render: (text: string) => <img src={text} alt="swiper" className="w-full rounded cursor-pointer" onClick={() => { setViewImage(text); setIsModelOpen(true) }} />
        },
        { title: '标题', dataIndex: 'title', key: 'title' },
        { title: '描述', dataIndex: 'description', key: 'description' },
        {
            title: '操作', key: 'action', align: 'center',
            render: (text: string, record: Swiper) => (
                <>
                    <Button onClick={() => editSwiperData(record)}>修改</Button>

                    <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delSwiperData(record.id!)}>
                        <Button type="primary" danger className="ml-2">删除</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    const getSwiperList = async () => {
        const { data } = await getSwiperListAPI();
        setList(data as Swiper[]);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getSwiperList();
    }, []);

    const [form] = Form.useForm();
    const editSwiperData = (record: Swiper) => {
        setSwiper(record);
        form.setFieldsValue(record);
        setTab('operate');
    };

    const delSwiperData = async (id: number) => {
        setLoading(true);
        await delSwiperDataAPI(id);
        message.success('🎉 删除轮播图成功');
        getSwiperList();
    };

    const onSubmit = async () => {
        setLoading(true);
        form.validateFields().then(async (values: Swiper) => {
            if (swiper.id) {
                await editSwiperDataAPI({ ...swiper, ...values });
                message.success('🎉 编辑轮播图成功');
            } else {
                await addSwiperDataAPI({ ...swiper, ...values });
                message.success('🎉 新增轮播图成功');
            }

            getSwiperList();
            setTab('list');
            form.resetFields();
            setSwiper({} as Swiper);
        })
    };

    const handleTabChange = (key: string) => {
        setTab(key);
        form.resetFields();
        setSwiper({} as Swiper);
    };

    const tabItems = [
        {
            label: '轮播图列表',
            key: 'list',
            children: (
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
                    className="w-full"
                />
            )
        },
        {
            label: swiper.id ? '编辑轮播图' : '新增轮播图',
            key: 'operate',
            children: (
                <>
                    <h2 className="text-xl pb-4 text-center">{swiper.id ? '编辑轮播图' : '新增轮播图'}</h2>

                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={swiper}
                        onFinish={onSubmit}
                        size='large'
                        className="max-w-md mx-auto"
                    >
                        <Form.Item label="标题" name="title" rules={[{ required: true, message: '轮播图标题不能为空' }]}>
                            <Input placeholder="要么沉沦 要么巅峰!" />
                        </Form.Item>

                        <Form.Item label="描述" name="description">
                            <Input placeholder="Either sink or peak!" />
                        </Form.Item>

                        <Form.Item label="链接" name="url">
                            <Input placeholder="https://blog.liuyuyang.net/" />
                        </Form.Item>

                        <Form.Item label="图片" name="image" rules={[{ required: true, message: '轮播图不能为空' }]}>
                            <Input placeholder="https://blog.liuyuyang.net/swiper.jpg" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">{swiper.id ? '编辑轮播图' : '新增轮播图'}</Button>
                        </Form.Item>
                    </Form>
                </>
            )
        }
    ];

    return (
        <>
            <Title value="轮播图管理" />

            <Card className="[&>.ant-card-body]:!pt-0 mt-2">
                <Tabs activeKey={tab} onChange={handleTabChange} items={tabItems} />
            </Card>

            <Modal
                open={isModelOpen}
                title="查看图片"
                footer={null}
                onCancel={() => setIsModelOpen(false)}
            >
                <img src={viewImage} alt="swiper" className="w-full rounded mt-4" />
            </Modal>
        </>
    );
};

export default SwiperPage;