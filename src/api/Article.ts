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
export const getArticleListAPI = (data?: QueryData) => {
  if (data?.pagination) {
    return Request<Paginate<Article[]>>("POST", `/article/paging`, {
      data: { ...data?.query },
      params: {
        sort: data.sort,
        ...data.pagination
      }
    });
  } else {
    return Request<Article[]>("POST", `/article/list`, {
      data: { ...data?.query },
      params: {
        sort: data?.sort
      }
    });
  }
};
