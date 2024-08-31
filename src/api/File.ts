import Request from '@/utils/request'
import { File } from '@/types/app/file'
import { getListAPI } from '@/utils'

// 删除文件
export const delFileDataAPI = (filePath: string) => Request<File>("DELETE", `/file?filePath=${filePath}`)

// 获取文件
export const getFileDataAPI = (filePath: string) => Request<File>("GET", `/file/info?filePath=${filePath}`)

// 获取文件列表
export const getFileListAPI = (data?: QueryData) => getListAPI<File>("/file", data)

// 获取目录列表
export const getDirListAPI = () => Request<string[]>("GET", '/file/dir');;