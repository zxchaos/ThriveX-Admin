import Request from '@/utils/request'
import { Rss } from '@/types/app/rss';

// 获取订阅数据列表
export const getRssListAPI = (pagination?: Page) => {
    if (pagination) {
        const { page, size } = pagination
        return Request<Paginate<Rss[]>>("GET", `/rss?page=${page}&size=${size}`);
    } else {
        return Request<Rss[]>("GET", `/rss/all`);
    }
};
