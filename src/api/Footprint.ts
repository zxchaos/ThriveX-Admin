import Request from '@/utils/request'
import { Footprint } from '@/types/app/footprint'

// 新增路由
export const addFootprintDataAPI = (data: Footprint) => Request<Footprint>("POST", "/footprint", { data })

// 删除路由
export const delFootprintDataAPI = (id: number) => Request<Footprint>("DELETE", `/footprint/${id}`)

// 修改路由
export const editFootprintDataAPI = (data: Footprint) => Request<Footprint>("PATCH", "/footprint", { data })

// 获取路由
export const getFootprintDataAPI = (id?: number) => Request<Footprint>("GET", `/footprint/${id}`)

// 获取路由列表
export const getFootprintListAPI = () => Request<Footprint[]>("POST", "/footprint");