import Request from '@/utils/request'
import { System, Web, Theme, Other } from '@/types/app/project'

// 获取系统配置信息
export const getSystemDataAPI = () => Request<System>("GET", "/project/system")

// 获取网站配置信息
export const getWebDataAPI = () => Request<Web>("GET", "/project/web")

// 修改网站配置信息
export const editWebDataAPI = (data: Web) => Request<Web>("PATCH", "/project/web", { data })

// 获取主题配置信息
export const getThemeDataAPI = () => Request<Theme>("GET", "/project/theme")

// 修改主题配置信息
export const editThemeDataAPI = (data: Theme) => Request<Theme>("PATCH", "/project/theme", { data })

// 获取其他配置信息
export const getOtherDataAPI = () => Request<Other>("GET", "/project/other")

// 修改其他配置信息
export const editOtherDataAPI = (data: Other) => Request<Other>("PATCH", "/project/other", { data })