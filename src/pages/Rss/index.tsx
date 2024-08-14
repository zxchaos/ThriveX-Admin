import React, { useEffect, useState } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Space, Spin } from 'antd';
import Title from '@/components/Title';
import { getRssListAPI } from '@/api/Rss';
import { Rss } from '@/types/rss';
import { BiCategory } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import dayjs from 'dayjs';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)} {text}
    </Space>
);

const RssPage = () => {
    const [list, setList] = useState<Rss[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getRssList = async () => {
        setLoading(true);
        const { data } = await getRssListAPI();
        setList(data as Rss[]);
        setLoading(false);
    };

    useEffect(() => {
        getRssList();
    }, []);

    return (
        <>
            <Title value='订阅中心' />

            <Card className='mt-2'>
                <Spin spinning={loading}>
                    <List
                        dataSource={list}
                        size="large"
                        itemLayout="vertical"
                        pagination={{
                            align: "center",
                            pageSize: 8
                        }}
                        renderItem={(item: Rss) => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText icon={BiCategory} text={item.type} key="list-vertical-star-o" />,
                                    <IconText icon={LuTimer} text={dayjs(+item.createTime!).format('YYYY-MM-DD HH:mm:ss')} key="list-vertical-like-o" />,
                                ]}
                                // extra={<img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" className='h-30' />}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.image} className='w-15 h-15 mr-2' />}
                                    title={<a href={item.url} target='_blank'>{item.title}</a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Spin>
            </Card>
        </>
    );
};

export default RssPage;