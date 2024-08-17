export interface FilterForm {
    title: string,
    cateIds?: number[],
    tagId?: number,
    createTime: Date[]
}

export interface FilterArticle extends FilterData {
    cateIds?: string | null,
    tagId?: string | null,
}