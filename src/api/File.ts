import Request from '@/utils/request'
import { File } from '@/types/app/file'

// 删除文件
export const delFileDataAPI = (filePath: string) => Request<File>("DELETE", `/file?filePath=${filePath}`)

// 获取文件
export const getFileDataAPI = (filePath: string) => Request<File>("GET", `/file/info?filePath=${filePath}`)

// 获取文件列表
export const getFileListAPI = (data?: QueryData) => Request<File[]>("POST", `/file/list`, {
    data: { ...data?.query },
    params: {
        sort: data?.sort,
        dir: data?.dir
    }
})

// 分页获取文件列表
export const getFilePagingAPI = (data?: QueryData) => Request<Paginate<File[]>>("POST", `/file/paging`, {
    data: { ...data?.query },
    params: {
        sort: data?.sort,
        dir: data?.dir,
        ...data?.pagination
    }
})

// 获取目录列表
export const getDirListAPI = () => Request<string[]>("GET", '/file/dir');;