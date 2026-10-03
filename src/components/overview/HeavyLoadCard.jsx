import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  CalendarClock, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  SlidersHorizontal,
  ArrowUpRight
} from 'lucide-react';
import { heavyEquipmentData } from '../../data/mockData';

export default function HeavyLoadCard({ onTriggerToast }) {
  const [equipmentList, setEquipmentList] = useState(heavyEquipmentData);
  const [scheduledItems, setScheduledItems] = useState({
    'eq-1': false,
    'eq-3': false,
  });

  const handleApplySchedule = (item) => {
    setScheduledItems(prev => ({
      ...prev,
      [item.id]: !prev[item.id]
    }));

    const isNowScheduled = !scheduledItems[item.id];
    if (isNowScheduled) {
      onTriggerToast({
        type: 'success',
        title: `Optimized Schedule Deployed: ${item.name}`,
        message: item.recommendation,
        metric: `Saves ${item.potentialMonthlySavings}`
      });
    } else {
      onTriggerToast({
        type: 'alert',
        title: `Schedule Reverted: ${item.name}`,
        message: 'Equipment returned to standard non-shifted operation.',
        metric: 'Standard Peak Tariff'
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8F0EC] shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Heavy Load Detection & Scheduling Recommendations
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time sub-metered anomaly classification identifying loads exceeding dynamic 80th-percentile energy bounds.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto text-xs">
          <span className="px-2.5 py-1 rounded-full bg-[#E8F0EC] text-[#1E3F20] font-semibold font-mono">
            4 Critical Subsystems
          </span>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipmentList.map((item) => {
          const isShifted = scheduledItems[item.id];
          const isCritical = item.carbonImpactLevel === 'Critical' || item.carbonImpactLevel === 'Severe';

          return (
            <div 
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                isShifted 
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-2xs' 
                  : isCritical 
                    ? 'bg-white border-amber-200/90 shadow-2xs' 
                    : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.carbonImpactLevel === 'Critical'
                        ? 'bg-rose-100 text-rose-800'
                        : item.carbonImpactLevel === 'Severe'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.carbonImpactLevel} Impact
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{item.zone}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                    {item.name}
                  </h4>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-lg font-extrabold font-mono text-slate-900">
                    {isShifted ? `${Math.round(item.powerDrawKw * 0.4)} kW` : `${item.powerDrawKw} kW`}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Duty: {item.dutyCycle}
                  </span>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="mt-3 p-3 rounded-lg bg-[#F8FAF9] border border-slate-100 text-xs">
                <div className="flex items-center space-x-1.5 text-slate-700 font-semibold mb-1">
                  <CalendarClock className="w-3.5 h-3.5 text-[#1E3F20]" />
                  <span>Recommendation:</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {item.recommendation}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-800 font-medium pt-1.5 border-t border-slate-200/60">
                  <span>Savings Potential:</span>
                  <span className="font-mono font-bold">{item.potentialMonthlySavings}</span>
                </div>
              </div>

              {/* Action Button */}
              {item.canShift && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleApplySchedule(item)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                      isShifted
                        ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                        : 'bg-[#1E3F20] text-white hover:bg-[#162E18]'
                    }`}
                  >
                    {isShifted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Schedule Active (Shifted)</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span>Apply Smart Schedule Shift</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
