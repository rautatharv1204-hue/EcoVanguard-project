import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  Legend
} from 'recharts';
import { Users, Gauge, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { zoneEnergyData } from '../../data/mockData';

export default function OccupancyEfficiencyGauge({ isAcShutdownActive }) {
  // Zone share of energy
  const zoneShareData = zoneEnergyData.map((z) => {
    let kw = z.totalKw;
    if (z.id === 'floor-2' && isAcShutdownActive) {
      kw -= 34.2;
    }
    return {
      name: z.shortName,
      value: kw,
      occupancy: z.occupancyPct,
      efficiency: z.id === 'floor-2' && isAcShutdownActive ? 86 : z.efficiencyScore,
    };
  });

  const COLORS = ['#1E3F20', '#D97706', '#059669', '#3B82F6'];

  // Overall building power draw efficiency index
  const buildingEfficiencyIndex = isAcShutdownActive ? 88 : 72;

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-xl text-xs space-y-1">
          <div className="font-bold text-slate-800 border-b border-slate-100 pb-1">
            {data.name}
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-slate-500">Power Consumption:</span>
            <span className="font-mono font-bold text-slate-900">{data.value.toFixed(1)} kW</span>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-slate-500">Zone Occupancy:</span>
            <span className="font-mono font-bold text-slate-700">{data.occupancy}%</span>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-slate-500">Efficiency Index:</span>
            <span className="font-mono font-bold text-emerald-700">{data.efficiency}/100</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8F0EC] shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E3F20]"></span>
            <h3 className="text-base font-bold text-slate-900">
              Floor Occupancy vs. Power Draw Efficiency Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-references PIR occupancy telemetry against zone sub-metered power to expose energy waste in unpopulated zones.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-[#E8F0EC] text-[#1E3F20] px-3 py-1.5 rounded-xl font-bold self-start sm:self-auto">
          <span>Building Efficiency: {buildingEfficiencyIndex}%</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Donut Chart */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full h-[260px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {zoneShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold font-mono text-slate-900">
                {buildingEfficiencyIndex}%
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Facility Score
              </span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="flex flex-wrap justify-center gap-3 text-xs mt-2">
            {zoneShareData.map((entry, index) => (
              <div key={entry.name} className="flex items-center space-x-1.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                />
                <span className="text-slate-600 font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Real-Time Zone Telemetry & Anomaly Breakdown */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Occupancy vs. Power Utilization Matrix
          </span>

          {zoneEnergyData.map((z, idx) => {
            const isUnoccupiedWaste = z.id === 'floor-2' && !isAcShutdownActive;
            const currentEfficiency = z.id === 'floor-2' && isAcShutdownActive ? 86 : z.efficiencyScore;

            return (
              <div 
                key={z.id}
                className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                  isUnoccupiedWaste 
                    ? 'bg-amber-50/70 border-amber-300' 
                    : 'bg-[#FBFBF9] border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <div>
                    <h5 className="font-bold text-slate-800">{z.name}</h5>
                    <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                      <span>Occupancy: <strong className="text-slate-700">{z.occupancyPct}%</strong></span>
                      <span>•</span>
                      <span>Draw: <strong className="text-slate-700 font-mono">
                        {z.id === 'floor-2' && isAcShutdownActive ? '57.8 kW' : `${z.totalKw} kW`}
                      </strong></span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-1 justify-end">
                    <Gauge className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono font-bold text-slate-800">
                      {currentEfficiency}%
                    </span>
                  </div>
                  <span className={`text-[10px] font-semibold ${
                    isUnoccupiedWaste ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {isUnoccupiedWaste ? 'Empty / Full Cooling' : 'Optimal Ratio'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
