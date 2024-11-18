import { Button, Form, Input } from "antd"

export default () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {

    };

    return (
        <>
            <div className="mt-8">
                <Form
                    form={form}
                    size='large'
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="w-full lg:w-[500px] md:ml-10"
                >
                    <Form.Item label="服务器" name="host">
                        <Input placeholder="smtp.qq.com" />
                    </Form.Item>

                    <Form.Item label="端口" name="port">
                        <Input placeholder="465" />
                    </Form.Item>

                    <Form.Item label="用户名" name="host">
                        <Input placeholder="3311118881@qq.com" />
                    </Form.Item>

                    <Form.Item label="密码" name="host">
                        <Input placeholder="audhaudhaudhauddwq" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}