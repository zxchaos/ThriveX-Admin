import { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { getWebDataAPI, editWebDataAPI } from '@/api/System';
import { Web } from './type'

const WebPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [web, setWeb] = useState<Web>({
        url: '',
        title: '',
        subhead: '',
        light_logo: '',
        dark_logo: '',
        description: '',
        keyword: '',
        favicon: '',
        footer: '',
        social: '',
        covers: []
    });
    const [tempCovers, setTempCovers] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await getWebDataAPI();
            data.social = JSON.stringify(data.social);
            setTempCovers(data.covers.join("\n"));
            setWeb(data);
            form.setFieldsValue(data);
            setLoading(false);
        };

        fetchData();
    }, [form]);

    const onFinish = async (values: Web) => {
        setLoading(true);
        values.covers = tempCovers.split("\n");
        await editWebDataAPI(values);
        setLoading(false);
        notification.success({
            message: '成功',
            description: '🎉编辑网站成功',
        });
    };

    return (
        <div>
            <h2 className="text-xl pb-4 text-center">网站配置</h2>

            <Form
                form={form}
                size='large'
                layout="vertical"
                onFinish={onFinish}
                initialValues={web}
                className="w-5/12 mx-auto"
            >
                <Form.Item
                    label="网站名称"
                    name="title"
                    rules={[
                        { required: true, message: '网站名称不能为空' },
                        { min: 1, max: 10, message: '网站名称限制在1 ~ 10个字符' }
                    ]}
                >
                    <Input placeholder="Thrive" />
                </Form.Item>

                <Form.Item
                    label="网站副标题"
                    name="subhead"
                    rules={[
                        { required: true, message: '网站副标题不能为空' },
                        { min: 1, max: 50, message: '网站副标题限制在1 ~ 50个字符' }
                    ]}
                >
                    <Input placeholder="花有重开日, 人无再少年" />
                </Form.Item>

                <Form.Item
                    label="网站链接"
                    name="url"
                    rules={[{ required: true, message: '网站链接不能为空' }]}
                >
                    <Input placeholder="https://liuyuyang.net/" />
                </Form.Item>

                <Form.Item
                    label="网站图标"
                    name="favicon"
                    rules={[{ required: true, message: '网站图标不能为空' }]}
                >
                    <Input placeholder="https://liuyuyang.net/favicon.ico" />
                </Form.Item>

                <Form.Item
                    label="光亮主题LOGO"
                    name="light_logo"
                    rules={[{ required: true, message: '网站LOGO不能为空' }]}
                >
                    <Input placeholder="https://liuyuyang.net/logo.png" />
                </Form.Item>

                <Form.Item
                    label="暗黑主题LOGO"
                    name="dark_logo"
                    rules={[{ required: true, message: '网站LOGO不能为空' }]}
                >
                    <Input placeholder="https://liuyuyang.net/logo.png" />
                </Form.Item>

                <Form.Item
                    label="网站描述"
                    name="description"
                    rules={[
                        { required: true, message: '网站描述不能为空' },
                        { min: 5, max: 300, message: '网站描述限制在5 ~ 300个字符' }
                    ]}
                >
                    <Input placeholder="记录前端、Python、Java点点滴滴" />
                </Form.Item>

                <Form.Item
                    label="网站关键词"
                    name="keyword"
                    rules={[{ required: true, message: '网站关键词不能为空' }]}
                >
                    <Input placeholder="Java,前端,Python" />
                </Form.Item>

                <Form.Item
                    label="随机文章封面"
                    name="covers"
                    rules={[{ required: true, message: '网站随机封面不能为空' }]}
                >
                    <Input.TextArea
                        value={tempCovers}
                        onChange={(e) => setTempCovers(e.target.value)}
                        autoSize={{ minRows: 2, maxRows: 10 }}
                        placeholder="Please input"
                    />
                </Form.Item>

                <Form.Item
                    label="社交网站"
                    name="social"
                    rules={[{ required: true, message: '社交网站不能为空' }]}
                >
                    <Input.TextArea
                        value={web.social}
                        onChange={(e) => setWeb({ ...web, social: e.target.value })}
                        autoSize={{ minRows: 2, maxRows: 10 }}
                        placeholder="Please input"
                    />
                </Form.Item>

                <Form.Item
                    label="底部信息"
                    name="footer"
                    rules={[
                        { required: true, message: '网站底部信息不能为空' },
                        { min: 10, max: 300, message: '网站底部信息限制在10 ~ 300个字符' }
                    ]}
                >
                    <Input placeholder="记录前端、Python、Java点点滴滴" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        编辑网站
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default WebPage;
