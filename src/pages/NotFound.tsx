import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
      <div className="max-w-md w-full bg-[var(--card-bg)] p-8 rounded-3xl shadow-xl border border-[var(--border-primary)]">
        <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-black">404</span>
        </div>
        
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
          Oops! Page not found
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>

        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors mb-10"
        >
          <ArrowLeft className="w-5 h-5" />
          Return Home
        </Link>

        <div className="border-t border-[var(--border-primary)] pt-8">
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-4">
            Think this is a mistake? Reach out to us!
          </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:hello.inua360@gmail.com" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--text-secondary)] hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all" title="Email Us">
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://x.com/Inua360" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--text-secondary)] hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all" title="X / Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/company/inua360" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--text-secondary)] hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all" title="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/inua360" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--text-secondary)] hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all" title="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575479657497" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--text-secondary)] hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all" title="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
