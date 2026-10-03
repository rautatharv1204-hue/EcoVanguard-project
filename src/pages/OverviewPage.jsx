import React from 'react';
import HeroMetrics from '../components/overview/HeroMetrics';
import AlertModule from '../components/overview/AlertModule';
import GridTracker from '../components/overview/GridTracker';
import HeavyLoadCard from '../components/overview/HeavyLoadCard';
import VoiceAssistant from '../components/overview/VoiceAssistant';
import AlgorithmDiagram from '../components/overview/AlgorithmDiagram';
import TechStackGrid from '../components/overview/TechStackGrid';
import { ArrowRight, Sparkles, Shield, Cpu, BarChart2 } from 'lucide-react';

export default function OverviewPage({
  kpis,
  isAcShutdownActive,
  setIsAcShutdownActive,
  onTriggerToast,
  onOpenAnalytics
}) {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Platform Welcome Banner */}
      <div className="bg-gradient-to-r from-white via-[#F8FAF9] to-[#E8F0EC]/60 rounded-3xl p-6 sm:p-8 border border-[#E8F0EC] shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E8F0EC] text-[#1E3F20] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5E30]" />
            <span>Autonomous Commercial Facility Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#162E18] tracking-tight leading-tight">
            Smart Energy & Carbon Emission Intelligence Platform
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Real-time multi-sensor telemetry harmonized with regional grid emission factors and predictive TOU pricing tariffs. Optimize building HVAC, shed discretionary industrial loads, and verify Scope 2 greenhouse gas emissions.
          </p>
        </div>

        {/* Quick action button right side */}
        <div className="mt-6 sm:mt-0 sm:absolute sm:top-8 sm:right-8 flex flex-col items-start sm:items-end gap-2">
          <button
            onClick={onOpenAnalytics}
            className="group inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#1E3F20] hover:bg-[#162E18] text-white text-sm font-semibold shadow-md shadow-[#1E3F20]/20 transition-all active:scale-[0.98]"
          >
            <span>Open Analytics Engine</span>
            <ArrowRight className="w-4 h-4 text-[#A3E635] group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-[11px] font-mono text-slate-400">
            Next Optimization Run: in 42s
          </span>
        </div>
      </div>

      {/* 1. Real-time KPI Ribbon */}
      <HeroMetrics 
        kpis={kpis} 
        isAcShutdownActive={isAcShutdownActive} 
      />

      {/* 2. Interactive Real-Time Alerts: Smart Occupancy & Load Alert Module */}
      <AlertModule 
        isAcShutdownActive={isAcShutdownActive}
        setIsAcShutdownActive={setIsAcShutdownActive}
        onTriggerToast={onTriggerToast}
      />

      {/* 3. Core Feature Cards (Grid Rate Tracking + Heavy Load Detection) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GridTracker onOpenAnalytics={onOpenAnalytics} />
        <HeavyLoadCard onTriggerToast={onTriggerToast} />
      </div>

      {/* 4. Voice / Smart Assistant Integration */}
      <VoiceAssistant 
        onTriggerToast={onTriggerToast}
        setIsAcShutdownActive={setIsAcShutdownActive}
      />

      {/* 5. Algorithmic Flow Explanation (Mathematical & Visual Diagram) */}
      <AlgorithmDiagram />

      {/* 6. Tech Stack & Integration Grid */}
      <TechStackGrid onTriggerToast={onTriggerToast} />

    </div>
  );
}
