import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User, Search, Menu } from 'lucide-react';

interface HeaderProps {
    setSidebarOpen: (isOpen: boolean) => void;
    isSidebarCollapsed: boolean;
    onOpenNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen, onOpenNotifications }) => {
  const location = useLocation();

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

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          className="text-slate-500 hover:text-[#F07B20] transition-colors lg:hidden focus:outline-none p-2 rounded-lg hover:bg-orange-50"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 transition-all hidden sm:block">
          {currentTitle}
        </h1>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden md:flex items-center bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-200 focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-[#F07B20] transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search metrics..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400"
          />
        </div>

        <button 
          onClick={onOpenNotifications}
          className="relative rounded-xl p-2.5 text-slate-500 hover:bg-orange-50 hover:text-[#F07B20] transition-all group"
        >
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#F07B20] ring-4 ring-white group-hover:ring-orange-50 transition-all"></span>
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-3 border-l border-slate-200 pl-3 sm:pl-6">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-bold text-slate-900">John Doe</span>
            <span className="text-[10px] font-bold text-[#F07B20] uppercase tracking-wider">Premium Plan</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#F07B20] border border-orange-100 shadow-sm">
            <User className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
