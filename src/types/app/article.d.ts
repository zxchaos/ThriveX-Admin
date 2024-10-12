import { Cate } from "./cate"
import { Tag } from "./tag"

export interface Article {
    id?: number,
    title: string,
    description: string,
    content: string,
    cover: string,
    cateIds: number[],
    cateList: Cate[]
    tagIds: string,
    tagList: Tag[]
    view?: number
    count?: number,
    createTime?: string,
}

export interface FilterForm {
    title?: string,
    cateIds?: number[],
    tagId?: number,
    createTime: Date[]
}

export interface FilterArticle extends FilterData {
    cateIds?: number[],
    tagId?: number,
}