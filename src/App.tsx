import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import Create from './pages/Create';
import Cate from './pages/Cate';
import DefaultLayout from './layout/DefaultLayout';
import Login from './pages/Login';

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
          </Routes>
        </DefaultLayout>
      )}
    </ConfigProvider>
  );
}

export default App;
