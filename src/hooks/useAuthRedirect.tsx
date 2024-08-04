import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores';

// 如果即将去往的是 /login 页面并且有 token 情况就自动重定向到 /home，否则就跳转
const useAuthRedirect = () => {
    const store = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = store.token;
        const isGoingToLogin = location.pathname === '/login';

        if (isGoingToLogin && token) navigate('/home');
    }, [location, navigate, store.token]);
};

export default useAuthRedirect;
