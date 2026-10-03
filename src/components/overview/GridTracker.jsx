import React, { useState } from 'react';
import { 
  Clock, 
  Activity, 
  Zap, 
  Leaf, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { hourly24HourData } from '../../data/mockData';

export default function GridTracker({ onOpenAnalytics }) {
  const [selectedHourIndex, setSelectedHourIndex] = useState(14); // 2 PM default
  const selectedData = hourly24HourData[selectedHourIndex];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8F0EC] shadow-xs">
      
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="text-base font-bold text-slate-900">
              Grid Rate & Carbon Intensity Tracking
            </h3>
            <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#E8F0EC] text-[#1E3F20]">
              24-Hour Horizon
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous sync with regional ISO Locational Marginal Pricing (LMP) and dynamic marginal emissions factors.
          </p>
        </div>

        <button
          onClick={onOpenAnalytics}
          className="text-xs font-semibold text-[#1E3F20] hover:text-[#162E18] flex items-center space-x-1 hover:underline self-start sm:self-auto"
        >
          <span>Deep-Dive Overlay Chart</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Real-time Summary Cards */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Current Time Slot State */}
        <div className="p-4 rounded-xl bg-[#F8FAF9] border border-[#E8F0EC]">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Selected Hour</span>
            </span>
            <span className="font-mono text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
              {selectedData.timeLabel} ({selectedData.hour})
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400">Power Rate</span>
              <div className="text-2xl font-bold font-mono text-slate-900">
                ${selectedData.gridRate.toFixed(2)}
                <span className="text-xs font-normal text-slate-500">/kWh</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Carbon Intensity</span>
              <div className="text-2xl font-bold font-mono text-emerald-800">
                {selectedData.carbonIntensity}
                <span className="text-xs font-normal text-slate-500"> g/kWh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lowest Carbon Off-Peak Window */}
        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
          <div className="flex items-center justify-between text-xs text-emerald-800 mb-1">
            <span className="font-semibold flex items-center space-x-1.5">
              <Moon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Greenest Off-Peak Window</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900">
              Optimal Window
            </span>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-emerald-900 font-mono">
              01:00 AM – 04:00 AM
            </div>
            <div className="text-xs text-emerald-700 mt-1 flex items-center justify-between">
              <span>Rate: <strong className="font-mono">$0.08/kWh</strong></span>
              <span>Carbon: <strong className="font-mono">160 gCO₂eq</strong></span>
            </div>
          </div>
        </div>

        {/* Severe Peak Window Alert */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
          <div className="flex items-center justify-between text-xs text-amber-800 mb-1">
            <span className="font-semibold flex items-center space-x-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Peak Demand Tariff Zone</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
              High Carbon / High Cost
            </span>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-amber-900 font-mono">
              04:00 PM – 07:00 PM
            </div>
            <div className="text-xs text-amber-700 mt-1 flex items-center justify-between">
              <span>Rate: <strong className="font-mono">$0.32/kWh</strong></span>
              <span>Carbon: <strong className="font-mono">470 gCO₂eq</strong></span>
            </div>
          </div>
        </div>

      </div>

      {/* 24-Hour Interactive Timeline Scrubber */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="font-medium text-slate-700">24-Hour Timeline Profile (Click hour to scrub):</span>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#E8F0EC] border border-[#A3E635]"></span>
              <span>Off-Peak Clean</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-xs bg-amber-200"></span>
              <span>Moderate</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-xs bg-rose-300"></span>
              <span>High Peak ($0.32/kWh)</span>
            </span>
          </div>
        </div>

        {/* Bar Scrubber */}
        <div className="flex items-end gap-1 h-16 bg-[#F8FAF9] p-2 rounded-xl border border-slate-200/80">
          {hourly24HourData.map((item, idx) => {
            const isSelected = selectedHourIndex === idx;
            // Height proportional to carbon intensity (160 to 470)
            const heightPct = Math.max(20, Math.min(100, ((item.carbonIntensity - 140) / 340) * 100));
            
            let barColor = 'bg-emerald-300 hover:bg-emerald-400';
            if (item.carbonIntensity > 350) {
              barColor = 'bg-amber-400 hover:bg-amber-500';
            }
            if (item.carbonIntensity >= 430) {
              barColor = 'bg-rose-400 hover:bg-rose-500';
            }

            return (
              <button
                key={item.hour}
                onClick={() => setSelectedHourIndex(idx)}
                title={`${item.timeLabel}: $${item.gridRate}/kWh • ${item.carbonIntensity} gCO₂/kWh`}
                className={`relative flex-1 rounded-t transition-all group focus:outline-hidden ${
                  isSelected ? 'ring-2 ring-[#1E3F20] scale-y-105 z-10' : ''
                }`}
                style={{ height: `${heightPct}%` }}
              >
                <div className={`w-full h-full rounded-t transition-colors ${
                  isSelected ? 'bg-[#1E3F20]' : barColor
                }`} />
              </button>
            );
          })}
        </div>

        {/* Time labels below bar scrubber */}
        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 px-1">
          <span>12 AM</span>
          <span>4 AM</span>
          <span>8 AM</span>
          <span>12 PM</span>
          <span>4 PM</span>
          <span>8 PM</span>
          <span>11 PM</span>
        </div>
      </div>

    </div>
  );
}
