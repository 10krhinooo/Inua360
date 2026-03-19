import { Link } from 'react-router-dom';

interface NavbarProps {
    persona?: 'SME' | 'Lender';
}

const Navbar: React.FC<NavbarProps> = ({ persona }) => {
  const ctaText = persona === 'Lender' ? 'Partner with Us' : 'Get Evaluated';
  
  return (
    <nav className="sticky top-0 z-50 w-full h-[80px] border-b border-slate-200 bg-white/90 backdrop-blur-md font-['Poppins']">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Inua360" className="h-16 w-auto" style={{ display: 'block', marginRight: '40px' }} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-10">
          <Link 
            to="/"
            className={`text-[15px] font-semibold transition-colors ${persona !== 'Lender' ? 'text-[#F07B20]' : 'text-[#64748b] hover:text-[#F07B20]'}`}
          >
            For SMEs
          </Link>
          <Link 
            to="/for-lenders"
            className={`text-[15px] font-semibold transition-colors ${persona === 'Lender' ? 'text-[#F07B20]' : 'text-[#64748b] hover:text-[#F07B20]'}`}
          >
            For Lenders
          </Link>
          <a href="#features" className="text-[15px] font-semibold text-[#64748b] hover:text-[#F07B20] transition-colors">Features</a>
          <a href="#how-it-works" className="text-[15px] font-semibold text-[#64748b] hover:text-[#F07B20] transition-colors">Benefits</a>
          <a href="#faq" className="text-[15px] font-semibold text-[#64748b] hover:text-[#F07B20] transition-colors">FAQ</a>
        </div>

        {/* Auth CTAs */}
        <div className="flex items-center gap-6">
          <a href="/login" className="hidden text-[15px] font-semibold text-[#0f172a] hover:text-[#F07B20] md:block transition-colors">
            Log in
          </a>
          <a href="#join-waitlist" className="rounded-lg bg-[#F07B20] px-6 py-3 text-[15px] font-bold text-white shadow-lg hover:bg-[#d96a1a] transition-all transform hover:-translate-y-0.5">
            {ctaText}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;