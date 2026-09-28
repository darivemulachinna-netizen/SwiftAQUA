import React, { useState } from 'react';
import { CURRENT_LAB_BATCH, COMPARISON_DATA } from '../data/qualityData';
import { ShieldCheck, CheckCircle2, FileText, Activity, AlertCircle, Droplets, Filter, Award, Sparkles } from 'lucide-react';

interface QualityHubProps {
  onOpenCertificate: () => void;
}

export const QualityHub: React.FC<QualityHubProps> = ({ onOpenCertificate }) => {
  const [selectedMetricId, setSelectedMetricId] = useState<string>('tds');
  const [userTdsInput, setUserTdsInput] = useState<number>(380);

  const selectedMetric = CURRENT_LAB_BATCH.metrics.find(m => m.id === selectedMetricId) || CURRENT_LAB_BATCH.metrics[0];

  const getTdsDiagnosis = (val: number) => {
    if (val < 50) return { text: 'Demineralized (Lacks essential salts)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (val <= 150) return { text: 'Optimal Drinking Water (Crisp, healthy minerals)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val <= 300) return { text: 'Good Drinking & Domestic Quality', color: 'text-cyan-700 bg-cyan-50 border-cyan-200' };
    if (val <= 500) return { text: 'Acceptable Domestic Utility (Moderate scaling risk)', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { text: 'High Hardness / Saline (Pipe scaling & health hazard)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const diagnosis = getTdsDiagnosis(userTdsInput);

  return (
    <section id="quality-hub" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Water Quality & Purity Assurance</span>
              <span className="text-slate-300">·</span>
              <span>NABL Lab Accredited</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Function Quality & Live Laboratory Testing
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
              Water quality cannot be guessed—every tanker dispatched for domestic tanks or wedding catering comes with a certified digital lab certificate tested for 18 physical, chemical, and biological safety parameters.
            </p>
          </div>

          <button
            onClick={onOpenCertificate}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 rounded-xl transition-colors shrink-0 shadow-2xs cursor-pointer"
          >
            <FileText className="w-4 h-4 text-cyan-700" />
            <span>View Batch Certificate #{CURRENT_LAB_BATCH.batchId}</span>
          </button>
        </div>

        {/* Real-time Metric Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Metric Selector Tiles */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CURRENT_LAB_BATCH.metrics.map((metric) => {
              const isSelected = metric.id === selectedMetricId;

              return (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetricId(metric.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-cyan-600 bg-cyan-50/60 shadow-xs ring-1 ring-cyan-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {metric.symbol}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-lg font-bold font-mono text-slate-900 mt-1">
                    {metric.measuredValue}
                  </div>
                  <div className="text-xs text-slate-600 line-clamp-1 font-medium mt-0.5">
                    {metric.name.split('(')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Parameter Inspection Card */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800">
                  Parameter Analysis
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedMetric.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Current Batch Value</span>
                <span className="text-xl font-bold font-mono text-cyan-900">
                  {selectedMetric.measuredValue} <span className="text-xs font-normal text-slate-600">{selectedMetric.unit}</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedMetric.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">WHO Drinking Guideline:</span>
                <span className="font-semibold text-slate-800">{selectedMetric.whoStandard}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">BIS Permissible Limit:</span>
                <span className="font-semibold text-slate-800">{selectedMetric.permissibleLimit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Lab Technician Sign-off:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-600" />
                <span>Sample tested: {CURRENT_LAB_BATCH.testedAt}</span>
              </div>
            </div>
          </div>

        </div>

        {/* 7-Stage Purification Pipeline Visualization */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>Multi-Barrier Safety Infrastructure</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white mt-1">
                7-Stage Commercial Water Purification System
              </h3>
            </div>
            <div className="text-xs text-slate-400">
              Food-Grade Certified & Non-Toxic Flow Architecture
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CURRENT_LAB_BATCH.filtrationStages.slice(0, 4).map((stage, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">Stage {idx + 1}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stage}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {CURRENT_LAB_BATCH.filtrationStages.slice(4).map((stage, idx) => (
              <div key={idx + 4} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    0{idx + 5}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">Stage {idx + 5}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Side-by-Side Quality Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Compare Water Quality Sources
            </h3>
            <span className="text-xs text-slate-500">Benchmark comparison vs regular alternatives</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Water Parameter</th>
                  <th className="py-3 px-4 bg-cyan-50/70 text-cyan-950 font-bold">AquaPure Certified Supply</th>
                  <th className="py-3 px-4">Untreated Borewell</th>
                  <th className="py-3 px-4">Regular Unregulated Tanker</th>
                  <th className="py-3 px-4">Standard Municipal Tap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">{row.parameter}</td>
                    <td className="py-3 px-4 bg-cyan-50/40 font-bold text-cyan-900">{row.aquapure}</td>
                    <td className="py-3 px-4 text-slate-600">{row.untreatedBorewell}</td>
                    <td className="py-3 px-4 text-slate-600">{row.regularUnregulatedTanker}</td>
                    <td className="py-3 px-4 text-slate-600">{row.tapMunicipal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Home TDS Checker Tool */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800">
              Interactive Water Tool
            </span>
            <h4 className="text-base font-bold text-slate-900">
              Check Your Home Water TDS Rating
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Have a digital TDS meter at home? Enter your tap or tank reading to instantly check if your current supply is safe for drinking and household skin/piping health.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <div className="flex items-center gap-2 bg-white px-3 py-2 border border-slate-300 rounded-xl shadow-2xs">
              <span className="text-xs font-medium text-slate-500">TDS:</span>
              <input
                type="number"
                min="10"
                max="2500"
                value={userTdsInput}
                onChange={(e) => setUserTdsInput(Number(e.target.value))}
                className="w-20 font-mono font-bold text-sm text-slate-900 focus:outline-none"
              />
              <span className="text-xs text-slate-400 font-mono">ppm</span>
            </div>

            <div className={`px-3 py-2 rounded-xl border text-xs font-semibold ${diagnosis.color}`}>
              {diagnosis.text}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
