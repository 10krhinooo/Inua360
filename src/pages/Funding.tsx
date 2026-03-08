import React from 'react';
import { 
  Landmark, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Building, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

const Funding: React.FC = () => {
  // Mock data representing the combined response from the backend
  const fundingData = {
    readinessScore: 82,
    isEligible: true,
    defaultRisk: 'Low',
    maxLoanAmount: 'KSh 2,500,000',
    factors: [
      { name: 'Business Health', status: 'pass', desc: 'Score is above 70' },
      { name: 'Tax Compliance', status: 'pass', desc: 'Verified and up to date' },
      { name: 'Default History', status: 'pass', desc: 'No previous defaults detected' },
      { name: 'Collateral', status: 'warn', desc: 'Asset value slightly below ideal threshold' },
    ]
  };

  const loanOffers = [
    { id: 1, lender: 'Equity Bank', type: 'SME Expansion Loan', amount: 'KSh 2.5M', rate: '13%', term: '36 Months', logo: 'bg-red-100 text-red-600' },
    { id: 2, lender: 'KCB Bank', type: 'Working Capital', amount: 'KSh 1.0M', rate: '12.5%', term: '12 Months', logo: 'bg-green-100 text-green-600' },
    { id: 3, lender: 'Inua360 Capital', type: 'Fast-Track Invoice Financing', amount: 'KSh 500K', rate: '5% flat', term: '90 Days', logo: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Landmark className="h-6 w-6 text-blue-600" />
          Funding Readiness & Loans
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Your AI-verified eligibility status and curated loan offers from our lending partners.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column: Readiness Status (Takes up 1/3) */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Readiness Status</h2>
          
          <div className="flex flex-col items-center justify-center py-6 border-b border-slate-100">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
              <ShieldCheck className="h-12 w-12 text-blue-600" />
              {fundingData.isEligible && (
                <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 border-4 border-white">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              {fundingData.isEligible ? 'Ready for Funding' : 'Needs Improvement'}
            </h3>
            <p className="mt-1 text-sm text-slate-500">Default Risk: <span className="font-semibold text-green-600">{fundingData.defaultRisk}</span></p>
          </div>

          <div className="mt-6 space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">Eligibility Factors</h4>
            <ul className="space-y-3">
              {fundingData.factors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  {factor.status === 'pass' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  ) : factor.status === 'warn' ? (
                    <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    </div>
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                  )}
                  <div>
                    <span className="block font-medium text-slate-700">{factor.name}</span>
                    <span className="block text-xs text-slate-500">{factor.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Loan Offers Marketplace (Takes up 2/3) */}
        <div className="flex flex-col lg:col-span-2 space-y-6">
          
          {/* Top Banner indicating pre-approval amount */}
          <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-md flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Estimated Maximum Approval</p>
              <h2 className="text-3xl font-extrabold tracking-tight">{fundingData.maxLoanAmount}</h2>
            </div>
            <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Lender Offers List */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex-1">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Matched Loan Offers</h2>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                {loanOffers.length} Offers Available
              </span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {loanOffers.map((offer) => (
                <div key={offer.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50 transition-colors gap-4">
                  
                  {/* Lender Info */}
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${offer.logo}`}>
                      <Building className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{offer.lender}</h3>
                      <p className="text-sm font-medium text-slate-500">{offer.type}</p>
                    </div>
                  </div>

                  {/* Loan Terms */}
                  <div className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-8">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 uppercase tracking-wide">Amount</span>
                      <span className="text-sm font-bold text-slate-900">{offer.amount}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 uppercase tracking-wide">Rate</span>
                      <span className="text-sm font-bold text-slate-900">{offer.rate}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 uppercase tracking-wide">Term</span>
                      <span className="text-sm font-bold text-slate-900">{offer.term}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
                      Apply <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Funding;