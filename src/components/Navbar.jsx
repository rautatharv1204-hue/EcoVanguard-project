import React from 'react';
import { 
  Leaf, 
  Activity, 
  BarChart3, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Home, 
  ShieldCheck,
  Zap,
  TrendingDown
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, scrollToSection }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E8F0EC] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Corporate Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('overview')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1E3F20] to-[#2D5E30] flex items-center justify-center shadow-md shadow-[#1E3F20]/15 text-white">
              <Leaf className="w-6 h-6 text-[#A3E635]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-[#162E18] font-sans">
                  Eco<span className="text-[#2D5E30]">Vanguard</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-[#E8F0EC] text-[#1E3F20] border border-[#D1E3D7]">
                  Enterprise v3.4
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Smart Energy & Carbon Intelligence</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => {
                setActivePage('overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activePage === 'overview'
                  ? 'bg-[#E8F0EC] text-[#1E3F20] font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#F2F7F4]'
              }`}
            >
              <Home className="w-4 h-4 text-[#1E3F20]" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => {
                if (activePage !== 'overview') {
                  setActivePage('overview');
                  setTimeout(() => scrollToSection('algorithm-section'), 100);
                } else {
                  scrollToSection('algorithm-section');
                }
              }}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-[#F2F7F4] transition-all"
            >
              <Cpu className="w-4 h-4 text-slate-500" />
              <span>Algorithm</span>
            </button>

            <button
              onClick={() => {
                if (activePage !== 'overview') {
                  setActivePage('overview');
                  setTimeout(() => scrollToSection('architecture-section'), 100);
                } else {
                  scrollToSection('architecture-section');
                }
              }}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-[#F2F7F4] transition-all"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Architecture</span>
            </button>

            <button
              onClick={() => setActivePage('analytics')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activePage === 'analytics'
                  ? 'bg-[#E8F0EC] text-[#1E3F20] font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#F2F7F4]'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#1E3F20]" />
              <span>Analytics Hub</span>
            </button>
          </nav>

          {/* Real-time Status Badge & Primary CTA */}
          <div className="flex items-center space-x-3">
            {/* Live Grid Sync Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#F2F7F4] border border-[#E2ECE5] text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-slate-700 font-medium font-mono text-[11px]">
                CAISO Grid • Live Sync
              </span>
            </div>

            {/* Dynamic CTA Button */}
            {activePage === 'overview' ? (
              <button
                onClick={() => {
                  setActivePage('analytics');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#1E3F20] hover:bg-[#162E18] text-white text-sm font-semibold shadow-md shadow-[#1E3F20]/20 hover:shadow-lg hover:shadow-[#1E3F20]/30 transition-all active:scale-[0.98]"
              >
                <span>Open Analytics Engine</span>
                <ArrowRight className="w-4 h-4 text-[#A3E635] group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setActivePage('overview');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-[#D1E3D7] hover:bg-[#F2F7F4] text-[#1E3F20] text-sm font-semibold shadow-xs transition-all active:scale-[0.98]"
              >
                <span>← System Overview</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
