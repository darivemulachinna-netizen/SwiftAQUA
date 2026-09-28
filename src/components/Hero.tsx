import React from 'react';
import { Phone, Clock, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Building2, PartyPopper } from 'lucide-react';
import { CURRENT_LAB_BATCH } from '../data/qualityData';

interface HeroProps {
  onOpenBooking: (presetCategory?: 'house' | 'function') => void;
  onOpenDialer: () => void;
  onOpenCertificate: () => void;
  onSelectCategory: (category: 'house' | 'function') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenDialer,
  onOpenCertificate,
  onSelectCategory,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-cyan-50/70 via-slate-50 to-white pt-10 pb-16 border-b border-slate-200">
      {/* Background soft ambient water ring pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="waterGlow" cx="60%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#waterGlow)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Core Value Proposition & Dual Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Purity Guarantee Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-cyan-800">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>NABL Lab Tested Morning Batch Dispatched</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600">45-Min Express Delivery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Pure Water Supply for Your{' '}
              <span className="text-cyan-700 underline decoration-cyan-300 decoration-wavy decoration-2">
                Home
              </span>{' '}
              & Grand{' '}
              <span className="text-blue-700 underline decoration-blue-300 decoration-wavy decoration-2">
                Functions
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Get certified, sweet potable water delivered straight to your overhead tank, sump, or banquet venue. Certified food-grade stainless tankers and 20L mineral cans tested daily for TDS, pH balance, and zero microbes.
            </p>

            {/* DUAL ORDER CHANNELS (APP CLICK vs PHONE DIAL) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Channel 1: In-App Booking */}
              <button
                onClick={() => onOpenBooking()}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl shadow-sm hover:shadow transition-all group cursor-pointer"
              >
                <span>Click to Book on App</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Channel 2: Direct Phone Dialing */}
              <button
                onClick={onOpenDialer}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-cyan-900 bg-white hover:bg-cyan-50/80 border-2 border-cyan-600 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5 text-cyan-700 animate-bounce" />
                <div className="text-left">
                  <span className="text-xs uppercase tracking-wider block font-bold text-cyan-700">Dial Direct Hotline</span>
                  <span className="text-sm font-mono font-bold text-slate-900">1800-278-2669</span>
                </div>
              </button>
            </div>

            {/* Quick Segment Choosers */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fast select:</span>
              <button
                onClick={() => onSelectCategory('house')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:border-cyan-400 hover:text-cyan-700 transition-colors shadow-2xs cursor-pointer text-xs font-medium"
              >
                <Building2 className="w-3.5 h-3.5 text-cyan-600" />
                House & Domestic (20L Cans & 1k–3kL Tankers)
              </button>
              <button
                onClick={() => onSelectCategory('function')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:border-blue-400 hover:text-blue-700 transition-colors shadow-2xs cursor-pointer text-xs font-medium"
              >
                <PartyPopper className="w-3.5 h-3.5 text-blue-600" />
                Weddings & Banquets (5k–10kL SS Tankers)
              </button>
            </div>
          </div>

          {/* Right Column: Live Quality Metrics & Tanker Graphic Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              
              {/* Quality Banner Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-900">Live Water Quality Telemetry</span>
                  </div>
                  <span className="text-xs text-slate-500">Batch {CURRENT_LAB_BATCH.batchId}</span>
                </div>
                <button
                  onClick={onOpenCertificate}
                  className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 underline decoration-cyan-400 cursor-pointer"
                >
                  View Lab Certificate
                </button>
              </div>

              {/* Real-time Quality Meters Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">TDS (Total Solids)</div>
                  <div className="text-xl font-bold font-mono text-cyan-900 mt-0.5">92 <span className="text-xs font-normal text-slate-500">ppm</span></div>
                  <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Sweet & Soft
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">pH Level</div>
                  <div className="text-xl font-bold font-mono text-cyan-900 mt-0.5">7.42 <span className="text-xs font-normal text-slate-500">pH</span></div>
                  <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Balanced Alkaline
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Total Hardness</div>
                  <div className="text-xl font-bold font-mono text-cyan-900 mt-0.5">58 <span className="text-xs font-normal text-slate-500">mg/L</span></div>
                  <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Non-scaling Soft
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">E. Coli / Microbial</div>
                  <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5">0.00 <span className="text-xs font-normal text-slate-500">CFU</span></div>
                  <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> 100% Sterile Grade
                  </div>
                </div>
              </div>

              {/* Delivery Fleet & Hygiene Safeguard */}
              <div className="p-3.5 bg-cyan-50/60 rounded-xl border border-cyan-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-semibold text-slate-900 block">
                    SS-304 Food-Grade Dedicated Tankers
                  </span>
                  <span className="text-slate-600 block">
                    Our fleet carries only potable water. Steam sanitized daily with food-grade hose connections up to 300ft to reach any floor.
                  </span>
                </div>
              </div>

              {/* Bottom Guarantee Checklist */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Sealed Flow Meter Receipt</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant Driver Contact</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>On-Spot Digital TDS Check</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Cash on Delivery / UPI</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
