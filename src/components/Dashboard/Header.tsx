import { useLocation } from 'react-router-dom';
import { Bell, Menu, User } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

const Header = ({ setSidebarOpen }: HeaderProps) => {
  const location = useLocation();

  const getPageTitle = (path: string) => {
    if (path === '/dashboard') return 'Dashboard Overview';
    if (path.startsWith('/dashboard/health')) return 'Business Health Report';
    if (path.startsWith('/dashboard/alerts')) return 'Smart Alerts & Monitoring';
    if (path.startsWith('/dashboard/funding')) return 'Funding Readiness & Loans';
    if (path.startsWith('/dashboard/settings')) return 'Workspace Settings';
    
    return 'Dashboard';
  };

  const currentTitle = getPageTitle(location.pathname);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button 
          className="text-slate-500 hover:text-orange-600 transition-colors lg:hidden focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-slate-900 transition-all hidden sm:block">
          {currentTitle}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-slate-400 hover:bg-orange-50 hover:text-orange-600 transition-colors focus:outline-none">
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="flex-col text-right hidden sm:flex">
            <span className="text-sm font-medium text-slate-900">Demo Business</span>
            <span className="text-xs text-slate-500">Free Tier</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;