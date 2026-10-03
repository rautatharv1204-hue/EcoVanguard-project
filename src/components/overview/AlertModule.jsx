import React from 'react';
import { 
  AlertTriangle, 
  Power, 
  CheckCircle, 
  Users, 
  Wind, 
  ShieldAlert, 
  ArrowRight,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export default function AlertModule({ 
  isAcShutdownActive, 
  setIsAcShutdownActive, 
  onTriggerToast 
}) {
  const handleToggle = () => {
    const newState = !isAcShutdownActive;
    setIsAcShutdownActive(newState);
    if (newState) {
      onTriggerToast({
        type: 'success',
        title: 'BACnet Protocol Override Executed',
        message: 'Dispatched automated shutdown signal to Floor 2 East VRF condenser. Thermostat temperature setback engaged.',
        metric: '−34.2 kW Idle Load Cut • Saving $10.94/hr'
      });
    } else {
      onTriggerToast({
        type: 'alert',
        title: 'Manual Override Triggered',
        message: 'Floor 2 HVAC restored to standard occupied operational setpoint. Alert re-flagged.',
        metric: '+34.2 kW Load Restored'
      });
    }
  };

  return (
    <div className={`rounded-2xl p-6 border transition-all duration-300 shadow-xs ${
      isAcShutdownActive 
        ? 'bg-gradient-to-br from-[#F2F7F4] to-white border-emerald-300/80 shadow-emerald-900/5' 
        : 'bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border-amber-300 shadow-amber-900/5'
    }`}>
      
      {/* Alert Header & Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isAcShutdownActive 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-amber-100 text-amber-700 animate-pulse'
          }`}>
            {isAcShutdownActive ? (
              <CheckCircle className="w-5 h-5 text-emerald-700" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isAcShutdownActive 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {isAcShutdownActive ? 'Optimization Engaged' : 'Active Anomaly Detected'}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: OCC-ALERT-F2-04</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {isAcShutdownActive 
                ? 'Floor 2 HVAC Automated Eco-Setback Active' 
                : 'Alert: 2nd floor AC is ON while floor is empty.'}
            </h3>
          </div>
        </div>

        {/* Interactive Toggle Control */}
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
          <span className="text-xs font-semibold text-slate-700">
            {isAcShutdownActive ? 'Automated Cutoff: ON' : 'Automated Shutdown:'}
          </span>
          <button
            onClick={handleToggle}
            type="button"
            role="switch"
            aria-checked={isAcShutdownActive}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-[#1E3F20] focus:ring-offset-2 ${
              isAcShutdownActive ? 'bg-[#1E3F20]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                isAcShutdownActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Alert Content & Real-time Metrics */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Sensor Observation */}
        <div className="bg-white/80 p-3.5 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">Occupancy Telemetry</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xl font-bold text-slate-900 font-mono">0 People</span>
            <span className="text-xs text-slate-500 font-medium">(PIR & BLE)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Floor 2 Executive Suites unpopulated for 52 mins (threshold: 15 mins).
          </p>
        </div>

        {/* HVAC Power State */}
        <div className="bg-white/80 p-3.5 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <Wind className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">VRF Cooling Load</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-xl font-bold font-mono ${
              isAcShutdownActive ? 'text-emerald-700' : 'text-amber-600'
            }`}>
              {isAcShutdownActive ? '1.8 kW (Standby)' : '36.0 kW (Active)'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAcShutdownActive 
              ? 'Thermostat set to 26°C eco drift mode.' 
              : 'Full compressor chill running at 21.5°C setpoint.'}
          </p>
        </div>

        {/* Cost & Carbon Impact */}
        <div className={`p-3.5 rounded-xl border ${
          isAcShutdownActive 
            ? 'bg-emerald-50/70 border-emerald-200' 
            : 'bg-amber-50/70 border-amber-200'
        }`}>
          <div className="flex items-center space-x-2 text-xs mb-1">
            <Sparkles className={`w-3.5 h-3.5 ${
              isAcShutdownActive ? 'text-emerald-700' : 'text-amber-700'
            }`} />
            <span className={`font-semibold ${
              isAcShutdownActive ? 'text-emerald-900' : 'text-amber-900'
            }`}>
              {isAcShutdownActive ? 'Avoided Waste Rate' : 'Estimated Waste Rate'}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-xl font-bold font-mono ${
              isAcShutdownActive ? 'text-emerald-800' : 'text-amber-800'
            }`}>
              {isAcShutdownActive ? '−$10.94 / hr' : '$11.52 / hr'}
            </span>
            <span className="text-xs text-slate-600">
              {isAcShutdownActive ? '(Saved)' : '(Unbudgeted)'}
            </span>
          </div>
          <p className={`text-[11px] mt-1 ${
            isAcShutdownActive ? 'text-emerald-800 font-medium' : 'text-amber-800'
          }`}>
            {isAcShutdownActive 
              ? 'Prevents 10.6 kg CO₂ emissions each hour.' 
              : 'Generating 11.2 kg CO₂/hr while empty.'}
          </p>
        </div>

      </div>

      {/* Action Footer Callout */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center space-x-2">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            {isAcShutdownActive 
              ? 'Automated rule BACNET-RULE-08 active. Occupancy resumption will auto-restore climate setpoints in 180s.'
              : 'Autonomous optimization paused. Click the toggle to immediately shut down idle VRF equipment.'}
          </span>
        </div>
        {isAcShutdownActive ? (
          <button 
            onClick={handleToggle}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 shrink-0 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Manual Override (Turn Back On)</span>
          </button>
        ) : (
          <button 
            onClick={handleToggle}
            className="text-xs font-semibold text-[#1E3F20] hover:text-[#162E18] flex items-center space-x-1 shrink-0 bg-[#E8F0EC] px-3 py-1 rounded-lg border border-[#D1E3D7]"
          >
            <Power className="w-3.5 h-3.5" />
            <span>Trigger Automated Shutdown Now</span>
          </button>
        )}
      </div>

    </div>
  );
}
