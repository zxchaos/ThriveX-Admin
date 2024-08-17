export interface FilterForm {
    title: string,
    cateIds?: number[],
    tagIds?: number,
    createTime: Date[]
}

export interface FilterArticle extends FilterData {
    cateIds?: string | null,
    tagIds?: string | null,
}