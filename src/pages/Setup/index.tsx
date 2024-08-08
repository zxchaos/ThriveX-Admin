import { useState } from 'react';
import { Card } from 'antd';
import Title from '@/components/Title';
import "./index.scss"

interface Setup {
    title: string;
    description: string;
    icon: React.ReactNode;
    key: string;
}

const SetupPage = () => {
    const [active, setActive] = useState("system");

    const list: Setup[] = [
        {
            title: "系统配置",
            description: "配置管理员账号、登录时间等",
            icon: <div>123</div>,
            key: "system"
        },
        {
            title: "网站配置",
            description: "配置网站标题、LOGO、描述、SEO等",
            icon: <div>123</div>,
            key: "web"
        },
        {
            title: "布局配置",
            description: "配置网站布局及代码高亮等",
            icon: <div>123</div>,
            key: "layout"
        },
        {
            title: "个人设置",
            description: "配置个人信息等",
            icon: <div>123</div>,
            key: "my"
        }
    ];

    const handleNavigation = (key: string) => {
        console.log(key);
        setActive(key);
    }

    return (
        <>
            <Title value="项目配置" />

            <Card className='SetupPage mt-2'>
                <div className="flex">
                    <ul className="w-52 mr-5 border-r border-[#eee]">
                        {list.map((item) => (
                            <li
                                key={item.key}
                                className={`item p-3 pl-5 mb-2 cursor-pointer transition-colors ${active === item.key ? 'active' : ''}`}
                                onClick={() => handleNavigation(item.key)}
                            >
                                <h3 className="flex items-center text-base">
                                    {/* <i className={`bx ${item.icon} mr-2`}></i> */}
                                    {item.title}
                                </h3>

                                <p className="text-[13px] text-[#858585] text-gray-500 mt-1">{item.description}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="flex-grow">
                        <Card>

                        </Card>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default SetupPage;
