import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard';
import Create from './pages/Create';
import Cate from './pages/Cate';
import Article from './pages/Article';
import Comment from './pages/Comment';
import Tag from './pages/Tag';
import Web from './pages/Web';
import Swiper from './pages/Swiper';
import Setup from './pages/Setup';
import Rss from './pages/Rss';
import Stats from './pages/Stats';
import Login from './pages/Login';
import DefaultLayout from './layout/DefaultLayout';

import useAuthRedirect from '@/hooks/useAuthRedirect';

import { ConfigProvider } from 'antd';

function App() {
  useAuthRedirect()

  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isLoginRoute = pathname === '/login';

  return loading ? (
    <Loader />
  ) : (
    // 自定义主题色
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#727cf5',
        },
      }}
    >
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
            <Route
              index
              element={
                <>
                  <PageTitle title="Thrive - 仪表盘" />
                  <ECommerce />
                </>
              }
            />

            <Route
              path="/create"
              element={
                <>
                  <PageTitle title="Thrive - 发挥灵感" />
                  <Create />
                </>
              }
            />

            <Route
              path="/cate"
              element={
                <>
                  <PageTitle title="Thrive - 分类管理" />
                  <Cate />
                </>
              }
            />

            <Route
              path="/article"
              element={
                <>
                  <PageTitle title="Thrive - 文章管理" />
                  <Article />
                </>
              }
            />

            <Route
              path="/tag"
              element={
                <>
                  <PageTitle title="Thrive - 标签管理" />
                  <Tag />
                </>
              }
            />

            <Route
              path="/comment"
              element={
                <>
                  <PageTitle title="Thrive - 评论管理" />
                  <Comment />
                </>
              }
            />

            <Route
              path="/web"
              element={
                <>
                  <PageTitle title="Thrive - 网站管理" />
                  <Web />
                </>
              }
            />

            <Route
              path="/swiper"
              element={
                <>
                  <PageTitle title="Thrive - 轮播图管理" />
                  <Swiper />
                </>
              }
            />

            <Route
              path="/setup"
              element={
                <>
                  <PageTitle title="Thrive - 项目配置" />
                  <Setup />
                </>
              }
            />

            <Route
              path="/rss"
              element={
                <>
                  <PageTitle title="Thrive - 订阅中心" />
                  <Rss />
                </>
              }
            />

            <Route
              path="/stats"
              element={
                <>
                  <PageTitle title="Thrive - 数据可视化" />
                  <Stats />
                </>
              }
            />
          </Routes>
        </DefaultLayout>
      )}
    </ConfigProvider>
  );
}

export default App;
