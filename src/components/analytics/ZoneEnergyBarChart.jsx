import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { Layers, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { zoneEnergyData } from '../../data/mockData';

export default function ZoneEnergyBarChart({ selectedZone, onSelectZone }) {
  const [chartMode, setChartMode] = useState('stacked'); // 'stacked' | 'grouped'

  // Filter or show all zones
  const displayData = selectedZone === 'all' 
    ? zoneEnergyData 
    : zoneEnergyData.filter(z => z.id === selectedZone);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-xl text-xs space-y-1.5">
          <div className="font-bold text-slate-800 border-b border-slate-100 pb-1">
            {dataItem.name}
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-slate-500">Continuous Baseline:</span>
            <span className="font-mono font-bold text-slate-700">{dataItem.baselineKw} kW</span>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-slate-500">Variable Peak Load:</span>
            <span className="font-mono font-bold text-amber-600">{dataItem.peakLoadKw} kW</span>
          </div>
          <div className="flex items-center justify-between space-x-4 pt-1 border-t border-slate-100 font-bold">
            <span className="text-slate-800">Total Power Draw:</span>
            <span className="font-mono text-[#1E3F20]">{dataItem.totalKw} kW</span>
          </div>
          <div className="text-[10px] text-slate-500 italic mt-1">
            Occupancy: {dataItem.occupancyPct}% • Efficiency Score: {dataItem.efficiencyScore}/100
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8F0EC] shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E3F20]"></span>
            <h3 className="text-base font-bold text-slate-900">
              Zone-by-Zone Energy Consumption: Baseline vs. Heavy Peak Loads
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Disaggregates steady-state 24/7 baseline draw from intermittent peak thermal and computational demands.
          </p>
        </div>

        {/* Stacked vs Grouped toggle */}
        <div className="flex items-center space-x-1.5 bg-[#F8FAF9] p-1 rounded-xl border border-slate-200 text-xs self-start sm:self-auto">
          <button
            onClick={() => setChartMode('stacked')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              chartMode === 'stacked'
                ? 'bg-[#1E3F20] text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Stacked View
          </button>
          <button
            onClick={() => setChartMode('grouped')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              chartMode === 'grouped'
                ? 'bg-[#1E3F20] text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Grouped View
          </button>
        </div>
      </div>

      {/* Bar Chart Canvas */}
      <div className="mt-6 w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={displayData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F2" vertical={false} />
            <XAxis 
              dataKey="shortName" 
              stroke="#94A3B8" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={11}
              unit=" kW"
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }}
            />
            <Bar 
              dataKey="baselineKw" 
              name="Steady Baseline Load (kW)" 
              fill="#1E3F20" 
              stackId={chartMode === 'stacked' ? 'a' : undefined} 
              radius={chartMode === 'stacked' ? [0, 0, 0, 0] : [6, 6, 0, 0]}
            />
            <Bar 
              dataKey="peakLoadKw" 
              name="Intermittent Peak Load (kW)" 
              fill="#D97706" 
              stackId={chartMode === 'stacked' ? 'a' : undefined} 
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Zone Detail Cards Grid */}
      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {zoneEnergyData.map((z) => {
          const isFlagged = z.wasteRisk === 'Critical';
          return (
            <div 
              key={z.id}
              onClick={() => onSelectZone(z.id)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedZone === z.id 
                  ? 'border-[#1E3F20] bg-[#E8F0EC]/50 shadow-xs' 
                  : isFlagged 
                    ? 'border-amber-200 bg-amber-50/40 hover:bg-amber-50/80' 
                    : 'border-slate-200 bg-[#FBFBF9] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 truncate">{z.shortName}</span>
                {isFlagged ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                    High Waste
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Normal
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-baseline justify-between font-mono">
                <span className="text-slate-400">Total Draw:</span>
                <span className="font-bold text-slate-900">{z.totalKw} kW</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-[11px]">
                <span className="text-slate-400">Occupancy:</span>
                <span className={`font-semibold ${z.occupancyPct < 10 ? 'text-amber-700' : 'text-slate-700'}`}>
                  {z.occupancyPct}%
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-[11px]">
                <span className="text-slate-400">Efficiency Score:</span>
                <span className="font-semibold text-emerald-800">{z.efficiencyScore}/100</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
