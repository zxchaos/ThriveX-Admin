import { useState, useEffect } from 'react';
import { notification, Divider, Input, Alert, Button, Spin } from 'antd';
import { PictureOutlined, LoadingOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { editLayoutDataAPI, getLayoutDataAPI } from '@/api/Project';
import { Layout } from '@/types/app/project';
import FileUpload from '@/components/FileUpload';

const LayoutPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [swiperText, setSwiperText] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [layout, setLayout] = useState<Layout>({} as Layout);

    const onSidebar = (value: string) => {
        const rightSidebar = JSON.parse(layout.rightSidebar || '[]');
        const index = rightSidebar.indexOf(value);
        index > -1 ? rightSidebar.splice(index, 1) : rightSidebar.push(value)
        setLayout({ ...layout, rightSidebar: JSON.stringify(rightSidebar) });
    };

    const getLayoutData = async () => {
        setLoading(true);
        const { data } = await getLayoutDataAPI();
        setLayout(data);

        const swiperText = JSON.parse(data.swiperText)
        setSwiperText(swiperText.join('\n'));
        setLoading(false);
    };

    useEffect(() => {
        getLayoutData();
    }, []);

    const editLayoutData = async () => {
        setLoading(true);
        const updatedLayout = { ...layout, swiperText: JSON.stringify(swiperText.split('\n')) };
        await editLayoutDataAPI(updatedLayout);
        notification.success({
            message: '成功',
            description: '🎉修改布局成功',
        });
        setLoading(false);
    };

    // 动态渲染图片
    const getFile = (name: string) => {
        return new URL(`./image/${name}.png`, import.meta.url).href
    }

    // 文件上传
    const UploadBtn = () => (
        <CloudUploadOutlined className='text-xl cursor-pointer' onClick={() => setIsModalOpen(true)} />
    )

    return (
        <>
            <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                <h2 className="text-xl pb-4 text-center">布局配置</h2>

                <Divider orientation="left">首页背景图</Divider>
                <div className="mb-8">
                    <Input
                        value={layout.swiperImage}
                        onChange={(e) => setLayout({ ...layout, swiperImage: e.target.value })}
                        placeholder="请输入背景图地址"
                        prefix={<PictureOutlined />}
                        addonAfter={<UploadBtn />}
                        size='large'
                        className='customizeAntdInputAddonAfter'
                    />
                    <img src={layout.swiperImage} alt="" className="w-1/3 mt-4 rounded" />
                </div>

                <Divider orientation="left">打字机文本</Divider>
                <div className="mb-8">
                    <Input.TextArea
                        value={swiperText}
                        onChange={(e) => setSwiperText(e.target.value)}
                        autoSize={{ minRows: 2, maxRows: 4 }}
                        size='large'
                    />
                    <Alert message="以换行分隔，每行表示一段文本" type="info" className="mt-2" />
                </div>

                <Divider orientation="left">侧边栏</Divider>
                <div className="sidebar flex mb-8">
                    {['author', 'hotArticle', 'randomArticle', 'newComments'].map((item) => (
                        <div key={item} className={`item flex flex-col items-center p-4 m-4 border-2 rounded cursor-pointer ${layout.rightSidebar && JSON.parse(layout.rightSidebar).includes(item) ? 'border-primary' : 'border-[#eee]'}`} onClick={() => onSidebar(item)}>
                            <img src={`${getFile(item)}`} alt="" className="h-52 mb-4 rounded" />

                            <p className={`text-center ${layout.rightSidebar && JSON.parse(layout.rightSidebar).includes(item) ? 'text-primary' : ''}`}>
                                {item === 'author' ? '作者信息模块' : item === 'hotArticle' ? '文章推荐模块' : item === 'randomArticle' ? '随机文章模块' : '最新评论模块'}
                            </p>
                        </div>
                    ))}
                </div>

                <Divider orientation="left">文章布局</Divider>
                <div className="article flex">
                    {['classics', 'card', 'waterfall'].map((item) => (
                        <div key={item} onClick={() => setLayout({ ...layout, isArticleLayout: item })} className={`item flex flex-col items-center p-4 m-4 border-2 rounded cursor-pointer ${layout.isArticleLayout === item ? 'border-primary' : 'border-[#eee]'}`}>
                            <img src={`${getFile(item)}`} alt="" className="h-52 mb-4 rounded" />

                            <p className={`text-center ${layout.isArticleLayout === item ? 'text-primary' : ''}`}>
                                {item === 'classics' ? '经典布局' : item === 'card' ? '卡片布局' : '瀑布流布局'}
                            </p>
                        </div>
                    ))}
                </div>

                <Button type="primary" size="large" className="w-full mt-4" onClick={editLayoutData}>修改布局</Button>
            </Spin>

            <FileUpload
                dir="swiper"
                open={isModalOpen}
                onSuccess={(url: string[]) => setLayout({ ...layout, swiperImage: url.join("\n") })}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default LayoutPage;
