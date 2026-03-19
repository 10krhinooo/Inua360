import { 
  Building2, MapPin, Calendar, 
  Users, Fingerprint, Edit3,
  TrendingUp,
  Briefcase, Phone, Mail,
  FileText, ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] px-1">Business Profile</h1>
        <p className="text-[var(--text-secondary)] font-medium px-1">360° view of your business</p>
      </div>

      {/* Business Identity Card */}
      <div className="relative group overflow-hidden rounded-3xl border border-[var(--border-primary)] bg-[var(--card-bg)] p-2 shadow-sm transition-all hover:shadow-lg hover:border-orange-100 dark:hover:border-orange-500/20">
        <div className="absolute inset-0 bg-[#F07B20]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-start sm:items-center gap-6">
                <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-[2rem] bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center p-5 shadow-inner border border-orange-100/50">
                    <Building2 className="h-full w-full text-[#F07B20]" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight">Mama Fua Laundry & Dry Cleaning</h2>
                    <p className="text-[var(--text-secondary)] font-bold uppercase tracking-wider text-[10px] mt-1 opacity-60">Retail</p>
                    
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                            <MapPin size={16} className="text-[var(--text-secondary)] opacity-40" />
                            <span className="text-sm font-bold">Nairobi</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                            <Calendar size={16} className="text-[var(--text-secondary)] opacity-40" />
                            <span className="text-sm font-bold">Est. 2021</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                            <Users size={16} className="text-[var(--text-secondary)] opacity-40" />
                            <span className="text-sm font-bold">4 employees</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                            <Fingerprint size={16} className="text-[var(--text-secondary)] opacity-40" />
                            <span className="text-sm font-bold">BN/2021/45234</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-500/20 text-[#F07B20] shadow-sm">
                            <Edit3 size={14} />
                        </div>
                        <span className="text-xs font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">Profile Builder</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
                <div className="bg-[#F07B20] text-white px-10 py-5 rounded-[2.5rem] shadow-lg shadow-orange-100 dark:shadow-black/20 transition-transform hover:scale-102 cursor-default">
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-orange-200 mb-1">Health Score</span>
                    <span className="text-4xl font-black leading-none tracking-tight">78/100</span>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-primary)] text-[var(--text-secondary)] font-bold text-sm shadow-sm hover:bg-[var(--bg-secondary)] transition-all">
                    <Edit3 size={16} /> Edit
                </button>
            </div>
        </div>
      </div>

      {/* Metrics & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Key Metrics Section */}
        <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border-primary)] shadow-sm overflow-hidden flex flex-col transition-colors duration-300">
            <div className="p-8 border-b border-[var(--border-primary)] flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Key Metrics</h3>
                <Briefcase className="h-5 w-5 text-[var(--text-secondary)] opacity-30" />
            </div>
            <div className="p-8 flex-1 flex flex-col justify-around gap-6">
                {[
                    { label: 'Monthly Revenue', value: 'KES 120,000', color: 'text-green-600' },
                    { label: 'Net Profit', value: 'KES 45,000', color: 'text-green-600' },
                    { label: 'Growth Rate', value: '+ 23.5%', color: 'text-green-600', icon: TrendingUp },
                    { label: 'Total Customers', value: '156', color: 'text-slate-900' }
                ].map((metric, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <span className="text-[var(--text-secondary)] font-bold text-sm group-hover:text-[var(--text-primary)] transition-colors uppercase tracking-wider">{metric.label}</span>
                        <div className="flex items-center gap-2">
                            {metric.icon && <metric.icon size={16} className={metric.color} />}
                            <span className={`text-xl font-bold tracking-tight ${metric.color === 'text-slate-900' ? 'text-[var(--text-primary)]' : metric.color}`}>{metric.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Revenue Trend Section */}
        <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border-primary)] shadow-sm overflow-hidden transition-colors duration-300">
            <div className="p-8 border-b border-[var(--border-primary)] flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Revenue Trend</h3>
                <TrendingUp className="h-5 w-5 text-[#F07B20]" />
            </div>
            <div className="p-8">
                <div className="relative h-[220px] w-full">
                    {/* Simplified SVG Chart */}
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F07B20" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#F07B20" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Grid Lines */}
                        <line x1="0" y1="0" x2="100" y2="0" stroke="#f1f5f9" strokeWidth="0.1" />
                        <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.1" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.1" />
                        <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.1" />
                        <line x1="0" y1="40" x2="100" y2="40" stroke="#cbd5e1" strokeWidth="0.2" />
                        
                        {/* Area */}
                        <path d="M 0,22 L 25,18 L 50,15 L 75,10 L 100,6 L 100,40 L 0,40 Z" fill="url(#chartGradient)" />
                        {/* Line */}
                        <path d="M 0,22 L 25,18 L 50,15 L 75,10 L 100,6" fill="none" stroke="#F07B20" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] font-bold text-[var(--text-secondary)] opacity-60 -translate-x-full pr-4">
                        <span>120K</span>
                        <span>90K</span>
                        <span>60K</span>
                        <span>30K</span>
                        <span>0K</span>
                    </div>

                    {/* X-Axis Labels */}
                    <div className="absolute bottom-[-24px] w-full flex justify-between text-[10px] font-bold text-[var(--text-secondary)] opacity-60">
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                    </div>
                </div>
                <div className="mt-12 flex items-center gap-2 text-[10px] font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">
                    <CheckCircle2 size={12} className="text-cyan-500" /> Auto-synced from M-Pesa
                </div>
            </div>
        </div>
      </div>

      {/* Customer Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: 'Total Customers', value: '156', color: 'text-[var(--text-primary)]' },
            { label: 'Returning', value: '98', color: 'text-green-600' },
            { label: 'Satisfaction', value: '4.7/5.0', color: 'text-[var(--text-primary)]' },
            { label: 'Corporate', value: '35%', color: 'text-[var(--text-primary)]' }
        ].map((item, i) => (
            <div key={i} className="bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--border-primary)] shadow-sm transition-all hover:-translate-y-1">
                <h4 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest leading-none mb-3 opacity-60">{item.label}</h4>
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            </div>
        ))}
      </div>

      {/* Contact Info Card */}
      <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border-primary)] shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-8 border-b border-[var(--border-primary)]">
            <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Contact Information</h3>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] opacity-60 group-hover:bg-[var(--card-bg)] border border-[var(--border-primary)]">
                    <Phone size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1 opacity-60">Phone</p>
                    <p className="text-sm font-bold text-[var(--text-primary)]">+254 712 345 678</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] opacity-60 group-hover:bg-[var(--card-bg)] border border-[var(--border-primary)]">
                    <Mail size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1 opacity-60">Email</p>
                    <p className="text-sm font-bold text-[var(--text-primary)]">mamafua@example.com</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] opacity-60 group-hover:bg-[var(--card-bg)] border border-[var(--border-primary)]">
                    <MapPin size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1 opacity-60">Address</p>
                    <p className="text-sm font-bold text-[var(--text-primary)]">Ngara, Nairobi</p>
                </div>
            </div>
        </div>
      </div>

      {/* Final CTA Action */}
      <div className="pt-4">
          <button className="w-full bg-[#0f172a] dark:bg-orange-600 text-white py-6 rounded-[2rem] font-bold text-lg uppercase tracking-widest shadow-2xl shadow-slate-200 dark:shadow-black/20 hover:bg-slate-800 dark:hover:bg-orange-700 transition-all flex items-center justify-center gap-4 group">
              <FileText className="h-6 w-6 text-[#F07B20] dark:text-white" />
              Generate Business Credit Readiness Report
              <ArrowUpRight className="h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
      </div>

    </div>
  );
};

export default ProfilePage;
