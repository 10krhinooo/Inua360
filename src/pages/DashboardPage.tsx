import React, { useState, useEffect, useCallback } from 'react';
import { Activity, BellRing, Landmark, ArrowRight, Clock, RefreshCw, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { analyticsAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
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
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [fetchDashboardData, navigate]);

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
      <div className="flex flex-col items-center justify-center h-[60vh] text-[var(--text-secondary)]">
        <Activity className="h-10 w-10 animate-pulse text-[#F07B20] mb-4" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Page Header & Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm border border-[var(--border-primary)] transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] px-1">Overview</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)] px-1">Welcome back. Track your business growth metrics.</p>
        </div>
        
        <button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="flex items-center gap-2 rounded-xl bg-[#0f172a] px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Running Scan...' : 'Run New AI Scan'}
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Health Score Card */}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--card-bg)] p-6 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-orange-100 dark:hover:border-orange-500/20 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-50/50 dark:bg-green-500/10 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">Health Score</h3>
              <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg">
                <Activity className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <p className="mt-4 text-5xl font-black text-[var(--text-primary)]">
              {dashboardData.healthScore}
              <span className="text-xl text-[var(--text-secondary)] opacity-30 font-bold">/100</span>
            </p>
            <div className="mt-2 text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                <TrendingUp size={12} /> +2.5% this month
            </div>
          </div>
          <Link to="/dashboard/health" className="mt-4 flex items-center gap-1 text-sm font-bold text-[#F07B20] hover:translate-x-1 transition-transform relative z-10">
            View full report <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Alerts Card */}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--card-bg)] p-6 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-orange-100 dark:hover:border-orange-500/20 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-50/50 dark:bg-orange-500/10 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">Risk Alerts</h3>
              <div className={`p-2 rounded-lg ${dashboardData.activeAlerts > 0 ? 'bg-orange-50 dark:bg-orange-500/20' : 'bg-slate-50 dark:bg-slate-800'}`}>
                <BellRing className={`h-5 w-5 ${dashboardData.activeAlerts > 0 ? 'text-orange-500' : 'text-slate-300'}`} />
              </div>
            </div>
            <p className="mt-4 text-5xl font-black text-[var(--text-primary)]">
              {dashboardData.activeAlerts}
            </p>
          </div>
          <Link to="/dashboard/alerts" className="mt-4 flex items-center gap-1 text-sm font-bold text-[#F07B20] hover:translate-x-1 transition-transform relative z-10">
            Review alerts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Funding Card */}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--card-bg)] p-6 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-orange-100 dark:hover:border-orange-500/20 transition-all duration-300 relative overflow-hidden group">
           <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-50/50 dark:bg-blue-500/10 transition-transform group-hover:scale-110"></div>
           <div className="relative z-10">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">Funding Match</h3>
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                <Landmark className="h-5 w-5 text-blue-500" />
                </div>
            </div>
            <p className={`mt-4 text-4xl font-black ${dashboardData.fundingStatus === 'Ready' ? 'text-[#F07B20]' : 'text-[var(--text-primary)] opacity-70'}`}>
                {dashboardData.fundingStatus}
            </p>
          </div>
          <Link to="/dashboard/funding" className="mt-4 flex items-center gap-1 text-sm font-bold text-[#F07B20] hover:translate-x-1 transition-transform relative z-10">
            Explore offers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
      
      {/* Recent Activity Section */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--card-bg)] shadow-sm overflow-hidden min-h-[300px]">
        <div className="border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] px-6 py-5">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Recent Activity & Scans</h2>
        </div>
        
        {recentHistory.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {recentHistory.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-6 hover:bg-[var(--bg-secondary)] transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10 group-hover:bg-[var(--card-bg)] transition-colors border border-orange-100/30">
                    <Clock className="h-5 w-5 text-[var(--text-secondary)] group-hover:text-[#F07B20] transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">AI Health Scan Completed</p>
                    <p className="text-xs font-medium text-[var(--text-secondary)] opacity-60">
                      {new Date(record.generated_at).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[var(--text-primary)]">{record.overall_score}%</p>
                  <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                    record.overall_score >= 80 ? 'bg-green-50 text-green-700 border-green-100' : 
                    record.overall_score >= 60 ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                    'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    {record.health_category || 'Evaluated'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <Clock className="h-12 w-12 mb-4 opacity-20" />
            <p className="font-bold">No activity history</p>
            <p className="text-sm">Run a scan to see your business growth data.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;
