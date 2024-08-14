import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useUserStore } from '@/stores';

const HeaderInfo: React.FC = () => {
    const { user } = useUserStore();

    return (
        <div className="flex items-center px-6 container mx-auto">
            {/* 头像 */}
            <img 
                src={user?.avatar || 'https://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640'} alt="avatar"
                className="w-24 h-24 rounded-full mx-10 transition-transform duration-300 transform hover:scale-125 avatar-animation"
            />

            {/* 信息 */}
            <div className="info">
                <h3 className="text-xl font-medium mb-4 text-gradient">
                    Hello <span className='pr-4'>{user?.name || '未命名'}!</span>  欢迎使用现代化 CMS 后台管理系统
                </h3>

                <p className="text-sm text-[#888]">
                    <EditOutlined className="mr-2" /> {user?.info || '快去写一个 个性签名~'}
                </p>
            </div>
        </div>
    );
};

export default HeaderInfo;
