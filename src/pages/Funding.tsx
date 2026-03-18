import React, { useState, useEffect } from 'react';
import { 
  Landmark, CheckCircle2, XCircle, DollarSign, 
  Building, ArrowRight, ShieldCheck, Activity, AlertTriangle
} from 'lucide-react';
import { analyticsAPI } from '../services/api';

const Funding: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fundingData, setFundingData] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Hardcoded for now, but these could eventually come from a Django Lender model
  const baseLoanOffers = [
    { id: 1, lender: 'Equity Bank', type: 'SME Expansion Loan', amount: 'KSh 2.5M', rate: '13%', term: '36 Months', logo: 'bg-red-100 text-red-600', minScore: 80 },
    { id: 2, lender: 'KCB Bank', type: 'Working Capital', amount: 'KSh 1.0M', rate: '12.5%', term: '12 Months', logo: 'bg-green-100 text-green-600', minScore: 70 },
    { id: 3, lender: 'Inua360 Capital', type: 'Fast-Track Invoice Financing', amount: 'KSh 500K', rate: '5% flat', term: '90 Days', logo: 'bg-orange-100 text-orange-600', minScore: 50 },
  ];

  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        // Fetch both History and Profile in parallel for speed
        const [historyRes, profileRes] = await Promise.all([
          analyticsAPI.getHealthHistory(),
          analyticsAPI.getProfile()
        ]);

        if (historyRes.data.length > 0 && profileRes.data.length > 0) {
          const latestHistory = historyRes.data[0];
          const profile = profileRes.data[0];

          // 1. Determine base eligibility and risk
          const isEligible = latestHistory.funding_readiness >= 70;
          let defaultRisk = 'Low';
          if (latestHistory.compliance_risk > 15) defaultRisk = 'Medium';
          if (latestHistory.compliance_risk > 30) defaultRisk = 'High';

          // 2. Dynamically calculate max loan amount based on their actual revenue and AI score
          // E.g., Max loan is 20% of annual revenue, scaled by their health score percentage
          const calculatedMax = (profile.revenue * 0.20) * (latestHistory.overall_score / 100);
          
          // Format as currency (KSh)
          const formattedMaxLoan = new Intl.NumberFormat('en-KE', { 
            style: 'currency', 
            currency: 'KES',
            maximumFractionDigits: 0 
          }).format(calculatedMax || 0);

          // 3. Map out the factors using real data
          const factors = [
            { 
              name: 'Business Health', 
              status: latestHistory.overall_score >= 70 ? 'pass' : 'warn', 
              desc: `Current score is ${latestHistory.overall_score}/100` 
            },
            { 
              name: 'Tax Compliance', 
              status: profile.tax_registered ? 'pass' : 'fail', 
              desc: profile.tax_registered ? 'Verified and up to date' : 'KRA PIN missing or invalid' 
            },
            { 
              name: 'Default Risk', 
              status: latestHistory.compliance_risk < 20 ? 'pass' : 'warn', 
              desc: `AI calculated default probability: ${latestHistory.compliance_risk}%` 
            },
            { 
              name: 'Liquidity Buffer', 
              status: profile.bank_balance > (profile.revenue * 0.05) ? 'pass' : 'warn', 
              desc: 'Bank balance vs monthly operational costs' 
            },
          ];

          setFundingData({
            readinessScore: latestHistory.funding_readiness,
            isEligible,
            defaultRisk,
            maxLoanAmount: formattedMaxLoan,
            factors
          });
        }
      } catch (error) {
        console.error("Failed to load funding data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFundingData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Activity className="h-10 w-10 animate-pulse text-orange-600 mb-4" />
        <p>Analyzing lending eligibility...</p>
      </div>
    );
  }

  if (!fundingData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <AlertTriangle className="h-10 w-10 text-orange-300 mb-4" />
        <p>Please complete your business profile to unlock funding offers.</p>
      </div>
    );
  }

  // Filter available offers based on the user's readiness score
  const availableOffers = baseLoanOffers.filter(offer => fundingData.readinessScore >= offer.minScore);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Landmark className="h-6 w-6 text-orange-600" />
          Funding Readiness & Loans
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Your AI-verified eligibility status and curated loan offers from our lending partners.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column: Readiness Status */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Readiness Status</h2>
          
          <div className="flex flex-col items-center justify-center py-6 border-b border-slate-100">
            <div className={`relative flex h-24 w-24 items-center justify-center rounded-full ${fundingData.isEligible ? 'bg-orange-50' : 'bg-slate-50'}`}>
              <ShieldCheck className={`h-12 w-12 ${fundingData.isEligible ? 'text-orange-600' : 'text-slate-400'}`} />
              {fundingData.isEligible ? (
                <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 border-4 border-white">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              ) : (
                <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 border-4 border-white">
                  <XCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <h3 className="mt-4 text-2xl font-bold text-slate-900 text-center">
              {fundingData.isEligible ? 'Ready for Funding' : 'Needs Improvement'}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Default Risk: <span className={`font-semibold ${fundingData.defaultRisk === 'Low' ? 'text-green-600' : fundingData.defaultRisk === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{fundingData.defaultRisk}</span>
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">Eligibility Factors</h4>
            <ul className="space-y-3">
              {fundingData.factors.map((factor: any, idx: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
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

        {/* Right Column: Loan Offers Marketplace */}
        <div className="flex flex-col lg:col-span-2 space-y-6">
          
          {/* Top Banner indicating pre-approval amount */}
          <div className={`rounded-2xl p-6 text-white shadow-md flex items-center justify-between ${fundingData.isEligible ? 'bg-linear-to-r from-orange-500 to-orange-600' : 'bg-slate-800'}`}>
            <div>
              <p className={`${fundingData.isEligible ? 'text-orange-100' : 'text-slate-300'} text-sm font-medium mb-1`}>
                Estimated Maximum Approval
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight">
                {fundingData.isEligible ? fundingData.maxLoanAmount : 'KSh 0'}
              </h2>
            </div>
            <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Lender Offers List */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex-1">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Matched Loan Offers</h2>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${availableOffers.length > 0 ? 'bg-orange-100 text-orange-700' : 'bg-slate-200 text-slate-600'}`}>
                {availableOffers.length} Offers Available
              </span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {availableOffers.length > 0 ? (
                availableOffers.map((offer) => (
                  <div key={offer.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50 transition-colors gap-4">
                    
                    {/* Lender Info */}
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${offer.logo}`}>
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
                    <div className="shrink-0">
                      <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition-colors shadow-sm">
                        Apply <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                    
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-sm text-slate-500">Your current business health score does not meet the minimum requirements for our lending partners. Focus on improving your operational efficiency and compliance.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Funding;