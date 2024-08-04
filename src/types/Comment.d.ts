export interface Comment {
    aid: number,
    avatar: string,
    content: string,
    date: Date,
    email: string,
    id: number,
    name: string,
    rid: number,
    url: string,
    audit: number
}

export interface Info {
    tab: string,
    loading: boolean,
    list: Comment[],
    paginate: Page
}