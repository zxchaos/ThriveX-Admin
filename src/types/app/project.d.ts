export interface Social {
    name: string;
    url: string;
}

// 系统信息
export interface System {
    osName: string,
    osVersion: string,
    totalMemory: number,
    availableMemory: number,
    memoryUsage: number
}

// 网站信息
export interface Web {
    url: string,
    title: string,
    subhead: string,
    favicon: string,
    description: string,
    keyword: string,
    footer: string,
}

export type ArticleLayout = "classics" | "card" | "waterfall" | ""
export type RightSidebar = "author" | "hotArticle" | "randomArticle" | "newComments"

// 主题配置
export interface Theme {
    is_article_layout: string,
    right_sidebar: string,
    light_logo: string,
    dark_logo: string,
    swiper_image: string,
    swiper_text: string,
    reco_article: string,
    social: string,
    covers: string
}

// 其他配置
export interface Other {
    email: string
}