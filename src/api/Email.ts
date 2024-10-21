import Request from '@/utils/request'
import { CommentEmail, DismissEmail } from '@/types/app/email'

// 发送评论邮件
export const sendCommentEmailAPI = async (data: CommentEmail) => {
    return await Request<string>("POST", `/email/comment`, { data });
}

// 发送驳回邮件
export const sendDismissEmailAPI = async (data: DismissEmail) => {
    return await Request<string>("POST", `/email/dismiss`, { data });
}