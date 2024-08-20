import { useEffect, useState } from 'react'
import { Card } from 'antd'
import Title from '@/components/Title'
import fileSvg from './image/file.svg'
import { getFileListAPI } from '@/api/File'
import { File, FileDir } from '@/types/app/file'

export default () => {
    const [loading, setLoading] = useState(false)
    const [dirList, setDirList] = useState<FileDir[]>(["default", "article", "swiper"])
    const [fileList, setFileList] = useState<File[]>([])

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
                <div className='flex flex-wrap'>
                    {
                        fileList.length
                            ? fileList.map((item, index) =>
                                <div key={index} className='group overflow-hidden w-35 p-2 flex flex-col items-center cursor-pointer mx-4 border-[2px] border-[#eee] rounded-md'>
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
            </Card>
        </>
    )
}