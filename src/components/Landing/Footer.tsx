import { LayoutDashboard, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="#" className="text-slate-400 hover:text-slate-500">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link to="#" className="text-slate-400 hover:text-slate-500">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link to="#" className="text-slate-400 hover:text-slate-500">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <LayoutDashboard className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-bold text-slate-900">Inua360</span>
          </div>
          <p className="text-center text-xs leading-5 text-slate-500 md:text-left">
            &copy; {new Date().getFullYear()} Inua360. All rights reserved. Built for SMEs.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;