import { Link, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  BellRing, 
  Landmark, 
  Settings,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, end: true },
  { name: 'Health Report', href: '/dashboard/health', icon: Activity },
  { name: 'Smart Alerts', href: '/dashboard/alerts', icon: BellRing },
  { name: 'Funding Readiness', href: '/dashboard/funding', icon: Landmark },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
        <Link to="/" className="flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Inua360</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
              }`
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;