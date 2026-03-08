import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, DollarSign, FileCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 1, name: 'Business Profile', icon: Building2 },
  { id: 2, name: 'Financial Snapshot', icon: DollarSign },
  { id: 3, name: 'Compliance & Docs', icon: FileCheck },
];

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // This state maps directly to the SMEInput model in your FastAPI backend
  const [formData, setFormData] = useState({
    business_stage: 'startup',
    sector: 'retail',
    age_of_business: 1,
    employee_count: 1,
    revenue: 0,
    profit_margin: 0,
    bank_balance: 0,
    tax_registered: true,
    licenses_up_to_date: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleNext = () => {
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

  const submitOnboarding = () => {
    // TODO: POST this formData to Django, which saves it and triggers the FastAPI models
    console.log('Submitting SME Data to backend:', formData);
    
    // Update global state/context to indicate onboarding is complete, then navigate
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        
        {/* Header & Progress Bar */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Let's set up your workspace</h2>
          <p className="mt-2 text-sm text-slate-500">We need a few details to generate your AI business health score.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-slate-50 px-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                  currentStep >= step.id ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white text-slate-400'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 className="h-6 w-6" /> : <step.icon className="h-5 w-5" />}
                </div>
                <span className={`text-xs font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-slate-500'}`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-200 min-h-[400px] flex flex-col">
          
          <div className="flex-1">
            {/* STEP 1: Business Profile */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-lg font-medium leading-6 text-slate-900 border-b border-slate-100 pb-4">Business Profile</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">Industry Sector</label>
                    <select name="sector" value={formData.sector} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white">
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="technology">Technology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">Business Stage</label>
                    <select name="business_stage" value={formData.business_stage} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white">
                      <option value="startup">Startup (0-2 years)</option>
                      <option value="growth">Growth (2-5 years)</option>
                      <option value="mature">Mature (5+ years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">Age of Business (Years)</label>
                    <input type="number" name="age_of_business" min="0" value={formData.age_of_business} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">Total Employees</label>
                    <input type="number" name="employee_count" min="1" value={formData.employee_count} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Financial Snapshot */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-lg font-medium leading-6 text-slate-900 border-b border-slate-100 pb-4">Financial Snapshot</h3>
                <p className="text-sm text-slate-500 mb-4">Provide rough estimates. These will be used to generate your initial funding readiness score.</p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">Annual Revenue (KSh)</label>
                    <input type="number" name="revenue" value={formData.revenue} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">Profit Margin (%)</label>
                    <input type="number" name="profit_margin" value={formData.profit_margin} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">Current Bank Balance (KSh)</label>
                    <input type="number" name="bank_balance" value={formData.bank_balance} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Compliance & Docs */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-lg font-medium leading-6 text-slate-900 border-b border-slate-100 pb-4">Compliance Status</h3>
                <div className="space-y-4">
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input id="tax" name="tax_registered" type="checkbox" checked={formData.tax_registered} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="tax" className="font-medium text-slate-900">KRA PIN Registered</label>
                      <p className="text-slate-500">The business has a valid KRA PIN and is registered for taxes.</p>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input id="licenses" name="licenses_up_to_date" type="checkbox" checked={formData.licenses_up_to_date} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="licenses" className="font-medium text-slate-900">Operating Licenses Up to Date</label>
                      <p className="text-slate-500">All required county and national operating licenses are current.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                currentStep === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              {currentStep === steps.length ? 'Complete Setup' : 'Next Step'} 
              {currentStep < steps.length && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;