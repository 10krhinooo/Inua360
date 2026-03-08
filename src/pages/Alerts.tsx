import React, { useState } from 'react';
import { 
  BellRing, 
  TrendingDown, 
  PackageMinus, 
  TrendingUp, 
  CheckCircle2, 
  Settings2,
  AlertCircle
} from 'lucide-react';

// Mock data representing the alerts fetched from your Django backend
const initialAlerts = [
  {
    id: 1,
    type: 'critical',
    category: 'sales',
    title: 'Sales Drop Alert!',
    message: 'Revenue has dropped by 15% compared to the same week last month. Investigate recent marketing campaign performance.',
    time: '2 hours ago',
    icon: TrendingDown,
    isResolved: false,
  },
  {
    id: 2,
    type: 'warning',
    category: 'inventory',
    title: 'Inventory Low Warning!',
    message: 'Stock for "Premium Widget" is below the 10-day safety threshold. Reorder soon to prevent stockouts.',
    time: '5 hours ago',
    icon: PackageMinus,
    isResolved: false,
  },
  {
    id: 3,
    type: 'critical',
    category: 'expenses',
    title: 'Cost Surge Detected!',
    message: 'Unexpected 22% spike in operational costs detected this week. Review vendor invoices.',
    time: '1 day ago',
    icon: TrendingUp,
    isResolved: false,
  },
  {
    id: 4,
    type: 'info',
    category: 'compliance',
    title: 'Tax Filing Approaching',
    message: 'Q3 VAT returns are due in 14 days. Ensure all records are updated.',
    time: '2 days ago',
    icon: AlertCircle,
    isResolved: true,
  },
];

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleResolve = (id: number) => {
    // TODO: Send a PATCH request to Django to mark the alert as resolved in the database
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isResolved: true } : alert
    ));
  };

  // Helper function to determine colors based on alert severity
  const getAlertStyles = (type: string, isResolved: boolean) => {
    if (isResolved) return 'border-slate-200 bg-slate-50 opacity-60';
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50/50';
      case 'warning': return 'border-orange-500 bg-orange-50/50';
      case 'info': return 'border-blue-500 bg-blue-50/50';
      default: return 'border-slate-200 bg-white';
    }
  };

  const getIconStyles = (type: string, isResolved: boolean) => {
    if (isResolved) return 'text-slate-400 bg-slate-100';
    switch (type) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const activeAlertsCount = alerts.filter(a => !a.isResolved).length;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <BellRing className="h-6 w-6 text-orange-500" />
            Smart Alerts & Monitoring
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time tracking of your business health metrics and risks.
          </p>
        </div>
        
        {/* Actions Menu */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
            {activeAlertsCount} Active Alerts
          </span>
          <button className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors">
            <Settings2 className="h-4 w-4 text-slate-500" />
            Alert Settings
          </button>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`relative flex flex-col sm:flex-row gap-4 sm:items-start rounded-xl border-l-4 border-y border-r border-y-slate-200 border-r-slate-200 p-5 shadow-sm transition-all ${getAlertStyles(alert.type, alert.isResolved)}`}
          >
            {/* Icon */}
            <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconStyles(alert.type, alert.isResolved)}`}>
              <alert.icon className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <h3 className={`text-base font-semibold ${alert.isResolved ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                  {alert.title}
                </h3>
                <span className="whitespace-nowrap text-xs font-medium text-slate-500">
                  {alert.time}
                </span>
              </div>
              <p className={`mt-1 text-sm ${alert.isResolved ? 'text-slate-400' : 'text-slate-600'}`}>
                {alert.message}
              </p>
            </div>

            {/* Action Buttons */}
            {!alert.isResolved && (
              <div className="mt-4 flex shrink-0 items-center gap-3 sm:mt-0 sm:flex-col sm:items-end">
                <button 
                  onClick={() => handleResolve(alert.id)}
                  className="flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Resolve
                </button>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Investigate →
                </button>
              </div>
            )}
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-500 mb-3" />
            <h3 className="text-lg font-semibold text-slate-900">All Clear!</h3>
            <p className="mt-1 text-sm text-slate-500">No active alerts. Your business is running smoothly.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Alerts;