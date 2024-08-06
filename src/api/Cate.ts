import { Cate } from '@/types/cate'
import Request from '@/utils/request'

// 新增分类
export const addCateDataAPI = (data: Cate) => Request<Cate>("POST", "/cate", data)

// 删除分类
export const delCateDataAPI = (id: number) => Request<Cate>("DELETE", `/cate/${id}`)

// 修改分类
export const editCateDataAPI = (data: Cate) => Request<Cate>("PATCH", "/cate", data)

// 获取分类
export const getCateDataAPI = (id?: number) => Request<Cate>("GET", `/cate/${id}`)

// 获取分类列表
export const getCateListAPI = (pagination?: Page) => {
    if (pagination) {
        const { page, size } = pagination
        return Request<Paginate<Cate[]>>("GET", `/cate?page=${page}&size=${size}`);
    } else {
        return Request<Cate[]>("GET", `/cate/all`);
    }
};
