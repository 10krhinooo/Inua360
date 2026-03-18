import React, { useState, useEffect } from 'react';
import { 
  BellRing, TrendingDown, PackageMinus, TrendingUp, 
  CheckCircle2, Settings2, AlertCircle, Activity, X, Mail
} from 'lucide-react';
import { analyticsAPI, type AlertPreferences } from '../services/api';

const iconMap: Record<string, React.ElementType> = {
  sales: TrendingDown,
  inventory: PackageMinus,
  expenses: TrendingUp,
  compliance: AlertCircle,
  system: BellRing,
};

// Default preferences if the backend JSON is empty
const defaultPreferences = {
  email_notifications: true,
  categories: {
    sales: true,
    inventory: true,
    expenses: true,
    compliance: true,
    system: true,
  }
};

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(true);
  
  // Settings Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileId, setProfileId] = useState<number | null>(null);
  // const [preferences, setPreferences] = useState(defaultPreferences);
  const [preferences, setPreferences] = useState<AlertPreferences>({
    email_notifications: true,
    categories: {
      sales: true,
      inventory: true,
      expenses: true,
      compliance: true,
      system: true,
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Alerts
        const alertsResponse = await analyticsAPI.getAlerts();
        setAlerts(alertsResponse.data);

        // Fetch Profile to get current Alert Preferences
        const profileResponse = await analyticsAPI.getProfile();
        if (profileResponse.data && profileResponse.data.length > 0) {
          const profile = profileResponse.data[0];
          setProfileId(profile.id);
          
          // Merge backend preferences with defaults to ensure all keys exist
          if (profile.alert_preferences && Object.keys(profile.alert_preferences).length > 0) {
            setPreferences({ ...defaultPreferences, ...profile.alert_preferences });
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleResolve = async (id: number) => {
    try {
      await analyticsAPI.resolveAlert(id);
      setAlerts(alerts.map(alert => 
        alert.id === id ? { ...alert, is_resolved: true } : alert
      ));
    } catch (error) {
      console.error("Failed to resolve alert:", error);
    }
  };

  const handleSaveSettings = async () => {
    if (!profileId) return;
    setIsSaving(true);
    try {
      // Patch the BusinessProfile with the new JSON preferences
      await analyticsAPI.updateProfile(profileId, { 
        alert_preferences: preferences 
      });
      setIsSettingsOpen(false);
    } catch (error) {
      console.error("Failed to save preferences:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle helper function for the categories
  const toggleCategory = (category: keyof typeof preferences.categories) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

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

  const activeAlertsCount = alerts.filter(a => !a.is_resolved).length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Activity className="h-10 w-10 animate-pulse text-orange-500 mb-4" />
        <p>Loading your active alerts...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 relative">
      
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
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
          >
            <Settings2 className="h-4 w-4 text-slate-500" />
            Alert Settings
          </button>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const AlertIcon = iconMap[alert.category] || BellRing; 
          return (
            <div key={alert.id} className={`relative flex flex-col sm:flex-row gap-4 sm:items-start rounded-xl border-l-4 border-y border-r border-y-slate-200 border-r-slate-200 p-5 shadow-sm transition-all ${getAlertStyles(alert.type, alert.is_resolved)}`}>
              <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconStyles(alert.type, alert.is_resolved)}`}>
                <AlertIcon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className={`text-base font-semibold ${alert.is_resolved ? 'text-slate-500 line-through' : 'text-slate-900'}`}>{alert.title}</h3>
                  <span className="whitespace-nowrap text-xs font-medium text-slate-500">{alert.time}</span>
                </div>
                <p className={`mt-1 text-sm ${alert.is_resolved ? 'text-slate-400' : 'text-slate-600'}`}>{alert.message}</p>
              </div>
              {!alert.is_resolved && (
                <div className="mt-4 flex shrink-0 items-center gap-3 sm:mt-0 sm:flex-col sm:items-end">
                  <button onClick={() => handleResolve(alert.id)} className="flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Resolve
                  </button>
                  <button className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">Investigate →</button>
                </div>
              )}
            </div>
          );
        })}

        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-500 mb-3" />
            <h3 className="text-lg font-semibold text-slate-900">All Clear!</h3>
            <p className="mt-1 text-sm text-slate-500">No active alerts. Your business is running smoothly.</p>
          </div>
        )}
      </div>

      {/* Settings Modal Overlay */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Delivery Methods */}
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-4">Delivery Methods</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                      <p className="text-xs text-slate-500">Receive critical alerts in your inbox</p>
                    </div>
                  </div>
                  {/* Tailwind Toggle Switch */}
                  <button 
                    onClick={() => setPreferences(prev => ({ ...prev, email_notifications: !prev.email_notifications }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${preferences.email_notifications ? 'bg-orange-500' : 'bg-slate-200'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${preferences.email_notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>

              {/* Alert Categories */}
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-4">Trigger Categories</h3>
                <div className="space-y-4">
                  {Object.entries(preferences.categories).map(([key, isActive]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-slate-700 capitalize">{key} Alerts</span>
                      <button 
                        onClick={() => toggleCategory(key as keyof typeof preferences.categories)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isActive ? 'bg-orange-500' : 'bg-slate-200'}`}
                      >
                        <span className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex justify-end gap-3">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-md transition-colors disabled:opacity-70"
              >
                {isSaving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Alerts;