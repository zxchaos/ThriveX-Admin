interface ImportMetaEnv {
    readonly VITE_BAIDU_TONGJI_KEY: string;
    readonly VITE_BAIDU_TONGJI_SECRET_KEY: string;
    readonly VITE_BAIDU_TONGJI_SITE_ID: string;
    readonly VITE_BAIDU_TONGJI_ACCESS_TOKEN: string;
    readonly VITE_BAIDU_TONGJI_REFRESH_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}