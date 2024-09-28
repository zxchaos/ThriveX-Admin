export interface FilterForm {
    content?: string,
    cateId?: number,
    createTime: Date[]
}

export interface FilterWall extends FilterData {
    content?: string,
    cateId?: number
}