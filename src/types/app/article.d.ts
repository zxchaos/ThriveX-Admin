import { Cate } from "./cate"
import { Tag } from "./tag"

export interface Article {
    id?: number,
    title: string,
    description: string,
    content: string,
    cover: string,
    cateIds: string,
    cateList: Cate[]
    tagIds: string,
    tagList: Tag[]
    view?: number
    count?: number,
    createTime?: string,
}