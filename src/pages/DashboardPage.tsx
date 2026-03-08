import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards to show layout */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Overall Health Score</h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">78<span className="text-lg text-slate-500 font-normal">/100</span></p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Active Alerts</h3>
          <p className="mt-2 text-3xl font-bold text-orange-600">2</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Funding Match</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">Ready</p>
        </div>
      </div>
      
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm min-h-[400px]">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        <p className="mt-2 text-sm text-slate-500">Connect your data sources to see AI insights here.</p>
      </div>
    </div>
  );
};

export default DashboardPage;