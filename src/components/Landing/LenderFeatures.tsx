import React from 'react';
import { ShieldCheck, Target, Zap, BarChart3, Globe, Handshake } from 'lucide-react';
import './Features.css';

const LenderFeatures: React.FC = () => {
  const benefits = [
    { title: 'Comprehensive Data', desc: 'Access deep SME data from M-Pesa, KRA, and other sources' },
    { title: 'Risk Assessment', desc: 'Automated risk and creditworthiness scoring' },
    { title: 'Vetted SMEs', desc: 'Connect with pre-vetted, loan-ready SMEs' },
    { title: 'Fast Processing', desc: 'Reduce loan processing time by up to 70%' }
  ];

  const gridItems = [
    { title: 'Comprehensive Data', desc: 'Access deep SME data from M-Pesa, KRA, and other sources', icon: ShieldCheck, color: 'text-orange-500' },
    { title: 'Risk Assessment', desc: 'Automated risk and creditworthiness scoring', icon: BarChart3, color: 'text-orange-400' },
    { title: 'Vetted SMEs', desc: 'Connect with pre-vetted, loan-ready SMEs', icon: Target, color: 'text-orange-500' },
    { title: 'Fast Processing', desc: 'Reduce loan processing time by up to 70%', icon: Zap, color: 'text-orange-400' },
    { title: 'Market Access', desc: 'Access new SME markets across Kenya', icon: Globe, color: 'text-orange-500' },
    { title: 'Long-term Partner', desc: 'Build long-term relationships with your customers', icon: Handshake, color: 'text-orange-400' }
  ];

  return (
    <section className="features-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-bold border border-orange-500/20">
                <ShieldCheck size={16} /> Partner With Us
            </div>
            <h2 className="features-headline !text-left">
              Lenders: Access <span className="text-orange-500">Quality SMEs</span>
            </h2>
            <p className="features-subheadline !text-left !max-w-lg leading-relaxed">
              Inua360 connects you with pre-vetted, loan-ready SMEs. Get comprehensive data, risk scores, and fast processing.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1 rounded-full">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="features-card-title !text-lg !mb-1">{benefit.title}</h3>
                    <p className="features-card-desc !text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#" className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 w-fit">
              Join the Program <Zap size={20} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-[var(--bg-secondary)] rounded-[40px] border border-[var(--border-primary)]">
            {gridItems.map((item, idx) => (
              <div key={idx} className="features-card">
                <div className={`${item.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon size={28} />
                </div>
                <h4 className="features-card-title !text-base !mb-2">{item.title}</h4>
                <p className="features-card-desc !text-xs font-semibold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LenderFeatures;
