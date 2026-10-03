import React from 'react';
import { Leaf, ShieldCheck, CheckCircle2, Globe, Database, FileText, ExternalLink } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-white border-t border-[#E8F0EC] text-slate-600 mt-20 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E8F0EC]">
          
          {/* Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1E3F20] flex items-center justify-center text-white">
                <Leaf className="w-4 h-4 text-[#A3E635]" />
              </div>
              <span className="text-lg font-bold text-[#162E18]">
                Eco<span className="text-[#2D5E30]">Vanguard</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Real-time enterprise energy intelligence, locational marginal carbon intensity optimization, and automated building management integration for carbon-neutral operations.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-800 bg-[#E8F0EC] px-3 py-1.5 rounded-lg w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-medium">System Telemetry Online: 99.98%</span>
            </div>
          </div>

          {/* Compliance & ESG Standards */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              ESG & Compliance Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2 text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>GHG Protocol Scope 2 Guidance (Dual-Reporting)</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>ISO 50001 Energy Management</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>ASHRAE Standard 90.1 Energy Benchmark</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>LEED v4.1 Zero Carbon Certified</span>
              </li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Platform Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setActivePage('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#1E3F20] transition-colors"
                >
                  System Overview & Real-Time Alerts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('overview'); }}
                  className="hover:text-[#1E3F20] transition-colors"
                >
                  Algorithmic Conversion Pipeline
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('analytics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#1E3F20] transition-colors"
                >
                  Deep-Dive Data Analytics Engine
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('analytics'); }}
                  className="hover:text-[#1E3F20] transition-colors"
                >
                  Zone-by-Zone Load Profiler
                </button>
              </li>
            </ul>
          </div>

          {/* API Feeds & Data Providers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Integrated Data Sources
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAF9] border border-[#E8F0EC]">
                <div className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-medium text-slate-700">Electricity Maps API</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">v3 Live</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAF9] border border-[#E8F0EC]">
                <div className="flex items-center space-x-2">
                  <Database className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-medium text-slate-700">WattTime MOER</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">Real-Time</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAF9] border border-[#E8F0EC]">
                <div className="flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-medium text-slate-700">OpenEI Utility Rates</span>
                </div>
                <span className="text-[10px] text-slate-700 bg-slate-200/60 px-1.5 py-0.5 rounded">TOU v8</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 EcoVanguard Systems Inc. All rights reserved. Corporate Smart Energy & Carbon Intelligence Platform.</p>
          <div className="flex items-center space-x-6 text-xs font-medium">
            <span className="text-slate-400">Security Clearance: SOC2 Type II</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">Data Freshness: 2.1s</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
