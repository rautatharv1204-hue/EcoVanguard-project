import React from 'react';
import { 
  Calendar, 
  Layers, 
  Sliders, 
  Download, 
  Filter, 
  RotateCcw,
  AlertCircle,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

export default function AnalyticsFilters({
  timeRange,
  setTimeRange,
  selectedZone,
  setSelectedZone,
  emissionThreshold,
  setEmissionThreshold,
  exceededHoursCount,
  onExportReport
}) {
  const timeRanges = [
    { id: '24h', label: 'Last 24 Hours' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Month-to-Date' },
  ];

  const zones = [
    { id: 'all', label: 'All Facility Zones' },
    { id: 'floor-1', label: 'Floor 1 (R&D Labs)' },
    { id: 'floor-2', label: 'Floor 2 (Executive)' },
    { id: 'floor-3', label: 'Floor 3 (Engineering)' },
    { id: 'floor-4', label: 'Floor 4 (Data Hub)' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-[#E8F0EC] shadow-xs space-y-4">
      
      {/* Top Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        
        {/* Left: Time Range Picker */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[#1E3F20]" />
            <span>Time Range:</span>
          </span>
          <div className="flex items-center space-x-1 bg-[#F8FAF9] p-1 rounded-xl border border-slate-200">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === range.id
                    ? 'bg-[#1E3F20] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Middle: Zone / Floor Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5 shrink-0">
            <Layers className="w-3.5 h-3.5 text-[#1E3F20]" />
            <span>Zone Filter:</span>
          </span>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="text-xs font-medium text-slate-800 bg-[#F8FAF9] border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-[#1E3F20] cursor-pointer"
          >
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.label}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Export Report Button */}
        <button
          onClick={onExportReport}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-[#D1E3D7] hover:bg-[#F2F7F4] text-[#1E3F20] text-xs font-semibold shadow-2xs transition-all active:scale-[0.98] self-start lg:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#1E3F20]" />
          <span>Export Analytics Report (.CSV)</span>
        </button>

      </div>

      {/* Dynamic Emission Threshold Slider */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex-1 max-w-xl">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-700 flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#1E3F20]" />
              <span>Carbon Emission Alert Threshold:</span>
            </span>
            <div className="flex items-center space-x-2 font-mono">
              <span className="text-sm font-extrabold text-[#1E3F20] bg-[#E8F0EC] px-2 py-0.5 rounded">
                {emissionThreshold} gCO₂eq/kWh
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono text-slate-400">150</span>
            <input
              type="range"
              min="150"
              max="500"
              step="5"
              value={emissionThreshold}
              onChange={(e) => setEmissionThreshold(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3F20]"
            />
            <span className="text-[11px] font-mono text-slate-400">500</span>
          </div>
        </div>

        {/* Dynamic Warning Callout Based on Threshold */}
        <div className="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold font-mono">{exceededHoursCount} Intervals</span>
            <span className="ml-1 text-amber-800">
              currently exceed this emission threshold ({emissionThreshold} g/kWh).
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
