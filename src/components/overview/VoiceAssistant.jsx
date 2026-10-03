import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Radio,
  Play,
  CornerDownLeft
} from 'lucide-react';
import { voiceAssistantPrompts } from '../../data/mockData';

export default function VoiceAssistant({ onTriggerToast, setIsAcShutdownActive }) {
  const [selectedPrompt, setSelectedPrompt] = useState(voiceAssistantPrompts[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [activePlatform, setActivePlatform] = useState('All');

  const handleSelectPrompt = (promptItem) => {
    setSelectedPrompt(promptItem);
    setIsPlayingAudio(true);

    if (promptItem.id === 'voice-3') {
      setIsAcShutdownActive(true);
    }

    onTriggerToast({
      type: 'success',
      title: `Voice Action Dispatched (${promptItem.platform})`,
      message: promptItem.actionExecuted,
      metric: promptItem.metricHighlight
    });

    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2800);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const lower = customInput.toLowerCase();
    let responseText = "EcoVanguard processed your natural language request. Telemetry analyzed across BACnet sub-meters and marginal emissions indices.";
    let metricHighlight = "Command Parsed";

    if (lower.includes("floor") || lower.includes("hvac") || lower.includes("ac")) {
      setIsAcShutdownActive(true);
      responseText = "Identified unoccupied zone condition. BACnet shutdown command dispatched to Floor 2 VRF system. Energy draw reduced by 34.2 kW.";
      metricHighlight = "-34.2 kW Reduction";
    } else if (lower.includes("carbon") || lower.includes("emission")) {
      responseText = "Real-time carbon intensity is 312 gCO₂eq/kWh. Next greenest window starts at 01:00 AM (160 gCO₂eq/kWh).";
      metricHighlight = "312 gCO₂eq/kWh";
    } else if (lower.includes("chiller") || lower.includes("peak") || lower.includes("cost")) {
      responseText = "Pre-cooling recommendation: Shift 40% thermal chiller load to 02:00 AM to take advantage of $0.08/kWh off-peak rates.";
      metricHighlight = "Save $1,420/month";
    }

    const customObj = {
      id: `custom-${Date.now()}`,
      platform: "Voice NLP Gateway",
      promptText: `"${customInput}"`,
      shortPrompt: customInput,
      responseText,
      actionExecuted: "Processed via Cloud Smart Assistant NLP Engine",
      metricHighlight
    };

    setSelectedPrompt(customObj);
    setIsPlayingAudio(true);
    setCustomInput('');

    onTriggerToast({
      type: 'success',
      title: 'Smart Assistant Command Executed',
      message: responseText,
      metric: metricHighlight
    });

    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2800);
  };

  const filteredPrompts = activePlatform === 'All' 
    ? voiceAssistantPrompts 
    : voiceAssistantPrompts.filter(p => p.platform.includes(activePlatform));

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8F0EC] shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Mic className="w-4 h-4 text-[#1E3F20]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Voice & Smart Assistant Integration
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F0EC] text-[#1E3F20]">
              Google Assistant & Alexa Certified
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Native voice action dispatcher allowing facilities engineers to query real-time carbon intensity and dispatch load commands hands-free.
          </p>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center space-x-1.5 bg-[#F8FAF9] p-1 rounded-xl border border-slate-200 text-xs self-start sm:self-auto">
          {['All', 'Google', 'Alexa'].map(plat => (
            <button
              key={plat}
              onClick={() => setActivePlatform(plat)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activePlatform === plat
                  ? 'bg-white text-[#1E3F20] shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Prompt Simulator & Response Visualizer */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Column: Preset Voice Chips */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-semibold text-slate-700 block">
            Click a sample voice prompt to simulate:
          </span>
          {filteredPrompts.map((p) => {
            const isSelected = selectedPrompt.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPrompt(p)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all relative overflow-hidden flex items-start space-x-3 ${
                  isSelected 
                    ? 'bg-[#E8F0EC]/70 border-[#1E3F20]/40 shadow-xs ring-1 ring-[#1E3F20]/30' 
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-[#F8FAF9]'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                  p.platform.includes('Google') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-cyan-100 text-cyan-800'
                }`}>
                  <Mic className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {p.platform}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-semibold text-[#1E3F20] bg-white px-1.5 py-0.2 rounded border border-[#C6DDD0]">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-slate-800 font-semibold mt-0.5 truncate">
                    {p.promptText}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Assistant Response Audio & Text Card */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#162E18] to-[#1E3F20] text-white rounded-2xl p-5 shadow-md flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle eco pattern background */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Top Assistant Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#A3E635]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">
                    EcoVanguard Voice Engine
                  </div>
                  <div className="text-[10px] text-emerald-200/70 font-mono">
                    {selectedPrompt.platform} Integration Active
                  </div>
                </div>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className="flex items-center space-x-1 h-6 px-3 py-1 rounded-full bg-black/20 border border-white/10">
                <span className={`w-1 bg-[#A3E635] rounded-full ${isPlayingAudio ? 'audio-bar-1' : 'h-2'}`} />
                <span className={`w-1 bg-[#A3E635] rounded-full ${isPlayingAudio ? 'audio-bar-2' : 'h-3'}`} />
                <span className={`w-1 bg-[#A3E635] rounded-full ${isPlayingAudio ? 'audio-bar-3' : 'h-4'}`} />
                <span className={`w-1 bg-[#A3E635] rounded-full ${isPlayingAudio ? 'audio-bar-4' : 'h-2'}`} />
                <span className={`w-1 bg-[#A3E635] rounded-full ${isPlayingAudio ? 'audio-bar-5' : 'h-3'}`} />
                <span className="text-[10px] font-mono text-emerald-200 ml-1.5">
                  {isPlayingAudio ? 'Synthesizing...' : 'Ready'}
                </span>
              </div>
            </div>

            {/* Prompt Speech Bubble */}
            <div className="mt-4 bg-white/10 rounded-xl p-3 border border-white/10 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                Voice Query Received:
              </span>
              <p className="text-emerald-50 text-sm font-medium italic mt-1">
                {selectedPrompt.promptText}
              </p>
            </div>

            {/* Simulated Response */}
            <div className="mt-3 bg-black/20 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
                <span className="font-semibold flex items-center space-x-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Synthesized Voice Output</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  {selectedPrompt.actionExecuted}
                </span>
              </div>
              <p className="text-white text-xs sm:text-sm leading-relaxed mt-2 font-sans font-normal">
                {selectedPrompt.responseText}
              </p>
              <div className="mt-3 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#A3E635]/20 text-[#A3E635] text-xs font-mono font-semibold border border-[#A3E635]/30">
                <Sparkles className="w-3 h-3" />
                <span>Result: {selectedPrompt.metricHighlight}</span>
              </div>
            </div>
          </div>

          {/* Interactive Natural Language Input Bar */}
          <form onSubmit={handleCustomSubmit} className="mt-4 pt-3 border-t border-white/10 flex items-center space-x-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Or type a custom voice command (e.g. 'Hey Google, check floor 2 HVAC')..."
              className="flex-1 bg-black/30 text-white placeholder-emerald-100/40 text-xs rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-hidden focus:border-[#A3E635] transition-all"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#A3E635] text-[#162E18] font-semibold hover:bg-emerald-300 transition-all flex items-center justify-center shrink-0"
              title="Send Command"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
