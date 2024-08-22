import Request from "@/utils/request";
import { Article } from "@/types/app/article";

// 对象转url参数
export const ObjectToUrlParam = (obj: Object): string => {
    return obj && new URLSearchParams(
        Object.keys(obj).reduce((acc, key) => {
            acc[key] = String(obj[key as keyof Object]);
            return acc;
        }, {} as Record<string, string>)
    ).toString();
}

// 查询数据相关逻辑
export const getListAPI = <T>(api: string) => {
    return (data?: QueryData) => {
        if (data?.pagination) {
            let sort = data?.sort ? `?sort=${data?.sort}` : '?'
            const query = ObjectToUrlParam(data?.query as FilterData) ? "&" + ObjectToUrlParam(data?.query as FilterData) : ''
            const { page, size } = data.pagination
            const pagination = page && size ? `&page=${page}&size=${size}` : page && !size ? `&page=${page}` : size && !page ? `&size=${size}` : ''
            if (!query && !pagination) sort = ''

            return Request<Paginate<T[]>>("GET", `${api}${sort}${pagination}${query}`);
        } else {
            return Request<T[]>("GET", `${api}/all`, {
                sort: data?.sort,
                pattern: data?.pattern,
                ...data?.query
            });
        }
    }
};