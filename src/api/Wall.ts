import Request from '@/utils/request'
import { Wall, Cate } from '@/types/app/wall'

// 新增留言
export const addWallDataAPI = (data: Wall) => Request<Wall>("POST", "/wall", { data })

// 删除留言
export const delWallDataAPI = (id: number) => Request<Wall>("DELETE", `/wall/${id}`)

// 审核留言
export const auditWallDataAPI = (id: number) => Request<Wall>("PATCH", `/wall/audit/${id}`)

// 修改留言
export const editWallDataAPI = (data: Wall) => Request<Wall>("PATCH", "/wall", { data })

// 获取留言
export const getWallDataAPI = (id?: number) => Request<Paginate<Wall>>("GET", `/wall/${id}`)

// 获取留言列表
export const getWallListAPI = (data?: QueryData) => Request<Wall[]>("POST", `/wall/list`, {
    data: { ...data?.query },
})

// 分页获取留言列表
export const getWallPagingAPI = (data?: QueryData) => Request<Paginate<Wall[]>>("POST", `/wall/paging`, {
    data: { ...data?.query },
    params: {
        ...data?.pagination
    }
})

// 获取留言分类列表
export const getWallCateListAPI = () => Request<Cate[]>("GET", `/wall/cate`)