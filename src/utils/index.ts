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

export const getListAPI = <T>(api: string, data?: QueryData) => {
    if (data?.pagination) {
        return Request<Paginate<T[]>>("POST", `${api}/paging`, {
            data: { ...data?.query },
            params: {
                sort: data.sort,
                ...data.pagination
            }
        });
    } else {
        return Request<T[]>("POST", `${api}/list`, {
            data: { ...data?.query },
            params: {
                sort: data?.sort
            }
        });
    }
};