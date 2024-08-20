import { useEffect, useState } from 'react'
import { Card, Spin } from 'antd'
import Title from '@/components/Title'
import fileSvg from './image/file.svg'
import { getFileListAPI } from '@/api/File'
import { File, FileDir } from '@/types/app/file'
import { PiKeyReturnFill } from "react-icons/pi";

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

    useEffect(() => {
        // getFileList()
    }, [])

    return (
        <>
            <Title value='文件管理' />

            <Card className='mt-2'>
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
                                ? fileList.map((item, index) =>
                                    <div key={index} className={`group overflow-hidden w-35 p-2 flex flex-col items-center cursor-pointer mx-4 border-[2px] ${active === item.name ? 'border-primary' : 'border-[#eee]'}  rounded-md`} onClick={() => setActive(item.name)}>
                                        <img src={item.url} alt="" className='rounded-md' />
                                    </div>
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