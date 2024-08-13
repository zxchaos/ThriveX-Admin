import { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Cascader, FormProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { RuleObject } from "antd/es/form";
import { addArticleDataAPI } from '@/api/Article'
import { getCateListAPI } from '@/api/Cate'
import { getTagListAPI } from '@/api/Tag'
import { Cate } from "@/types/cate";
import { Tag } from "@/types/tag";
import dayjs from 'dayjs';
import "./index.scss"
import { Article } from "@/types/article";

interface FieldType {
    title: string,
    createTime: number;
    cateIds: number[] | string;
    tagIds: number[] | string;
    cover: string;
    description: string;
}

const PublishForm = ({ content }: { content: string }) => {
    const [form] = Form.useForm()
    const [cateList, setCateList] = useState<Cate[]>([])
    const [tagList, setTagList] = useState<Tag[]>([])

    const getCateList = async () => {
        const { data } = await getCateListAPI()
        setCateList(data as Cate[])
    }

    const getTagList = async () => {
        const { data } = await getTagListAPI()
        setTagList(data as Tag[])
    }

    useEffect(() => {
        getCateList()
        getTagList()
    }, [])

    const validateURL = (_: RuleObject, value: string) => {
        if (!value || /^(https?:\/\/)/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('请输入有效的封面链接'));
    };

    const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log(values);

        values.createTime = values.createTime.valueOf()
        values.cateIds = (values.cateIds as number[]).flat().join(',')
        values.tagIds = values.tagIds ? (values.tagIds as number[]).join(',') : ""

        console.log({ ...values, content });
        await addArticleDataAPI({ ...values, content } as Article)
        message.success("🎉 发布成功")
    }

    return (
        <>
            <Form
                form={form}
                name="basic"
                size="large"
                layout="vertical"
                onFinish={onSubmit}
                autoComplete="off"
                initialValues={{ createTime: dayjs(new Date()) }}
            >
                <Form.Item label="文章标题" name="title" rules={[{ required: true, message: "请输入文章标题" }]}>
                    <Input placeholder="请输入文章标题" />
                </Form.Item>

                <Form.Item label="文章封面" name="cover" rules={[{ validator: validateURL }]}>
                    <Input placeholder="请输入文章封面" />
                </Form.Item>

                <Form.Item label="文章简介" name="description">
                    <TextArea autoSize={{ minRows: 2, maxRows: 5 }} showCount placeholder="请输入文章简介" />
                </Form.Item>

                <Form.Item label="选择分类" name="cateIds" rules={[{ required: true, message: '请选择文章分类' }]}>
                    <Cascader
                        options={cateList}
                        maxTagCount="responsive"
                        fieldNames={{ label: "name", value: "id" }}
                        placeholder="请选择文章分类"
                        multiple
                        className="w-full"
                    />
                </Form.Item>

                <Form.Item label="选择标签" name="tagIds">
                    <Select
                        allowClear
                        mode="multiple"
                        options={tagList}
                        fieldNames={{ label: 'name', value: 'id' }}
                        placeholder="请选择文章标签"
                        className="w-full"
                    />
                </Form.Item>

                <Form.Item label="选择发布时间" name="createTime">
                    <DatePicker showTime placeholder="选择文章发布时间" className="w-full" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-6/12">发布文章</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default PublishForm;
