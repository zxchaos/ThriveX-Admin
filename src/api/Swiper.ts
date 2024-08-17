import Request from '@/utils/request'
import { Swiper } from '@/types/app/swiper'
import { getListAPI } from '@/utils'

// 新增轮播图
export const addSwiperDataAPI = (data: Swiper) => Request<Swiper>("POST", "/swiper", data)

// 删除轮播图
export const delSwiperDataAPI = (id: number) => Request<Swiper>("DELETE", `/swiper/${id}`)

// 修改轮播图
export const editSwiperDataAPI = (data: Swiper) => Request<Swiper>("PATCH", "/swiper", data)

// 获取轮播图
export const getSwiperDataAPI = (id?: number) => Request<Swiper>("GET", `/swiper/${id}`)

// 获取轮播图列表
export const getSwiperListAPI = getListAPI<Swiper>("/swiper")