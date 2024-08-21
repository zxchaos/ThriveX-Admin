import Request from '@/utils/request'
import { File } from '@/types/app/file'

// 删除文件
export const delFileDataAPI = (filePath: string) => Request<File>("DELETE", `/file?filePath=${filePath}`)

// 获取文件
export const getFileDataAPI = (filePath: string) => Request<File>("GET", `/file/info?filePath=${filePath}`)

// 获取文件列表
export const getFileListAPI = (data?: QueryData) => {
    if (data?.pagination) {
        let sort = data?.sort ? `?sort=${data?.sort}` : '?'
        let dir = data?.dir ? `dir=${data?.dir}` : ''
        const { page, size } = data.pagination
        const pagination = page && size ? `&page=${page}&size=${size}` : page && !size ? `&page=${page}` : size && !page ? `&size=${size}` : ''
        if (!dir && !pagination) sort = ''

        return Request<Paginate<File[]>>("GET", `/file${sort}${pagination}${dir}`);
    } else {
        let sort = data?.sort ? `?sort=${data?.sort}` : '?'
        let dir = data?.dir ? `dir=${data?.dir}` : ''
        if (!dir) sort = ''

        return Request<File[]>("GET", `/file/all${sort}${dir}`);
    }
};

// 获取目录列表
export const getDirListAPI = () => Request<string[]>("GET", '/file/dir');;