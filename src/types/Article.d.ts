export interface Article {
    id?: number,
    title: string,
    description: string,
    content: string,
    cover: string,
    cateIds: string,
    tagIds: string,
    view?: number
    count?: number,
    createTime?: number,
}