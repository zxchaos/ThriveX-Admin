// ArticleManagement.tsx
import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, notification, Pagination, Card, Popconfirm } from 'antd';
import { delArticleDataAPI, getArticleListAPI } from '@/api/Article';
import dayjs from 'dayjs';
import { Article } from '@/types/article';
import Breadcrumb from '@/components/Breadcrumbs'

const ArticleManagement: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [paginate, setPaginate] = useState<Paginate<Article[]>>();

    const getArticleList = async (pagination?: { page: number; size: number }) => {
        setLoading(true);
        const result = await getArticleListAPI(pagination);
        console.log(result,888);

        // setPaginate(data as Paginate<Article[]>);
        setLoading(false);
    };

    useEffect(() => {
        getArticleList();
    }, []);

    const delArticleData = async (id: number) => {
        setLoading(true);

        await delArticleDataAPI(id);
        notification.success({
            message: '成功',
            description: '🎉 删除文章成功',
        });
        getArticleList({ page: paginate?.page!, size: paginate?.size! });

        setLoading(false);
    };

    const colors = ['info', '', 'success', 'danger', 'warning'];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center' as const,
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            align: 'center' as const,
        },
        {
            title: '摘要',
            dataIndex: 'description',
            key: 'description',
            align: 'center' as const,
            render: (text: string) => (text ? text : '该文章暂未设置文章摘要'),
        },
        {
            title: '分类',
            dataIndex: 'cate',
            key: 'cate',
            align: 'center' as const,
            render: (cate: { name: string }[]) => <span>{cate[0].name}</span>,
        },
        {
            title: '标签',
            dataIndex: 'tag',
            key: 'tag',
            align: 'center' as const,
            render: (tag: string) => (
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    {tag
                        ? tag.split(',').map((item, index) => (
                            <Tag key={item} color={colors[index] as any}>
                                {item}
                            </Tag>
                        ))
                        : <Tag color="info">暂无标签</Tag>}
                </div>
            ),
        },
        {
            title: '浏览量',
            dataIndex: 'view',
            key: 'view',
            align: 'center' as const,
        },
        {
            title: '评论数量',
            dataIndex: 'comment',
            key: 'comment',
            align: 'center' as const,
        },
        {
            title: '发布时间',
            dataIndex: 'createtime',
            key: 'create_time',
            align: 'center' as const,
            render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right' as const,
            align: 'center' as const,
            render: (text: string, record: Article) => (
                <div>
                    <Button type="primary" onClick={() => window.location.href = `/create?id=${record.id}`}>修改</Button>

                    {/* <Button
                        type="dashed"
                        style={{ marginLeft: 0 }}
                        onClick={() => delArticleData(record.id!)}
                    >
                        删除
                    </Button> */}

                    (
                    <Popconfirm title="警告" description="你确定要删除吗" onConfirm={() => delArticleData(record.id!)}>
                        <Button type="dashed" style={{ marginLeft: 0 }} >删除</Button>
                    </Popconfirm>
                    )
                </div>
            ),
        },
    ];

    useEffect(() => {
        getArticleList({ page: 1, size: 5 })
    }, [])

    return (
        <Card title={<Breadcrumb pageName="文章管理" />} className='border-stroke dark:border-strokedark [&>.ant-card-head]:border-stroke [&>.ant-card-head]:dark:border-strokedark dark:bg-boxdark [&>.ant-card-body]:pt-2'>
            <Table
                dataSource={paginate?.result}
                columns={columns}
                loading={loading}
                rowKey="id"
                pagination={false}
            />
        </Card>
    );
};

export default ArticleManagement;