import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import Create from './pages/Create';
import Cate from './pages/Cate';
import Article from './pages/Article';
import Comment from './pages/Comment';
import Web from './pages/Web';
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
          // Seed Token，影响范围大
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
              path="/comment"
              element={
                <>
                  <PageTitle title="Thrive - 评论管理" />
                  <Comment />
                </>
              }
            />

            <Route
              path="/Web"
              element={
                <>
                  <PageTitle title="Thrive - 网站管理" />
                  <Web />
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
