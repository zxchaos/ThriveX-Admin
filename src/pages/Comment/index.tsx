import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Spin, Card } from 'antd';
import { TabsProps } from 'antd';
import { getCommentListAPI } from '@/api/Comment';
import List from './components/List';
import Breadcrumb from '@/components/Breadcrumbs';

const { TabPane } = Tabs;

const CommentManager: React.FC = () => {
    const [info, setInfo] = useState<Info>({
        tab: 'list',
        loading: false,
        list: [],
        paginate: { size: 0, page: 0, total: 0 }
    });

    const getCommentList = useCallback(async (page?: Page) => {
        setInfo(prev => ({ ...prev, loading: true }));

        const { data } = await getCommentListAPI(page);

        setInfo(prev => ({
            list: data.result.filter(item => (prev.tab === 'list' ? item.audit === 1 : item.audit === 0)),
            loading: false
        }));
    }, [info.tab]);

    useEffect(() => {
        getCommentList();
    }, [getCommentList]);

    const handleTabChange = (key: string) => {
        setInfo(prev => ({ ...prev, tab: key }));
        getCommentList();
    };

    return (
        <Card title={<Breadcrumb pageName="评论管理" />} className='border-stroke dark:border-strokedark [&>.ant-card-head]:border-stroke [&>.ant-card-head]:dark:border-strokedark dark:bg-boxdark [&>.ant-card-body]:pt-2'>
            <Tabs activeKey={info.tab} onChange={handleTabChange}>
                <TabPane tab="评论列表" key="list">
                    {info.loading ? <Spin /> : <List data={info} getCommentList={getCommentList} />}
                </TabPane>

                <TabPane tab="待审核" key="audit">
                    {info.loading ? <Spin /> : <List data={info} getCommentList={getCommentList} />}
                </TabPane>
            </Tabs>
        </Card>
    );
};

export default CommentManager;
