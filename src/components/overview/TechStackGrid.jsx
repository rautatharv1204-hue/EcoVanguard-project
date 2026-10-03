import React, { useState } from 'react';
import { 
  Database, 
  Globe, 
  Server, 
  Layers, 
  Code, 
  CheckCircle, 
  ExternalLink,
  ChevronDown,
  Terminal,
  Copy,
  Check
} from 'lucide-react';
import { techStackData } from '../../data/mockData';

export default function TechStackGrid({ onTriggerToast }) {
  const [inspectedItem, setInspectedItem] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyPayload = (payload) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onTriggerToast({
      type: 'info',
      title: 'Payload Copied to Clipboard',
      message: 'Integration JSON schema copied successfully.'
    });
  };

  return (
    <div id="architecture-section" className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E8F0EC] shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#E8F0EC] text-[#1E3F20]">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3F20]">
              System Integration Grid
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Enterprise Tech Stack & API Ingestion Fabric
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Dual-layer architecture bridging mission-critical external grid intelligence with high-throughput internal time-series storage and real-time algorithmic dispatch microservices.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto text-xs font-mono bg-[#F8FAF9] px-3 py-1.5 rounded-xl border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>6/6 Services Healthy</span>
        </div>
      </div>

      {/* Two-Column Grid: External APIs vs Internal Backend */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {techStackData.map((categoryGroup, groupIdx) => (
          <div key={groupIdx} className="space-y-4">
            
            {/* Category Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {groupIdx === 0 ? (
                  <Globe className="w-4 h-4 text-[#1E3F20]" />
                ) : (
                  <Server className="w-4 h-4 text-[#1E3F20]" />
                )}
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {categoryGroup.category}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {groupIdx === 0 ? 'Public Ingestion Feeds' : 'Private Microservices'}
              </span>
            </div>

            {/* Service Cards */}
            <div className="space-y-3">
              {categoryGroup.items.map((item, itemIdx) => {
                const isInspecting = inspectedItem?.name === item.name;

                return (
                  <div 
                    key={itemIdx}
                    className="p-4 rounded-xl border border-slate-200/90 hover:border-[#1E3F20]/40 transition-all bg-[#FBFBF9]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-[#1E3F20] bg-[#E8F0EC] px-2 py-0.5 rounded">
                            {item.badge}
                          </span>
                          <span className="text-xs text-emerald-800 font-medium flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            <span>{item.status}</span>
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-1.5">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setInspectedItem(isInspecting ? null : item)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1 shrink-0 transition-all ${
                          isInspecting
                            ? 'bg-[#1E3F20] text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                        title="Inspect Live Payload"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>{isInspecting ? 'Close' : 'Payload'}</span>
                      </button>
                    </div>

                    {/* Metadata strip */}
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Sync: {item.syncRate}</span>
                      <span className="truncate max-w-[200px]" title={item.endpoint}>
                        {item.endpoint}
                      </span>
                    </div>

                    {/* Expandable JSON Payload Inspector */}
                    {isInspecting && (
                      <div className="mt-3 pt-3 border-t border-slate-200 animate-fadeIn">
                        <div className="flex items-center justify-between text-xs pb-1.5">
                          <span className="font-mono text-slate-500 flex items-center space-x-1">
                            <Terminal className="w-3.5 h-3.5 text-slate-400" />
                            <span>Live Telemetry Response:</span>
                          </span>
                          <button
                            onClick={() => handleCopyPayload(item.samplePayload)}
                            className="text-[11px] font-mono text-[#1E3F20] hover:underline flex items-center space-x-1"
                          >
                            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                          </button>
                        </div>
                        <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto shadow-inner">
                          {JSON.stringify(item.samplePayload, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
