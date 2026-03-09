import React, { useState, useEffect, useCallback } from 'react';
import { Activity, BellRing, Landmark, ArrowRight, Clock, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { analyticsAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

const DashboardPage: React.FC = () => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    healthScore: 0,
    activeAlerts: 0,
    fundingStatus: 'Evaluating',
  });
  const [recentHistory, setRecentHistory] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await analyticsAPI.getHealthHistory();
      
      if (response.data && response.data.length > 0) {
        const latestReport = response.data[0];
        
        setDashboardData({
          healthScore: latestReport.overall_score,
          activeAlerts: latestReport.ai_insights ? latestReport.ai_insights.length : 0,
          fundingStatus: latestReport.funding_readiness >= 70 ? 'Ready' : 'Needs Work',
        });

        setRecentHistory(response.data.slice(0, 5));
      }
    } catch (error) {
      console.error("Failed to load dashboard metrics:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Handler for the manual trigger button
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await analyticsAPI.generateInsights();
      await fetchDashboardData();
      addToast("Analysis complete. Dashboard updated.", "success");
    } catch (error) {
      console.error("Failed to generate new report:", error);
      addToast("Failed to run a new scan. Please try again later.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Activity className="h-10 w-10 animate-pulse text-blue-500 mb-4" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Page Header & Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Your latest business intelligence metrics.</p>
        </div>
        
        <button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Running Scan...' : 'Run New AI Scan'}
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Health Score Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Overall Health Score</h3>
            <Activity className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-4 text-4xl font-extrabold text-slate-900">
            {dashboardData.healthScore}
            <span className="text-xl text-slate-400 font-medium">/100</span>
          </p>
          <Link to="/dashboard/health" className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500">
            View full report <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Alerts Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Active Risk Alerts</h3>
            <BellRing className={`h-5 w-5 ${dashboardData.activeAlerts > 0 ? 'text-orange-500' : 'text-slate-300'}`} />
          </div>
          <p className="mt-4 text-4xl font-extrabold text-slate-900">
            {dashboardData.activeAlerts}
          </p>
          <Link to="/dashboard/alerts" className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500">
            Review alerts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Funding Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Funding Match</h3>
            <Landmark className="h-5 w-5 text-blue-500" />
          </div>
          <p className={`mt-4 text-3xl font-bold ${dashboardData.fundingStatus === 'Ready' ? 'text-blue-600' : 'text-slate-700'}`}>
            {dashboardData.fundingStatus}
          </p>
          <Link to="/dashboard/funding" className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500">
            Explore loan offers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
      
      {/* Recent Activity Section */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-100">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Historical Scans & Activity</h2>
        </div>
        
        {recentHistory.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {recentHistory.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">AI Health Scan Completed</p>
                    <p className="text-xs text-slate-500">
                      {new Date(record.generated_at).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">Score: {record.overall_score}</p>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {record.health_category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">
            <p className="mt-2 text-sm">No recent activity detected.</p>
            <p className="text-xs mt-1">Generate a new health report to see your history here.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;