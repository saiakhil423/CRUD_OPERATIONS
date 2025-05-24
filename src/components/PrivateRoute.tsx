import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAccessToken, refreshToken } from '../services/auth';

const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      
      if (!token) {
        navigate('/');
        return;
      }

      try {
        // Verify token is still valid or refresh it
        await refreshToken();
      } catch (error) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  return <Outlet />;
};

export default PrivateRoute;