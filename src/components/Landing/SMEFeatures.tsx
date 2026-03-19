import React from 'react';
import { BarChart3, ShieldCheck, Landmark, TrendingUp, Users, Target, ArrowRight } from 'lucide-react';
import './Features.css';

const SMEFeatures: React.FC = () => {
  const features = [
    {
      title: 'Business Health Score',
      description: 'Get a comprehensive health score for your business automatically',
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      title: 'Compliance Tracking',
      description: 'Automated tracking of all your licenses and permits',
      icon: ShieldCheck,
      color: 'bg-blue-500'
    },
    {
      title: 'Funding Readiness',
      description: 'Know exactly when your business is loan-ready',
      icon: Landmark,
      color: 'bg-orange-500'
    },
    {
      title: 'Cash Flow Forecasting',
      description: 'AI-powered predictions of future income and expenses',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'AI Agents',
      description: '8 AI agents working for you around the clock',
      icon: Users,
      color: 'bg-emerald-500'
    },
    {
      title: 'Funding Matching',
      description: 'Auto-matched with the best funding opportunities',
      icon: Target,
      color: 'bg-rose-500'
    }
  ];

  return (
    <section className="features-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="features-header">
          <h2 className="features-headline">For Small Businesses</h2>
          <p className="features-subheadline">Features designed to help Kenyan SMEs grow</p>
        </div>

        <div className="features-cards">
          {features.map((feature, idx) => (
            <div key={idx} className="features-card">
              <div className={`${feature.color} features-badge text-white group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="features-card-title">{feature.title}</h3>
              <p className="features-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="/register" className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20">
            Start Now - It's Free <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SMEFeatures;
