import { Rss } from '@/types/app/rss';
import Request from '@/utils/request';

// 获取订阅数据列表
export const getRssListAPI = (data?: QueryData) => Request<Rss[]>("POST", `/rss/list`, {
    data: { ...data?.query },
})

// 分页获取订阅列表
export const getRssPagingAPI = (data?: QueryData) => Request<Paginate<Rss[]>>("POST", `/rss/paging`, {
    data: { ...data?.query },
    params: {
        ...data?.pagination
    }
})