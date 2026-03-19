import React from 'react';
import { X, Bell, Info, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    title: 'AI Health Scan Complete',
    description: 'Your latest business health report is ready. Your score increased by 4 points!',
    time: '2 mins ago',
    type: 'success',
    icon: CheckCircle2,
    color: 'text-green-500'
  },
  {
    id: 2,
    title: 'New Funding Match',
    description: 'A new lender matching your profile has been added to the marketplace.',
    time: '1 hour ago',
    type: 'info',
    icon: Info,
    color: 'text-blue-500'
  },
  {
    id: 3,
    title: 'Compliance Alert',
    description: 'Your operating license is expiring in 15 days. Take action to maintain readiness.',
    time: '5 hours ago',
    type: 'warning',
    icon: AlertTriangle,
    color: 'text-orange-500'
  }
];

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="absolute inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`absolute right-0 top-0 z-50 h-full w-full max-w-sm border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#F07B20]" />
              <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
            </div>
            <button 
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div key={notif.id} className="flex gap-4 rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className={`mt-1 shrink-0 ${notif.color}`}>
                    <notif.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{notif.title}</h3>
                      <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 uppercase tracking-wider whitespace-nowrap">
                        <Clock className="h-3 w-3" />
                        {notif.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">{notif.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 p-6">
            <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-colors">
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;
