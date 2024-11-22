import { useState, useEffect } from 'react';
import { notification, Divider, Input, Alert, Button, Spin } from 'antd';
import { PictureOutlined, LoadingOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { editThemeDataAPI, getThemeDataAPI } from '@/api/Project';
import { Theme } from '@/types/app/project';
import FileUpload from '@/components/FileUpload';

const ThemePage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [swiperText, setSwiperText] = useState<string>('');
    const [social, setSocial] = useState<string>('');
    const [cover, setCover] = useState<string>('');
    const [recoArticle, setRecoArticle] = useState<string>('');
    const [theme, setTheme] = useState<Theme>({} as Theme);

    const onSidebar = (value: string) => {
        const rightSidebar = JSON.parse(theme.rightSidebar || '[]');
        const index = rightSidebar.indexOf(value);
        index > -1 ? rightSidebar.splice(index, 1) : rightSidebar.push(value)
        setTheme({ ...theme, rightSidebar: JSON.stringify(rightSidebar) });
    };

    const getLayoutData = async () => {
        setLoading(true);

        const { data } = await getThemeDataAPI();
        setTheme(data);

        setSwiperText(data.swiperText ? JSON.parse(data.swiperText).join('\n') : '');
        setSocial(data.social ? JSON.parse(data.social).join("\n") : '');
        setCover(data.covers ? JSON.parse(data.covers).join("\n") : '');
        setRecoArticle(data.recoArticle ? JSON.parse(data.recoArticle).join("\n") : '');
        
        setLoading(false);
    };

    useEffect(() => {
        getLayoutData();
    }, []);

    const editLayoutData = async () => {
        setLoading(true);

        const updatedLayout = {
            ...theme,
            swiperText: JSON.stringify(swiperText.split('\n')),
            social: JSON.stringify(social.split('\n')),
            covers: JSON.stringify(cover.split('\n')),
            recoArticle: JSON.stringify(recoArticle.split('\n'))
        };

        await editThemeDataAPI(updatedLayout);
        notification.success({
            message: '成功',
            description: '🎉 修改主题成功',
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
                <h2 className="text-xl pb-4 pl-10">主题配置</h2>

                <div className='w-full lg:w-[500px] md:ml-10'>
                    <Divider orientation="left">亮色主题 Logo</Divider>
                    <div className="mb-8">
                        <Input
                            value={theme.lightLogo}
                            onChange={(e) => setTheme({ ...theme, lightLogo: e.target.value })}
                            prefix={<PictureOutlined />}
                            addonAfter={<UploadBtn />}
                            size='large'
                            placeholder="请输入亮色Logo地址"
                            className='customizeAntdInputAddonAfter'
                        />
                        <img src={theme.lightLogo} alt="" className="w-1/3 mt-4 rounded" />
                    </div>

                    <Divider orientation="left">暗色主题 Logo</Divider>
                    <div className="mb-8">
                        <Input
                            value={theme.darkLogo}
                            onChange={(e) => setTheme({ ...theme, darkLogo: e.target.value })}
                            prefix={<PictureOutlined />}
                            addonAfter={<UploadBtn />}
                            size='large'
                            placeholder="请输入暗色Logo地址"
                            className='customizeAntdInputAddonAfter'
                        />
                        <img src={theme.darkLogo} alt="" className="w-1/3 mt-4 rounded" />
                    </div>

                    <Divider orientation="left">首页背景图</Divider>
                    <div className="mb-8">
                        <Input
                            value={theme.swiperImage}
                            onChange={(e) => setTheme({ ...theme, swiperImage: e.target.value })}
                            prefix={<PictureOutlined />}
                            addonAfter={<UploadBtn />}
                            size='large'
                            placeholder="请输入背景图地址"
                            className='customizeAntdInputAddonAfter'
                        />
                        <img src={theme.swiperImage} alt="" className="w-1/3 mt-4 rounded" />
                    </div>

                    <Divider orientation="left">打字机文本</Divider>
                    <div className="mb-8">
                        <Input.TextArea
                            value={swiperText}
                            onChange={(e) => setSwiperText(e.target.value)}
                            autoSize={{ minRows: 2, maxRows: 4 }}
                            size='large'
                            placeholder="请输入打字机文本"
                        />
                        <Alert message="以换行分隔，每行表示一段文本" type="info" className="mt-2" />
                    </div>

                    <Divider orientation="left">社交网站</Divider>
                    <div className="mb-8">
                        <Input.TextArea
                            value={social}
                            onChange={(e) => setSocial(e.target.value)}
                            autoSize={{ minRows: 2, maxRows: 4 }}
                            size='large'
                            placeholder="请输入社交网站"
                        />
                        <Alert message="以换行分隔，每行表示一段文本" type="info" className="mt-2" />
                    </div>

                    <Divider orientation="left">文章随机封面</Divider>
                    <div className="mb-8">
                        <Input.TextArea
                            value={cover}
                            onChange={(e) => setCover(e.target.value)}
                            autoSize={{ minRows: 2, maxRows: 4 }}
                            size='large'
                            placeholder="请输入文章随机封面"
                        />
                        <Alert message="以换行分隔，每行表示一段文本" type="info" className="mt-2" />
                    </div>

                    <Divider orientation="left">作者推荐文章</Divider>
                    <div className="mb-8">
                        <Input.TextArea
                            value={recoArticle}
                            onChange={(e) => setRecoArticle(e.target.value)}
                            autoSize={{ minRows: 2, maxRows: 4 }}
                            size='large'
                            placeholder="请输入作者推荐文章ID"
                        />
                        <Alert message="以换行分隔，每行表示一段文本" type="info" className="mt-2" />
                    </div>

                    <Divider orientation="left">侧边栏</Divider>
                    <div className='overflow-auto w-full'>
                        <div className="sidebar w-[750px] flex mb-4">
                            {['author', 'randomArticle', 'newComments', 'hotArticle'].map((item) => (
                                <div key={item} className={`item flex flex-col items-center p-4 m-4 border-2 rounded cursor-pointer ${theme.rightSidebar && JSON.parse(theme.rightSidebar).includes(item) ? 'border-primary' : 'border-[#eee]'}`} onClick={() => onSidebar(item)}>
                                    <p className={`text-center ${theme.rightSidebar && JSON.parse(theme.rightSidebar).includes(item) ? 'text-primary' : ''}`}>
                                        {item === 'author' ? '作者信息模块' : item === 'hotArticle' ? '作者推荐模块' : item === 'randomArticle' ? '随机推荐模块' : '最新评论模块'}
                                    </p>

                                    <img src={`${getFile(item)}`} alt="" className="mt-4 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Divider orientation="left">文章布局</Divider>
                    <div className='overflow-auto w-full'>
                        <div className="article flex w-[650px]">
                            {['classics', 'card', 'waterfall'].map((item) => (
                                <div key={item} onClick={() => setTheme({ ...theme, isArticleLayout: item })} className={`item flex flex-col items-center p-4 m-4 border-2 rounded cursor-pointer ${theme.isArticleLayout === item ? 'border-primary' : 'border-[#eee]'}`}>
                                    <p className={`text-center ${theme.isArticleLayout === item ? 'text-primary' : ''}`}>
                                        {item === 'classics' ? '经典布局' : item === 'card' ? '卡片布局' : '瀑布流布局'}
                                    </p>

                                    <img src={`${getFile(item)}`} alt="" className="w-[200px] mt-4 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="primary" size="large" className="w-full mt-4" loading={loading} onClick={editLayoutData}>修改布局</Button>
                </div>
            </Spin>

            <FileUpload
                dir="swiper"
                open={isModalOpen}
                onSuccess={(url: string[]) => setTheme({ ...theme, swiperImage: url.join("\n") })}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default ThemePage;