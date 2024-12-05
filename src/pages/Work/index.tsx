import { useEffect, useState } from "react";
import { Button, Card, Dropdown, message, Modal } from "antd";
import { getLinkListAPI, delLinkDataAPI, auditWebDataAPI } from '@/api/Web';
import { getCommentListAPI, auditCommentDataAPI, delCommentDataAPI, addCommentDataAPI } from "@/api/Comment";
import { getWallListAPI, auditWallDataAPI, delWallDataAPI } from "@/api/Wall";

import Title from "@/components/Title";

import comment from './image/comment.svg';
import info from './image/message.svg';
import link from './image/link.svg';

import dayjs from 'dayjs';
import RandomAvatar from "@/components/RandomAvatar";
import Empty from "@/components/Empty";

import { useUserStore, useWebStore } from '@/stores';
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
    const user = useUserStore(state => state.user)

    const [btnType, setBtnType] = useState<"reply" | "dismiss" | string>("")

    // 通过
    const handleApproval = async () => {
        if (type === "link") {
            await auditWebDataAPI(item.id);
        } else if (type === "comment") {
            await auditCommentDataAPI(item.id);
        } else if (type === "wall") {
            await auditWallDataAPI(item.id);
        }

        btnType != "reply" && message.success('🎉 审核成功');
        fetchData(type);
    };

    // 回复
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [replyInfo, setReplyInfo] = useState("")
    const handleReply = async () => {
        // 审核通过评论
        await handleApproval()

        // 发送回复内容
        await addCommentDataAPI({
            avatar: user.avatar,
            url: web.url,
            content: replyInfo,
            commentId: item?.id!,
            auditStatus: 1,
            email: user.email,
            name: user.name,
            articleId: item?.articleId!,
            createTime: new Date().getTime().toString(),
        })

        message.success('🎉 回复成功');
        setIsModalOpen(false)
        fetchData(type);
        setReplyInfo("")
        setBtnType("")
    }

    // 驳回
    const [dismissInfo, setDismissInfo] = useState("")
    const handleDismiss = async () => {
        if (type === "link") {
            await delLinkDataAPI(item.id);
        } else if (type === "comment") {
            await delCommentDataAPI(item.id);
        } else if (type === "wall") {
            await delWallDataAPI(item.id);
        }
        
        // 有内容就发送驳回通知邮件，反之直接删除
        if(dismissInfo.trim().length) await sendDismissEmail()

        message.success('🎉 驳回成功');
        setIsModalOpen(false)
        fetchData(type);
        setDismissInfo("")
        setBtnType("")
    };

    // 发送驳回通知邮件
    const sendDismissEmail = async () => {
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

        // 有邮箱才会邮件通知
        item.email != null && await sendDismissEmailAPI({
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

            <div className="flex justify-between md:p-7 rounded-md transition-colors">
                <div className="flex mr-10">
                    {type !== "wall" ? (
                        <img src={item.avatar || item.image} alt="" className="w-13 h-13 border border-[#eee] rounded-full" />
                    ) : <RandomAvatar className="w-13 h-13 border border-[#eee] rounded-full" />}

                    <div className="flex flex-col justify-center ml-4 px-4 py-2 min-w-[210px] text-xs md:text-sm bg-[#F9F9FD] rounded-md">
                        {type === "link" ? (
                            <>
                                <div>名称：{item.title}</div>
                                <div>介绍：{item.description}</div>
                                <div>类型：{item.type.name}</div>
                                <div>网站：{item?.url ? <a href={item?.url} target='_blank' className="hover:text-primary font-bold">{item?.url}</a> : '无网站'}</div>
                            </>
                        ) : type === "comment" ? (
                            <>
                                <div>名称：{item.name}</div>
                                <div>内容：{item.content}</div>
                                <div>网站：{item?.url ? <a href={item?.url} target='_blank' className="hover:text-primary font-bold">{item?.url}</a> : '无网站'}</div>
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
                            { key: 'reply', label: "回复", onClick: () => [setIsModalOpen(true), setBtnType("reply")] },
                            { key: 'dismiss', label: "驳回", onClick: () => [setIsModalOpen(true), , setBtnType("dismiss")] }
                        ]
                    }}>
                        <div className="flex justify-evenly items-center bg-[#F9F9FD] w-11 h-5 rounded-md cursor-pointer">
                            <span className="inline-block w-2 h-2 bg-[#b5c2d3] rounded-full"></span>
                            <span className="inline-block w-2 h-2 bg-[#b5c2d3] rounded-full"></span>
                        </div>
                    </Dropdown>
                </div>
            </div>

            <Modal title={btnType === "reply" ? "回复内容" : "驳回原因"} open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} onClose={() => setIsModalOpen(false)}>
                <TextArea
                    value={btnType === "reply" ? replyInfo : dismissInfo}
                    onChange={(e) => (btnType === "reply" ? setReplyInfo(e.target.value) : setDismissInfo(e.target.value))}
                    placeholder={btnType === "reply" ? "请输入回复内容" : "请输入驳回原因"}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />

                <div className="flex space-x-4">
                    <Button className="w-full mt-2" onClick={() => setIsModalOpen(false)}>取消</Button>
                    <Button type="primary" className="w-full mt-2" onClick={btnType === "reply" ? handleReply : handleDismiss}>确定</Button>
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
            <Card className="mt-2 min-h-[calc(100vh-180px)]">
                <div className="flex flex-col md:flex-row w-full">
                    <div className="w-full min-w-[200px] md:w-2/12 md:min-h-96 mb-5 md:mb-0 pr-4 border-b md:border-b-transparent md:border-r border-[#eee]">
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

                    <div className="w-full md:w-10/12 md:pl-6 py-4 space-y-10">
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