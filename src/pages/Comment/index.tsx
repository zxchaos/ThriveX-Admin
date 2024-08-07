import { useState, useEffect } from 'react';
import { Tabs, Spin, Card, message, Table, Popconfirm, Button, Tag } from 'antd';
import { getCommentListAPI } from '@/api/Comment';
import { auditCommentDataAPI, delCommentDataAPI } from '@/api/Comment';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { titleSty } from '@/styles/sty';
import Title from '@/components/Title';
import { Comment as ArticleComment } from '@/types/comment'

const { TabPane } = Tabs;

const Comment = () => {
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(false);
    const [comment, setComment] = useState<Comment>();
    const [list, setList] = useState<Comment[]>([]);

    // const loadingFn = async (callback: () => void) => {
    //     setLoading(true)
    //     await callback()
    //     setLoading(false)
    // }

    const getCommentList = async () => {
        const { data } = await getCommentListAPI();
        setList(data as Comment[])
        setLoading(false)
    }

    const auditCommentData = async (id: number) => {
        setLoading(true)
        await auditCommentDataAPI(id);
        getCommentList();
        message.success('🎉 审核评论成功');
    };

    const delCommentData = async (id: number) => {
        setLoading(true)
        await delCommentDataAPI(id);
        getCommentList();
        message.success('🎉 删除评论成功');
    };

    useEffect(() => {
        setLoading(true)
        getCommentList();
    }, []);

    const columns: ColumnsType = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: "center"
        },
        {
            title: '状态',
            dataIndex: 'auditStatus',
            key: 'auditStatus',
            fixed: 'left',
            render: (status: number) => status ?
                <Tag bordered={false} color="processing">通过</Tag>
                : <Tag bordered={false} color="error">待审核</Tag>
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '网站',
            dataIndex: 'url',
            key: 'url',
            render: (url: string) => url ? <a href={url} className="hover:text-primary">{url}</a> : '无网站',
        },
        {
            title: '所属文章',
            dataIndex: 'articleTitle',
            key: 'articleTitle',
        },
        {
            title: '评论时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            align: 'center',
            render: (text: string, record: ArticleComment) => (
                <div className='flex space-x-2'>
                    {!record.auditStatus && <Button type='primary' onClick={() => auditCommentData(1)}>审核</Button>}
                    <Button>查看</Button>
                    <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delCommentData(record.id)}>
                        <Button type="primary" danger>删除</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <Title value='评论管理' />

            <Card className={`${titleSty} mt-2`}>
                <Spin spinning={loading} indicator={<svg />}>
                    <Table
                        rowKey="id"
                        dataSource={list}
                        columns={columns}
                        scroll={{ x: 'max-content' }}
                        pagination={{
                            position: ['bottomCenter'],
                            pageSize: 8
                        }}
                    />
                </Spin>
            </Card>
        </>
    );
};

export default Comment;
