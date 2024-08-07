import Request from '@/utils/request'
import { Web, LinkType } from '@/types/web'

// 新增网站
export const addLinkDataAPI = (data: Web) => Request<Web>("POST", "/link", data)

// 删除网站
export const delLinkDataAPI = (id: number) => Request<Web>("DELETE", `/link/${id}`)

// 修改网站
export const editLinkDataAPI = (data: Web) => Request<Web>("PATCH", "/link", data)

// 获取网站
export const getLinkDataAPI = (id?: number) => Request<Web>("GET", `/link/${id}`)

// 获取网站列表
export const getLinkListAPI = (pagination?: Page) => {
    if (pagination) {
        const { page, size } = pagination
        return Request<Paginate<Web[]>>("GET", `/link?page=${page}&size=${size}`);
    } else {
        return Request<Web[]>("GET", `/link/all`);
    }
};

// 获取网站类型列表
export const getLinkTypeListAPI = () => {
    return Request<LinkType[]>("GET", `/link/type`);
};
