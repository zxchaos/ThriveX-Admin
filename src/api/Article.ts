import Request from "@/utils/request";
import { Article, FilterArticle } from "@/types/app/article";

// 新增文章
export const addArticleDataAPI = (data: Article) =>
  Request<Article>("POST", "/article", { data });

// 删除文章
export const delArticleDataAPI = (id: number, isDel?: boolean) =>
  Request<Article>("DELETE", isDel ? `/article/${id}/1` : `/article/${id}/0`);

// 还原被删除的文章
export const reductionArticleDataAPI = (id: number) =>
  Request<Article>("PATCH", `/article/reduction/${id}`);

// 编辑文章
export const editArticleDataAPI = (data: Article) =>
  Request<Article>("PATCH", "/article", { data });

// 获取文章
export const getArticleDataAPI = (id?: number) => Request<Article>("GET", `/article/${id}`)

// 获取文章列表
export const getArticleListAPI = (data?: QueryData<FilterArticle>) => Request<Article[]>("POST", `/article/list`, {
  data: { ...data?.query }
})

// 分页获取文章列表
export const getArticlePagingAPI = (data?: QueryData) => Request<Paginate<Article[]>>("POST", `/article/paging`, {
  data: { ...data?.query },
  params: {
    ...data?.pagination
  }
})