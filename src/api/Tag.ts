import Request from '@/utils/request'
import { Tag } from '@/types/app/tag'

// 新增标签
export const addTagDataAPI = (data: Tag) => Request<Tag>("POST", "/tag", { data })

// 删除标签
export const delTagDataAPI = (id: number) => Request<Tag>("DELETE", `/tag/${id}`)

// 修改标签
export const editTagDataAPI = (data: Tag) => Request<Tag>("PATCH", "/tag", { data })

// 获取标签
export const getTagDataAPI = (id?: number) => Request<Tag>("GET", `/tag/${id}`)

// 获取标签列表
export const getTagListAPI = (data?: QueryData) => Request<Tag[]>("POST", `/tag/list`, {
    data: { ...data?.query },
})

// 分页获取标签列表
export const getTagPagingAPI = (data?: QueryData) => Request<Paginate<Tag[]>>("POST", `/tag/paging`, {
    data: { ...data?.query },
    params: {
        ...data?.pagination
    }
})