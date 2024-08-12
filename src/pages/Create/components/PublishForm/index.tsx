import { Form, Input, Button, Select, DatePicker, SelectProps } from "antd";
import "./index.scss"
import TextArea from "antd/es/input/TextArea";

const PublishForm = () => {
    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

    const onSubmit = () => {

    }

    return (
        <>
            <Form
                name="basic"
                size="large"
                layout="vertical"
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="选择发布时间"
                    name="createTime"
                >
                    <DatePicker placeholder="选择文章发布时间" className="w-full" />
                </Form.Item>

                <Form.Item
                    label="选择分类"
                    name="cate"
                    rules={[{ required: true, message: '请选择文章分类' }]}
                >
                    <Select placeholder="请选择文章分类">
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="选择标签"
                    name="tag"
                    rules={[{ required: true, message: '请选择文章标签' }]}
                >
                    <Select
                        allowClear
                        mode="multiple"
                        options={options}
                        // defaultValue={['a10', 'c12']}
                        placeholder="请选择文章标签"
                        className="w-full"
                    />
                </Form.Item>

                <Form.Item
                    label="文章封面"
                    name="cover"
                    rules={[{ required: true, message: '请输入文章封面' }]}
                >
                    <Input placeholder="请输入文章封面" />
                </Form.Item>

                <Form.Item
                    label="文章简介"
                    name="description"
                    rules={[{ required: true, message: '请输入文章简介' }]}
                >
                    <TextArea autoSize={{ minRows: 2, maxRows: 5 }} showCount placeholder="请输入文章简介" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-6/12">发布文章</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default PublishForm;
