import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { mockApi } from '../services/mockApi';

const HealthReport: React.FC = () => {
  const [reportData, setReportData] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        // Fetch historical data from mock backend
        const response = await mockApi.getHealthHistory();
        
        // Grab the most recent report (index 0)
        if (response.data && response.data.length > 0) {
          const latestReport = response.data[0];
          
          // Map the backend structure to our UI structure
          setReportData({
            score: latestReport.overall_score,
            status: latestReport.health_category,
            metrics: [
              { label: 'Growth Potential', value: latestReport.growth_potential, level: latestReport.growth_potential > 70 ? 'High' : 'Moderate', color: 'bg-green-500' },
              { label: 'Operational Efficiency', value: latestReport.operational_efficiency, level: 'Moderate', color: 'bg-yellow-500' },
              { label: 'Funding Readiness', value: latestReport.funding_readiness, level: latestReport.funding_readiness > 70 ? 'Ready' : 'Not Ready', color: 'bg-orange-500' },
              { label: 'Compliance Risk', value: latestReport.compliance_risk, level: latestReport.compliance_risk < 30 ? 'Low' : 'High', color: 'bg-slate-300' },
            ],
            // Map the JSON array of insights from the database
            insights: (latestReport.ai_insights || []).map((insight: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
              icon: insight.triggered ? AlertTriangle : CheckCircle2,
              title: insight.flag.replace('_', ' ').toUpperCase(),
              desc: `AI flagged this metric based on your current data.`,
              type: insight.triggered ? 'warning' : 'positive'
            }))
          });
        }
      } catch (error) {
        console.error("Error fetching health report:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 animate-pulse">
        <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3"></div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        </div>
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <ShieldCheck className="h-10 w-10 text-slate-300 mb-4" />
        <p>No health data available. Please complete your business profile setup.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
          <Activity className="h-6 w-6 text-orange-600" />
          Business Health Report
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          AI-generated insights based on your latest financial and operational data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        
        {/* Left Column: The Big Score Card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-primary)] bg-[var(--card-bg)] p-8 shadow-sm transition-colors duration-300">
          <h2 className="mb-6 text-lg font-semibold text-[var(--text-primary)]">Overall Health Score</h2>
          
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
              <span className="text-5xl font-extrabold text-[var(--text-primary)]">{reportData.score}</span>
              <span className="mt-1 rounded-full bg-green-100 dark:bg-green-900/40 px-3 py-0.5 text-xs font-bold tracking-wide text-green-700 dark:text-green-400">
                {reportData.status}
              </span>
            </div>
          </div>

          <div className="mt-8 flex w-full justify-around text-sm text-[var(--text-secondary)] border-t border-[var(--border-primary)] pt-6">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Full Report</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Clear Insights</span>
          </div>
        </div>

        {/* Right Column: Metric Bars */}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--card-bg)] p-8 shadow-sm transition-colors duration-300">
          <h2 className="mb-6 text-lg font-semibold text-[var(--text-primary)]">Performance Breakdown</h2>
          
          <div className="space-y-6">
            {reportData.metrics.map((metric: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
              <div key={metric.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--text-secondary)]">{metric.label}</span>
                  <span className="font-semibold text-[var(--text-primary)]">{metric.level}</span>
                </div>
                {/* The Progress Bar Container */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--bg-secondary)]">
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

      {/* Bottom Section: AI Insights */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--card-bg)] shadow-sm overflow-hidden transition-colors duration-300">
        <div className="border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] px-6 py-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">AI Risk & Opportunity Analysis</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {reportData.insights.length > 0 ? (
            reportData.insights.map((insight: any, idx: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
              <div key={idx} className="flex items-start gap-4 p-6 hover:bg-[var(--bg-secondary)] transition-colors">
                <div className={`mt-1 rounded-full p-2 ${
                  insight.type === 'positive' ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400'
                }`}>
                  <insight.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{insight.title}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{insight.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-slate-500">No specific flags detected at this time.</div>
          )}
        </div>
      </div>

    </div>
  );
};

export default HealthReport;