import Request from '@/utils/request'
import { File } from '@/types/app/file'

// 删除文件
export const delFileDataAPI = (data: string[]) => Request<File>("DELETE", "/file", { files: data })

// 修改文件
export const editFileDataAPI = (data: File) => Request<File>("PATCH", "/file", data)

// 获取文件
export const getFileDataAPI = (id?: number) => Request<Paginate<File>>("GET", `/file/${id}`)

// 获取文件列表
export const getFileListAPI = (pagination?: Page) => {
    if (pagination) {
        const { page, size } = pagination
        return Request<File[]>("GET", `/file?page=${page}&size=${size}`);
    } else {
        return Request<File[]>("GET", `/file`);
    }
};
