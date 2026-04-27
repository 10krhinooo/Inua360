import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User, Search, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/useTheme';
import apiClient from '../../services/api';

interface HeaderProps {
    setSidebarOpen: (isOpen: boolean) => void;
    isSidebarCollapsed?: boolean;
    onOpenNotifications?: () => void;
}

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture?: string;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen, onOpenNotifications }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [userData, setUserData] = useState<UserData | null>(null);

  // 1. Fetch the data when the header loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get('/auth/user/');
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data for header", error);
      }
    };
    fetchUserData();
  }, []);

  const getPageTitle = (path: string) => {
    if (path === '/dashboard') return 'Dashboard Overview';
    if (path.startsWith('/dashboard/health')) return 'Health Report';
    if (path.startsWith('/dashboard/alerts')) return 'Smart Alerts';
    if (path.startsWith('/dashboard/funding')) return 'Funding Readiness';
    if (path.startsWith('/dashboard/settings')) return 'Settings';
    if (path.startsWith('/dashboard/profile')) return 'Business Profile';
    
    return 'Dashboard';
  };

  const currentTitle = getPageTitle(location.pathname);

  // 2. Calculate the dynamic name (Fallback to email or 'Business Owner' while loading)
  const displayName = userData?.first_name 
    ? `${userData.first_name} ${userData.last_name}`.trim() 
    : userData?.email?.split('@')[0] || 'Business Owner';

  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--border-primary)] bg-[var(--card-bg)] px-4 sm:px-6 sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          className="text-[var(--text-secondary)] hover:text-[#F07B20] transition-colors lg:hidden focus:outline-none p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-[var(--text-primary)] transition-all hidden sm:block">
          {currentTitle}
        </h1>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden md:flex items-center bg-[var(--bg-secondary)] rounded-lg px-3 py-1.5 border border-[var(--border-primary)] focus-within:ring-2 focus-within:ring-orange-100 dark:focus-within:ring-orange-500/20 focus-within:border-[#F07B20] transition-all">
          <Search size={18} className="text-[var(--text-secondary)]" />
          <input 
            type="text" 
            placeholder="Search metrics..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-[var(--text-secondary)] text-[var(--text-primary)]"
          />
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-[#F07B20] transition-all"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <button 
          onClick={onOpenNotifications}
          className="relative rounded-xl p-2.5 text-[var(--text-secondary)] hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-[#F07B20] transition-all group"
        >
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#F07B20] ring-4 ring-[var(--card-bg)] group-hover:ring-orange-50 dark:group-hover:ring-orange-500/10 transition-all"></span>
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-3 border-l border-[var(--border-primary)] pl-3 sm:pl-6 transition-colors duration-300">
          <div className="hidden sm:flex flex-col text-right">
            {/* 3. Inject the dynamic display name here! */}
            <span className="text-sm font-bold text-[var(--text-primary)]">{displayName}</span>
            <span className="text-[10px] font-bold text-[#F07B20] uppercase tracking-wider">Premium Plan</span>
          </div>
          
          {/* 4. Inject the dynamic profile picture here! */}
          <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#F07B20] border border-orange-100 dark:border-orange-500/20 shadow-sm transition-all duration-300">
            {userData?.profile_picture ? (
              <img 
                src={userData.profile_picture} 
                alt={displayName} 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer" // <--- CRITICAL: Google blocks images without this!
              />
            ) : (
              <User className="h-6 w-6" />
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;