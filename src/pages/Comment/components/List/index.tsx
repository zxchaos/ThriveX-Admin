import React from 'react';
import { Table, Button, Pagination, Spin, message, Modal, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { auditCommentDataAPI, delCommentDataAPI } from '@/api/Comment';

interface ListProps {
    data: Info;
    getCommentList: (page?: Page) => void;
}

const List: React.FC<ListProps> = ({ data, getCommentList }) => {
    const auditComment = async (id: number) => {
        await auditCommentDataAPI(id);
        getCommentList();
        message.success('🎉 审核评论成功');
    };

    const delComment = async (id: number) => {
        await delCommentDataAPI(id);
        getCommentList();
        message.success('🎉 删除评论成功');
    };

    const columns: ColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            fixed: 'left',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 170,
            fixed: 'left',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 230,
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
            width: 270,
        },
        {
            title: '网站',
            dataIndex: 'url',
            key: 'url',
            width: 250,
            render: (url: string) => url ? <a href={url} className="url">{url}</a> : '无网站',
        },
        {
            title: '所属文章',
            dataIndex: 'article',
            key: 'article',
            width: 300,
        },
        {
            title: '评论时间',
            dataIndex: 'date',
            key: 'date',
            width: 230,
            render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '操作',
            key: 'action',
            width: data.tab === 'audit' ? 120 : 80,
            fixed: 'right',
            align: 'center',
            render: (_: any, record: any) => (
                <>
                    {data.tab === 'audit' && (
                        <Button type="link" onClick={() => auditComment(record.id)}><b>通过</b></Button>
                    )}

                    <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delComment(record.id)}>
                        <Button type="link" danger><b>删除</b></Button>
                    </Popconfirm>

                </>
            ),
        },
    ];

    return (
        <div className="list">
            <Spin spinning={data.loading} indicator={<svg />}>
                <Table
                    rowKey="id"
                    dataSource={data.list}
                    columns={columns}
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSize: 8
                    }}
                />
            </Spin>
        </div>
    );
};

export default List;
