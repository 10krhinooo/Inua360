import React, { useState, useEffect, useCallback } from 'react';
import { Activity, BellRing, Landmark, ArrowRight, Clock, RefreshCw, TrendingUp } from 'lucide-react';
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
        <Activity className="h-10 w-10 animate-pulse text-orange-500 mb-4" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Page Header & Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Welcome back! Here are your latest business intelligence metrics.</p>
        </div>
        
        <button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="flex items-center justify-center w-full sm:w-auto gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
        >
          <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Running Scan...' : 'Run New AI Scan'}
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Health Score Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all group">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-50 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-700">Health Score</h3>
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3 mr-1" /> +2.5%
              </span>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {dashboardData.healthScore}
                <span className="text-lg text-slate-400 font-medium ml-1">/100</span>
              </p>
            </div>
            <Link to="/dashboard/health" className="mt-5 inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 w-fit group-hover:underline">
              View full report <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all group">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-red-50 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <BellRing className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-700">Active Alerts</h3>
              </div>
              {dashboardData.activeAlerts > 0 && (
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {dashboardData.activeAlerts}
              </p>
            </div>
            <Link to="/dashboard/alerts" className="mt-5 inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 w-fit group-hover:underline">
              Review alerts <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Funding Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all group sm:col-span-2 lg:col-span-1">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-50 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Landmark className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-700">Funding Match</h3>
              </div>
            </div>
            <div>
              <p className={`text-3xl font-extrabold tracking-tight ${dashboardData.fundingStatus === 'Ready' ? 'text-green-600' : 'text-slate-700'}`}>
                {dashboardData.fundingStatus}
              </p>
            </div>
            <Link to="/dashboard/funding" className="mt-5 inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 w-fit group-hover:underline">
              Explore loan offers <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
      
      {/* Recent Activity Section */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-5">
          <h2 className="text-lg font-bold text-slate-900">Historical Scans & Activity</h2>
        </div>
        
        {recentHistory.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {recentHistory.map((record) => (
              <div key={record.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-orange-50/30 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900">AI Health Scan Completed</p>
                    <p className="text-sm text-slate-500">
                      {new Date(record.generated_at).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                  <p className="text-lg font-bold text-slate-900">
                    {record.overall_score} <span className="text-sm text-slate-400 font-normal">/100</span>
                  </p>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    record.health_category === 'Excellent' ? 'bg-green-100 text-green-700' :
                    record.health_category === 'Good' ? 'bg-blue-100 text-blue-700' :
                    record.health_category === 'Fair' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {record.health_category || 'Evaluated'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
              <Clock className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-base font-medium text-slate-900">No recent activity detected</p>
            <p className="text-sm mt-1 max-w-sm">Generate a new health report to see your history and track your business growth over time.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;