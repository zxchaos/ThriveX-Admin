import DefaultLayout from "@/layout/DefaultLayout"
import { Route, Routes, useLocation } from "react-router-dom"

import Home from '@/pages/Dashboard';
import Create from '@/pages/Cate';
import Cate from '@/pages/Cate';
import Article from '@/pages/Article';
import Comment from '@/pages/Comment';
import Tag from '@/pages/Tag';
import Web from '@/pages/Web';
import Swiper from '@/pages/Swiper';
import Setup from '@/pages/Setup';
import Rss from '@/pages/Rss';
import Stats from '@/pages/Stats';
import Iterative from '@/pages/Iterative';
import Page from '@/pages/Route'
import Role from '@/pages/Role'
import PageTitle from "../PageTitle";
import Login from "@/pages/Login";

export default () => {
    const { pathname } = useLocation();
    const isLoginRoute = pathname === '/login';

    // 路由列表
    const routes = [
        {
            path: "/",
            title: "仪表盘",
            component: <Home />
        },
        {
            path: "/create",
            title: "发挥灵感",
            component: <Create />
        },
        {
            path: "/cate",
            title: "分类管理",
            component: <Cate />
        },
        {
            path: "/article",
            title: "文章管理",
            component: <Article />
        },
        {
            path: "/tag",
            title: "标签管理",
            component: <Tag />
        },
        {
            path: "/comment",
            title: "评论管理",
            component: <Comment />
        },
        {
            path: "/web",
            title: "网站管理",
            component: <Web />
        },
        {
            path: "/swiper",
            title: "轮播图管理",
            component: <Swiper />
        },
        {
            path: "/setup",
            title: "项目配置",
            component: <Setup />
        },
        {
            path: "/route",
            title: "路由配置",
            component: <Page />
        },
        {
            path: "/role",
            title: "角色管理",
            component: <Role />
        },
        {
            path: "/rss",
            title: "订阅中心",
            component: <Rss />
        },
        {
            path: "/stats",
            title: "数据可视化",
            component: <Stats />
        },
        {
            path: "/iter",
            title: "项目更新记录",
            component: <Iterative />
        }
    ];

    return (
        <>
            {isLoginRoute ? (
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <>
                                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <Login />
                            </>
                        }
                    />
                </Routes>
            ) : (
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
                    </Routes>
                </DefaultLayout>
            )}
        </>
    )
}