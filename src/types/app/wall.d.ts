export interface Cate {
    id: number;
    name: string;
    mark: string;
    order: number;
}

export interface Wall {
    id: number;
    name: string;
    cateId: number;
    cate: Category;
    color: string;
    content: string;
    auditStatus: number;
    createTime: string;
  }