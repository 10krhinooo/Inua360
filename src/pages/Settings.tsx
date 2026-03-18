import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  Building2, 
  DollarSign, 
  FileCheck,
  Activity
} from 'lucide-react';
import { analyticsAPI } from '../services/api';

const Settings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [profileId, setProfileId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    business_name: '',
    sector: 'retail',
    business_stage: 'startup',
    age_of_business: 0,
    employee_count: 1,
    revenue: 0,
    profit_margin: 0,
    bank_balance: 0,
    tax_registered: false,
    licenses_up_to_date: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await analyticsAPI.getProfile();
        if (response.data && response.data.length > 0) {
          const profile = response.data[0];
          setProfileId(profile.id);
          setFormData({
            business_name: profile.business_name || '',
            sector: profile.sector || 'retail',
            business_stage: profile.business_stage || 'startup',
            age_of_business: profile.age_of_business || 0,
            employee_count: profile.employee_count || 1,
            revenue: profile.revenue || 0,
            profit_margin: profile.profit_margin || 0,
            bank_balance: profile.bank_balance || 0,
            tax_registered: profile.tax_registered || false,
            licenses_up_to_date: profile.licenses_up_to_date || false,
          });
        }
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // Clear any previous save messages when the user starts typing
    if (saveStatus.type) setSaveStatus({ type: null, message: '' });
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleSave = async () => {
    if (!profileId) return;
    
    setIsSaving(true);
    setSaveStatus({ type: null, message: '' });

    try {
      await analyticsAPI.updateProfile(profileId, formData);
      setSaveStatus({ type: 'success', message: 'Profile updated successfully. Run a new AI scan to see how this affects your score.' });
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSaveStatus({ type: 'error', message: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Activity className="h-10 w-10 animate-pulse text-orange-600 mb-4" />
        <p>Loading your workspace settings...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-orange-600" />
            Workspace Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your business profile and update your financial metrics.
          </p>
        </div>
        
        {/* Save Button */}
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 rounded-md bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Status Message */}
      {saveStatus.type && (
        <div className={`p-4 rounded-lg border ${saveStatus.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
          <p className="text-sm font-medium">{saveStatus.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Navigation/Jump Links (Optional UX enhancement) */}
        <div className="hidden lg:block lg:col-span-1">
          <nav className="sticky top-6 space-y-1">
            <a href="#profile" className="flex items-center gap-3 rounded-md bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
              <Building2 className="h-4 w-4" /> Business Profile
            </a>
            <a href="#financials" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <DollarSign className="h-4 w-4" /> Financial Snapshot
            </a>
            <a href="#compliance" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <FileCheck className="h-4 w-4" /> Compliance Status
            </a>
          </nav>
        </div>

        {/* Right Form Fields */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Business Profile */}
          <section id="profile" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-6">Business Profile</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-slate-900">Business Name</label>
                <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">Industry Sector</label>
                <select name="sector" value={formData.sector} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6 bg-white">
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="services">Services</option>
                  <option value="technology">Technology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">Business Stage</label>
                <select name="business_stage" value={formData.business_stage} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6 bg-white">
                  <option value="startup">Startup (0-2 years)</option>
                  <option value="growth">Growth (2-5 years)</option>
                  <option value="mature">Mature (5+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">Age of Business (Years)</label>
                <input type="number" name="age_of_business" min="0" value={formData.age_of_business} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">Total Employees</label>
                <input type="number" name="employee_count" min="1" value={formData.employee_count} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </section>

          {/* Section 2: Financial Snapshot */}
          <section id="financials" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-6">Financial Snapshot</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">Annual Revenue (KSh)</label>
                <input type="number" name="revenue" value={formData.revenue} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">Profit Margin (%)</label>
                <input type="number" name="profit_margin" value={formData.profit_margin} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">Current Bank Balance (KSh)</label>
                <input type="number" name="bank_balance" value={formData.bank_balance} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </section>

          {/* Section 3: Compliance */}
          <section id="compliance" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-6">Compliance Status</h2>
            <div className="space-y-4">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input id="tax_registered" name="tax_registered" type="checkbox" checked={formData.tax_registered} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-600" />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="tax_registered" className="font-medium text-slate-900">KRA PIN Registered</label>
                  <p className="text-slate-500">The business has a valid KRA PIN and is registered for taxes.</p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input id="licenses_up_to_date" name="licenses_up_to_date" type="checkbox" checked={formData.licenses_up_to_date} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-600" />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="licenses_up_to_date" className="font-medium text-slate-900">Operating Licenses Up to Date</label>
                  <p className="text-slate-500">All required county and national operating licenses are current.</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Settings;