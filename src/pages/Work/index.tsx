import { Card } from "antd"
import Title from "@/components/Title"

import comment from './image/comment.svg'
import message from './image/message.svg'
import link from './image/link.svg'
import { useState } from "react"

export default () => {
    const activeSty = "bg-[#f9f9ff] text-primary"
    const [active, setActive] = useState(0)

    return (
        <>
            <Title value="工作台" />

            <Card className="mt-2">
                <div className="w-full">
                    <div className="w-2/12 min-h-96 pr-4 border-r border-[#eee]">
                        <ul className="">
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
                                <img src={message} alt="" className="w-8 mr-4" />
                                <span>留言</span>
                            </li>
                        </ul>
                    </div>

                    <div className="w-10/12">

                    </div>
                </div>
            </Card >
        </>
    )
}