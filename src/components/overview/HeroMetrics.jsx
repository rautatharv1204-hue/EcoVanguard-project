import React from 'react';
import { 
  Zap, 
  CloudFog, 
  DollarSign, 
  Users, 
  TrendingDown, 
  TrendingUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function HeroMetrics({ kpis, isAcShutdownActive }) {
  // If AC shutdown is active on Floor 2, power draw decreases by 34.2 kW and cost rate drops accordingly
  const effectivePowerKw = isAcShutdownActive 
    ? (kpis.activePowerDrawKw - 34.2).toFixed(1)
    : kpis.activePowerDrawKw.toFixed(1);

  const effectiveCostRate = isAcShutdownActive
    ? (kpis.costRatePerHour - 10.94).toFixed(2)
    : kpis.costRatePerHour.toFixed(2);

  const effectiveCarbonReduction = isAcShutdownActive
    ? (kpis.dailyCarbonReductionKg + 42.5).toFixed(1)
    : kpis.dailyCarbonReductionKg.toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      
      {/* KPI 1: Active Facility Power Draw */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8F0EC] shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#E8F0EC]/50 rounded-full blur-2xl group-hover:bg-[#E8F0EC] transition-all"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Real-Time Power Draw
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#1E3F20] flex items-center justify-center">
            <Zap className="w-4 h-4 fill-[#1E3F20]/20" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
            {effectivePowerKw}
          </span>
          <span className="text-sm font-semibold text-slate-500">kW</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="flex items-center text-emerald-700 font-medium">
            <TrendingDown className="w-3.5 h-3.5 mr-1" />
            {isAcShutdownActive ? '−8.0% idle cut' : '−3.2% vs. peak baseline'}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">3-Phase Balanced</span>
        </div>
      </div>

      {/* KPI 2: Real-time Grid Carbon Intensity */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8F0EC] shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100/60 transition-all"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Grid Carbon Intensity
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <CloudFog className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
            {kpis.carbonIntensity}
          </span>
          <span className="text-xs font-medium text-slate-500">gCO₂eq/kWh</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-800 font-medium text-[11px]">
            Moderate Emission Band
          </span>
          <span className="text-slate-400 font-mono text-[11px]">CAISO Zone</span>
        </div>
      </div>

      {/* KPI 3: Current Cost Rate */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8F0EC] shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100/60 transition-all"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Cost Velocity
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
            ${effectiveCostRate}
          </span>
          <span className="text-xs font-medium text-slate-500">/ hour</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Tariff: <strong className="text-slate-700">PG&E B-19 TOU</strong>
          </span>
          <span className="text-emerald-700 font-medium">
            {isAcShutdownActive ? 'Save $10.94/hr' : 'Peak Rate'}
          </span>
        </div>
      </div>

      {/* KPI 4: Occupancy & Avoided Carbon */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8F0EC] shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100/60 transition-all"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Carbon Avoided Today
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-emerald-800 font-mono tracking-tight">
            {effectiveCarbonReduction}
          </span>
          <span className="text-xs font-medium text-slate-500">kg CO₂</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="flex items-center text-slate-600">
            <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
            Bldg Occupancy: <strong className="ml-1 text-slate-800">41%</strong>
          </span>
          <span className="text-emerald-700 font-semibold font-mono text-[11px]">
            +23% vs. avg
          </span>
        </div>
      </div>

    </div>
  );
}
