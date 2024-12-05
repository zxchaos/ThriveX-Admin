import { useEffect, useState } from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Home from '@/pages/Dashboard';
import Create from '@/pages/Create';
import CreateRecord from '@/pages/CreateRecord';
import Cate from '@/pages/Cate';
import Article from '@/pages/Article';
import Comment from '@/pages/Comment';
import Wall from "@/pages/Wall";
import Tag from '@/pages/Tag';
import Web from '@/pages/Web';
import Swiper from '@/pages/Swiper';
import Footprint from '@/pages/Footprint';
import User from '@/pages/User';
import Setup from '@/pages/Setup';
import Rss from '@/pages/Rss';
import File from "@/pages/File";
import Iterative from '@/pages/Iterative';
import Page from '@/pages/Route';
import Role from '@/pages/Role';
import Login from "@/pages/Login";
import Work from "@/pages/Work";
import Draft from "@/pages/Draft";
import Decycle from "@/pages/Decycle";
import Record from "@/pages/Record";

import PageTitle from "../PageTitle";

import { useUserStore } from "@/stores";
import { getRouteListAPI } from "@/api/Role";
import { checkTokenAPI } from '@/api/User'
import { Route as RouteType } from "@/types/app/route";
import NotFound from "../NotFound";

export default () => {
    const navigate = useNavigate();
    const store = useUserStore();
    const { pathname } = useLocation();
    const isLoginRoute = pathname === '/login';

    const routesAll = [
        { path: "/", title: "仪表盘", component: <Home /> },
        { path: "/create", title: "发挥灵感", component: <Create /> },
        { path: "/create_record", title: "闪念", component: <CreateRecord /> },
        { path: "/draft", title: "草稿箱", component: <Draft /> },
        { path: "/recycle", title: "回收站", component: <Decycle /> },
        { path: "/cate", title: "分类管理", component: <Cate /> },
        { path: "/article", title: "文章管理", component: <Article /> },
        { path: "/record", title: "说说管理", component: <Record /> },
        { path: "/tag", title: "标签管理", component: <Tag /> },
        { path: "/comment", title: "评论管理", component: <Comment /> },
        { path: "/wall", title: "评论管理", component: <Wall /> },
        { path: "/web", title: "网站管理", component: <Web /> },
        { path: "/swiper", title: "轮播图管理", component: <Swiper /> },
        { path: "/footprint", title: "足迹管理", component: <Footprint /> },
        { path: "/user", title: "用户管理", component: <User /> },
        { path: "/setup", title: "项目配置", component: <Setup /> },
        { path: "/route", title: "路由配置", component: <Page /> },
        { path: "/role", title: "角色管理", component: <Role /> },
        { path: "/rss", title: "订阅中心", component: <Rss /> },
        { path: "/file", title: "文件管理", component: <File /> },
        { path: "/iter", title: "项目更新记录", component: <Iterative /> },
        { path: "/work", title: "工作台", component: <Work /> },
    ];

    const [routes, setRoutes] = useState<typeof routesAll | null>(null);

    const getRouteList = async (id: number) => {
        const { data } = await getRouteListAPI(id);
        const pathSet = new Set(data.map((item: RouteType) => item.path));
        setRoutes(routesAll.filter(r1 => pathSet.has(r1.path)));
    };

    useEffect(() => {
        // 如果没有token就跳转到登录页
        if (!store.token) return navigate("/login")
        if (store.role.id) getRouteList(store.role.id)
    }, [store]);

    useEffect(() => {
        if (store.token) checkTokenAPI(store.token)
    }, [store, pathname])

    if (isLoginRoute) {
        return (
            <Routes>
                <Route
                    path="/login"
                    element={
                        <>
                            <PageTitle title="Thrive | 现代化博客管理系统" />
                            <Login />
                        </>
                    }
                />
            </Routes>
        );
    }

    if (routes === null) return

    return (
        <DefaultLayout>
            <Routes>
                {routes.map(({ path, title, component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <>
                                <PageTitle title={`Thrive - ${title}`} />
                                {component}
                            </>
                        }
                    />
                ))}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </DefaultLayout>
    );
};
