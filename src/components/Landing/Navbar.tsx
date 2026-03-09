import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full h-[70px] border-b border-slate-200 bg-white/80 backdrop-blur-md font-['Poppins']">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-[#F07B20]" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Inua360
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-[#F07B20] transition-colors">Features</a>
          <a href="#comparison" className="text-sm font-medium text-slate-600 hover:text-[#F07B20] transition-colors">Comparison</a>
          <a href="#team" className="text-sm font-medium text-slate-600 hover:text-[#F07B20] transition-colors">Our Team</a>
        </div>

        {/* Auth CTAs */}
        <div className="flex items-center gap-4">
          <a href="/login" className="hidden text-sm font-medium text-slate-900 hover:text-[#F07B20] md:block transition-colors">
            Log in
          </a>
          <a href="/register" className="rounded-md bg-[#F07B20] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#F59340] transition-all transform hover:-translate-y-0.5">
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;