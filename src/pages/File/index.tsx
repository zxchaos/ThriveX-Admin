import { useEffect, useState } from 'react'
import { Image, Card, Space, Spin, message, Popconfirm, Button } from 'antd'
import Title from '@/components/Title'
import FileUpload from '@/components/FileUpload'

import fileSvg from './image/file.svg'
import { delFileDataAPI, getDirListAPI, getFileListAPI } from '@/api/File'
import { File } from '@/types/app/file'
import { PiKeyReturnFill } from "react-icons/pi";
import { DeleteOutlined, DownloadOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined, } from '@ant-design/icons';
import "./index.scss"

export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [active, setActive] = useState("")
    const [loading, setLoading] = useState(false)
    const [dirName, setDirName] = useState("")
    const [dirList, setDirList] = useState<string[]>([])
    const [fileList, setFileList] = useState<File[]>([])

    // 获取目录列表
    const getDirList = async () => {
        setLoading(true)
        const { data } = await getDirListAPI()
        setDirList(data)
        setLoading(false)
    }

    // 获取指定目录的文件列表
    const getFileList = async (dir: string) => {
        setLoading(true)
        const { data } = await getFileListAPI({ dir })

        if (!fileList.length && !(data as File[]).length) message.error("该目录中没有文件")

        setFileList(data as File[])
        setLoading(false)
    }

    // 删除图片
    const onDeleteImage = async (data: File) => {
        setLoading(true)
        await delFileDataAPI(`${dirName}/${data.name}`)
        message.success("🎉 删除图片成功")
        getFileList(dirName)
        setLoading(false)
    }

    // 下载图片
    const onDownloadImage = (data: File) => {
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

    // 打开目录
    const openDir = (dir: string) => {
        setDirName(dir)
        getFileList(dir)
    }

    useEffect(() => {
        getDirList()
    }, [])

    return (
        <>
            <Title value='文件管理' />

            <Card className='FilePage mt-2'>
                <div className='flex justify-between mb-4 px-4'>
                    {
                        !fileList.length
                            ? <PiKeyReturnFill className='text-4xl text-[#E0DFDF] cursor-pointer' />
                            : <PiKeyReturnFill className='text-4xl text-primary cursor-pointer' onClick={() => setFileList([])} />
                    }

                    <Button type="primary" disabled={!fileList.length} onClick={() => setIsModalOpen(true)}>上传文件</Button>
                </div>

                <Spin spinning={loading}>
                    <div className='flex flex-wrap'>
                        {
                            fileList.length
                                ? (
                                    fileList.map((item, index) =>
                                        <div
                                            key={index}
                                            className={`group relative overflow-hidden w-44 h-44 p-[2px] flex flex-col items-center cursor-pointer m-4 border-2 ${active === item.name ? 'border-primary' : 'border-[#eee]'} rounded-md`}
                                            onClick={() => setActive(item.name)}>
                                            <Image
                                                src={item.url}
                                                className='rounded-md object-cover object-center'
                                                preview={{
                                                    toolbarRender: (
                                                        _,
                                                        {
                                                            transform: { scale },
                                                            actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
                                                        },
                                                    ) => (
                                                        <Space className="toolbar-wrapper">
                                                            <Popconfirm
                                                                title="警告"
                                                                description="删除后无法恢复，确定要删除吗"
                                                                onConfirm={() => onDeleteImage(item)}
                                                                okText="删除"
                                                                cancelText="取消"
                                                            >
                                                                <DeleteOutlined />
                                                            </Popconfirm>

                                                            <DownloadOutlined onClick={() => onDownloadImage(item)} />
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
                                    <div
                                        key={index}
                                        className='group w-25 flex flex-col items-center cursor-pointer mx-4'
                                        onClick={() => openDir(dir)}>
                                        <img src={fileSvg} alt="" />
                                        <p className='group-hover:text-primary transition-colors'>{dir}</p>
                                    </div>
                                ))
                        }
                    </div>
                </Spin>
            </Card>

            <FileUpload dir={dirName} open={isModalOpen} onSuccess={() => getFileList(dirName)} onCancel={() => setIsModalOpen(false)} />
        </>
    )
}
