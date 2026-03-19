import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationsPanel from './NotificationsPanel';
import { ToastProvider } from '../../context/ToastContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[var(--bg-secondary)] text-[var(--text-primary)] font-['Poppins']">
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div className="flex flex-1 flex-col overflow-hidden relative">
          <Header 
            setSidebarOpen={setSidebarOpen}
            isSidebarCollapsed={isSidebarCollapsed} 
            onOpenNotifications={() => setShowNotifications(true)}
          />
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300">
            <Outlet />
          </main>

          {/* Notifications Side Panel */}
          <NotificationsPanel 
            isOpen={showNotifications} 
            onClose={() => setShowNotifications(false)} 
          />
        </div>
      </div>
    </ToastProvider>
  );
};

export default DashboardLayout;