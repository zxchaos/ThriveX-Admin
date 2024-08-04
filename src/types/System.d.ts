// 磁盘
export interface Disk {
    diskFree: number;
    diskPercent: number;
    diskTotal: number;
    diskUsed: number;
}

// 内存
export interface Memory {
    memoryAvailable: number;
    memoryPercent: number;
    memoryTotal: number;
    memoryUsed: number;
}

// 系统信息
export interface System {
    boot_time: string;
    cpu: number;
    disk: Disk;
    memory: Memory;
    name: string;
    run: number;
    ip: number
}

// 网站信息
export interface Web {
    url: string,
    title: string,
    subhead: string,
    favicon: string,
    light_logo: string,
    dark_logo: string,
    description: string,
    keyword: string,
    footer: string,
    // font: string,
    social: string,
    covers: string[]
}

export type ArticleLayout = "classics" | "card" | "waterfall" | ""
export type RightSidebar = "author" | "hotArticle" | "randomArticle" | "newComments"

// 布局配置
export interface Layout {
    isArticleLayout: ArticleLayout,
    rightSidebar: RightSidebar[],
    swiperImage: string,
    swiperText: string[]
}