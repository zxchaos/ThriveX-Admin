import Request from '@/utils/request'
import { Rss } from '@/types/app/rss';
import { getListAPI } from '@/utils';

// 获取订阅数据列表
export const getRssListAPI = getListAPI<Rss>("/rss")