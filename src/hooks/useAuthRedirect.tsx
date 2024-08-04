import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores';

// 如果有token，就跳转到首页
const useAuthRedirect = () => {
    const store = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = store.token;
        if (token) navigate('/home');
    }, [location, navigate]);
};

export default useAuthRedirect;
