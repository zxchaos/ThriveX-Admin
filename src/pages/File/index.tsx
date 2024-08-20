import { useEffect, useState } from 'react'
import { Image, Card, Space, Spin } from 'antd'
import Title from '@/components/Title'

import fileSvg from './image/file.svg'
import { getFileListAPI } from '@/api/File'
import { File, FileDir } from '@/types/app/file'
import { PiKeyReturnFill } from "react-icons/pi";
import {
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    UndoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';
import "./index.scss"

export default () => {
    const [active, setActive] = useState("")
    const [loading, setLoading] = useState(false)
    const [dirList, setDirList] = useState<FileDir[]>(["default", "article", "swiper"])
    const [fileList, setFileList] = useState<File[]>([])

    // 获取指定目录的文件列表
    const getFileList = async (dir: string) => {
        setLoading(true)
        const { data } = await getFileListAPI({ dir })
        console.log(data);
        setFileList(data as File[])
        setLoading(false)
    }

    // 下载图片
    const onDownload = (data: File) => {
        fetch(data.url)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(new Blob([blob]));
                const link = document.createElement<'a'>('a');
                link.href = url;
                link.download = data.name;
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
                link.remove();
            });
    };

    useEffect(() => {
        // getFileList()
    }, [])

    return (
        <>
            <Title value='文件管理' />

            <Card className='FilePage mt-2'>
                <div className='flex mb-4 px-4'>
                    {
                        !fileList.length
                            ? <PiKeyReturnFill className='text-4xl text-[#E0DFDF] cursor-pointer' />
                            : <PiKeyReturnFill className='text-4xl text-primary cursor-pointer' onClick={() => setFileList([])} />
                    }
                </div>

                <Spin spinning={loading}>
                    <div className='flex flex-wrap'>
                        {
                            fileList.length
                                ? (
                                    fileList.map((item, index) =>
                                        <div key={index} className={`group relative overflow-hidden w-44 h-44 p-2 flex flex-col items-center cursor-pointer mx-4 border-[2px] ${active === item.name ? 'border-primary' : 'border-[#eee]'} rounded-md`} onClick={() => setActive(item.name)}>
                                            <Image src={item.url} className='rounded-md object-cover object-center' preview={{
                                                toolbarRender: (
                                                    _,
                                                    {
                                                        image: { url },
                                                        transform: { scale },
                                                        actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
                                                    },
                                                ) => (
                                                    <Space className="toolbar-wrapper">
                                                        <DownloadOutlined onClick={() => onDownload(item)} />
                                                        <SwapOutlined rotate={90} onClick={onFlipY} />
                                                        <SwapOutlined onClick={onFlipX} />
                                                        <RotateLeftOutlined onClick={onRotateLeft} />
                                                        <RotateRightOutlined onClick={onRotateRight} />
                                                        <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                                        <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                                        <UndoOutlined onClick={onReset} />
                                                    </Space>
                                                ),
                                            }} />
                                        </div>
                                    )
                                )
                                : dirList.map((dir, index) => (
                                    <div key={index} className='group w-25 flex flex-col items-center cursor-pointer mx-4' onClick={() => getFileList(dir)}>
                                        <img src={fileSvg} alt="" />
                                        <p className='group-hover:text-primary transition-colors'>{dir}</p>
                                    </div>
                                ))
                        }
                    </div>
                </Spin>
            </Card>
        </>
    )
}
