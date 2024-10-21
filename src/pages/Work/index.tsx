import { useEffect, useState } from "react";
import { Button, Card, Dropdown, message, Modal } from "antd";
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

import { useWebStore } from '@/stores';
import TextArea from "antd/es/input/TextArea";
import { sendDismissEmailAPI } from "@/api/Email";

type Menu = "comment" | "link" | "wall";

interface ListItemProps {
    item: any;
    type: Menu;
    fetchData: (type: Menu) => void;
}

const ListItem = ({ item, type, fetchData }: ListItemProps) => {
    const web = useWebStore(state => state.web)

    // 审核数据
    const handleApproval = async () => {
        if (type === "link") {
            await auditWebDataAPI(item.id);
            message.success('🎉 友链审核成功');
        } else if (type === "comment") {
            await auditCommentDataAPI(item.id);
            message.success('🎉 评论审核成功');
        } else if (type === "wall") {
            await auditWallDataAPI(item.id);
            message.success('🎉 留言审核成功');
        }
        fetchData(type);
    };

    // 驳回原因
    const [dismissInfo, setDismissInfo] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDismiss = async () => {
        if (type === "link") {
            await delLinkDataAPI(item.id);
            message.success('🎉 友链驳回成功');
        } else if (type === "comment") {
            await delCommentDataAPI(item.id);
            message.success('🎉 评论驳回成功');
        } else if (type === "wall") {
            await delWallDataAPI(item.id);
            message.success('🎉 留言驳回成功');
        }

        setIsModalOpen(false)
        fetchData(type);
        setDismissInfo("")

        // 发送驳回通知邮件
        sendDismissEmail()
    };

    // 发送驳回通知邮件
    const sendDismissEmail = () => {
        // 类型名称
        let email_info = {
            name: "",
            type: "",
            url: ""
        }
        switch (type) {
            case "link":
                email_info = {
                    name: item.title,
                    type: "友链",
                    url: `${web.url}/friend`,
                }
                break;
            case "comment":
                email_info = {
                    name: item.name,
                    type: "评论",
                    url: `${web.url}/article/${item.articleId}`,
                }
                break;
            case "wall":
                email_info = {
                    name: item.name,
                    type: "留言",
                    url: `${web.url}/wall/all`,
                }
                break;
        }

        sendDismissEmailAPI({
            to: item.email,
            content: dismissInfo,
            recipient: email_info.name,
            subject: `${email_info.type}驳回通知`,
            time: dayjs(Date.now()).format('YYYY年MM月DD日 HH:mm'),
            type: email_info.type,
            url: email_info.url
        })
    }


    return (
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
                                <div>网站：{item.url || '暂无'}</div>
                            </>
                        ) : type === "comment" ? (
                            <>
                                <div>名称：{item.name}</div>
                                <div>内容：{item.content}</div>
                                <div>网站：{item.url || '暂无'}</div>
                                <div>所属文章：<a href={`${web.url}/article/${item.articleId}`} target='_blank' className="hover:text-primary">{item.articleTitle || '暂无'}</a></div>
                            </>
                        ) : (
                            <>
                                <div>名称：{item.name}</div>
                                <div>内容：{item.content}</div>
                            </>
                        )}

                        <div>邮箱：{item.email || '暂无'}</div>
                    </div>
                </div>

                <div className="flex items-end">
                    <Dropdown menu={{
                        items: [
                            { key: 'ok', label: "通过", onClick: handleApproval },
                            { key: 'no', label: "驳回", onClick: () => setIsModalOpen(true) }
                        ]
                    }}>
                        <div className="flex justify-evenly items-center bg-[#F9F9FD] w-11 h-5 rounded-md cursor-pointer">
                            <span className="inline-block w-2 h-2 bg-[#b5c2d3] rounded-full"></span>
                            <span className="inline-block w-2 h-2 bg-[#b5c2d3] rounded-full"></span>
                        </div>
                    </Dropdown>
                </div>
            </div>

            <Modal title="驳回原因" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} onClose={() => setIsModalOpen(false)}>
                <TextArea
                    value={dismissInfo}
                    onChange={(e) => setDismissInfo(e.target.value)}
                    placeholder="请输入驳回原因"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />

                <div className="flex space-x-4">
                    <Button className="w-full mt-2" onClick={() => setIsModalOpen(false)}>取消</Button>
                    <Button type="primary" className="w-full mt-2" onClick={handleDismiss}>确定</Button>
                </div>
            </Modal>
        </div>
    )
}

const WorkPage = () => {
    const activeSty = "bg-[#f9f9ff] text-primary";
    const [active, setActive] = useState<Menu>("comment");
    const [commentList, setCommentList] = useState<any[]>([]);
    const [linkList, setLinkList] = useState<any[]>([]);
    const [wallList, setWallList] = useState<any[]>([]);

    // 重新获取最新数据
    const fetchData = async (type: Menu) => {
        if (type === "comment") {
            const { data } = await getCommentListAPI({ query: { status: 0 }, pattern: "list" });
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

    const renderList = (list: any[], type: Menu) => {
        if (list.length === 0) {
            return <Empty />;
        }
        return list.map(item => (
            <ListItem key={item.id} item={item} type={type} fetchData={(type) => fetchData(type)} />
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