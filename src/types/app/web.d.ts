export interface LinkType {
  id: number,
  name: string
}

export interface Web {
  id: number;
  title: string;
  description: string;
  email: string;
  image: string;
  url: string;
  rss: string;
  order: number;
  typeId: number;
  type: LinkType;
  auditStatus: number;
  createTime?: string;
}
