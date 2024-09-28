export interface FilterForm {
    title: string,
    cateIds?: number[],
    tagId?: number,
    createTime: Date[]
}

export interface FilterArticle extends FilterData {
    cateIds?: number[],
    tagId?: number,
}