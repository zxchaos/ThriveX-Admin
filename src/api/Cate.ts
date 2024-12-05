import Request from '@/utils/request'
import { Cate } from '@/types/app/cate'

// 新增分类
export const addCateDataAPI = (data: Cate) => Request<Cate>("POST", "/cate", { data })

// 删除分类
export const delCateDataAPI = (id: number) => Request<Cate>("DELETE", `/cate/${id}`)

// 修改分类
export const editCateDataAPI = (data: Cate) => Request<Cate>("PATCH", "/cate", { data })

// 获取分类
export const getCateDataAPI = (id?: number) => Request<Cate>("GET", `/cate/${id}`)

// 获取分类列表
export const getCateListAPI = (data?: QueryData) => Request<Cate[]>("POST", `/cate/list`, {
    data: { ...data?.query },
})

// 分页获取分类列表
export const getCatePagingAPI = (data?: QueryData) => Request<Paginate<Cate[]>>("POST", `/cate/paging`, {
    data: { ...data?.query },
    params: {
        ...data?.pagination
    }
})