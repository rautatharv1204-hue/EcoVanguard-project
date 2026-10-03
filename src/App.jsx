import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
import OverviewPage from './pages/OverviewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { initialRealTimeKpis } from './data/mockData';

export default function App() {
  // Sync state with URL hash for browser navigation and bookmarking
  const getInitialPage = () => {
    if (typeof window === 'undefined') return 'overview';
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('analytics')) return 'analytics';
    return 'overview';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [isAcShutdownActive, setIsAcShutdownActive] = useState(false);
  const [kpis, setKpis] = useState(initialRealTimeKpis);
  const [toast, setToast] = useState(null);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('analytics')) {
        setActivePage('analytics');
      } else {
        setActivePage('overview');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page === 'analytics' ? '#analytics' : '#overview';
  };

  const triggerToast = (toastData) => {
    setToast(toastData);
    // Auto-dismiss after 5.5s
    setTimeout(() => {
      setToast((curr) => (curr === toastData ? null : curr));
    }, 5500);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col font-sans selection:bg-[#E8F0EC] selection:text-[#1E3F20]">
      
      {/* Global Navigation */}
      <Navbar 
        activePage={activePage} 
        setActivePage={handlePageChange} 
        scrollToSection={scrollToSection} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {activePage === 'overview' ? (
          <OverviewPage
            kpis={kpis}
            isAcShutdownActive={isAcShutdownActive}
            setIsAcShutdownActive={setIsAcShutdownActive}
            onTriggerToast={triggerToast}
            onOpenAnalytics={() => handlePageChange('analytics')}
          />
        ) : (
          <AnalyticsPage
            isAcShutdownActive={isAcShutdownActive}
            setIsAcShutdownActive={setIsAcShutdownActive}
            onTriggerToast={triggerToast}
            onBackToOverview={() => handlePageChange('overview')}
          />
        )}
      </main>

      {/* Interactive Global Toast Feedback */}
      <NotificationToast 
        toast={toast} 
        onClose={() => setToast(null)} 
      />

      {/* Corporate Compliance & System Footer */}
      <Footer 
        setActivePage={handlePageChange} 
      />

    </div>
  );
}
