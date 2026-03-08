import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full h-[70px] border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Inua360
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
          <a href="#team" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Our Team</a>
          <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
        </div>

        {/* Auth CTAs */}
        <div className="flex items-center gap-4">
            <Link to="/dashboard" className="py-2 px-4 rounded-md text-sm font-medium bg-green-400">Dashboard</Link>
          <a href="/login" className="hidden text-sm font-medium text-slate-900 hover:text-blue-600 md:block transition-colors">
            Log in
          </a>
          <a href="/register" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;