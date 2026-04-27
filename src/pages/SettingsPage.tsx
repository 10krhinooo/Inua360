import { useState, useEffect } from 'react';
import { 
  Sun, Moon, Globe, 
  Smartphone, Share2, 
  ShieldCheck, Download, 
  LogOut, Wallet, 
  MessageSquare, Bell,
  RefreshCw, CheckCircle2,
  Plus
} from 'lucide-react';
import { analyticsAPI, type AlertPreferences } from '../services/api';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../context/useTheme';

function SettingsToggle({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${active ? 'bg-[#F07B20]' : 'bg-[var(--border-primary)] opacity-40'}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
}

const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [profileId, setProfileId] = useState<number | null>(null);
  const [language, setLanguage] = useState<'English' | 'Swahili'>('English');
  const [quickLog, setQuickLog] = useState(true);

  const [channels, setChannels] = useState({
    whatsapp: true,
    webapp: true,
    ussd: false,
    sms: true
  });

  const [notifications, setNotifications] = useState({
    actions: true,
    compliance: true,
    funding: true,
    cashflow: false
  });

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await analyticsAPI.getProfile();
        if (response.data && response.data.length > 0) {
          const profile = response.data[0];
          setProfileId(profile.id);
          if (profile.alert_preferences) {
            setNotifications(prev => ({ ...prev, ...profile.alert_preferences.categories }));
            setChannels(prev => ({ ...prev, ...profile.alert_preferences.channels }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchSettings();
  }, []);

  // Save settings helper
  const saveSettings = async (
    newNotifications: typeof notifications,
    newChannels: typeof channels,
  ) => {
    if (!profileId) return;
    try {
      await analyticsAPI.updateProfile(profileId, {
        alert_preferences: {
          // UI uses a different key set than the API type; payload is passed through as before
          categories: newNotifications as unknown as AlertPreferences['categories'],
          channels: newChannels
        }
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="pt-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] px-1">Settings</h1>
        <p className="text-[var(--text-secondary)] font-medium px-1 opacity-70">Control your app and agents</p>
      </div>

      {/* Appearance Section */}
      <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border-primary)] shadow-sm overflow-hidden transition-all duration-300">
        <div className="p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl">
              <Sun className="h-6 w-6 text-[#F07B20]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Appearance</h2>
              <p className="text-sm text-[var(--text-secondary)] font-medium opacity-60">Customize how the app looks</p>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
              <div className="flex items-center gap-4">
                <Globe className="h-5 w-5 text-[var(--text-secondary)] opacity-40" />
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-[var(--text-primary)]">Language</span>
                    <span className="text-[10px] text-[var(--text-secondary)] font-bold opacity-40 uppercase tracking-wider">Choose your language</span>
                </div>
              </div>
              <div className="flex bg-[var(--bg-primary)] p-1.5 rounded-xl border border-[var(--border-primary)]">
                <button 
                  onClick={() => setLanguage('English')}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${language === 'English' ? 'bg-[#F07B20] text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('Swahili')}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${language === 'Swahili' ? 'bg-[#F07B20] text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  Swahili
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
              <div className="flex items-center gap-4">
                <Moon className="h-5 w-5 text-[var(--text-secondary)] opacity-40" />
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-[var(--text-primary)]">Dark Mode</span>
                    <span className="text-[10px] text-[var(--text-secondary)] font-bold opacity-40 uppercase tracking-wider">Switch to dark appearance</span>
                </div>
              </div>
              <SettingsToggle active={theme === 'dark'} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </div>

      {/* Connected Accounts Section */}
      <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border-primary)] shadow-sm overflow-hidden transition-all duration-300">
        <div className="p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-50 dark:bg-cyan-500/10 rounded-2xl">
              <Share2 className="h-6 w-6 text-cyan-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Connected Accounts</h2>
              <p className="text-sm text-[var(--text-secondary)] font-medium opacity-60">Manage your financial connections</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-cyan-50/30 dark:bg-cyan-500/5 border border-cyan-100 dark:border-cyan-500/20">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 bg-[var(--card-bg)] rounded-2xl flex items-center justify-center border border-cyan-100 dark:border-cyan-500/20 shadow-sm">
                    <Smartphone className="h-7 w-7 text-cyan-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-[var(--text-primary)]">M-Pesa</span>
                        <span className="inline-flex items-center gap-1.5 bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-cyan-500/20">
                            <CheckCircle2 size={12} /> Connected
                        </span>
                    </div>
                    <p className="text-xs font-bold text-[var(--text-secondary)] opacity-60 mt-1">Till 403321 - Personal 07xxxxxxxx</p>
                    <p className="text-[10px] font-bold text-[#F07B20] uppercase tracking-widest flex items-center gap-2 mt-1.5">
                        <RefreshCw size={12} className="animate-spin-slow" /> Live Syncing
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-[var(--card-bg)] border border-[var(--border-primary)] text-[var(--text-primary)] py-3 rounded-2xl text-xs font-bold hover:bg-[var(--bg-secondary)] transition-all shadow-sm">
                  Manual Sync
                </button>
                <button className="px-8 bg-red-500 text-white py-3 rounded-2xl text-xs font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
                  Disconnect
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 rounded-3xl border-2 border-dashed border-[var(--border-primary)] opacity-60 hover:opacity-100 transition-all cursor-pointer group">
              <div className="flex items-center gap-5 text-[var(--text-secondary)]">
                <div className="h-14 w-14 flex items-center justify-center border border-[var(--border-primary)] rounded-2xl bg-[var(--bg-secondary)]">
                    <Wallet size={24} className="opacity-40" />
                </div>
                <div>
                    <p className="text-lg font-bold">Equity Bank</p>
                    <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Connect for business data</p>
                </div>
              </div>
              <button className="bg-[var(--card-bg)] border border-[var(--border-primary)] text-[var(--text-primary)] px-6 py-2.5 rounded-2xl text-xs font-bold hover:bg-[var(--bg-secondary)] transition-all flex items-center gap-2 shadow-sm">
                <Plus size={16} /> Connect Account
              </button>
            </div>

            <div className="flex items-center justify-between p-4 px-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[var(--text-primary)]">Daily Cash Logs</span>
                <span className="text-[10px] text-[var(--text-secondary)] font-bold opacity-40 uppercase tracking-widest">Ask me to log cash sales via WhatsApp</span>
              </div>
              <SettingsToggle active={quickLog} onToggle={() => setQuickLog(!quickLog)} />
            </div>
          </div>
        </div>
      </div>

      {/* Communication Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-[#F07B20]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Communication Channels</h2>
              <p className="text-sm text-slate-500 font-medium">Control how you interact with Inua</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {[
                { id: 'whatsapp', name: 'WhatsApp Bot', desc: '95% of interactions' },
                { id: 'webapp', name: 'Web App', desc: '4% - Weekly oversight' },
                { id: 'ussd', name: 'USSD Fallback', desc: '1% - No data access' },
                { id: 'sms', name: 'SMS Alerts', desc: 'Critical notifications only' }
            ].map(channel => (
                <div key={channel.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                            <MessageSquare size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700">{channel.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{channel.desc}</span>
                        </div>
                    </div>
                    <SettingsToggle 
                        active={channels[channel.id as keyof typeof channels]} 
                        onToggle={() => {
                            const newChannels = {...channels, [channel.id]: !channels[channel.id as keyof typeof channels]};
                            setChannels(newChannels);
                            saveSettings(notifications, newChannels);
                        }} 
                    />
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border-primary)] shadow-sm overflow-hidden transition-all duration-300">
        <div className="p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-2xl">
              <Bell className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Smart Alerts</h2>
              <p className="text-sm text-[var(--text-secondary)] font-medium opacity-60">Control what notifications our agents send</p>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            {[
                { id: 'actions', name: 'Agent Activity', desc: 'Real-time updates on what our AI is doing' },
                { id: 'compliance', name: 'Compliance Guards', desc: 'When licenses or documents need attention' },
                { id: 'funding', name: 'Funding Matches', desc: 'New loan or grant opportunities discovered' },
                { id: 'cashflow', name: 'Cashflow Radar', desc: 'AI-predicted gaps in your business balance' }
            ].map(notif => (
                <div key={notif.id} className="flex items-center justify-between p-4 px-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-[var(--text-primary)]">{notif.name}</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-bold opacity-40 uppercase tracking-widest">{notif.desc}</span>
                    </div>
                    <SettingsToggle 
                        active={notifications[notif.id as keyof typeof notifications]} 
                        onToggle={() => {
                            const newNotifs = {...notifications, [notif.id]: !notifications[notif.id as keyof typeof notifications]};
                            setNotifications(newNotifs);
                            saveSettings(newNotifs, channels);
                        }} 
                    />
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy & Data Section */}
      <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border-primary)] shadow-sm overflow-hidden transition-all duration-300">
        <div className="p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl">
              <ShieldCheck className="h-6 w-6 text-[#F07B20]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Data Governance</h2>
              <p className="text-sm text-[var(--text-secondary)] font-medium opacity-60">Your business records are encrypted</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-between p-4 px-6 text-sm font-bold text-[var(--text-primary)] border border-[var(--border-primary)] rounded-2xl bg-[var(--bg-secondary)] hover:border-[#F07B20] transition-all group">
              <span>Privacy Guardrails</span>
              <Plus className="h-4 w-4 rotate-45 text-[var(--text-secondary)] opacity-40 group-hover:text-[#F07B20] transition-all" />
            </button>
            <button className="flex items-center justify-between p-4 px-6 text-sm font-bold text-[var(--text-primary)] border border-[var(--border-primary)] rounded-2xl bg-[var(--bg-secondary)] hover:border-[#F07B20] transition-all group">
              <span>GDPR/DPA Consent</span>
              <Plus className="h-4 w-4 rotate-45 text-[var(--text-secondary)] opacity-40 group-hover:text-[#F07B20] transition-all" />
            </button>
            <button className="sm:col-span-2 flex items-center justify-center gap-3 p-4 text-xs font-bold text-white uppercase tracking-widest bg-[var(--text-primary)] rounded-2xl hover:opacity-90 transition-all mt-2 shadow-lg dark:shadow-none">
              <Download size={16} /> Export Business Audit Trail
            </button>
          </div>
        </div>
      </div>

      {/* Add to Home Card */}
      <div className="bg-orange-50/10 dark:bg-orange-500/5 rounded-3xl border-2 border-orange-100/50 dark:border-orange-500/10 p-8 space-y-6 transition-all duration-300">
        <div className="flex items-center gap-5">
            <div className="p-4 bg-[var(--card-bg)] rounded-3xl shadow-sm border border-orange-100/50 dark:border-orange-500/10">
                <Download className="h-7 w-7 text-[#F07B20]" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Inua Mobile</h2>
                <p className="text-sm text-[var(--text-secondary)] font-medium opacity-60">Install our PWA for daily agent logs</p>
            </div>
        </div>
        <button className="w-full bg-[#F07B20] text-white py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:bg-orange-700 transition-all flex items-center justify-center gap-3 active:scale-95">
            <Download size={20} /> Install Application
        </button>
      </div>

      {/* Logout Footer */}
      <div className="pt-12 flex flex-col items-center gap-8">
        <div className="text-center opacity-40">
            <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-[0.2em]">Inua 360 Ecosystem v1.0.0</p>
            <p className="text-[var(--text-secondary)] text-[10px] font-bold mt-2">Nairobi, Kenya 🇰🇪</p>
        </div>
        <button 
            onClick={handleLogout}
            className="flex items-center gap-4 bg-red-500 text-white px-10 py-4 rounded-3xl font-bold text-xs uppercase tracking-[0.15em] shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
        >
            <LogOut size={20} /> Terminate Session
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
