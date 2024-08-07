import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, notification, Card, Popconfirm } from 'antd';
import { delArticleDataAPI, getArticleListAPI } from '@/api/Article';
import dayjs from 'dayjs';
import type { Article } from '@/types/article';
import { titleSty } from '@/styles/sty'
import Title from '@/components/Title';
import type { Tag as ArticleTag } from '@/types/tag';
import type { Cate } from '@/types/cate';

const Article: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [articleList, setArticleList] = useState<Article[]>([]);

    const getArticleList = async () => {
        setLoading(true);

        const { data } = await getArticleListAPI();
        setArticleList(data as Article[]);

        setLoading(false);
    };

    useEffect(() => {
        getArticleList();
    }, []);

    const delArticleData = async (id: number) => {
        setLoading(true);

        await delArticleDataAPI(id);
        notification.success({ message: '🎉 删除文章成功' })
        getArticleList();

        setLoading(false);
    };

    // 标签颜色
    const colors = ['', '#2db7f5', '#87d068', '#f50', '#108ee9'];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 100,
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            width: 250,
        },
        {
            title: '摘要',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
            width: 400,
            render: (text: string) => (text ? text : '该文章暂未设置文章摘要'),
        },
        {
            title: '分类',
            dataIndex: 'cateList',
            key: 'cateList',
            align: 'center',
            render: (cates: Cate[]) => cates.map((item, index) => <Tag key={item.id} color={colors[index]}>{item.name}</Tag>)
        },
        {
            title: '标签',
            dataIndex: 'tagList',
            key: 'tagList',
            align: 'center',
            render: (tags: ArticleTag[]) => tags.map((item, index) => <Tag key={item.id} color={colors[index]}>{item.name}</Tag>)
        },
        {
            title: '浏览量',
            dataIndex: 'view',
            key: 'view',
            align: 'center',
        },
        {
            title: '评论数量',
            dataIndex: 'comment',
            key: 'comment',
            align: 'center',
            render: (data: string) => <span>{data}</span>,
        },
        {
            title: '发布时间',
            dataIndex: 'createtime',
            key: 'create_time',
            align: 'center',
            width: 200,
            render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            align: 'center',
            render: (text: string, record: Article) => (
                <div className='flex space-x-2'>
                    <Button onClick={() => window.location.href = `/create?id=${record.id}`}>修改</Button>

                    <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delArticleData(record.id!)}>
                        <Button type="primary" danger>删除</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <Title value="文章管理" />

            <Card className={`${titleSty} mt-2`}>
                <Table
                    rowKey="id"
                    dataSource={articleList}
                    columns={columns as any}
                    loading={loading}
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSize: 8
                    }}
                />
            </Card>
        </>
    );
};

export default Article;