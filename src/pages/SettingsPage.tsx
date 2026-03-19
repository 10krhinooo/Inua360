import { useState } from 'react';
import { 
  Sun, Moon, Globe, 
  Smartphone, Share2, 
  ShieldCheck, Download, 
  LogOut, Wallet, 
  MessageSquare, Bell,
  RefreshCw, CheckCircle2,
  Plus
} from 'lucide-react';

const SettingsPage = () => {
  const [language, setLanguage] = useState<'English' | 'Swahili'>('English');
  const [darkMode, setDarkMode] = useState(false);
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

  const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${active ? 'bg-[#F07B20]' : 'bg-slate-200'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 px-1">Settings</h1>
        <p className="text-slate-500 font-medium px-1">Control your app and agents</p>
      </div>

      {/* Appearance Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Sun className="h-5 w-5 text-[#F07B20]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Appearance</h2>
              <p className="text-sm text-slate-500 font-medium">Customize how the app looks</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">Language</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-2">Choose your language</span>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => setLanguage('English')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${language === 'English' ? 'bg-[#F07B20] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('Swahili')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${language === 'Swahili' ? 'bg-[#F07B20] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Swahili
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-4 w-4 text-slate-400" />
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">Dark Mode</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Switch to dark appearance</span>
                </div>
              </div>
              <Toggle active={darkMode} onToggle={() => setDarkMode(!darkMode)} />
            </div>
          </div>
        </div>
      </div>

      {/* Connected Accounts Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-50 rounded-lg">
              <Share2 className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Connected Accounts</h2>
              <p className="text-sm text-slate-500 font-medium">Manage your financial connections</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-cyan-50/30 border border-cyan-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center border border-cyan-100 shadow-sm">
                    <Smartphone className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">M-Pesa</span>
                        <span className="inline-flex items-center gap-1 bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                            <CheckCircle2 size={10} /> Connected
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500">Till 403321 - Personal 07xxxxxxxx</p>
                    <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-0.5">
                        <RefreshCw size={10} className="animate-spin-slow" /> Last sync 2 mins ago
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
                  Sync Now
                </button>
                <button className="px-6 bg-red-500 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-red-600 transition-colors shadow-sm">
                  Revoke
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-slate-200">
              <div className="flex items-center gap-4 text-slate-400">
                <div className="h-10 w-10 flex items-center justify-center border border-slate-100 rounded-xl">
                    <Wallet size={20} />
                </div>
                <div>
                    <p className="font-bold text-slate-500">Equity Bank</p>
                    <p className="text-[10px] font-medium">Optional - for future plans</p>
                </div>
              </div>
              <button className="bg-white border border-slate-200 text-slate-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1">
                <Plus size={14} /> Connect
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700">Quick Log</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ask me to log cash sales daily</span>
              </div>
              <Toggle active={quickLog} onToggle={() => setQuickLog(!quickLog)} />
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
                    <Toggle 
                        active={channels[channel.id as keyof typeof channels]} 
                        onToggle={() => setChannels({...channels, [channel.id]: !channels[channel.id as keyof typeof channels]})} 
                    />
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <Bell className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
              <p className="text-sm text-slate-500 font-medium">Control what notifications you receive</p>
            </div>
          </div>

          <div className="space-y-5 pt-2">
            {[
                { id: 'actions', name: 'Agent Actions', desc: 'Get notified of all agent activities' },
                { id: 'compliance', name: 'Compliance Alerts', desc: 'Licenses & permits expiring' },
                { id: 'funding', name: 'Funding Opportunities', desc: 'New matches found' },
                { id: 'cashflow', name: 'Cash Flow Warnings', desc: 'Predicted gaps ahead' }
            ].map(notif => (
                <div key={notif.id} className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{notif.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{notif.desc}</span>
                    </div>
                    <Toggle 
                        active={notifications[notif.id as keyof typeof notifications]} 
                        onToggle={() => setNotifications({...notifications, [notif.id]: !notifications[notif.id as keyof typeof notifications]})} 
                    />
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy & Data Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-[#F07B20]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Privacy & Data</h2>
              <p className="text-sm text-slate-500 font-medium">Your information is secure</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button className="w-full flex items-center justify-between p-3 text-sm font-bold text-slate-700 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
              <span>Privacy Policy</span>
              <Plus className="h-4 w-4 rotate-45 text-slate-400 group-hover:text-slate-600" />
            </button>
            <button className="w-full flex items-center justify-between p-3 text-sm font-bold text-slate-700 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
              <span>Kenya DPA Consent</span>
              <Plus className="h-4 w-4 rotate-45 text-slate-400 group-hover:text-slate-600" />
            </button>
            <button className="w-full flex items-center justify-center gap-2 p-3 text-xs font-bold text-[#F07B20] uppercase tracking-wider bg-orange-50/50 rounded-xl hover:bg-orange-50 transition-colors mt-2">
              <Download size={14} /> Download My Data
            </button>
          </div>
        </div>
      </div>

      {/* Add to Home Card */}
      <div className="bg-orange-50/30 rounded-2xl border border-orange-100 p-6 space-y-6">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm">
                <Download className="h-6 w-6 text-[#F07B20]" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-slate-900">Add to Home Screen</h2>
                <p className="text-sm text-slate-500 font-medium">Use Inua like a native app</p>
            </div>
        </div>
        <button className="w-full bg-[#F07B20] text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-[#d86a1a] transition-all flex items-center justify-center gap-2">
            <Download size={18} /> Install App
        </button>
      </div>

      {/* Logout Footer */}
      <div className="pt-8 flex flex-col items-center gap-6">
        <div className="text-center">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Inua 360 v1.0.0</p>
            <p className="text-slate-400 text-[10px] font-bold mt-1">Made with love in Kenya 🇰🇪</p>
        </div>
        <button className="flex items-center gap-3 bg-red-500 text-white px-8 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-red-100 hover:bg-red-600 transition-all">
            <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
