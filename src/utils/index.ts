import Request from "@/utils/request";

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
// export const getListAPI = <T>(api: string) => {
//     return (data?: QueryData) => {
//         if (data?.pagination) {
//             let sort = data?.sort ? `?sort=${data?.sort}` : '?'
//             const query = ObjectToUrlParam(data?.query as FilterData) ? "&" + ObjectToUrlParam(data?.query as FilterData) : ''
//             const { page, size } = data.pagination
//             const pagination = page && size ? `&page=${page}&size=${size}` : page && !size ? `&page=${page}` : size && !page ? `&size=${size}` : ''
//             if (!query && !pagination) sort = ''

//             return Request<Paginate<T[]>>("GET", `${api}${sort}${pagination}${query}`);
//         } else {
//             return Request<T[]>("GET", `${api}/all`, {
//                 sort: data?.sort,
//                 pattern: data?.pattern,
//                 ...data?.query
//             });
//         }
//     }
// };

const buildQueryParams = (params: Record<string, any>): string => {
    return Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');
};

export const getListAPI = <T>(api: string) => {
    return (data?: QueryData) => {
        let queryParams: Record<string, any> = {};

        if (data?.sort) {
            queryParams.sort = data.sort;
        }

        if (data?.query) {
            queryParams = { ...queryParams, ...data.query };
        }

        if (data?.pagination) {
            const { page, size } = data.pagination;
            if (page) queryParams.page = page;
            if (size) queryParams.size = size;
        }

        const queryString = buildQueryParams(queryParams);

        if (data?.pagination) {
            return Request<Paginate<T[]>>("GET", `${api}?${queryString}`);
        } else {
            return Request<T[]>("GET", `${api}/all?${queryString}`);
        }
    };
};
