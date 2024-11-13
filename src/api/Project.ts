import Request from '@/utils/request'
import { System, Web, Theme } from '@/types/app/project'

// 获取系统配置信息
export const getSystemDataAPI = () => Request<System>("GET", "/project/system")

// 获取网站配置信息
export const getWebDataAPI = () => Request<Web>("GET", "/project/web")

// 修改网站配置信息
export const editWebDataAPI = (data: Web) => Request<Web>("PATCH", "/project/web", { data })

// 获取主题配置信息
export const getThemeDataAPI = () => Request<Theme>("GET", "/project/theme")
// export const getThemeDataAPI = () => Request<Theme>("GET", "/project/layout")

// 修改主题配置信息
export const editThemeDataAPI = (data: Theme) => Request<Theme>("PATCH", "/project/theme", { data })
// export const editThemeDataAPI = (data: Theme) => Request<Theme>("PATCH", "/project/layout", { data })