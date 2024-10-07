import { useEffect, useState } from "react";
import { Card, Dropdown, message } from "antd";
import { getLinkListAPI, delLinkDataAPI, auditWebDataAPI } from '@/api/Web';
import { getCommentListAPI, auditCommentDataAPI, delCommentDataAPI } from "@/api/Comment";
import { getWallListAPI, auditWallDataAPI, delWallDataAPI } from "@/api/Wall";

import Title from "@/components/Title";

import comment from './image/comment.svg';
import info from './image/message.svg';
import link from './image/link.svg';

import dayjs from 'dayjs';
import RandomAvatar from "@/components/RandomAvatar";
import Empty from "@/components/Empty";

type Menu = "comment" | "link" | "wall";

interface ListItemProps {
    item: any;
    type: Menu;
    handleApproval: (id: number, type: Menu) => void;
    handleRejection: (id: number, type: Menu) => void;
}

const ListItem = ({ item, type, handleApproval, handleRejection }: ListItemProps) => (
    <div key={item.id}>
        <div className="text-center text-xs text-[#e0e0e0] mb-4">
            {dayjs(+item.createTime!).format('YYYY-MM-DD HH:mm:ss')}
        </div>

        <div className="flex justify-between p-7 rounded-md transition-colors">
            <div className="flex mr-10">
                {type !== "wall" ? (
                    <img src={item.avatar || item.image} alt="" className="w-13 h-13 border border-[#eee] rounded-full" />
                ) : <RandomAvatar className="w-13 h-13 border border-[#eee] rounded-full" />}

                <div className="flex flex-col justify-center ml-4 px-4 py-2 bg-[#F9F9FD] rounded-md">
                    {type === "link" ? (
                        <>
                            <div>名称：{item.title}</div>
                            <div>介绍：{item.description}</div>
                            <div>类型：{item.type.name}</div>
                            <div>邮箱：{item.email || '暂无'}</div>
                            <div>地址：{item.url || '暂无'}</div>
                        </>
                    ) : type === "comment" ? (
                        <>
                            <div>名称：{item.name}</div>
                            <div>内容：{item.content}</div>
                            <div>邮箱：{item.email || '暂无'}</div>
                            <div>地址：{item.url || '暂无'}</div>
                        </>
                    ) : (
                        <>
                            <div>名称：{item.name}</div>
                            <div>内容：{item.content}</div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-end">
                <Dropdown menu={{
                    items: [
                        { key: 'ok', label: "通过", onClick: () => handleApproval(item.id, type) },
                        { key: 'no', label: "拒审", onClick: () => handleRejection(item.id, type) }
                    ]
                }}>
                    <div className="flex justify-evenly items-center bg-[#F9F9FD] w-11 h-5 rounded-md cursor-pointer">
                        <span className="inline-block w-2 h-2 bg-[#b5c2d3] rounded-full"></span>
                        <span className="inline-block w-2 h-2 bg-[#b5c2d3] rounded-full"></span>
                    </div>
                </Dropdown>
            </div>
        </div>
    </div>
);

const WorkPage = () => {
    const activeSty = "bg-[#f9f9ff] text-primary";
    const [active, setActive] = useState<Menu>("comment");
    const [commentList, setCommentList] = useState<any[]>([]);
    const [linkList, setLinkList] = useState<any[]>([]);
    const [wallList, setWallList] = useState<any[]>([]);

    const fetchData = async (type: Menu) => {
        if (type === "comment") {
            const { data } = await getCommentListAPI({ query: { status: 0 } });
            setCommentList(data);
        } else if (type === "link") {
            const { data } = await getLinkListAPI({ query: { status: 0 } });
            setLinkList(data);
        } else if (type === "wall") {
            const { data } = await getWallListAPI({ query: { status: 0 } });
            setWallList(data);
        }
    };

    useEffect(() => {
        fetchData(active);
    }, [active]);

    const handleApproval = async (id: number, type: Menu) => {
        if (type === "link") {
            await auditWebDataAPI(id);
            message.success('🎉 友链审核成功');
        } else if (type === "comment") {
            await auditCommentDataAPI(id);
            message.success('🎉 评论审核成功');
        } else if (type === "wall") {
            await auditWallDataAPI(id);
            message.success('🎉 留言审核成功');
        }
        fetchData(type);
    };

    const handleRejection = async (id: number, type: Menu) => {
        if (type === "link") {
            await delLinkDataAPI(id);
            message.success('🎉 友链拒审成功');
        } else if (type === "comment") {
            await delCommentDataAPI(id);
            message.success('🎉 评论拒审成功');
        } else if (type === "wall") {
            await delWallDataAPI(id);
            message.success('🎉 留言拒审成功');
        }
        fetchData(type);
    };

    const renderList = (list: any[], type: Menu) => {
        if (list.length === 0) {
            return <Empty />;
        }
        return list.map(item => (
            <ListItem key={item.id} item={item} type={type} handleApproval={handleApproval} handleRejection={handleRejection} />
        ));
    };

    return (
        <>
            <Title value="工作台" />
            <Card className="mt-2">
                <div className="flex w-full">
                    <div className="w-2/12 min-h-96 pr-4 border-r border-[#eee]">
                        <ul className="space-y-1">
                            {(["comment", "link", "wall"] as Menu[]).map((menu) => (
                                <li
                                    key={menu}
                                    className={`flex items-center w-full py-3 px-4 hover:bg-[#f9f9ff] hover:text-primary ${active === menu ? activeSty : ''} rounded-md text-base cursor-pointer transition-colors`}
                                    onClick={() => setActive(menu)}
                                >
                                    <img src={menu === "comment" ? comment : menu === "link" ? link : info} alt="" className="w-8 mr-4" />
                                    <span>{menu === "comment" ? "评论" : menu === "link" ? "友联" : "留言"}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-10/12 pl-6 py-4 space-y-10">
                        {active === "link" && renderList(linkList, "link")}
                        {active === "comment" && renderList(commentList, "comment")}
                        {active === "wall" && renderList(wallList, "wall")}
                    </div>
                </div>
            </Card>
        </>
    );
}

export default WorkPage;