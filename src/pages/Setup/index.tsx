import { useState } from 'react';
import { Card } from 'antd';
import Title from '@/components/Title';
import { BiGlobe, BiLayout, BiShieldQuarter, BiUser } from 'react-icons/bi';
import System from './components/System'
import "./index.scss"

interface Setup {
    title: string;
    description: string;
    icon: React.ReactNode;
    key: string;
}

const SetupPage = () => {
    const [active, setActive] = useState("system");
    
    const iconSty = "w-5 h-8 mr-1"
    const list: Setup[] = [
        {
            title: "系统配置",
            description: "配置管理员账号、登录时间等",
            icon: <BiShieldQuarter className={iconSty} />,
            key: "system"
        },
        {
            title: "网站配置",
            description: "配置网站标题、LOGO、描述、SEO等",
            icon: <BiGlobe className={iconSty} />,
            key: "web"
        },
        {
            title: "布局配置",
            description: "配置网站布局及代码高亮等",
            icon: <BiLayout className={iconSty} />,
            key: "layout"
        },
        {
            title: "个人设置",
            description: "配置个人信息等",
            icon: <BiUser className={iconSty} />,
            key: "my"
        }
    ];

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
                                onClick={() => setActive(item.key)}
                            >
                                <h3 className="flex items-center text-base">
                                    {item.icon} {item.title}
                                </h3>

                                <p className="text-[13px] text-[#858585] text-gray-500 mt-1">{item.description}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="flex-grow">
                        {active === "system" && <System />}
                        {/* {active === "web" && <Web />}
                        {active === "layout" && <Layout />}
                        {active === "my" && <My />} */}
                    </div>
                </div>
            </Card>
        </>
    );
};

export default SetupPage;
