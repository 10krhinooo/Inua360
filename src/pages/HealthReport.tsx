import React from 'react';
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

const HealthReport: React.FC = () => {
  // Mock data representing the response from your Django/FastAPI backend
  const reportData = {
    score: 78,
    status: 'GOOD',
    metrics: [
      { label: 'Growth Potential', value: 85, level: 'High', color: 'bg-green-500' },
      { label: 'Operational Efficiency', value: 60, level: 'Moderate', color: 'bg-yellow-500' },
      { label: 'Funding Readiness', value: 75, level: 'Ready', color: 'bg-orange-500' },
      { label: 'Compliance Risk', value: 20, level: 'Low', color: 'bg-slate-300' },
    ],
    // Mapping to the RISK_FLAG_COLS from app.py
    insights: [
      { icon: TrendingUp, title: 'Strong Cash Liquidity', desc: 'Your cash buffer is well above the industry average for your sector.', type: 'positive' },
      { icon: ShieldCheck, title: 'Tax Compliant', desc: 'All required tax clearances are uploaded and verified.', type: 'positive' },
      { icon: AlertTriangle, title: 'Moderate Debt Ratio', desc: 'Your current debt-to-equity ratio is creeping up. Monitor upcoming loan repayments.', type: 'warning' },
    ]
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          Business Health Report
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          AI-generated insights based on your latest financial and operational data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        
        {/* Left Column: The Big Score Card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">Overall Health Score</h2>
          
          {/* Circular SVG Gauge */}
          <div className="relative h-48 w-48">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
              {/* Background Circle */}
              <path
                className="text-slate-100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              {/* Progress Circle */}
              <path
                className="text-green-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${reportData.score}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center Text */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="text-5xl font-extrabold text-slate-900">{reportData.score}</span>
              <span className="mt-1 rounded-full bg-green-100 px-3 py-0.5 text-xs font-bold tracking-wide text-green-700">
                {reportData.status}
              </span>
            </div>
          </div>

          <div className="mt-8 flex w-full justify-around text-sm text-slate-600 border-t border-slate-100 pt-6">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Full Report</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Clear Insights</span>
          </div>
        </div>

        {/* Right Column: Metric Bars */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">Performance Breakdown</h2>
          
          <div className="space-y-6">
            {reportData.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{metric.label}</span>
                  <span className="font-semibold text-slate-900">{metric.level}</span>
                </div>
                {/* The Progress Bar Container */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  {/* The Colored Progress Fill */}
                  <div
                    className={`h-full rounded-full ${metric.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: AI Insights (Mapped from risk_flags) */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">AI Risk & Opportunity Analysis</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {reportData.insights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-4 p-6 hover:bg-slate-50 transition-colors">
              <div className={`mt-1 rounded-full p-2 ${
                insight.type === 'positive' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                <insight.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{insight.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{insight.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HealthReport;