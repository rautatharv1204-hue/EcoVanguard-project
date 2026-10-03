import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { CloudFog, DollarSign, Info, Eye, EyeOff } from 'lucide-react';

export default function GridCarbonOverlayChart({ data, emissionThreshold }) {
  const [showCarbon, setShowCarbon] = useState(true);
  const [showRate, setShowRate] = useState(true);
  const [showThreshold, setShowThreshold] = useState(true);

  // Custom tooltips for dual-axis values
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const currentItem = payload[0].payload;
      const isAboveThreshold = currentItem.carbonIntensity > emissionThreshold;

      return (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-xl text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 font-mono">
            <span className="font-bold text-slate-800">{label} ({currentItem.hour})</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              currentItem.isOffPeak 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {currentItem.isOffPeak ? 'Off-Peak Clean' : 'On-Peak Tariff'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-slate-500 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#1E3F20]"></span>
                <span>Grid Rate:</span>
              </span>
              <span className="font-mono font-bold text-slate-900">
                ${currentItem.gridRate.toFixed(2)}/kWh
              </span>
            </div>

            <div className="flex items-center justify-between space-x-4">
              <span className="text-slate-500 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                <span>Carbon Intensity:</span>
              </span>
              <span className={`font-mono font-bold ${
                isAboveThreshold ? 'text-rose-600' : 'text-emerald-700'
              }`}>
                {currentItem.carbonIntensity} gCO₂eq/kWh
              </span>
            </div>

            <div className="flex items-center justify-between space-x-4 pt-1 border-t border-slate-100 text-[11px]">
              <span className="text-slate-400">Total Facility Load:</span>
              <span className="font-mono text-slate-700">{currentItem.totalLoadKw} kW</span>
            </div>
          </div>

          {isAboveThreshold && (
            <div className="text-[10px] text-rose-700 bg-rose-50 px-2 py-1 rounded font-medium">
              ⚠ Exceeds target threshold of {emissionThreshold} g/kWh
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8F0EC] shadow-xs">
      
      {/* Header & Metric Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E3F20]"></span>
            <h3 className="text-base font-bold text-slate-900">
              24-Hour Grid Electricity Rates vs. Grid Carbon Intensity Overlay
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronized dual-axis time series illustrating economic price signals vs. true greenhouse gas emissions.
          </p>
        </div>

        {/* Visibility Toggles */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setShowRate(!showRate)}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center space-x-1 transition-all ${
              showRate 
                ? 'bg-[#1E3F20] text-white border-[#1E3F20]' 
                : 'bg-white text-slate-400 border-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Grid Rate ($/kWh)</span>
          </button>

          <button
            onClick={() => setShowCarbon(!showCarbon)}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center space-x-1 transition-all ${
              showCarbon 
                ? 'bg-emerald-700 text-white border-emerald-700' 
                : 'bg-white text-slate-400 border-slate-200'
            }`}
          >
            <CloudFog className="w-3.5 h-3.5" />
            <span>Carbon (gCO₂/kWh)</span>
          </button>

          <button
            onClick={() => setShowThreshold(!showThreshold)}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center space-x-1 transition-all ${
              showThreshold 
                ? 'bg-amber-100 text-amber-900 border-amber-300' 
                : 'bg-white text-slate-400 border-slate-200'
            }`}
          >
            <span>Threshold</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mt-6 w-full h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F2" vertical={false} />

            {/* X-Axis: Time */}
            <XAxis 
              dataKey="timeLabel" 
              stroke="#94A3B8" 
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />

            {/* Left Y-Axis: Electricity Rate */}
            <YAxis
              yAxisId="left"
              orientation="left"
              domain={[0, 0.40]}
              tickFormatter={(val) => `$${val.toFixed(2)}`}
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />

            {/* Right Y-Axis: Carbon Intensity */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[100, 500]}
              tickFormatter={(val) => `${val}g`}
              stroke="#10B981"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Carbon Threshold Reference Line */}
            {showThreshold && (
              <ReferenceLine
                yAxisId="right"
                y={emissionThreshold}
                stroke="#D97706"
                strokeDasharray="4 4"
                strokeWidth={2}
                label={{
                  value: `Limit: ${emissionThreshold} g/kWh`,
                  position: 'insideTopRight',
                  fill: '#D97706',
                  fontSize: 11,
                  fontWeight: 600,
                  offset: 10
                }}
              />
            )}

            {/* Carbon Area (Right Axis) */}
            {showCarbon && (
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="carbonIntensity"
                name="Grid Carbon Intensity (gCO₂eq/kWh)"
                fill="url(#carbonGradient)"
                stroke="#059669"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#059669', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            )}

            {/* Electricity Rate Line (Left Axis) */}
            {showRate && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="gridRate"
                name="Grid Electricity Rate ($/kWh)"
                stroke="#1E3F20"
                strokeWidth={3}
                dot={{ r: 3, fill: '#1E3F20' }}
                activeDot={{ r: 6, fill: '#1E3F20', stroke: '#A3E635', strokeWidth: 2 }}
              />
            )}

          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Insight strip below chart */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-[#1E3F20] shrink-0" />
          <span>
            Correlation factor between grid price and marginal carbon emissions is <strong>r = 0.88</strong> in the CAISO region.
          </span>
        </div>
        <div className="flex items-center space-x-4 font-mono text-[11px]">
          <span>Min: $0.08 / 160g</span>
          <span>•</span>
          <span>Max: $0.32 / 470g</span>
        </div>
      </div>

    </div>
  );
}
