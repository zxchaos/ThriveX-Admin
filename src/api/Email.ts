import Request from '@/utils/request'
import { DismissEmail } from '@/types/app/email'

// 发送驳回邮件
export const sendDismissEmailAPI = async (data: DismissEmail) => {
    return await Request<string>("POST", `/email/dismiss`, { data });
}