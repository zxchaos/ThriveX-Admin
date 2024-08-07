import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Input, Button, Form, Spin, Empty, Card, Popconfirm, Select, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getLinkListAPI, addLinkDataAPI, editLinkDataAPI, delLinkDataAPI, getLinkTypeListAPI } from '@/api/Web';
import { LinkType, Web } from '@/types/web'
import Title from '@/components/Title';
import "./index.scss"
const LinkManager: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState<string>('list');
    const [list, setList] = useState<Web[]>([]);
    const [listTemp, setListTemp] = useState<Web[]>([]);
    const [typeList, setTypeList] = useState<LinkType[]>([]);
    const [search, setSearch] = useState<string>('');
    const [link, setLink] = useState<Web>({} as Web);

    const formRef = useRef<any>(null);

    // 获取网站列表
    const getLinkList = async () => {
        const { data } = await getLinkListAPI();

        setList(data as Web[]);
        setListTemp(data as Web[]);
        setLoading(false);
    };

    // 获取网站类型列表
    const getLinkTypeList = async () => {
        const { data } = await getLinkTypeListAPI();
        setTypeList(data)
    }

    useEffect(() => {
        setLoading(true);
        getLinkList();
        getLinkTypeList()
    }, []);

    useEffect(() => {
        setListTemp(list.filter(item => item.title.includes(search) || item.description.includes(search)));
    }, [search, list]);

    const toHref = (url: string) => {
        window.open(url, '_blank');
    };

    const deleteLink = async (id: number) => {
        setLoading(true);
        await delLinkDataAPI(id);
        message.success('🎉 删除网站成功');
        getLinkList();
    };

    const editLink = (item: Web) => {
        setTab('operate');
        setLink(item);
    };

    const submit = async () => {
        formRef.current.validateFields().then(async (values: Web) => {
            setLoading(true);

            if (link.id) {
                await editLinkDataAPI({ ...link, ...values });
                message.success('🎉 编辑网站成功');
            } else {
                await addLinkDataAPI(values);
                message.success('🎉 新增网站成功');
            }
            formRef.current.resetFields();
            getLinkList();
            setTab('list');
        });
    };

    const { Option } = Select;

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
                                            <div className="type">{item.type.name}</div>

                                            <div className="operate">
                                                <div onClick={() => editLink(item)} className="edit">修改</div>

                                                <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => deleteLink(item.id!)}>
                                                    <div className="delete">删除</div>
                                                </Popconfirm>
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
                        <h2 className="text-xl pb-4 text-center">{link.id ? '编辑网站' : '新增网站'}</h2>

                        <div className='w-5/12 mx-auto'>
                            <Form ref={formRef} layout="vertical" size='large' initialValues={link} onFinish={submit}>
                                <Form.Item label="网站标题" name="title" rules={[{ required: true, message: '网站标题不能为空' }]}>
                                    <Input placeholder="Thrive" />
                                </Form.Item>

                                <Form.Item label="网站描述" name="description" rules={[{ required: true, message: '网站描述不能为空' }]}>
                                    <Input placeholder="记录前端、Python、Java点点滴滴" />
                                </Form.Item>

                                <Form.Item label="站长邮箱" name="email">
                                    <Input placeholder="3311118881@qq.com" />
                                </Form.Item>

                                <Form.Item label="网站图标" name="image" rules={[{ required: true, message: '网站图标不能为空' }]}>
                                    <Input placeholder="https://blog.liuyuyang.net/logo.png" />
                                </Form.Item>

                                <Form.Item label="网站链接" name="url">
                                    <Input placeholder="https://blog.liuyuyang.net/" />
                                </Form.Item>

                                <Form.Item name="typeId" label="网站类型" rules={[{ required: true, message: '网站类型不能为空' }]}>
                                    <Select
                                        placeholder="请选择网站类型"
                                        onChange={(value: string) => {
                                            console.log(value);
                                        }}
                                        allowClear
                                    >
                                        {typeList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                                    </Select>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className='w-full'>{link.id ? '编辑网站' : '新增网站'}</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        </>
    );
};

export default LinkManager;