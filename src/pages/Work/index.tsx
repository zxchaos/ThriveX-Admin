import { useEffect, useState } from "react"
import { Card, Dropdown, message } from "antd"
import { getLinkListAPI, delLinkDataAPI, auditWebDataAPI } from '@/api/Web'

import Title from "@/components/Title"

import comment from './image/comment.svg'
import info from './image/message.svg'
import link from './image/link.svg'
import { Web } from "@/types/app/web"
import dayjs from 'dayjs';

export default () => {
    const activeSty = "bg-[#f9f9ff] text-primary"
    const [active, setActive] = useState(0)
    const [linkList, setLinkList] = useState<Web[]>([])

    const getLinkList = async () => {
        const { data } = await getLinkListAPI()
        setLinkList((data as Web[]).filter(item => item.auditStatus === 0))
    }
    useEffect(() => {
        getLinkList()
    }, [])

    // 操作
    const getMenuItems = (item: Web) => [
        {
            key: 'ok',
            label: "通过",
            onClick: async () => {
                await auditWebDataAPI(item.id)
                message.success('🎉 审核成功');
                getLinkList();
            }
        },
        {
            key: 'no',
            label: "拒审",
            onClick: async () => {
                await delLinkDataAPI(item.id)
                message.success('🎉 拒审成功');
                getLinkList();
            }
        }
    ];

    return (
        <>
            <Title value="工作台" />

            <Card className="mt-2">
                <div className="flex w-full">
                    <div className="w-2/12 min-h-96 pr-4 border-r border-[#eee]">
                        <ul className="space-y-1">
                            <li
                                className={`flex items-center w-full py-3 px-4 hover:bg-[#f9f9ff] hover:text-primary ${active === 0 ? activeSty : ''} rounded-md text-base cursor-pointer transition-colors`}
                                onClick={() => setActive(0)}
                            >
                                <img src={comment} alt="" className="w-8 mr-4" />
                                <span>评论</span>
                            </li>

                            <li
                                className={`flex items-center w-full py-3 px-4 hover:bg-[#f9f9ff] hover:text-primary ${active === 1 ? activeSty : ''} rounded-md text-base cursor-pointer transition-colors`}
                                onClick={() => setActive(1)}
                            >
                                <img src={link} alt="" className="w-8 mr-4" />
                                <span>友联</span>
                            </li>

                            <li
                                className={`flex items-center w-full py-3 px-4 hover:bg-[#f9f9ff] hover:text-primary ${active === 2 ? activeSty : ''} rounded-md text-base cursor-pointer transition-colors`}
                                onClick={() => setActive(2)}
                            >
                                <img src={info} alt="" className="w-8 mr-4" />
                                <span>留言</span>
                            </li>
                        </ul>
                    </div>

                    <div className="w-10/12 pl-6 py-4 space-y-10">
                        {
                            linkList.map(item => (
                                <div key={item.id}>
                                    <div className="text-center text-xs text-[#e0e0e0] mb-4">{dayjs(+item.createTime!).format('YYYY-MM-DD HH:mm:ss')}</div>

                                    <div className="flex justify-between p-7 rounded-md hover:bg-[#F9F9FD] transition-colors">
                                        <div className="flex">
                                            <img src={item.image} alt="" className="w-13 h-13 border border-[#eee] rounded-full" />
                                            <div className="flex flex-col justify-center ml-4 px-4 py-2 bg-[#F9F9FD] rounded-md">
                                                <div>网站名称：{item.title}</div>
                                                <div>网站介绍：{item.description}</div>
                                                <div>网站地址：{item.url}</div>
                                                <div>网站类型：{item.type.name}</div>
                                                <div>作者邮箱：{item.email ? item.email : '暂无'}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-end">
                                            <Dropdown menu={{ items: getMenuItems(item) }}>
                                                <div className="flex justify-evenly items-center bg-[#F9F9FD] w-11 h-5 rounded-md cursor-pointer">
                                                    <span className="inline-block w-2 h-2 bg-[#b5c2d3] rounded-full"></span>
                                                    <span className="inline-block w-2 h-2 bg-[#b5c2d3] rounded-full"></span>
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Card >
        </>
    )
}