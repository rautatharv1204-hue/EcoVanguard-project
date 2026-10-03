import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Zap,
  Sliders,
  SunMedium
} from 'lucide-react';
import { executiveSummaryReport } from '../../data/mockData';

export default function ExecutiveSummary({ onTriggerToast, setIsAcShutdownActive }) {
  const [recommendations, setRecommendations] = useState(
    executiveSummaryReport.actionableRecommendations.map(r => ({
      ...r,
      isDeployed: false
    }))
  );

  const handleApplyRecommendation = (rec) => {
    setRecommendations(prev => prev.map(item => {
      if (item.id === rec.id) {
        return { ...item, isDeployed: !item.isDeployed };
      }
      return item;
    }));

    const nextState = !rec.isDeployed;

    if (rec.id === 'rec-1' && nextState) {
      setIsAcShutdownActive(true);
    }

    if (nextState) {
      onTriggerToast({
        type: 'success',
        title: `Optimization Deployed: ${rec.title}`,
        message: `Automated policy enrolled into building management system (BMS).`,
        metric: `Saves ${rec.estimatedSavings} • ${rec.carbonCut}`
      });
    } else {
      onTriggerToast({
        type: 'alert',
        title: `Policy Paused: ${rec.title}`,
        message: 'Action reverted to standard baseline manual schedule.',
        metric: 'Baseline Restored'
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E8F0EC] shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#E8F0EC] text-[#1E3F20]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3F20]">
              Executive Intelligence Report
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Executive Conclusion & Automated Impact Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Algorithmic continuous commissioning outcomes based on current building occupancy patterns, time-of-use (TOU) utility rate tiers, and regional grid carbon intensity tracking.
          </p>
        </div>

        <div className="bg-[#F8FAF9] px-4 py-2.5 rounded-xl border border-slate-200 self-start md:self-auto flex items-center space-x-2">
          <FileCheck className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-semibold text-slate-700">Audit Status: Verified ISO 50001</span>
        </div>
      </div>

      {/* Key Finding Impact KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Monthly Cost Savings */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F2F7F4] to-white border border-[#D1E3D7] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Projected Monthly Savings
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#1E3F20] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-3xl font-extrabold font-mono text-[#162E18]">
              ${executiveSummaryReport.monthlySavingsDollars.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500">/ mo</span>
          </div>
          <p className="text-xs text-emerald-800 font-medium mt-2">
            −21.4% reduction in peak demand charges
          </p>
        </div>

        {/* Metric 2: Total Carbon Reduction */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-white border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Carbon Abatement
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-3xl font-extrabold font-mono text-emerald-900">
              {executiveSummaryReport.monthlyCarbonReductionTons}
            </span>
            <span className="text-xs font-medium text-slate-500">tons CO₂ / mo</span>
          </div>
          <p className="text-xs text-emerald-800 font-medium mt-2">
            Equivalent to 39 passenger vehicles removed
          </p>
        </div>

        {/* Metric 3: Peak Demand Trimmed */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/60 to-white border border-amber-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Peak Demand Shed
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-3xl font-extrabold font-mono text-amber-900">
              {executiveSummaryReport.peakDemandCutKw}
            </span>
            <span className="text-xs font-medium text-slate-500">kW peak cut</span>
          </div>
          <p className="text-xs text-amber-800 font-medium mt-2">
            Shifts heavy chillers & EV fleets away from 4-7 PM
          </p>
        </div>

        {/* Metric 4: Investment Payback Timeline */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-white border border-blue-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Platform Payback Period
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-3xl font-extrabold font-mono text-blue-900">
              {executiveSummaryReport.annualizedRoiMonths}
            </span>
            <span className="text-xs font-medium text-slate-500">Months</span>
          </div>
          <p className="text-xs text-blue-800 font-medium mt-2">
            Accelerated ROI via avoided demand ratchet fees
          </p>
        </div>

      </div>

      {/* Actionable Recommendations Module */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Actionable Algorithmic Recommendations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              One-click policies generated by our multi-variable constrained optimization solver.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 bg-[#F8FAF9] px-2.5 py-1 rounded-lg border border-slate-200">
            4 Solved Policies Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => {
            const isImmediate = rec.priority === 'Immediate';
            const isHigh = rec.priority === 'High Impact';

            return (
              <div 
                key={rec.id}
                className={`p-5 rounded-2xl border transition-all ${
                  rec.isDeployed 
                    ? 'bg-emerald-50/50 border-emerald-300 shadow-xs' 
                    : 'bg-[#FBFBF9] border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isImmediate 
                          ? 'bg-rose-100 text-rose-800' 
                          : isHigh 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {rec.priority}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {rec.isDeployed ? 'Policy Active' : 'Ready to Dispatch'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                      {rec.title}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-[#E8F0EC] px-2 py-0.5 rounded block">
                      {rec.estimatedSavings}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      {rec.carbonCut}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {rec.description}
                </p>

                {/* Dispatch Button */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Protocol: BACnet IP / Modbus RTU
                  </span>

                  <button
                    onClick={() => handleApplyRecommendation(rec)}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all shadow-2xs ${
                      rec.isDeployed
                        ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                        : 'bg-[#1E3F20] text-white hover:bg-[#162E18]'
                    }`}
                  >
                    {rec.isDeployed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635]" />
                        <span>Deployed & Active</span>
                      </>
                    ) : (
                      <>
                        <span>{rec.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
