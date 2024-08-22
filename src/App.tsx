import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { ConfigProvider } from 'antd';
import RouteList from './components/RouteList';
import "@/styles/customAntd.scss"

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
      <RouteList />
    </ConfigProvider>
  );
}

export default App;
