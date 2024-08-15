import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useUserStore } from "@/stores"; // 假设你有一个状态管理库类似于pinia
import { editUserDataAPI, getUserDataAPI } from "@/api/User";
import { User } from "@/types/app/user";

interface UserForm {
    name: string;
    email: string;
    avatar: string;
    info: string;
}

const UserPage = () => {
    const [form] = Form.useForm<UserForm>();
    const [loading, setLoading] = useState<boolean>(false);
    const store = useUserStore();

    const getUserData = async () => {
        const { data } = await getUserDataAPI(store.user?.id);
        store.setUser(data);
        form.setFieldsValue(data);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getUserData();
    }, []);

    const onSubmit = async (values: UserForm) => {
        setLoading(false)
        await editUserDataAPI({ id: store.user.id, ...values });
        message.success("🎉 修改用户信息成功");
        store.setUser(values as User); 
        getUserData();
    };

    return (
        <div>
            <h2 className="text-xl pb-4 text-center">个人设置</h2>

            <Form
                form={form}
                size="large"
                layout="vertical"
                onFinish={onSubmit}
                className="w-5/12 mx-auto"
            >
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: "名称不能为空" }]}
                >
                    <Input placeholder="宇阳" />
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: "邮箱不能为空" }]}
                >
                    <Input placeholder="liuyuyang1024@yeah.net" />
                </Form.Item>

                <Form.Item
                    label="头像"
                    name="avatar"
                    rules={[{ required: true, message: "头像不能为空" }]}
                >
                    <Input placeholder="https://liuyuyang.net/logo.png" />
                </Form.Item>

                <Form.Item
                    label="介绍"
                    name="info"
                    rules={[{ required: true, message: "介绍不能为空" }]}
                >
                    <Input placeholder="互联网从不缺乏天才, 而努力才是最终的入场劵" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" loading={loading}>编辑信息</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserPage;
