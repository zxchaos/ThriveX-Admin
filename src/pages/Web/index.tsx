import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Input, Button, Form, notification, Row, Spin, Empty, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getLinkListAPI, addLinkDataAPI, editLinkDataAPI, delLinkDataAPI } from '@/api/Web';
import { Web } from '@/types/web'
import Title from '@/components/Title';
import "./index.scss"
const LinkManager: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState<string>('list');
    const [list, setList] = useState<Web[]>([]);
    const [listTemp, setListTemp] = useState<Web[]>([]);
    const [search, setSearch] = useState<string>('');
    const [link, setLink] = useState<Web>({
        title: '',
        description: '',
        email: '',
        image: '',
        url: '',
        type: ''
    });

    const formRef = useRef<any>(null);

    const getLinkList = async () => {
        setLoading(true);
        const { data } = await getLinkListAPI();

        setList(data as Web[]);
        setListTemp(data as Web[]);
        setLoading(false);
    };

    useEffect(() => {
        getLinkList();
    }, []);

    useEffect(() => {
        setListTemp(list.filter(item => item.title.includes(search) || item.description.includes(search)));
    }, [search, list]);

    const toHref = (url: string) => {
        window.open(url, '_blank');
    };

    const deleteLink = async (id: number) => {
        await delLinkDataAPI(id);
        notification.success({ message: '删除网站成功' });
        getLinkList();
    };

    const editLink = (item: Web) => {
        setTab('operate');
        setLink(item);
    };

    const submit = async () => {
        formRef.current.validateFields().then(async (values: Web) => {
            if (link.id) {
                await editLinkDataAPI({ ...link, ...values });
                notification.success({ message: '编辑网站成功' });
            } else {
                await addLinkDataAPI(values);
                notification.success({ message: '新增网站成功' });
            }
            formRef.current.resetFields();
            getLinkList();
            setTab('list');
        });
    };

    return (
        <>
            <Title value="网站管理" />

            <Card className='mt-2'>
                <Tabs activeKey={tab} onChange={setTab} tabPosition="left">
                    <Tabs.TabPane tab="网站列表" key="list">
                        <div className="w-[300px] mx-auto">
                            <Input
                                size="large"
                                placeholder="请输入网站名称或描述信息进行查询"
                                prefix={<SearchOutlined />}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        <Spin spinning={loading}>
                            <div className="list">
                                {listTemp.length > 0 ? (
                                    listTemp.map(item => (
                                        <div key={item.id} className="item">
                                            <div className="avatar">
                                                <img src={item.image} alt="" className="avatar-img" />
                                            </div>

                                            <div className="name">{item.title}</div>
                                            <div className="description">{item.description}</div>
                                            <div className="type">{item.type}</div>

                                            <div className="operate">
                                                <div onClick={() => editLink(item)} className="edit">修改</div>
                                                <div onClick={() => deleteLink(item.id!)} className="delete">删除</div>
                                            </div>

                                            <div onClick={() => toHref(item.url)} className="headFor">前往该网站 &rarr;</div>
                                        </div>
                                    ))
                                ) : (
                                    <Empty description="暂无数据" />
                                )}
                            </div>
                        </Spin>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab={link.id ? '编辑网站' : '新增网站'} key="operate">
                        <Row className="form-container">
                            <h2 className="form-title">{link.id ? '编辑网站' : '新增网站'}</h2>
                            <Form ref={formRef} layout="vertical" initialValues={link} onFinish={submit}>
                                <Form.Item label="标题" name="title" rules={[{ required: true, message: '网站标题不能为空' }, { min: 2, max: 30, message: '网站标题限制在2 ~ 30个字符' }]}>
                                    <Input placeholder="Thrive" />
                                </Form.Item>
                                <Form.Item label="描述" name="description" rules={[{ required: true, message: '网站描述不能为空' }, { min: 2, max: 100, message: '网站描述限制在2 ~ 100个字符' }]}>
                                    <Input placeholder="记录前端、Python、Java点点滴滴" />
                                </Form.Item>
                                <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '网站邮箱不能为空' }]}>
                                    <Input placeholder="3311118881@qq.com" />
                                </Form.Item>
                                <Form.Item label="头像" name="image" rules={[{ required: true, message: '网站图标不能为空' }]}>
                                    <Input placeholder="https://liuyuyang.net/logo.png" />
                                </Form.Item>
                                <Form.Item label="链接" name="url" rules={[{ required: true, message: '网站链接不能为空' }]}>
                                    <Input placeholder="https://liuyuyang.net/" />
                                </Form.Item>
                                <Form.Item label="类型" name="type" rules={[{ required: true, message: '网站类型不能为空' }, { min: 2, max: 10, message: '网站类型限制在2 ~ 10个字符' }]}>
                                    <Input placeholder="技术类" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">{link.id ? '编辑网站' : '新增网站'}</Button>
                                </Form.Item>
                            </Form>
                        </Row>
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        </>
    );
};

export default LinkManager;