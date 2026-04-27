import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, DollarSign, FileCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { mockApi } from '../services/mockApi';

const steps = [
  { id: 1, name: 'Business Profile', icon: Building2 },
  { id: 2, name: 'Financial Snapshot', icon: DollarSign },
  { id: 3, name: 'Compliance & Docs', icon: FileCheck },
];

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem('inua360_onboarding');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error('Failed to parse onboarding data', e);
      }
    }
    return {
      business_stage: 'startup',
      sector: 'retail',
      age_of_business: '' as number | string,
      employee_count: '' as number | string,
      revenue: '' as number | string,
      profit_margin: '' as number | string,
      bank_balance: '' as number | string,
      tax_registered: true,
      licenses_up_to_date: true,
    };
  });

  useEffect(() => {
    sessionStorage.setItem('inua360_onboarding', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError('');
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep = (step: number) => {
    const isStep1Valid = formData.sector !== '' && formData.business_stage !== '' &&
      formData.age_of_business !== '' && formData.employee_count !== '';

    const isStep2Valid = formData.revenue !== '' && formData.profit_margin !== '' &&
      formData.bank_balance !== '';

    if (step === 1) return isStep1Valid;
    if (step === 2) return isStep2Valid;
    if (step === 3) return isStep1Valid && isStep2Valid; // Final verification of all inputs

    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      setError('Please fill in all required fields before proceeding.');
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitOnboarding = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      // Convert string numbers back to actual numbers for the backend
      const payload = {
        ...formData,
        age_of_business: Number(formData.age_of_business),
        employee_count: Number(formData.employee_count),
        revenue: Number(formData.revenue),
        profit_margin: Number(formData.profit_margin),
        bank_balance: Number(formData.bank_balance),
      };
      await mockApi.createProfile(payload as any); // eslint-disable-line @typescript-eslint/no-explicit-any 

      await mockApi.generateInsights();

      sessionStorage.removeItem('inua360_onboarding');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to submit onboarding data:', error);
      setError('There was an issue saving your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">

        {/* Header & Progress Bar */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Let's set up your workspace</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">We need a few details to generate your AI business health score.</p>
        </div>

        <div className="mb-8 p-4">
          <div className="flex items-center justify-between relative max-w-xl mx-auto">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--border-primary)] rounded-full z-0"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 rounded-full z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-[var(--bg-primary)] px-2 transition-colors duration-300">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${currentStep >= step.id ? 'border-orange-500 bg-orange-500 text-white shadow-sm' : 'border-[var(--border-primary)] bg-[var(--card-bg)] text-[var(--text-secondary)] opacity-40'
                  }`}>
                  {currentStep > step.id ? <CheckCircle2 className="h-6 w-6" /> : <step.icon className="h-5 w-5" />}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${currentStep >= step.id ? 'text-orange-500' : 'text-[var(--text-secondary)] opacity-40'}`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[var(--card-bg)] py-10 px-6 sm:px-12 shadow-xl sm:rounded-2xl border border-[var(--border-primary)] flex flex-col overflow-hidden transition-all duration-300">

          <div className="flex-1 relative">
            <div
              className="flex transition-transform duration-500 ease-in-out items-start"
              style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
            >
              {/* STEP 1: Business Profile */}
              <div className={`w-full shrink-0 px-1 transition-opacity duration-500 ${currentStep === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-5 pt-2">Step 1: Business Identity</h3>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60 mb-2 ml-1">Industry Sector</label>
                      <select name="sector" value={formData.sector} onChange={handleChange} className="block w-full rounded-xl border border-[var(--border-primary)] py-3 pl-4 pr-10 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 sm:text-sm bg-[var(--bg-secondary)] transition-colors appearance-none">
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="services">Services</option>
                        <option value="technology">Technology</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60 mb-2 ml-1">Business Stage</label>
                      <select name="business_stage" value={formData.business_stage} onChange={handleChange} className="block w-full rounded-xl border border-[var(--border-primary)] py-3 pl-4 pr-10 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 sm:text-sm bg-[var(--bg-secondary)] transition-colors appearance-none">
                        <option value="startup">Startup (0-2 years)</option>
                        <option value="growth">Growth (2-5 years)</option>
                        <option value="mature">Mature (5+ years)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60 mb-2 ml-1">Age of Business (Years)</label>
                      <input type="number" name="age_of_business" min="0" value={formData.age_of_business} onChange={handleChange} className="block w-full rounded-xl border border-[var(--border-primary)] py-3 px-4 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 sm:text-sm bg-[var(--bg-secondary)] transition-colors" placeholder="e.g. 3" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60 mb-2 ml-1">Total Employees</label>
                      <input type="number" name="employee_count" min="1" value={formData.employee_count} onChange={handleChange} className="block w-full rounded-xl border border-[var(--border-primary)] py-3 px-4 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 sm:text-sm bg-[var(--bg-secondary)] transition-colors" placeholder="e.g. 5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2: Financial Snapshot */}
              <div className={`w-full shrink-0 px-1 transition-opacity duration-500 ${currentStep === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-5 pt-2">Step 2: Financial Overview</h3>
                  <p className="text-sm text-[var(--text-secondary)] opacity-70 mb-6 italic">Provide estimates to calculate your starting funding score.</p>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60 mb-2 ml-1">Annual Revenue (KSh)</label>
                      <input type="number" name="revenue" value={formData.revenue} onChange={handleChange} className="block w-full rounded-xl border border-[var(--border-primary)] py-3 px-4 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 sm:text-sm bg-[var(--bg-secondary)] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60 mb-2 ml-1">Profit Margin (%)</label>
                      <input type="number" name="profit_margin" value={formData.profit_margin} onChange={handleChange} className="block w-full rounded-xl border border-[var(--border-primary)] py-3 px-4 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 sm:text-sm bg-[var(--bg-secondary)] transition-colors" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60 mb-2 ml-1">Current Bank Balance (KSh)</label>
                      <input type="number" name="bank_balance" value={formData.bank_balance} onChange={handleChange} className="block w-full rounded-xl border border-[var(--border-primary)] py-3 px-4 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 sm:text-sm bg-[var(--bg-secondary)] transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: Compliance & Docs */}
              <div className={`w-full shrink-0 px-1 transition-opacity duration-500 ${currentStep === 3 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-5 pt-2">Step 3: Compliance Checks</h3>
                  <div className="space-y-6">
                    <div className="relative flex items-start group">
                      <div className="flex h-6 items-center">
                        <input id="tax" name="tax_registered" type="checkbox" checked={formData.tax_registered} onChange={handleChange} className="h-5 w-5 rounded-lg border-[var(--border-primary)] text-orange-600 focus:ring-orange-500 bg-[var(--bg-secondary)]" />
                      </div>
                      <div className="ml-4 text-sm leading-6">
                        <label htmlFor="tax" className="font-bold text-[var(--text-primary)]">KRA PIN Registered</label>
                        <p className="text-[var(--text-secondary)] opacity-60">Your business has a valid KRA PIN and is registered for taxes.</p>
                      </div>
                    </div>
                    <div className="relative flex items-start group">
                      <div className="flex h-6 items-center">
                        <input id="licenses" name="licenses_up_to_date" type="checkbox" checked={formData.licenses_up_to_date} onChange={handleChange} className="h-5 w-5 rounded-lg border-[var(--border-primary)] text-orange-600 focus:ring-orange-500 bg-[var(--bg-secondary)]" />
                      </div>
                      <div className="ml-4 text-sm leading-6">
                        <label htmlFor="licenses" className="font-bold text-[var(--text-primary)]">Operating Licenses Up to Date</label>
                        <p className="text-[var(--text-secondary)] opacity-60">All required county and national operating licenses are current.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="mt-10 flex flex-col gap-6 border-t border-[var(--border-primary)] pt-8">
            {error && (
              <div className="rounded-xl bg-red-50 dark:bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 font-bold text-center border border-red-100 dark:border-red-500/20">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${currentStep === 1 ? 'text-[var(--text-secondary)] opacity-20 cursor-not-allowed' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-xl bg-orange-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isSubmitting ? 'Processing...' : currentStep === steps.length ? 'Complete Setup' : 'Continue'}
                {!isSubmitting && currentStep < steps.length && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;