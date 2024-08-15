import { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Cascader, FormProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { RuleObject } from "antd/es/form";
import { addArticleDataAPI, editArticleDataAPI } from '@/api/Article'
import { getCateListAPI } from '@/api/Cate'
import { getTagListAPI } from '@/api/Tag'
import { Cate } from "@/types/app/cate";
import { Tag } from "@/types/app/tag";
import dayjs from 'dayjs';
import "./index.scss"
import { Article } from "@/types/article";
import { useNavigate } from "react-router-dom";

interface FieldType {
    title: string,
    createTime: number;
    cateIds: number[] | string;
    tagIds: number[] | string;
    cover: string;
    description: string;
}

const PublishForm = ({ data, closeModel }: { data: Article, closeModel: () => void }) => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [cateList, setCateList] = useState<Cate[]>([])
    const [tagList, setTagList] = useState<Tag[]>([])

    useEffect(() => {
        if (!data.id) return

        const cateIds = transCateArray(data.cateList)
        const tagIds = data.tagList.map(item => item.id)
        form.setFieldsValue({
            ...data,
            cateIds,
            tagIds,
            createTime: dayjs(+data.createTime!)
        })
    }, [data])

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

    // 校验文章封面
    const validateURL = (_: RuleObject, value: string) => {
        return !value || /^(https?:\/\/)/.test(value) ? Promise.resolve() : Promise.reject(new Error('请输入有效的封面链接'));
    };

    const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
        values.createTime = values.createTime.valueOf()
        values.cateIds = (values.cateIds as number[]).flat().join(',')
        values.tagIds = values.tagIds ? (values.tagIds as number[]).join(',') : ""

        if (data.id) {
            await editArticleDataAPI({ id: data.id, ...values, content: data.content } as any)
            message.success("🎉 编辑成功")
        } else {
            await addArticleDataAPI({ id: data.id, ...values, content: data.content } as any)
            message.success("🎉 发布成功")
        }

        // 关闭弹框
        closeModel()
        // 跳转到文章页
        navigate("/article")
        // 初始化表单
        form.resetFields()
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
                    <Button type="primary" htmlType="submit" className="w-full">{data.id ? "编辑文章" : "发布文章"}</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default PublishForm;

// 提取分类的id
function transCateArray(arr: Cate[]): any {
    return arr.map((item: Cate) => {
        if (item.children && item.children.length > 0) {
            return [item.id, ...transCateArray(item.children)].flat();
        } else {
            return item.id;
        }
    });
}