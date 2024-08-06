import { Link } from '@/types/link'
import Request from '@/utils/request'

// 新增网站
export const addLinkDataAPI = (data: Link) => Request<Link>("POST", "/link", data)

// 删除网站
export const delLinkDataAPI = (id: number) => Request<Link>("DELETE", `/link/${id}`)

// 修改网站
export const editLinkDataAPI = (data: Link) => Request<Link>("PATCH", "/link", data)

// 获取网站
export const getLinkDataAPI = (id?: number) => Request<Link>("GET", `/link/${id}`)

// 获取网站列表
export const getLinkListAPI = (pagination?: Page) => {
    if (pagination) {
        const { page, size } = pagination
        return Request<Paginate<Link[]>>("GET", `/link?page=${page}&size=${size}`);
    } else {
        return Request<Link[]>("GET", `/link/all`);
    }
};
