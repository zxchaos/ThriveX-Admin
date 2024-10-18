export interface Email {
    /*邮件接收者 */
    to?: string;
    /*邮件标题 */
    subject: string;
}

export interface CommentEmail extends Email {
    content: string;
    reviewers: string;
    subject: string;
    time: string;
    title: string;
    url: string;
}

export interface DismissEmail extends Email {
    content: string;
    recipient: string;
    subject: string;
    time: string;
    type: string;
    url: string;
}