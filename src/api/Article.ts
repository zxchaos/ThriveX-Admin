import Request from "@/utils/request";
import { Article } from "@/types/app/article";
import { getListAPI } from '@/utils'

// 新增文章
export const addArticleDataAPI = (data: Article) =>
  Request<Article>("POST", "/article", data);

// 删除文章
export const delArticleDataAPI = (id: number) =>
  Request<Article>("DELETE", `/article/${id}`);

// 编辑文章
export const editArticleDataAPI = (data: Article) =>
  Request<Article>("PATCH", "/article", data);

// 获取文章
export const getArticleDataAPI = (id?: number) => Request<Article>("GET", `/article/${id}`)

// 获取文章列表
export const getArticleListAPI = getListAPI<Article>("/article")

// export const getArticleListAPI = (data?: QueryData) => {
//   if (data?.pagination) {
//     let sort = data?.sort ? `?sort=${data?.sort}` : '?'
//     const query = ObjectToUrlParam(data?.query as FilterData) ? "&" + ObjectToUrlParam(data?.query as FilterData) : ''
//     const { page, size } = data.pagination
//     const pagination = page && size ? `&page=${page}&size=${size}` : page && !size ? `&page=${page}` : size && !page ? `&size=${size}` : ''
//     if (!query && !pagination) sort = ''

//     return Request<Paginate<Article[]>>("GET", `/article${sort}${pagination}${query}`);
//   } else {
//     let sort = data?.sort ? `?sort=${data?.sort}` : '?'
//     const query = ObjectToUrlParam(data?.query as FilterData) ? "&" + ObjectToUrlParam(data?.query as FilterData) : ''
//     if (!query) sort = ''

//     return Request<Article[]>("GET", `/article/all${sort}${query}`);
//   }
// };
