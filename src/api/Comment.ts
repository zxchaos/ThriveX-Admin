import Request from '@/utils/request'
import { Comment } from '@/types/comment'

// 新增评论
export const addCommentDataAPI = (data: Comment) => Request<Comment>("POST", "/comment", data)

// 删除评论
export const delCommentDataAPI = (id: number) => Request<Comment>("DELETE", `/comment/${id}`)

// 审核评论
export const auditCommentDataAPI = (id: number) => Request<Comment>("PATCH", `/comment/audit/${id}`)

// 修改评论
export const editCommentDataAPI = (data: Comment) => Request<Comment>("PATCH", "/comment", data)

// 获取评论
export const getCommentDataAPI = (id?: number) => Request<Paginate<Comment>>("GET", `/comment/${id}`)

// 获取评论列表
export const getCommentListAPI = (pagination?: Page, pattern?: string) => {
    if (pagination) {
        const { page, size } = pagination
        return Request<Paginate<Comment[]>>("GET", `/comment?page=${page}&size=${size}`);
    } else {
        return Request<Comment[]>("GET", `/comment/all?pattern=${pattern ? pattern : "recursion"}`);
    }
};
