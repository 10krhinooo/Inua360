import { Link } from 'react-router-dom';
import { useTheme } from '../../context/useTheme';
import { Sun, Moon, Menu } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
    persona?: 'SME' | 'Lender';
}

const Navbar: React.FC<NavbarProps> = ({ persona }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ctaText = persona === 'Lender' ? 'Partner with Us' : 'Get Evaluated';
  
  return (
    <nav className="sticky top-0 z-50 w-full h-[80px] border-b border-[var(--border-primary)] bg-[var(--card-bg)]/90 backdrop-blur-md font-['Poppins'] transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8 h-full">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center shrink-0">
          <img 
            src={theme === 'dark' ? '/logo-white.png' : '/logo.png'} 
            alt="Inua360" 
            className="h-12 w-auto sm:h-16 transition-all duration-300" 
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-10">
          <Link 
            to="/"
            className={`text-sm font-bold tracking-wide transition-colors ${persona !== 'Lender' ? 'text-orange-500' : 'text-[var(--text-secondary)] hover:text-orange-500'}`}
          >
            FOR SMES
          </Link>
          <Link 
            to="/lenders"
            className={`text-sm font-bold tracking-wide transition-colors ${persona === 'Lender' ? 'text-orange-500' : 'text-[var(--text-secondary)] hover:text-orange-500'}`}
          >
            FOR LENDERS
          </Link>
          <a href="#features" className="text-sm font-bold tracking-wide text-[var(--text-secondary)] hover:text-orange-500 transition-colors">FEATURES</a>
          <a href="#benefits" className="text-sm font-bold tracking-wide text-[var(--text-secondary)] hover:text-orange-500 transition-colors">BENEFITS</a>
          <a href="#faq" className="text-sm font-bold tracking-wide text-[var(--text-secondary)] hover:text-orange-500 transition-colors">FAQ</a>
        </div>

        {/* Action CTAs & Theme Toggle */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500 transition-all"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <div className="hidden md:flex items-center gap-6">
            {persona !== 'Lender' ? (
              <>
                <Link to="/login" className="text-sm font-bold text-[var(--text-primary)] hover:text-orange-500 transition-colors">
                  EARLY ACCESS
                </Link>
                <a href="#join-waitlist" className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-all transform hover:-translate-y-0.5 active:scale-95">
                  {ctaText}
                </a>
              </>
            ) : (
              <>
                <a href="#" className="text-sm font-bold text-[var(--text-primary)] hover:text-orange-500 transition-colors">
                  BOOK A DEMO
                </a>
                <a href="#" className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-all transform hover:-translate-y-0.5 active:scale-95">
                  PARTNER WITH US
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-orange-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 w-full bg-[var(--card-bg)] border-b border-[var(--border-primary)] shadow-xl p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/" className="block text-lg font-bold text-[var(--text-primary)] py-2 border-b border-[var(--border-primary)]/50">For SMEs</Link>
          <Link to="/lenders" className="block text-lg font-bold text-[var(--text-primary)] py-2 border-b border-[var(--border-primary)]/50">For Lenders</Link>
          <a href="#features" className="block text-lg font-bold text-[var(--text-primary)] py-2 border-b border-[var(--border-primary)]/50">Features</a>
          <a href="#benefits" className="block text-lg font-bold text-[var(--text-primary)] py-2 border-b border-[var(--border-primary)]/50">Benefits</a>
          
          <div className="pt-4 flex flex-col gap-4">
             <Link to="/login" className="w-full py-4 text-center font-bold text-[var(--text-primary)] border border-orange-500/20 rounded-2xl">EARLY ACCESS</Link>
             <a href="#join-waitlist" className="w-full py-4 text-center font-bold text-white bg-orange-600 rounded-2xl shadow-lg shadow-orange-500/20">{ctaText}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;