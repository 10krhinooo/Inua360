import React from 'react';
import { UserPlus, Cpu, ShieldCheck, Rocket, ChevronRight, ArrowRight } from 'lucide-react';
import './Features.css';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Join Inua360',
      description: 'Register your business and securely connect your M-Pesa or Bank account.',
      icon: UserPlus,
      color: 'bg-orange-500'
    },
    {
      title: 'AI Agents Work',
      description: 'Our AI agents build your business profile and monitor ongoing compliance.',
      icon: Cpu,
      color: 'bg-blue-500'
    },
    {
      title: 'Get Compliant',
      description: 'Get real-time alerts and expert help to renew your licenses automatically.',
      icon: ShieldCheck,
      color: 'bg-green-500'
    },
    {
      title: 'Get Funded',
      description: 'Match with the best funding opportunities and apply with a verified score.',
      icon: Rocket,
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className="features-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="features-header">
          <h2 className="features-headline">How It Works</h2>
          <p className="features-subheadline">
            The simple 4-step process to make your business loan-ready and growth-focused
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex-1 w-full group">
                <div className="features-card !text-center">
                  <div className={`${step.color} features-badge text-white mx-auto mb-8 shadow-lg shadow-orange-500/10 group-hover:scale-110 transition-transform`}>
                    <step.icon size={32} />
                  </div>
                  
                  <h3 className="features-card-title !text-2xl">
                    {step.title}
                  </h3>
                  <p className="features-card-desc">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Arrow Connector */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center text-[var(--border-primary)]">
                  <ChevronRight size={48} className="animate-pulse" />
                </div>
              )}
              {idx < steps.length - 1 && (
                <div className="lg:hidden flex items-center justify-center text-[var(--border-primary)] my-4">
                   <ArrowRight size={32} className="rotate-90 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
