export interface LinkType {
  id: number,
  name: string
}

export interface Web {
  id?: number;
  title: string;
  description: string;
  email: string;
  image: string;
  url: string;
  rss: string;
  typeId: number;
  typeName: string;
  createTime?: string;
}
