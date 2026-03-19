import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  BellRing, 
  Landmark, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  X
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, end: true },
  { name: 'Business Profile', href: '/dashboard/profile', icon: User },
  { name: 'Health Report', href: '/dashboard/health', icon: Activity },
  { name: 'Smart Alerts', href: '/dashboard/alerts', icon: BellRing },
  { name: 'Funding Readiness', href: '/dashboard/funding', icon: Landmark },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, isCollapsed, onToggle }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={
          `fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ` + 
          (isOpen ? "translate-x-0 shadow-2xl w-64" : "-translate-x-full lg:translate-x-0 ") +
          (isCollapsed && !isOpen ? "lg:w-20" : "lg:w-64")
        }
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
            <div className="flex items-center gap-2 overflow-hidden w-full transition-all">
                <img 
                  src="/logo.png" 
                  alt="Inua360 Logo" 
                  onClick={() => { navigate('/'); setIsOpen(false); }} 
                  className={`h-10 w-auto min-w-[40px] cursor-pointer transition-all ${isCollapsed && !isOpen ? 'scale-110' : ''}`} 
                />
                {(!isCollapsed || isOpen) && (
                  <span className="text-xl font-bold tracking-tight text-[#0f172a] whitespace-nowrap">Inua360</span>
                )}
            </div>
            <button 
              className="lg:hidden text-slate-400 hover:text-[#F07B20] focus:outline-none p-1"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
        </div>
        
        <nav className="flex-1 space-y-1 px-3 py-6 overflow-x-hidden overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.end}
              onClick={() => setIsOpen(false)}
              title={isCollapsed && !isOpen ? item.name : ''}
              className={({ isActive }) =>
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all group " + (
                  isActive
                    ? "bg-orange-50 text-[#F07B20]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#F07B20]"
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!isCollapsed || isOpen) && <span className="whitespace-nowrap">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3 space-y-2 shrink-0">
          <button 
            onClick={onToggle}
            className="hidden lg:flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!isCollapsed && <span>Collapse Sidebar</span>}
          </button>
          
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="h-5 w-5 shrink-0" />
            {(!isCollapsed || isOpen) && <span>Sign out</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;