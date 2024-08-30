import Request from '@/utils/request'
import { Cate } from '@/types/app/cate'
import { getListAPI } from '@/utils'

// 新增分类
export const addCateDataAPI = (data: Cate) => Request<Cate>("POST", "/cate", { data })

// 删除分类
export const delCateDataAPI = (id: number) => Request<Cate>("DELETE", `/cate/${id}`)

// 修改分类
export const editCateDataAPI = (data: Cate) => Request<Cate>("PATCH", "/cate", { data })

// 获取分类
export const getCateDataAPI = (id?: number) => Request<Cate>("GET", `/cate/${id}`)

// 获取分类列表
export const getCateListAPI = (data?: QueryData) => {
    if (data?.pagination) {
      return Request<Paginate<Cate[]>>("POST", `/cate/paging`, {
        data: { ...data?.query },
        params: {
          sort: data.sort,
          ...data.pagination
        }
      });
    } else {
      return Request<Cate[]>("POST", `/cate/list`, {
        data: { ...data?.query },
        params: {
          sort: data?.sort
        }
      });
    }
  };