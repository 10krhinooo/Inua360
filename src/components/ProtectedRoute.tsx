// import React from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';

// interface ProtectedRouteProps {
//   children?: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const location = useLocation();

//   // Check if the user has a token in local storage
//   const isAuthenticated = !!localStorage.getItem('auth_token');

//   if (!isAuthenticated) {
//     // Redirect them to the /login page, but save the location they were 
//     // trying to go to so you can send them there after they log in
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // If they are authenticated, render the children (or nested routes)
//   return children ? <>{children}</> : <Outlet />;
// };

// export default ProtectedRoute;



import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import apiClient from '../services/api';
import { Activity } from 'lucide-react';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireOnboarding: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireOnboarding = true }) => {
  //   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authStatus, setAuthStatus] = useState<'loading' | 'unauth' | 'needs_onboarding' | 'fully_onboarded'>('loading');
  const location = useLocation();

  useEffect(() => {
    const verifySession = async () => {
      try {
        // Ping the backend. If the cookie is valid, this succeeds.
        const response = await apiClient.get('/auth/user/');
        if (response.data.is_onboarded) {
          setAuthStatus('fully_onboarded');
        } else {
          setAuthStatus('needs_onboarding');
        }
        // setIsAuthenticated(true);
      } catch {
        // setIsAuthenticated(false);
        setAuthStatus('unauth');
      }
    };
    verifySession();
  }, [location.pathname]);

  //   // Show nothing (or a loading spinner) while checking the cookie
  //   if (isAuthenticated === null) return <div className="p-10 text-center">Verifying session...</div>;

  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location }} replace />;
  //   }

  if (authStatus === 'loading') {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 text-slate-500">
        <Activity className="h-10 w-10 animate-pulse text-orange-600 mb-4" />
        <p>Verifying secure session...</p>
      </div>
    );
  }

  if (authStatus === 'unauth') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authStatus === 'needs_onboarding' && requireOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  if (authStatus === 'fully_onboarded' && !requireOnboarding) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;