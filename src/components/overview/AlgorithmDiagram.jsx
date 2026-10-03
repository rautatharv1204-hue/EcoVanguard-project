import React, { useState } from 'react';
import { 
  Cpu, 
  Globe, 
  Zap, 
  ShieldAlert, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  Activity,
  Calculator
} from 'lucide-react';
import { algorithmFlowSteps } from '../../data/mockData';

export default function AlgorithmDiagram() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = algorithmFlowSteps[activeStepIndex];

  return (
    <div id="algorithm-section" className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E8F0EC] shadow-xs">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#E8F0EC] text-[#1E3F20]">
              <Calculator className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3F20]">
              Mathematical Engine
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Algorithmic Telemetry to Carbon Conversion Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            A deterministic 4-stage pipeline that ingests continuous voltage and phase electrical measurements, dynamically matches marginal emissions, solves multi-variable constraints, and dispatches automated building management actions.
          </p>
        </div>

        {/* Live Equation Badge */}
        <div className="bg-[#F8FAF9] p-3 rounded-xl border border-slate-200 self-start md:self-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Core Conversion Law
          </div>
          <div className="text-xs font-mono font-bold text-[#162E18] mt-0.5">
            CO₂ (g) = (√3 · V · I · cos φ) × I_grid(t) × Δt
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flow Stepper Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {algorithmFlowSteps.map((step, idx) => {
          const isSelected = activeStepIndex === idx;
          const isPassed = activeStepIndex > idx;

          return (
            <div
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all relative group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#F2F7F4] to-white border-[#1E3F20] shadow-md ring-1 ring-[#1E3F20]/30'
                  : 'bg-white border-slate-200/90 hover:border-[#1E3F20]/40 hover:bg-[#F8FAF9]'
              }`}
            >
              {/* Step Top Bar */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold font-mono px-2 py-0.5 rounded-md ${
                  isSelected 
                    ? 'bg-[#1E3F20] text-white' 
                    : 'bg-[#E8F0EC] text-[#1E3F20]'
                }`}>
                  STEP {step.stepNumber}
                </span>

                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-[#1E3F20] text-[#A3E635]' : 'bg-slate-100 text-slate-600'
                }`}>
                  {idx === 0 && <Cpu className="w-4 h-4" />}
                  {idx === 1 && <Globe className="w-4 h-4" />}
                  {idx === 2 && <Zap className="w-4 h-4" />}
                  {idx === 3 && <ShieldAlert className="w-4 h-4" />}
                </div>
              </div>

              {/* Title & Phase */}
              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {step.phase}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                  {step.title}
                </h4>
              </div>

              {/* Short snippet */}
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {step.description}
              </p>

              {/* Status footer inside card */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-emerald-800 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>{step.status}</span>
                </span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                  isSelected ? 'text-[#1E3F20] translate-x-1' : 'text-slate-400'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Step Deep-Dive Inspector Panel */}
      <div className="mt-6 bg-[#F8FAF9] rounded-2xl p-6 border border-slate-200/90">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold bg-[#E8F0EC] text-[#1E3F20] px-2.5 py-1 rounded-lg">
              Stage {activeStep.stepNumber} Focus
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {activeStep.title} — Technical Logic Breakdown
            </h3>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono text-slate-500">
            <span>Latency: <strong className="text-slate-800">{activeStep.latency}</strong></span>
            <span>•</span>
            <span>Protocol: <strong className="text-slate-800">{activeStep.status}</strong></span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Detailed logic text */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeStep.description}
            </p>

            {/* Ingestion & Output Telemetry Variables */}
            <div>
              <span className="text-xs font-semibold text-slate-900 block mb-2">
                Processed Mathematical Variables:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeStep.metrics.map((m, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1.5" />
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Mathematical equation card */}
          <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Algorithmic Equation & Logic Map
            </span>

            {activeStepIndex === 0 && (
              <div className="mt-2 space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#F2F7F4] border border-[#DCE9E2] text-[#162E18]">
                  {"P_total(t) = ∑_(i=1..3) [ V_i(t) · I_i(t) · cos(φ_i) ]"}
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Calculates true root-mean-square (RMS) real power across all 3 electrical phases, adjusting for non-linear power factor distortions.
                </p>
              </div>
            )}

            {activeStepIndex === 1 && (
              <div className="mt-2 space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#F2F7F4] border border-[#DCE9E2] text-[#162E18]">
                  E_carbon(t) = P_total(t) × MOER_grid(t) × Δt
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Multiplies consumed kWh by the marginal operating emissions rate (MOER in gCO₂eq/kWh) retrieved via Electricity Maps & WattTime APIs.
                </p>
              </div>
            )}

            {activeStepIndex === 2 && (
              <div className="mt-2 space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#F2F7F4] border border-[#DCE9E2] text-[#162E18]">
                  min [ C_elec(t) + λ · E_carbon(t) ] s.t. T_min ≤ T_zone ≤ T_max
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Solves a multi-objective linear program balancing immediate utility costs against corporate carbon abatement targets and thermal inertia comfort bounds.
                </p>
              </div>
            )}

            {activeStepIndex === 3 && (
              <div className="mt-2 space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#F2F7F4] border border-[#DCE9E2] text-[#162E18]">
                  Dispatch(BACnet, Webhook, LoadShed) → BMS Gateway
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Sends BACnet/IP write commands to zone thermostats, throttles EV charging rates, and emits instant facilities notifications.
                </p>
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Solver Engine: Simplex / SciPy</span>
              <span>Precision: 64-bit IEEE</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
