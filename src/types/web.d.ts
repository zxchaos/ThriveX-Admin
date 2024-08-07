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
  typeId: number;
  type: LinkType;
  createTime?: string;
}
