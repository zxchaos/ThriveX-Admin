import { useState, useEffect } from 'react';
import { Spin, Card, message, Table, Popconfirm, Button, Tag, Modal } from 'antd';
import { getCommentListAPI } from '@/api/Comment';
import { auditCommentDataAPI, delCommentDataAPI } from '@/api/Comment';
import { ColumnsType } from 'antd/es/table';
import { titleSty } from '@/styles/sty';
import Title from '@/components/Title';
import { Comment } from '@/types/app/comment'
import dayjs from 'dayjs';

const CommentPage = () => {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState<Comment>();
    const [list, setList] = useState<Comment[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getCommentList = async () => {
        const { data } = await getCommentListAPI();
        // 根据时间排序：最新时间在前
        const sortedData = (data as Comment[]).sort((a, b) => +b.createTime - +a.createTime);
        setList(sortedData as Comment[])
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
            render: (text: string, record) => <span className="hover:text-primary cursor-pointer" onClick={() => {
                setComment(record)
                setIsModalOpen(true)
            }}>{text}</span>
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
            render: (text: string, record: Comment) => (
                <div className='flex justify-center space-x-2'>
                    {
                        !record.auditStatus
                            ? <Button type='primary' onClick={() => {
                                setComment(record)
                                setIsModalOpen(true)
                            }}>审核</Button>
                            : <Button onClick={() => {
                                setComment(record)
                                setIsModalOpen(true)
                            }}>查看</Button>
                    }

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
                    {list.length && <Table
                        rowKey="id"
                        dataSource={list}
                        columns={columns}
                        expandable={{ defaultExpandAllRows: true }}
                        scroll={{ x: 'max-content' }}
                        pagination={{
                            position: ['bottomCenter'],
                            pageSize: 8
                        }}
                    />}
                </Spin>
            </Card>

            <Modal title='评论详情' open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <div className='pt-2 space-y-2'>
                    <div><b>所属文章：</b> {comment?.articleTitle}</div>
                    <div><b>评论时间：</b> {dayjs(comment?.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                    <div><b>评论用户：</b> {comment?.name}</div>
                    <div><b>邮箱：</b> {comment?.email}</div>
                    <div><b>网站：</b> {comment?.url ? <a href={comment?.url} className="hover:text-primary">{comment?.url}</a> : '无网站'}</div>
                    <div><b>内容：</b> {comment?.content}</div>
                    <div><b>状态：</b> {comment?.auditStatus
                        ? <Tag bordered={false} color="processing">通过</Tag>
                        : <Tag bordered={false} color="error">待审核</Tag>}
                    </div>

                    {!comment?.auditStatus ? <Button type="primary" className='w-full !mt-4' onClick={() => auditCommentData(1)}>通过审核</Button> : null}
                </div>
            </Modal>
        </>
    );
};

export default CommentPage;
